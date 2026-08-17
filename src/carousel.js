/**
 * Carousel — horizontal scroll-snap track with arrow controls, drag-to-scroll,
 * and progress bar. Inspired by vanleeuwenicecream.com product carousels.
 *
 * Usage: add [data-carousel] to a container with:
 *   - [data-carousel-track] as the scrollable track (with carousel__track class)
 *   - [data-carousel-prev] and [data-carousel-next] as arrow buttons
 *   - Optional [data-carousel-progress] as the progress bar fill element
 */

const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
const ARROW_SVG_RIGHT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

function getScrollAmount(track) {
  const firstItem = track.querySelector(":scope > *");
  if (!firstItem) return 300;
  const style = getComputedStyle(track);
  const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
  return firstItem.offsetWidth + gap;
}

function updateButtons(carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  if (!track || !prev || !next) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  prev.disabled = track.scrollLeft <= 2;
  next.disabled = track.scrollLeft >= maxScroll - 2;
}

function updateProgress(carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const bar = carousel.querySelector("[data-carousel-progress]");
  if (!track || !bar) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  if (maxScroll <= 0) {
    bar.style.width = "100%";
    return;
  }
  const pct = (track.scrollLeft / maxScroll) * 100;
  const visiblePct = (track.clientWidth / track.scrollWidth) * 100;
  bar.style.width = `${Math.max(visiblePct, 10)}%`;
  bar.style.transform = `translateX(${(pct / 100) * (100 - visiblePct)}%)`;
}

function scrollBy(track, dir) {
  const amount = getScrollAmount(track);
  track.scrollBy({ left: dir * amount, behavior: "smooth" });
}

function setupDrag(track) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") return;
    if (track.scrollWidth <= track.clientWidth) return;
    isDown = true;
    moved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    track.scrollLeft = startScroll - dx;
  });

  const endDrag = (e) => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("is-dragging");
    try { track.releasePointerCapture(e.pointerId); } catch {}
    if (moved) {
      track.style.scrollSnapType = "none";
      requestAnimationFrame(() => {
        track.style.scrollSnapType = "";
      });
    }
  };

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("click", (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true });
}

export function initCarousels(root = document) {
  const isMobile = window.matchMedia('(max-width: 1023px)').matches;
  const carousels = root.querySelectorAll("[data-carousel]");
  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");

    if (!track) return;

    // On mobile/tablet, carousels are wrapping grids — no scroll/drag needed.
    if (!isMobile) {
      if (prev) {
        prev.innerHTML = ARROW_SVG;
        prev.addEventListener("click", () => scrollBy(track, -1));
      }
      if (next) {
        next.innerHTML = ARROW_SVG_RIGHT;
        next.addEventListener("click", () => scrollBy(track, 1));
      }

      setupDrag(track);
    }

    const onScroll = () => {
      updateButtons(carousel);
      updateProgress(carousel);
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", onScroll);

    requestAnimationFrame(onScroll);
  });
}
