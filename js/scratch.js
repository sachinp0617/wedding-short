import { WEDDING } from "./config.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initScratch() {
  const wrapper = document.getElementById("scratch-wrapper");
  const canvas = document.getElementById("scratch-canvas");
  const revealDate = document.getElementById("scratch-date");
  const revealTime = document.getElementById("scratch-time");

  if (!wrapper || !canvas) return;

  const { muhurtham } = WEDDING;
  if (revealDate) revealDate.textContent = muhurtham.displayDate;
  if (revealTime) revealTime.textContent = muhurtham.displayTime;

  if (reducedMotion) {
    wrapper.classList.add("scratch-revealed");
    return;
  }

  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let scratchedPixels = 0;
  const totalPixels = () => canvas.width * canvas.height;

  function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawOverlay(rect.width, rect.height);
  }

  function drawOverlay(w, h) {
    // Forest-green foil gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0,   "#2d6a4f");
    gradient.addColorStop(0.3, "#40916c");
    gradient.addColorStop(0.5, "#1b4332");
    gradient.addColorStop(0.7, "#40916c");
    gradient.addColorStop(1,   "#0d2b1e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Shimmer dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(116, 198, 157, ${Math.random() * 0.18})`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Label
    ctx.fillStyle = "rgba(212, 255, 230, 0.75)";
    ctx.font = "500 13px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.15em";
    ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches?.[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  function scratch(x, y) {
    const isTouch = "ontouchstart" in window;
    const radius = isTouch ? 24 : 12;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  function checkReveal() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++;
    }
    const percent = transparent / (imageData.data.length / 4);
    if (percent > 0.4) {
      wrapper.classList.add("scratch-revealed");
    }
  }

  function start(e) {
    e.preventDefault();
    isDrawing = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  }

  function move(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
    scratchedPixels++;
    if (scratchedPixels % 20 === 0) checkReveal();
  }

  function end() {
    isDrawing = false;
    checkReveal();
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mouseleave", end);

  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", end);
}
