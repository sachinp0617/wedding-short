import { WEDDING } from "./config.js";

export function initGallery() {
  const container = document.getElementById("gallery-scroll");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!container) return;

  let currentIndex = 0;
  const images = WEDDING.gallery;

  images.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "gallery-item";
    btn.type = "button";
    btn.setAttribute("aria-label", `View photo ${index + 1}: ${item.alt}`);
    btn.innerHTML = `
      <div class="jharokha-frame">
        <svg class="frame-border" viewBox="0 0 200 280" aria-hidden="true">
          <defs>
            <linearGradient id="goldFrame${index}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#d4af37"/>
              <stop offset="50%" stop-color="#b8942e"/>
              <stop offset="100%" stop-color="#8b7020"/>
            </linearGradient>
          </defs>
          <path d="M15 15 L100 5 L185 15 L185 265 L100 275 L15 265 Z" fill="none" stroke="url(#goldFrame${index})" stroke-width="2.5"/>
          <path d="M28 28 L100 20 L172 28 L172 252 L100 260 L28 252 Z" fill="none" stroke="url(#goldFrame${index})" stroke-width="1" opacity="0.5"/>
          <path d="M100 5 L100 275" fill="none" stroke="url(#goldFrame${index})" stroke-width="0.5" opacity="0.3"/>
          <circle cx="100" cy="12" r="5" fill="url(#goldFrame${index})" opacity="0.8"/>
          <path d="M60 15 Q100 8 140 15" fill="none" stroke="url(#goldFrame${index})" stroke-width="1" opacity="0.6"/>
        </svg>
        <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" width="260" height="347">
      </div>
    `;
    btn.addEventListener("click", () => openLightbox(index));
    container.appendChild(btn);
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox?.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox?.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function updateLightboxImage() {
    if (lightboxImg && images[currentIndex]) {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
    }
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  closeBtn?.addEventListener("click", closeLightbox);
  prevBtn?.addEventListener("click", showPrev);
  nextBtn?.addEventListener("click", showNext);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  let touchStartX = 0;
  lightbox?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox?.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showPrev();
      else showNext();
    }
  }, { passive: true });
}
