import { FLAVORS, SCOOP_SVG } from './catalog.js'

/**
 * Hero backdrops use bold, saturated flavor tints for an aggressive,
 * eye-catching slider. Text color switches between chocolate and cream
 * per tint to maintain AA contrast on every slide.
 */
const HERO_BG = {
  berry: '#D62828',
  rose: '#E8497B',
  vanilla: '#F5B800',
  sky: '#3B7DD8',
  mint: '#1FB98A',
  citrus: '#FF9E1B',
  pistachio: '#8FC93A',
  malt: '#D9A441',
  cocoa: '#8B5E3C',
}

// Text color per tint — dark backgrounds get cream, light ones stay chocolate
const HERO_TEXT = {
  berry: '#FFF8F0',
  rose: '#FFF8F0',
  vanilla: '#2C1810',
  sky: '#FFF8F0',
  mint: '#FFF8F0',
  citrus: '#2C1810',
  pistachio: '#2C1810',
  malt: '#2C1810',
  cocoa: '#FFF8F0',
}

// The four pints we lead with, in the order they appear. Each is paired with
// a hero-specific photograph (a hand-shot ice cream bucket) that overrides the
// catalog image so the hero gets its own art direction without leaking onto the
// flavors page.
const HERO_IMAGES = {
  'brown-butter-pecan': '/assets/hero/brown-butter-pecan.webp',
  'meyer-lemon-cream': '/assets/hero/meyer-lemon-cream.webp',
  'wild-blueberry-ripple': '/assets/hero/wild-blueberry-ripple.webp',
  'strawberry-rhubarb': '/assets/hero/strawberry-rhubarb.webp',
}

const FEATURED = [
  'brown-butter-pecan',
  'meyer-lemon-cream',
  'wild-blueberry-ripple',
  'strawberry-rhubarb',
]

const slides = FEATURED.map((id) => {
  const f = FLAVORS.find((x) => x.id === id)
  return {
    id: f.id,
    name: f.name,
    bg: HERO_BG[f.tint],
    text: HERO_TEXT[f.tint] || '#2C1810',
    tint: f.tint,
    image: HERO_IMAGES[id] || f.image || null,
    alt: `${f.name} — a pint of slow-churned ice cream.`,
    desc: f.blurb,
  }
})

function classForPosition(i, active) {
  const n = slides.length
  if (i === active) return 'slide--active'
  if (i === (active + 1) % n) return 'slide--next'
  if (i === (active + 2) % n) return 'slide--next2'
  if (i === (active - 1 + n) % n) return 'slide--prev'
  return 'slide--hidden'
}

const hero = document.getElementById('hero')
const bg = document.getElementById('hero-bg')
const stage = document.getElementById('stage')
const dots = document.getElementById('dots')
const live = document.getElementById('live')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const copy = {
  eyebrow: document.getElementById('hero-eyebrow'),
  desc: document.getElementById('hero-desc'),
}

let state = {
  index: 0,
  autoplay: true,
  timer: null,
  reducedMotion: false,
  inViewport: true,
  hovered: false,
  touched: false,
  touchStart: 0,
  touchEnd: 0,
}

function init() {
  state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (state.reducedMotion) hero.classList.add('hero--reduced')

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    state.reducedMotion = e.matches
    hero.classList.toggle('hero--reduced', e.matches)
    update(state.index, { silent: true })
  })

  renderStage()
  renderDots()
  update(0, { silent: true })
  bindEvents()
  startAutoplay()

  const observer = new IntersectionObserver(
    ([entry]) => {
      state.inViewport = entry.isIntersecting
      if (state.inViewport && state.autoplay && !state.hovered && !state.touched) startAutoplay()
      else stopAutoplay()
    },
    { threshold: 0.2 }
  )
  observer.observe(hero)
}

function renderStage() {
  stage.innerHTML = slides
    .map((s, i) => {
      const initialClass = classForPosition(i, 0)
      const isActive = i === 0
      const priority = isActive ? 'fetchpriority="high"' : 'loading="lazy"'

      // Real photography when available, art-directed placeholder until then.
      const media = s.image
        ? `<img src="${s.image}" width="500" height="750" alt="${s.alt}" decoding="async" ${priority} />`
        : `<div class="ph ph--${s.tint}" style="aspect-ratio:5/7;border-radius:1.75rem" role="img" aria-label="${s.alt}">
             <span class="ph__scoop">${SCOOP_SVG}</span>
           </div>`

      return `
      <div class="slide ${initialClass}" data-index="${i}" role="listitem" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}" data-active="${isActive}">
        ${media}
      </div>`
    })
    .join('')
}

function renderDots() {
  dots.innerHTML = slides
    .map(
      (_, i) =>
        `<button role="tab" aria-selected="${i === 0}" aria-label="Go to slide ${i + 1}" data-index="${i}" class="${i === 0 ? '' : ''}"></button>`
    )
    .join('')
}

function update(index, { silent = false } = {}) {
  state.index = index
  const s = slides[index]

  // CSS variables for background and text color
  document.documentElement.style.setProperty('--hero-bg', s.bg)
  document.documentElement.style.setProperty('--hero-text', s.text)

  // Slide classes
  const slideEls = stage.querySelectorAll('.slide')
  slideEls.forEach((el, i) => {
    const positionClass = classForPosition(i, index)
    el.className = `slide ${positionClass}`
    el.setAttribute('data-active', i === index)
  })

  // Copy
  copy.eyebrow.textContent = s.name
  copy.desc.textContent = s.desc

  // Dots
  dots.querySelectorAll('button').forEach((btn, i) => {
    btn.setAttribute('aria-selected', i === index)
  })

  // Live region
  if (!silent) {
    live.textContent = `Showing ${s.name}, ${index + 1} of ${slides.length}`
  }

  // Preload next image
  // Preload next image (same bucket, already cached after first load)
}

function goTo(index, { silent = false } = {}) {
  const n = slides.length
  const nextIndex = ((index % n) + n) % n
  stopAutoplay()
  update(nextIndex, { silent })
  if (state.autoplay && state.inViewport && !state.hovered && !state.touched && !state.reducedMotion) {
    startAutoplay()
  }
}

function next() {
  goTo(state.index + 1)
}

function prev() {
  goTo(state.index - 1)
}

function startAutoplay() {
  if (state.reducedMotion) return
  stopAutoplay()
  state.timer = setInterval(() => {
    if (!state.hovered && !state.touched && state.inViewport) {
      next()
    }
  }, 3000)
}

function stopAutoplay() {
  if (state.timer) {
    clearInterval(state.timer)
    state.timer = null
  }
}

function bindEvents() {
  prevBtn?.addEventListener('click', prev)
  nextBtn?.addEventListener('click', next)

  dots.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if (!btn) return
    goTo(Number(btn.dataset.index))
  })

  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  })

  hero.addEventListener('mouseenter', () => { state.hovered = true; stopAutoplay() })
  hero.addEventListener('mouseleave', () => {
    state.hovered = false
    if (state.autoplay && !state.touched && !state.reducedMotion) startAutoplay()
  })

  hero.addEventListener('focusin', () => { state.hovered = true; stopAutoplay() })
  hero.addEventListener('focusout', () => {
    state.hovered = false
    if (state.autoplay && !state.touched && !state.reducedMotion) startAutoplay()
  })

  // Touch / swipe
  hero.addEventListener('touchstart', (e) => {
    state.touched = true
    state.touchStart = e.touches[0].clientX
    stopAutoplay()
  }, { passive: true })

  hero.addEventListener('touchmove', (e) => {
    state.touchEnd = e.touches[0].clientX
  }, { passive: true })

  hero.addEventListener('touchend', () => {
    const distance = state.touchStart - (state.touchEnd || state.touchStart)
    const threshold = 40
    state.touched = false
    if (distance > threshold) next()
    else if (distance < -threshold) prev()
    else if (state.autoplay && !state.hovered && !state.reducedMotion) startAutoplay()
  })

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay()
    else if (state.autoplay && state.inViewport && !state.hovered && !state.touched && !state.reducedMotion) startAutoplay()
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

// Exposed for testing / QA screenshots
window.heroSlider = { goTo, stop: stopAutoplay, start: startAutoplay }
