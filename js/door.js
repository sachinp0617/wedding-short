const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function spawnParticles(container) {
  if (!container || reducedMotion) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    p.style.animationDuration = `${4 + Math.random() * 5}s`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    p.style.setProperty("--size", `${3 + Math.random() * 5}px`);
    container.appendChild(p);
  }
}

export function initDoor(onOpen) {
  const overlay = document.getElementById("door-overlay");
  if (!overlay) return;

  if (reducedMotion) {
    overlay.classList.add("reduced-motion");
  }

  spawnParticles(document.getElementById("gatefold-particles"));

  let opened = false;

  function open() {
    if (opened) return;
    opened = true;

    overlay.classList.add("is-opening");

    if (reducedMotion) {
      overlay.classList.add("is-open");
      document.body.classList.remove("is-locked");
      document.body.style.overflow = "";
      onOpen?.();
      return;
    }

    // Phase 1: seal pulse + panels start parting
    requestAnimationFrame(() => {
      overlay.classList.add("is-parting");
    });

    setTimeout(() => {
      overlay.classList.add("is-open");
      document.body.classList.remove("is-locked");
      document.body.style.overflow = "";
      document.body.classList.add("invite-revealed");
      onOpen?.();
    }, 1600);
  }

  const seal = document.getElementById("gatefold-seal");
  seal?.addEventListener("click", (e) => {
    e.stopPropagation();
    open();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.closest(".door-enter-btn")) return;
    open();
  });

  overlay.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  const enterBtn = overlay.querySelector(".door-enter-btn");
  enterBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    open();
  });

  window.addEventListener(
    "wheel",
    () => {
      if (!opened) open();
    },
    { passive: true, once: true }
  );

  window.addEventListener(
    "touchmove",
    () => {
      if (!opened) open();
    },
    { passive: true, once: true }
  );

  document.body.style.overflow = "hidden";
}
