export function initScrollReveal() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = document.querySelectorAll(".reveal");

  if (reducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    document.querySelector(".hero-card")?.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

export function initHeroPetals() {
  const container = document.getElementById("hero-petals");
  if (!container) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < 12; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.animationDuration = `${8 + Math.random() * 10}s`;
    petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 100}px`);
    container.appendChild(petal);
  }
}
