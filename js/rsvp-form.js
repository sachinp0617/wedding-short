import { WEDDING } from "./config.js";

function activeValue(form, group, fallback) {
  const btn = form.querySelector(`[data-group="${group}"].active`);
  return btn ? btn.dataset.value : fallback;
}

function syncRsvpFields(form) {
  const attending = activeValue(form, "attend", "yes");
  const plusOne = activeValue(form, "plusone", "no");
  const extras = form.querySelector("#rsvp-attend-extras");
  const plusWrap = form.querySelector("#rf-plusone-wrap");
  const arrival = form.querySelector("#rf-arrival");

  if (extras) extras.hidden = attending !== "yes";
  if (plusWrap) plusWrap.hidden = attending !== "yes" || plusOne !== "yes";
  if (arrival) arrival.required = attending === "yes";
}

function submitToSheet(payload) {
  const endpoint = WEDDING.forms?.sheetUrl || "";
  if (!endpoint || endpoint.includes("PLACEHOLDER") || endpoint.includes("PASTE_")) {
    return Promise.resolve();
  }

  return fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadWishesWall() {
  const wall = document.getElementById("rsvp-wishes-wall");
  const list = document.getElementById("rsvp-wishes-list");
  const endpoint = WEDDING.forms?.sheetUrl || "";
  if (!wall || !list) return;
  if (!endpoint || endpoint.includes("PLACEHOLDER") || endpoint.includes("PASTE_")) {
    return;
  }

  try {
    const res = await fetch(endpoint, { method: "GET" });
    if (!res.ok) return;
    const data = await res.json();
    const wishes = Array.isArray(data?.wishes) ? data.wishes : [];
    const withText = wishes.filter((w) => {
      if (!w) return false;
      const name = String(w.name || "").trim();
      const text = String(w.text || "").trim();
      if (!name || !text) return false;
      // Arrival dates sometimes leak into Notes — skip those
      if (/GMT|India Standard Time|^\d{4}-\d{2}-\d{2}/.test(text)) return false;
      return true;
    });
    if (!withText.length) return;

    list.innerHTML = withText
      .map(
        (w) => `
      <blockquote class="rsvp-wish-card">
        <p class="rsvp-wish-card__text">${escapeHtml(String(w.text).trim())}</p>
        <footer class="rsvp-wish-card__name">— ${escapeHtml(String(w.name).trim())}</footer>
      </blockquote>`
      )
      .join("");
    wall.hidden = false;
  } catch {
    /* leave wall hidden if sheet/redeploy not ready */
  }
}

export function initRsvpForm() {
  const form = document.getElementById("rsvp-form");
  const successEl = document.getElementById("rsvp-success");
  if (!form || !successEl) return;

  syncRsvpFields(form);
  loadWishesWall();

  form.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-group]");
    if (!btn) return;
    const group = btn.dataset.group;
    form
      .querySelectorAll(`[data-group="${group}"]`)
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    syncRsvpFields(form);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const firstName = (data.get("first_name") || "").trim();
    const lastName = (data.get("last_name") || "").trim();
    const attending = activeValue(form, "attend", "yes");
    const plusOne = attending === "yes" ? activeValue(form, "plusone", "no") : "no";
    const plusOneName =
      plusOne === "yes" ? (data.get("plusone_name") || "").trim() : "";
    const arrival = attending === "yes" ? (data.get("arrival") || "").trim() : "";
    const notes = (data.get("wishes") || "").trim();

    if (!firstName) {
      form.querySelector("#rf-first")?.focus();
      return;
    }
    if (attending === "yes" && !arrival) {
      form.querySelector("#rf-arrival")?.focus();
      return;
    }
    if (plusOne === "yes" && !plusOneName) {
      form.querySelector("#rf-plusone-name")?.focus();
      return;
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const submitBtn = document.getElementById("rsvp-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    submitToSheet({
      firstName,
      lastName,
      attending,
      plusOne,
      plusOneName,
      arrival,
      notes,
    });

    form.hidden = true;
    successEl.hidden = false;

    const nameEl = document.getElementById("rsvp-success-name");
    if (nameEl) nameEl.textContent = `Thank you, ${fullName}`;

    const subEl = document.getElementById("rsvp-success-sub");
    if (subEl) {
      subEl.textContent =
        attending === "yes"
          ? notes
            ? "Your RSVP and blessing are with us. We cannot wait to celebrate with you."
            : "Your RSVP is confirmed. We cannot wait to celebrate with you."
          : notes
            ? "Your reply and blessing are with us. Thank you for letting us know."
            : "Your reply is confirmed. Thank you for letting us know.";
    }

    successEl.scrollIntoView({ behavior: "smooth", block: "center" });

    // Optimistic: show this guest's wish on the wall if they left one
    if (notes) {
      const wall = document.getElementById("rsvp-wishes-wall");
      const list = document.getElementById("rsvp-wishes-list");
      if (wall && list) {
        const card = document.createElement("blockquote");
        card.className = "rsvp-wish-card";
        card.innerHTML = `
          <p class="rsvp-wish-card__text">${escapeHtml(notes)}</p>
          <footer class="rsvp-wish-card__name">— ${escapeHtml(fullName)}</footer>`;
        list.prepend(card);
        wall.hidden = false;
      }
    }
  });
}
