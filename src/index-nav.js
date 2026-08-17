/**
 * Scroll-spy for the sticky category index on the Flavors page.
 * Marks the link whose target section is currently in view as current.
 * No-ops on pages without [data-index-link] links.
 */

function init() {
  const links = document.querySelectorAll('[data-index-link]');
  if (!links.length) return;

  const targets = Array.from(links)
    .map((link) => {
      const id = link.dataset.indexLink;
      const el = document.getElementById(id);
      return el ? { id, el, link } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  const setActive = (id) => {
    targets.forEach(({ id: tid, link }) => {
      link.setAttribute('aria-current', tid === id ? 'true' : 'false');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry closest to the top of the viewport that is intersecting.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) {
        const id = visible[0].target.id;
        setActive(id);
      }
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
  );

  targets.forEach(({ el }) => observer.observe(el));
  setActive(targets[0].id);

  // Keyboard navigation for the horizontal scroll track. The links themselves
  // are focusable <a> elements (Tab works); this adds left/right arrow support
  // so a user can move between categories without tabbing through every link.
  // Skip on mobile/tablet — the track wraps and isn't a scroll container there.
  const track = document.querySelector('.index-nav__track');
  if (track && !window.matchMedia('(max-width: 1023px)').matches) {
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'tablist');
    track.addEventListener('keydown', (e) => {
      const focused = document.activeElement;
      const idx = targets.findIndex(({ link }) => link === focused);
      if (idx === -1) return;
      if (e.key === 'ArrowRight' && idx < targets.length - 1) {
        e.preventDefault();
        targets[idx + 1].link.focus();
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        targets[idx - 1].link.focus();
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
