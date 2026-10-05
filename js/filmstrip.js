import { WEDDING } from "./config.js";

function renderFrame(frame) {
  const el = document.createElement("article");
  el.className = "story-frame";
  el.innerHTML = `
    <p class="frame-num">${frame.num}</p>
    <div class="frame-img">
      <img
        src="${frame.img}"
        alt="${frame.title}"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="frame-body">
      <p class="frame-year">${frame.year}</p>
      <h3 class="frame-title">${frame.title}</h3>
      <p class="frame-text">${frame.text}</p>
    </div>
  `;
  return el;
}

function renderFilmHoles(container, count = 26) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const hole = document.createElement("span");
    hole.className = "film-hole";
    container.appendChild(hole);
  }
}

function nudgeHint(viewport) {
  if (!viewport) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  if (max < 24) return;

  const peek = Math.min(88, Math.round(max * 0.18));
  const start = viewport.scrollLeft;
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    viewport.style.scrollSnapType = "";
    viewport.removeEventListener("pointerdown", cancel);
    viewport.removeEventListener("wheel", cancel);
    viewport.removeEventListener("touchstart", cancel);
  };
  viewport.addEventListener("pointerdown", cancel, { once: true });
  viewport.addEventListener("wheel", cancel, { once: true, passive: true });
  viewport.addEventListener("touchstart", cancel, { once: true, passive: true });

  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const animateTo = (from, to, duration, onDone) => {
    const t0 = performance.now();
    const step = (now) => {
      if (cancelled) return;
      const p = Math.min(1, (now - t0) / duration);
      viewport.scrollLeft = from + (to - from) * ease(p);
      if (p < 1) requestAnimationFrame(step);
      else if (onDone) onDone();
    };
    requestAnimationFrame(step);
  };

  // Nudge animation
  window.setTimeout(() => {
    if (cancelled) return;
    viewport.style.scrollSnapType = "none";
    animateTo(start, start + peek, 700, () => {
      if (cancelled) return;
      window.setTimeout(() => {
        if (cancelled) return;
        animateTo(viewport.scrollLeft, start, 650, () => {
          if (!cancelled) viewport.style.scrollSnapType = "";
        });
      }, 280);
    });
  }, 420);
}

export function initFilmstrip() {
  const section = document.getElementById("story");
  const track = document.getElementById("filmstrip-track");
  const topHoles = document.getElementById("film-holes-top");
  const botHoles = document.getElementById("film-holes-bottom");
  if (!section || !track) return;

  if (topHoles) renderFilmHoles(topHoles);
  if (botHoles) renderFilmHoles(botHoles);

  const frames = WEDDING.story || [];
  frames.forEach((f) => track.appendChild(renderFrame(f)));

  // No vertical scroll-scrub — normal section height + horizontal swipe
  section.style.height = "";
  const viewport = track.parentElement;
  if (!viewport) return;

  viewport.classList.add("is-swipeable");
  track.style.transform = "";

  let hinted = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || hinted) return;
      hinted = true;
      nudgeHint(viewport);
      observer.disconnect();
    },
    { threshold: 0.45 }
  );
  observer.observe(section);
}
