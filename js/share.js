import { WEDDING } from "./config.js";
import { getShareUrl } from "./guest.js";

export function initMusic() {
  const btn = document.getElementById("music-toggle");
  if (!btn) return;

  const audio = new Audio(WEDDING.audio.src);
  audio.loop = true;
  audio.preload = "none";

  let playing = false;

  function updateIcon() {
    btn.textContent = playing ? "🔊" : "🔇";
    btn.setAttribute("aria-label", playing ? "Mute music" : "Play music");
    btn.setAttribute("aria-pressed", String(playing));
  }

  btn.addEventListener("click", async () => {
    try {
      if (playing) {
        audio.pause();
        playing = false;
      } else {
        await audio.play();
        playing = true;
      }
      updateIcon();
    } catch {
      btn.setAttribute("title", "Add your music file at assets/audio/nadaswaram.wav");
    }
  });

  updateIcon();
}

export function initShare() {
  const shareBtns = document.querySelectorAll("[data-share]");

  shareBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = getShareUrl();
      const text = `${WEDDING.share.message} ${url}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `${WEDDING.couple.bride} & ${WEDDING.couple.groom} — Wedding Invitation`,
            text: WEDDING.share.message,
            url,
          });
          return;
        } catch {
          /* user cancelled or share failed */
        }
      }

      const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  });
}

export function initForms() {
  const rsvpLinks = document.querySelectorAll("[data-rsvp]");
  const wishesLinks = document.querySelectorAll("[data-wishes]");

  rsvpLinks.forEach((el) => {
    el.href = WEDDING.forms.rsvp;
  });

  wishesLinks.forEach((el) => {
    el.href = WEDDING.forms.wishes;
  });
}

export function renderEvents() {
  const container = document.getElementById("events-list");
  if (!container) return;

  container.innerHTML = WEDDING.events
    .map(
      (event) => `
    <article class="event-card reveal" id="event-${event.id}">
      <span class="section-label">${event.displayDate}</span>
      <h3>${event.title}</h3>
      <div class="event-card__meta">
        <span>${event.displayTime}</span>
      </div>
      <p class="event-card__venue">${event.venue}</p>
      <p class="event-card__address">${event.address}</p>
      <p class="event-card__dress">${event.dressNote}</p>
      <a class="btn btn-primary btn-block" href="${event.mapsUrl}" target="_blank" rel="noopener noreferrer">
        See on Maps
      </a>
    </article>
  `
    )
    .join("");
}

export function renderStaticContent() {
  const { couple, dressCode, travel, blessing, muhurtham } = WEDDING;

  const brideEl = document.getElementById("bride-name");
  const groomEl = document.getElementById("groom-name");
  const taglineEl = document.getElementById("hero-tagline");
  const blessingEl = document.getElementById("hero-blessing");
  const sealEl = document.getElementById("seal-initials");
  const heroDate = document.getElementById("hero-date");

  if (brideEl) brideEl.textContent = couple.bride;
  if (groomEl) groomEl.textContent = couple.groom;
  if (taglineEl) taglineEl.textContent = WEDDING.tagline;
  if (blessingEl && blessing) blessingEl.textContent = blessing;
  if (sealEl && couple.initials) sealEl.textContent = couple.initials;
  if (heroDate) {
    const d = new Date(`${muhurtham.date}T12:00:00`);
    heroDate.textContent = d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).replace(/ (\d{4})/, " $1").replace(/^(\d+)/, (m) => {
      const n = Number(m);
      const suffix = n === 1 || n === 21 || n === 31 ? "st" : n === 2 || n === 22 ? "nd" : n === 3 || n === 23 ? "rd" : "th";
      return `${n}${suffix}`;
    });
  }

  const dressText = document.getElementById("dress-text");
  const dressPalette = document.getElementById("dress-palette-text");
  if (dressText) dressText.textContent = dressCode.text;
  if (dressPalette) dressPalette.textContent = dressCode.palette;

  const travelList = document.getElementById("travel-list");
  if (travelList) {
    travelList.innerHTML = travel.tips.map((tip) => `<li>${tip}</li>`).join("");
  }

  document.title = `${couple.bride} & ${couple.groom} — Wedding Invitation`;
}
