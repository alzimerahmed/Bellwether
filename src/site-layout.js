/**
 * Shared site chrome: sticky navbar with mega-menu panels + footer.
 * Mounts into [data-site-header] and [data-site-footer] on every page.
 */

/**
 * Brand identity. Placeholder pending a confirmed name — change these three
 * values and the name updates across every page, panel and footer.
 * Page <title> and meta tags are per-page and must be updated alongside.
 */
export const BRAND = {
  name: 'Bellwether Creamery',
  short: 'Bellwether',
  tagline: 'Slow-churned in small batches, with fruit and dairy from growers we know by name.',
};

const NAV = [
  {
    label: 'Flavors',
    href: '/flavors.html',
    columns: [
      {
        heading: 'The Core Range',
        links: [
          ['All Flavors', '/flavors.html'],
          ['Pints', '/flavors.html#pints'],
          ['Bars', '/flavors.html#bars'],
          ['Sandwiches', '/flavors.html#sandwiches'],
        ],
      },
      {
        heading: 'Dairy-Free',
        links: [
          ['Oat Base Pints', '/flavors.html#dairy-free'],
          ['Fruit Sorbets', '/flavors.html#sorbets'],
        ],
      },
      {
        heading: 'Seasonal',
        links: [
          ['On Right Now', '/flavors.html#seasonal'],
          ['Limited Batches', '/flavors.html#seasonal'],
        ],
      },
    ],
  },
  {
    label: 'Locations',
    href: '/locations.html',
    columns: [
      {
        heading: 'Visit',
        links: [
          ['All Shops', '/locations.html'],
          ['Hours', '/locations.html#hours'],
          ['Local Delivery', '/locations.html#delivery'],
        ],
      },
      {
        heading: 'Neighborhoods',
        links: [
          ['Riverside', '/locations.html#riverside'],
          ['Old Mill', '/locations.html#old-mill'],
          ['Harbor Green', '/locations.html#harbor-green'],
        ],
      },
    ],
  },
  {
    label: 'Our Story',
    href: '/story.html',
    columns: [
      {
        heading: 'About',
        links: [
          ['How We Started', '/story.html'],
          ['How We Churn', '/story.html#process'],
          ['Sourcing', '/story.html#sourcing'],
        ],
      },
    ],
  },
];

const FOOTER = [
  {
    heading: 'Shop',
    links: [
      ['All Flavors', '/flavors.html'],
      ['Pints', '/flavors.html#pints'],
      ['Dairy-Free', '/flavors.html#dairy-free'],
      ['Seasonal', '/flavors.html#seasonal'],
    ],
  },
  {
    heading: 'Visit',
    links: [
      ['Scoop Shops', '/locations.html'],
      ['Hours', '/locations.html#hours'],
      ['Local Delivery', '/locations.html#delivery'],
    ],
  },
  {
    heading: 'About',
    links: [
      ['Our Story', '/story.html'],
      ['How We Churn', '/story.html#process'],
      ['Sourcing', '/story.html#sourcing'],
      ['FAQs', '/#faq'],
    ],
  },
];

const SOCIAL = [
  ['Instagram', 'https://www.instagram.com/bellwethercreamery'],
  ['Facebook', 'https://www.facebook.com/bellwethercreamery'],
  ['TikTok', 'https://www.tiktok.com/@bellwethercreamery'],
];

const ICONS = {
  chevron:
    '<svg class="nav-link__chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  search:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  account:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  cart:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5" fill="currentColor"/><circle cx="18" cy="20" r="1.5" fill="currentColor"/><path d="M6 6 5 3H2"/></svg>',
  menu:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
};

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const columnsHTML = (columns) =>
  columns
    .map(
      (col) => `
      <div>
        <p class="nav-panel__heading">${col.heading}</p>
        <ul class="nav-panel__list">
          ${col.links.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}
        </ul>
      </div>`
    )
    .join('');

function headerHTML() {
  const desktopItems = NAV.map((item) => {
    const id = `nav-panel-${slug(item.label)}`;
    return `
      <li class="nav-item">
        <a href="${item.href}" class="nav-link__label">${item.label}</a>
        <button type="button" class="nav-link__toggle" aria-expanded="false" aria-controls="${id}" data-nav-trigger="${id}" aria-label="Toggle ${item.label} menu">
          ${ICONS.chevron}
        </button>
      </li>`;
  }).join('');

  const panels = NAV.map((item) => {
    const id = `nav-panel-${slug(item.label)}`;
    const featured = item.href
      ? `<div>
           <p class="nav-panel__heading">Featured</p>
           <a href="${item.href}" class="btn-outline inline-block px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase">Browse ${item.label}</a>
         </div>`
      : '';
    return `
      <div class="nav-panel" id="${id}" data-open="false">
        <div class="shell nav-panel__grid">
          ${columnsHTML(item.columns)}
          ${featured}
        </div>
      </div>`;
  }).join('');

  const drawerItems = NAV.map(
    (item) => `
      <details>
        <summary>
          <a href="${item.href}">${item.label}</a>
          ${ICONS.chevron}
        </summary>
        <ul class="nav-panel__list">
          ${item.columns
            .flatMap((c) => c.links)
            .map(([t, h]) => `<li><a href="${h}">${t}</a></li>`)
            .join('')}
        </ul>
      </details>`
  ).join('');

  return `
    <nav class="site-nav" aria-label="Main">
      <div class="shell site-nav__bar">
        <button type="button" class="nav-icon-btn nav-toggle" aria-expanded="false" aria-controls="nav-drawer" aria-label="Open menu" data-nav-drawer-toggle>
          ${ICONS.menu}
        </button>

        <a href="/index.html" class="site-nav__logo">${BRAND.short}</a>

        <ul class="site-nav__links">${desktopItems}</ul>

        <ul class="site-nav__utils">
          <li><button type="button" class="nav-icon-btn" aria-label="Search">${ICONS.search}</button></li>
          <li><a href="/cart.html" class="nav-icon-btn" aria-label="Account">${ICONS.account}</a></li>
          <li class="relative"><a href="/cart.html" class="nav-icon-btn" aria-label="Cart, 0 items">${ICONS.cart}<span class="nav-cart-count">0</span></a></li>
        </ul>
      </div>

      ${panels}

      <div class="nav-drawer" id="nav-drawer" data-open="false">
        <div class="shell py-2">${drawerItems}</div>
      </div>
    </nav>`;
}

function footerHTML() {
  const cols = FOOTER.map(
    (c) => `
      <div>
        <p class="site-footer__heading">${c.heading}</p>
        <ul class="site-footer__list">
          ${c.links.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}
        </ul>
      </div>`
  ).join('');

  const socials = SOCIAL.map(
    ([t, h]) => `<li><a href="${h}" rel="noopener noreferrer">${t}</a></li>`
  ).join('');

  return `
    <footer class="site-footer">
      <div class="shell py-16">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
            <p class="font-logo text-3xl mb-4">${BRAND.short}</p>
            <p class="site-footer__tagline">${BRAND.tagline}</p>
            <form class="site-footer__newsletter" onsubmit="return false">
              <p class="site-footer__heading">Sign up to receive exclusive offers and discounts</p>
              <div class="site-footer__form-row">
                <input type="email" placeholder="Email" aria-label="Enter your email address" required>
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
          ${cols}
          <div>
            <p class="site-footer__heading">Follow Us</p>
            <ul class="site-footer__list">
              ${socials}
            </ul>
          </div>
        </div>
        <div class="site-footer__bottom">
          <p>&copy; ${new Date().getFullYear()} ${BRAND.name}</p>
          <ul class="site-footer__bottom-links">
            <li><a href="/story.html">About</a></li>
            <li><a href="/locations.html">Visit</a></li>
            <li><a href="/cart.html">Cart</a></li>
          </ul>
          <ul class="site-footer__social-bottom">
            ${socials}
          </ul>
        </div>
      </div>
    </footer>`;
}

function wireNav(root) {
  const panels = [...root.querySelectorAll('.nav-panel')];
  const triggers = [...root.querySelectorAll('[data-nav-trigger]')];
  const navItems = [...root.querySelectorAll('.nav-item')];

  const closeAll = () => {
    panels.forEach((p) => p.setAttribute('data-open', 'false'));
    triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
  };

  const open = (trigger) => {
    const id = trigger.dataset.navTrigger;
    closeAll();
    root.querySelector(`#${id}`)?.setAttribute('data-open', 'true');
    trigger.setAttribute('aria-expanded', 'true');
  };

  // Tracks whether the currently open panel was opened by hover rather than by
  // an explicit click, so the click that follows a hover doesn't collapse it.
  let openedByHover = false;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen && openedByHover) {
        openedByHover = false;
        return;
      }
      isOpen ? closeAll() : open(trigger);
      openedByHover = false;
    });
  });

  // Hover on the entire nav item (label + chevron) opens the panel
  navItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      const trigger = item.querySelector('[data-nav-trigger]');
      if (trigger) {
        open(trigger);
        openedByHover = true;
      }
    });
  });

  const nav = root.querySelector('.site-nav');
  nav?.addEventListener('mouseleave', closeAll);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  document.addEventListener('click', (e) => {
    if (!nav?.contains(e.target)) closeAll();
  });

  const drawerToggle = root.querySelector('[data-nav-drawer-toggle]');
  const drawer = root.querySelector('#nav-drawer');
  drawerToggle?.addEventListener('click', () => {
    const isOpen = drawer.getAttribute('data-open') === 'true';
    drawer.setAttribute('data-open', String(!isOpen));
    drawerToggle.setAttribute('aria-expanded', String(!isOpen));
    drawerToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });

  // Mark the current page in the nav. Only the primary nav labels are
  // checked so only one link is announced as current.
  const path = window.location.pathname.replace(/\/$/, '/index.html');
  root.querySelectorAll('.nav-link__label').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path) a.setAttribute('aria-current', 'page');
  });
}

export function mountLayout() {
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  if (header) {
    header.innerHTML = headerHTML();
    wireNav(header);
  }
  if (footer) footer.innerHTML = footerHTML();
}

mountLayout();
