/**
 * Premium scroll-reveal system — IntersectionObserver-based, GPU-only.
 * Replaces the page-load-only [data-reveal] animation with scroll-triggered
 * reveals that fire as elements enter the viewport. Zero dependencies.
 *
 * Usage:
 *   data-scroll           — reveal this element when it enters viewport
 *   data-scroll="fade"    — fade up (default)
 *   data-scroll="rise"    — rise from below (larger distance)
 *   data-scroll="scale"   — scale up from 0.96
 *   data-scroll="left"    — slide in from left
 *   data-scroll="right"   — slide in from right
 *   data-scroll-stagger   — on a parent, staggers children by --reveal-index
 *
 * The stagger is automatic: children of [data-scroll-stagger] get
 * incrementing --reveal-index so CSS can delay each one.
 */

const STAGGER_SELECTOR = '[data-scroll-stagger]';

function assignStaggerIndices(root = document) {
  root.querySelectorAll(STAGGER_SELECTOR).forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      child.style.setProperty('--reveal-index', String(i));
    });
  });
}

function initScrollReveal(root = document) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = root.querySelectorAll('[data-scroll]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.removeAttribute('data-scroll'));
    return;
  }

  assignStaggerIndices(root);

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.setAttribute('data-scroll-in', '');
        obs.unobserve(el);
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.08,
    }
  );

  elements.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initScrollReveal());
} else {
  initScrollReveal();
}
