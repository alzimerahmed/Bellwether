/**
 * Page-level wiring shared by every static page: fills in placeholder art,
 * renders catalog-driven grids, and keeps the cart UI in sync.
 * Safe to include everywhere — each step no-ops when its hooks are absent.
 */

import { FLAVORS, byTag, cardHTML, mediaHTML, money, SCOOP_SVG, mountGrids as catalogMountGrids } from './catalog.js';
import { initCarousels } from './carousel.js';
import * as cart from './cart.js';

/** Placeholders declare <span class="ph__scoop" data-scoop> and get filled here. */
function fillScoops(root = document) {
  root.querySelectorAll('[data-scoop]').forEach((el) => {
    if (!el.innerHTML.trim()) el.innerHTML = SCOOP_SVG;
  });
}

/** Mounts all grid types: flavors, merch, party packs, and now-scooping. */
function mountGrids() {
  catalogMountGrids();
  fillScoops(document);
}

/** Add-to-cart buttons, delegated so freshly rendered cards work too. */
function wireAddToCart() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;
    cart.addItem(btn.dataset.addToCart);

    // Brief inline confirmation, restored afterwards so the label stays honest.
    const original = btn.textContent;
    btn.textContent = 'Added';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 1200);
  });
}

/** Keeps the header cart badge and its accessible label current. */
function wireCartBadge() {
  cart.onChange(() => {
    const n = cart.count();
    document.querySelectorAll('.nav-cart-count').forEach((el) => {
      el.textContent = String(n);
      const link = el.closest('a');
      if (link) link.setAttribute('aria-label', `Cart, ${n} item${n === 1 ? '' : 's'}`);
    });
  });
}

/** Renders the cart page. Only runs when the cart markup is present. */
function mountCart() {
  const list = document.querySelector('[data-cart-lines]');
  const summary = document.querySelector('[data-cart-summary]');
  if (!list || !summary) return;

  const render = () => {
    const items = cart.lines();

    if (!items.length) {
      list.innerHTML = `
        <div class="py-16 text-center">
          <p class="section-title text-2xl mb-3">Your cart is empty</p>
          <p class="lede mb-7">Sixteen flavors are in rotation right now.</p>
          <a href="/flavors.html" class="btn-primary inline-block px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase">Browse Flavors</a>
        </div>`;
      summary.hidden = true;
      return;
    }

    summary.hidden = false;
    list.innerHTML = items
      .map(
        ({ flavor, qty, total }) => `
        <div class="cart-line" data-line="${flavor.id}">
          <div class="ph ph--${flavor.tint}" style="aspect-ratio:1/1;border-radius:0.875rem" role="img" aria-label="${flavor.name}">
            <span class="ph__scoop" data-scoop></span>
          </div>
          <div>
            <h3 class="product__name mb-1">${flavor.name}</h3>
            <p class="text-sm" style="color:var(--color-muted)">${money(flavor.price)} each</p>
            <div class="mt-3 flex items-center gap-4">
              <div class="qty">
                <button type="button" data-dec="${flavor.id}" aria-label="Decrease quantity of ${flavor.name}">&minus;</button>
                <output aria-label="Quantity of ${flavor.name}">${qty}</output>
                <button type="button" data-inc="${flavor.id}" aria-label="Increase quantity of ${flavor.name}">+</button>
              </div>
              <button type="button" class="text-sm underline underline-offset-4" data-remove="${flavor.id}">Remove</button>
            </div>
          </div>
          <p class="font-bold tabular-nums">${money(total)}</p>
        </div>`
      )
      .join('');
    fillScoops(list);

    const { subtotal, shipping, total, threshold } = cart.totals();
    const shortfall = threshold - subtotal;
    summary.innerHTML = `
      <h2 class="section-title text-xl mb-4">Order Summary</h2>
      <div class="summary-row"><span>Subtotal</span><span class="tabular-nums">${money(subtotal)}</span></div>
      <div class="summary-row">
        <span>Shipping</span>
        <span class="tabular-nums">${shipping === 0 ? 'Free' : money(shipping)}</span>
      </div>
      ${
        shortfall > 0
          ? `<p class="text-sm mt-2" style="color:var(--color-muted)">Add ${money(shortfall)} more for free shipping.</p>`
          : ''
      }
      <div class="summary-row summary-row--total"><span>Total</span><span class="tabular-nums">${money(total)}</span></div>
      <button type="button" class="btn-primary w-full mt-6 px-6 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase">Checkout</button>
      <p class="text-xs mt-3 text-center" style="color:var(--color-muted)">Packed with dry ice and shipped overnight.</p>`;
  };

  list.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const rem = e.target.closest('[data-remove]');
    const current = (id) => cart.getCart()[id] || 0;
    if (inc) cart.setQty(inc.dataset.inc, current(inc.dataset.inc) + 1);
    if (dec) cart.setQty(dec.dataset.dec, current(dec.dataset.dec) - 1);
    if (rem) cart.removeItem(rem.dataset.remove);
  });

  cart.onChange(render);
}

function init() {
  fillScoops();
  mountGrids();
  initCarousels();
  wireAddToCart();
  wireCartBadge();
  mountCart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
