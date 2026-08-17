/**
 * Single source of truth for the product range.
 *
 * `tint` maps to a .ph--* placeholder class in styles.css. When real
 * photography arrives, add an `image` field and the renderers below will use it
 * in place of the placeholder without any layout change.
 */

import { IMAGES } from './image-manifest.js';

export const FLAVORS = [
  {
    id: 'brown-butter-pecan',
    name: 'Brown Butter Pecan',
    tint: 'rose',
    price: 9.5,
    tags: ['pints'],
    blurb:
      'Butter cooked until it smells like toffee, folded through a slow-churned base with pecans we toast the same morning.',
  },
  {
    id: 'meyer-lemon-cream',
    name: 'Meyer Lemon Cream',
    tint: 'citrus',
    price: 9.5,
    tags: ['pints', 'seasonal'],
    blurb:
      'Bright and just tart enough. We zest the fruit straight into the cream so the oils carry through to the last spoonful.',
  },
  {
    id: 'wild-blueberry-ripple',
    name: 'Wild Blueberry Ripple',
    tint: 'sky',
    price: 9.5,
    tags: ['pints', 'seasonal'],
    blurb:
      'Small late-summer berries cooked down to a loose jam and rippled in by hand, so no two pints ripple quite alike.',
  },
  {
    id: 'toasted-almond-fudge',
    name: 'Toasted Almond Fudge',
    tint: 'cocoa',
    price: 9.5,
    tags: ['pints'],
    blurb:
      'A dark fudge ribbon that stays soft at freezer temperature, running through almond cream with a faint marzipan warmth.',
  },
  {
    id: 'vanilla-bean',
    name: 'Vanilla Bean',
    tint: 'vanilla',
    price: 8.75,
    tags: ['pints'],
    blurb:
      'The one we judge every batch against. Whole pods steeped overnight, seeds left in, nothing else competing for attention.',
  },
  {
    id: 'mint-cacao',
    name: 'Mint Cacao',
    tint: 'mint',
    price: 9.5,
    tags: ['pints'],
    blurb:
      'Steeped fresh mint leaves rather than extract, which is why it reads green-herbal instead of toothpaste-sweet.',
  },
  {
    id: 'salted-malt',
    name: 'Salted Malt',
    tint: 'malt',
    price: 9.5,
    tags: ['pints'],
    blurb:
      'Malted barley and flaked sea salt over a caramel base. Tastes like the last inch of a very good milkshake.',
  },
  {
    id: 'strawberry-rhubarb',
    name: 'Strawberry Rhubarb',
    tint: 'berry',
    price: 9.5,
    tags: ['pints', 'seasonal'],
    blurb:
      'Roasted together until the rhubarb collapses, which concentrates the fruit and keeps the acidity from flattening out.',
  },
  {
    id: 'pistachio-praline',
    name: 'Pistachio Praline',
    tint: 'pistachio',
    price: 10.5,
    tags: ['pints'],
    blurb:
      'Ground pistachio paste for the base, caramelised shards stirred in at the end for something to bite against.',
  },
  {
    id: 'dark-cocoa-sorbet',
    name: 'Dark Cocoa Sorbet',
    tint: 'cocoa',
    price: 9.0,
    tags: ['dairy-free', 'sorbets'],
    blurb:
      'No dairy at all, and it does not need any. Dutch cocoa and water, churned dense enough to pass for gelato.',
  },
  {
    id: 'coconut-lime-sorbet',
    name: 'Coconut Lime Sorbet',
    tint: 'mint',
    price: 9.0,
    tags: ['dairy-free', 'sorbets'],
    blurb:
      'Pressed coconut with lime juice and a little zest, finished with salt to keep the sweetness in check.',
  },
  {
    id: 'oat-espresso',
    name: 'Oat Espresso Chip',
    tint: 'cocoa',
    price: 9.75,
    tags: ['dairy-free', 'pints'],
    blurb:
      'An oat base takes coffee unusually well. Fresh-pulled espresso, plus chocolate broken into uneven shards.',
  },
  {
    id: 'vanilla-bar',
    name: 'Vanilla Bar, Dark Shell',
    tint: 'vanilla',
    price: 4.5,
    tags: ['bars'],
    blurb: 'Vanilla bean on a stick, dipped twice so the shell cracks properly.',
  },
  {
    id: 'coffee-bar',
    name: 'Coffee Bar, Salted Shell',
    tint: 'malt',
    price: 4.5,
    tags: ['bars'],
    blurb: 'Espresso ice cream, milk chocolate shell, salt across the top.',
  },
  {
    id: 'cocoa-sandwich',
    name: 'Cocoa Sandwich',
    tint: 'cocoa',
    price: 5.0,
    tags: ['sandwiches'],
    blurb: 'Vanilla pressed between two soft cocoa wafers baked to stay chewy when frozen.',
  },
  {
    id: 'oat-cookie-sandwich',
    name: 'Oat Cookie Sandwich',
    tint: 'malt',
    price: 5.0,
    tags: ['sandwiches'],
    blurb: 'Brown sugar oat cookies around salted malt, rolled in cocoa nibs.',
  },
];

export const MERCH = [
  {
    id: 'adult-t-shirt',
    name: 'Adult T-Shirt',
    price: 28.0,
    image: '/assets/vl/merch/Adult-Shirt_FRONT.webp',
    desc: 'Soft cotton tee with the Bellwether logo screen-printed on the front.',
  },
  {
    id: 'crewneck',
    name: 'Crewneck Sweatshirt',
    price: 48.0,
    image: '/assets/vl/merch/Crewneck_FRONT.webp',
    desc: 'Midweight fleece crewneck, garment-dyed in small batches to match the season.',
  },
  {
    id: 'youth-t-shirt',
    name: 'Youth T-Shirt',
    price: 22.0,
    image: '/assets/vl/merch/Youth-Shirt_FRONT-1.webp',
    desc: 'Same print as the adult tee, sized down. Kids eat ice cream faster than they outgrow shirts.',
  },
  {
    id: 'toddler-t-shirt',
    name: 'Toddler T-Shirt',
    price: 18.0,
    image: '/assets/vl/merch/Toddler-Shirt_FRONT.webp',
    desc: 'For the smallest scoopers. Printed on a soft, tagless toddler tee.',
  },
  {
    id: 'black-hat',
    name: 'Black Cap',
    price: 26.0,
    image: '/assets/vl/merch/VL_Black-Hat_Front.webp',
    desc: 'Six-panel cap with an embroidered logo. Adjustable strap, one size fits most.',
  },
  {
    id: 'white-hat',
    name: 'White Cap',
    price: 26.0,
    image: '/assets/vl/merch/VL_White-Hat_Front.webp',
    desc: 'Same cap in natural cotton. Goes with everything, shows sprinkles.',
  },
  {
    id: 'tote',
    name: 'Canvas Tote',
    price: 18.0,
    image: '/assets/vl/merch/TOTE_Web-01.webp',
    desc: 'Heavyweight canvas tote, big enough for a few pints and a bag of cones.',
  },
  {
    id: 'cookbook',
    name: 'The Cookbook',
    price: 32.0,
    image: '/assets/vl/merch/VL-Cookbook.webp',
    desc: 'Our base recipes, the ones we actually use, plus what went wrong along the way.',
  },
];

export const PARTY_PACKS = [
  {
    id: 'fan-fav-pack',
    name: 'Fan Favorites Pack',
    price: 52.0,
    image: '/assets/vl/party-packs/Fan-Fav_Party-Pack.webp',
    desc: 'Six pints of the most-ordered flavors, packed in dry ice for the drive home.',
  },
  {
    id: 'neapolitan-pack',
    name: 'Neapolitan Pack',
    price: 48.0,
    image: '/assets/vl/party-packs/Neapolitan_Party-Pack-1.webp',
    desc: 'Vanilla, chocolate and strawberry — the three that started it all, in one box.',
  },
  {
    id: 'mini-vegan-pack',
    name: 'Mini Vegan Pack',
    price: 42.0,
    image: '/assets/vl/party-packs/Mini-Vegan_Party-Pack-1.webp',
    desc: 'Four dairy-free minis for the plant-based crowd. Separate line, separate box.',
  },
  {
    id: 'root-beer-float-pack',
    name: 'Root Beer Float Pack',
    price: 46.0,
    image: '/assets/vl/party-packs/Root-Beer-Float_Party-Pack-1.webp',
    desc: 'Vanilla pints and house-made root beer syrup, enough for eight floats.',
  },
  {
    id: 'sunade-pack',
    name: 'Make-It-A-Sunade Pack',
    price: 44.0,
    image: '/assets/vl/party-packs/Make-It-a-Sunade_Party-Pack-1.webp',
    desc: 'Lemon and fruit tea bases with vanilla pints. Mix, scoop, drink.',
  },
];

export const NOW_SCOOPING = [
  {
    id: 'pb-brownie-chip',
    name: 'Classic PB Brownie Chip',
    tag: 'Now Scooping',
    image: '/assets/vl/seasonal/NOW-SCOOPING_Classic-PB-Brownie-Chip.webp',
    desc: 'Peanut butter base with brownie chunks and dark chocolate chips folded through.',
  },
  {
    id: 'japanese-yam',
    name: 'Japanese Yam',
    tag: 'Now Scooping',
    image: '/assets/vl/seasonal/NOW-SCOOPING_Japanese-Yam.webp',
    desc: 'Roasted Japanese yam pureed into the base. Earthy, sweet, and unexpectedly purple.',
  },
  {
    id: 'vegan-strawberry-oat',
    name: 'Vegan Strawberry Oat',
    tag: 'Now Scooping',
    image: '/assets/vl/seasonal/NOW-SCOOPING_Vegan-Strawberry-Oat.webp',
    desc: 'Oat base with roasted strawberries. Dairy-free, but you would not know it.',
  },
  {
    id: 'mango-sticky-rice',
    name: 'Mango Sticky Rice',
    tag: 'Limited',
    image: '/assets/vl/seasonal/Mango-Sticky-Rice_Overscooped.webp',
    desc: 'Coconut cream base with sweet mango and chewy sticky rice folded in by hand.',
  },
  {
    id: 'strawberry-matcha',
    name: 'Strawberry Matcha Latte',
    tag: 'Limited',
    image: '/assets/vl/seasonal/Strawberry-Matcha-Latte_Overscooped.webp',
    desc: 'Stone-ground matcha rippled with strawberry jam. Two scoops, no coffee required.',
  },
  {
    id: 'mini-choc-sundae',
    name: 'Mini Chocolate Lovers Sundae',
    tag: 'New',
    image: '/assets/vl/seasonal/Mini-Chocolate-Lovers-Sundae-1.webp',
    desc: 'Triple chocolate base with fudge and cocoa nibs. For the person who orders chocolate twice.',
  },
];

// Attach generated image paths (from src/image-manifest.js) onto each record so
// the renderers below pick up real photography in place of the CSS placeholder.
// Flavors absent from IMAGES keep `image` undefined and fall back to the tint.
FLAVORS.forEach((f) => {
  if (IMAGES[f.id]) f.image = IMAGES[f.id];
});

export const money = (n) => `$${n.toFixed(2)}`;

export const byTag = (tag) => FLAVORS.filter((f) => f.tags.includes(tag));

/** Stacked-scoop silhouette used inside every placeholder. */
export const SCOOP_SVG = `
  <svg viewBox="0 0 100 128" fill="none" aria-hidden="true">
    <path d="M32 62 L68 62 L54 118 a4 4 0 0 1 -8 0 Z" fill="currentColor" opacity="0.55"/>
    <circle cx="50" cy="54" r="21" fill="currentColor" opacity="0.75"/>
    <circle cx="36" cy="36" r="17" fill="currentColor" opacity="0.6"/>
    <circle cx="63" cy="34" r="15" fill="currentColor" opacity="0.65"/>
    <circle cx="50" cy="20" r="14" fill="currentColor" opacity="0.5"/>
  </svg>`;

/**
 * Renders a media box for a product. Falls back to the CSS placeholder until an
 * `image` is present on the record.
 */
export function mediaHTML(flavor, shapeClass = 'ph--tile') {
  if (flavor.image) {
    return `<img src="${flavor.image}" alt="${flavor.name}" width="800" height="800"
                 loading="lazy" decoding="async"
                 class="w-full h-full object-cover">`;
  }
  return `<div class="ph ${shapeClass} ph--${flavor.tint}" role="img" aria-label="${flavor.name}">
            <span class="ph__scoop">${SCOOP_SVG}</span>
          </div>`;
}

/** Product card used on the home and flavors pages. */
export function cardHTML(flavor) {
  return `
    <article class="product">
      <div class="product__media">${mediaHTML(flavor, '')}</div>
      <div class="product__body">
        <h3 class="product__name">${flavor.name}</h3>
        <p class="text-sm text-pretty" style="color:var(--color-muted)">${flavor.blurb}</p>
        <p class="product__price">${money(flavor.price)}</p>
        <button type="button" class="btn-outline mt-1 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase"
                data-add-to-cart="${flavor.id}">
          Add To Cart
        </button>
      </div>
    </article>`;
}

/** Ranked product card for the "Start Here" carousel — adds display numerals
 *  and a featured first card. Only used inside carousel tracks. */
export function rankedCardHTML(flavor, index) {
  const rank = String(index + 1).padStart(2, '0');
  const isFeatured = index === 0;
  return `
    <article class="product${isFeatured ? ' product--featured' : ''}">
      ${isFeatured ? '<span class="product__badge">Most Ordered</span>' : ''}
      <span class="product__rank" aria-hidden="true">${rank}</span>
      <div class="product__media">${mediaHTML(flavor, '')}</div>
      <div class="product__body">
        <h3 class="product__name">${flavor.name}</h3>
        <p class="text-sm text-pretty" style="color:var(--color-muted)">${flavor.blurb}</p>
        <div class="product__foot">
          <p class="product__price">${money(flavor.price)}</p>
          <button type="button" class="btn-outline px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase"
                  data-add-to-cart="${flavor.id}">
            Add
          </button>
        </div>
      </div>
    </article>`;
}

const MERCH_CATEGORIES = {
  'adult-t-shirt': 'Apparel',
  'crewneck': 'Apparel',
  'youth-t-shirt': 'Apparel',
  'toddler-t-shirt': 'Apparel',
  'black-hat': 'Headwear',
  'white-hat': 'Headwear',
  'tote': 'Accessories',
  'cookbook': 'Print',
};

/** Merch card for apparel and accessories. */
export function merchCardHTML(item) {
  const category = MERCH_CATEGORIES[item.id] || 'Accessories';
  return `
    <article class="merch-card">
      <div class="merch-card__media">
        <span class="merch-card__category">${category}</span>
        <img src="${item.image}" alt="${item.name}" width="600" height="750" loading="lazy" decoding="async">
      </div>
      <div class="merch-card__body">
        <h3 class="merch-card__name">${item.name}</h3>
        <p class="merch-card__desc text-pretty">${item.desc}</p>
        <div class="merch-card__foot">
          <p class="merch-card__price">${money(item.price)}</p>
          <button type="button" class="btn-outline px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase"
                  data-add-to-cart="${item.id}">
            Add
          </button>
        </div>
      </div>
    </article>`;
}

const PACK_SERVES = {
  'fan-fav-pack': 'Serves 8–12',
  'neapolitan-pack': 'Serves 6–8',
  'mini-vegan-pack': 'Serves 4–6',
  'root-beer-float-pack': 'Serves 8',
  'sunade-pack': 'Serves 6–8',
};

/** Party pack card. */
export function packCardHTML(item) {
  const serves = PACK_SERVES[item.id] || 'Serves 8';
  const freeShip = item.price >= 45;
  return `
    <article class="pack-card">
      <div class="pack-card__media">
        <img src="${item.image}" alt="${item.name}" width="600" height="600" loading="lazy" decoding="async">
        ${freeShip ? '<span class="pack-card__ship">Ships Free</span>' : ''}
      </div>
      <div class="pack-card__body">
        <div class="pack-card__head">
          <h3 class="pack-card__name">${item.name}</h3>
          <span class="pack-card__serves">${serves}</span>
        </div>
        <p class="pack-card__desc text-pretty">${item.desc}</p>
        <div class="pack-card__foot">
          <span class="pack-card__price-from">from</span>
          <p class="pack-card__price">${money(item.price)}</p>
          <button type="button" class="btn-outline px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase"
                  data-add-to-cart="${item.id}">
            Add
          </button>
        </div>
      </div>
    </article>`;
}

const SCOOP_TAG_COLORS = {
  'Now Scooping': 'chocolate',
  'Limited': 'berry',
  'New': 'coral',
};

/** Now Scooping card for limited batch flavors. */
export function scoopCardHTML(item) {
  const tagColor = SCOOP_TAG_COLORS[item.tag] || 'chocolate';
  return `
    <article class="scoop-card scoop-card--${tagColor}">
      <div class="scoop-card__accent"></div>
      <div class="scoop-card__media">
        <span class="scoop-card__tag scoop-card__tag--${tagColor}">${item.tag}</span>
        <img src="${item.image}" alt="${item.name}" width="600" height="600" loading="lazy" decoding="async">
      </div>
      <div class="scoop-card__body">
        <h3 class="scoop-card__name">${item.name}</h3>
        <p class="scoop-card__desc text-pretty">${item.desc}</p>
        <p class="scoop-card__micro">While it lasts</p>
      </div>
    </article>`;
}

/** Mounts every [data-flavor-grid="<tag>"] on the page. */
export function mountGrids() {
  document.querySelectorAll('[data-flavor-grid]').forEach((el) => {
    const tag = el.dataset.flavorGrid;
    const items = tag === 'all' ? FLAVORS : byTag(tag);
    const isCarousel = el.closest('[data-carousel]');
    el.innerHTML = items.map((item, i) => isCarousel ? rankedCardHTML(item, i) : cardHTML(item)).join('');
  });
  document.querySelectorAll('[data-merch-grid]').forEach((el) => {
    el.innerHTML = MERCH.map(merchCardHTML).join('');
  });
  document.querySelectorAll('[data-pack-grid]').forEach((el) => {
    el.innerHTML = PARTY_PACKS.map(packCardHTML).join('');
  });
  document.querySelectorAll('[data-scoop-grid]').forEach((el) => {
    const limit = Number(el.dataset.limit) || Infinity;
    el.innerHTML = NOW_SCOOPING.slice(0, limit).map(scoopCardHTML).join('');
  });
}
