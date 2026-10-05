import { WEDDING } from "./config.js";

export function initCountdown() {
  const { muhurtham } = WEDDING;
  const target = new Date(`${muhurtham.date}T${muhurtham.time}:00`);

  const daysEl  = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl  = document.getElementById("cd-mins");
  const secsEl  = document.getElementById("cd-secs");
  const todayEl = document.getElementById("cd-today");
  const displayEl = document.getElementById("cd-display");

  function setFlip(el, val) {
    if (!el) return;
    const str = String(val).padStart(el === daysEl ? 3 : 2, "0");
    if (el.textContent !== str) {
      el.classList.remove("flip");
      void el.offsetWidth;
      el.classList.add("flip");
      el.textContent = str;
    }
  }

  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      if (displayEl) displayEl.hidden = true;
      if (todayEl)   todayEl.hidden = false;
      return;
    }
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    setFlip(daysEl,  days);
    setFlip(hoursEl, hours);
    setFlip(minsEl,  minutes);
    setFlip(secsEl,  seconds);
  }

  update();
  setInterval(update, 1000);
}
