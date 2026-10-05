import { WEDDING } from "./config.js";

export function initGuestGreeting() {
  const el = document.getElementById("guest-greeting");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const guest = params.get("guest");

  if (guest && guest.trim()) {
    const name = decodeURIComponent(guest.trim());
    el.textContent = `Dear ${name}, you are warmly invited to celebrate with us`;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
}

export function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("guest");
  return guest ? decodeURIComponent(guest.trim()) : null;
}

export function getShareUrl() {
  return window.location.href;
}

export { WEDDING };
