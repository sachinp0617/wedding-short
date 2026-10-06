import { WEDDING } from "./config.js";
import { initFilmstrip } from "./filmstrip.js";
import { initRsvpForm } from "./rsvp-form.js";
import { initCountdown } from "./countdown.js";
import { initCalendar } from "./calendar.js";
import { initGuestGreeting } from "./guest.js";

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.innerHTML = value;
}

function setBg(id, url) {
  const el = document.getElementById(id);
  if (el && url) el.style.backgroundImage = `url("${url}")`;
}

function coupleLine() {
  return `${WEDDING.couple.groom} & ${WEDDING.couple.bride}`;
}

/** Fill every page slot from config.js */
function applyConfig() {
  const { couple, muhurtham, city, images } = WEDDING;
  const names = coupleLine();
  const place = `${muhurtham.venue} · ${city}`;

  document.title = `${couple.groom} & ${couple.bride} — Reception Invitation`;
  const meta = document.getElementById("meta-description");
  if (meta) {
    meta.setAttribute(
      "content",
      `Reception invitation for ${names} — ${muhurtham.displayDate}, ${city}`
    );
  }

  setText("nav-monogram", couple.initials);
  setText("hero-script", WEDDING.heroScript);
  setText("hero-groom", couple.groom);
  setText("hero-bride", couple.bride);
  setText("hero-date", muhurtham.displayDateShort);
  setText("hero-venue", place);

  setText("intro-script", WEDDING.heroScript);
  setText("intro-groom", couple.groom);
  setText("intro-bride", couple.bride);
  setText("intro-date", muhurtham.displayDateShort);
  setText("intro-venue", place);
  setBg("intro-photo", images.intro || images.hero);

  setBg("journey-photo", images.journey);
  setBg("rsvp-photo", images.rsvp);
  setBg("closing-photo", images.closing);

  const bouquet = document.getElementById("rsvp-bouquet");
  if (bouquet) bouquet.hidden = true;

  setHtml(
    "journey-heading",
    `${WEDDING.journeyHeading}<br />${WEDDING.journeyHeadingLine2}`
  );

  setText("story-eyebrow", WEDDING.storyEyebrow);
  setHtml(
    "story-title",
    `${WEDDING.storyTitle}<br /><em>${WEDDING.storyTitleEm}</em>`
  );

  setText("closing-cta", WEDDING.closingCta);

  setText("rsvp-eyebrow", WEDDING.rsvpEyebrow || muhurtham.displayDateShort);
  setHtml(
    "rsvp-heading",
    `${WEDDING.rsvpHeading}<br />${WEDDING.rsvpHeadingLine2}`
  );
  setText("rsvp-deadline", WEDDING.rsvpDeadline);
  setText("rsvp-wish-script", WEDDING.rsvpWishScript);
  setText("rsvp-wish-hint", WEDDING.rsvpWishHint);
  const wishBox = document.getElementById("rf-wishes");
  if (wishBox && WEDDING.rsvpWishPlaceholder) {
    wishBox.placeholder = WEDDING.rsvpWishPlaceholder;
  }
  setText(
    "rsvp-success-detail",
    `${names} · ${muhurtham.displayDate} · ${city}`
  );

  setText("schedule-eyebrow", WEDDING.scheduleEyebrow);
  setHtml(
    "schedule-heading",
    `${WEDDING.scheduleHeading} <em>${WEDDING.scheduleHeadingEm}</em>`
  );
  setHtml(
    "cd-heading",
    `${WEDDING.countdownHeading} <em>${WEDDING.countdownHeadingEm}</em>`
  );
  setText("cd-meta", `${muhurtham.displayDateShort} · ${muhurtham.venue}, ${city}`);
}

function renderTimeline() {
  const el = document.getElementById("timeline");
  if (!el) return;
  el.innerHTML = "";
  WEDDING.events.forEach((ev, i) => {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.style.setProperty("--reveal-delay", `${i * 0.12}s`);
    li.innerHTML = `
      <div class="timeline-dot-col" aria-hidden="true">
        <span class="timeline-dot"></span>
        <span class="timeline-line"></span>
      </div>
      <div class="timeline-content">
        <p class="timeline-date">${ev.displayDate}</p>
        <p class="timeline-time">${ev.displayTime}</p>
        <h4 class="timeline-title">${ev.title}</h4>
        <p class="timeline-venue">${
          ev.mapsUrl
            ? `<a href="${ev.mapsUrl}" target="_blank" rel="noopener noreferrer">${ev.venue} &#8599;</a>`
            : ev.venue
        }</p>
        ${
          ev.address
            ? `<p class="timeline-address">${ev.address}</p>`
            : ""
        }
        ${
          ev.dressNote
            ? `<div class="timeline-dress" aria-label="Dress code for ${ev.title}">
                <span class="timeline-dress__shine" aria-hidden="true"></span>
                <span class="timeline-dress__icon" aria-hidden="true">&#10022;</span>
                <div class="timeline-dress__body">
                  <span class="timeline-dress__label">Dress code</span>
                  <p class="timeline-dress__text">${ev.dressNote}</p>
                </div>
              </div>`
            : ""
        }
      </div>
    `;
    el.appendChild(li);
  });
}

function initTimelineReveal() {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

function initCurtain() {
  const hint = document.getElementById("curtain-hint");
  const story = document.getElementById("story");
  if (!hint || !story) return;

  function goToStory() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    story.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  hint.addEventListener("click", goToStory);
}

function initParallax() {
  initCurtain();
}

function initNav() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle("is-scrolled", !entry.isIntersecting),
    { threshold: 0 }
  );
  const hero = document.getElementById("home");
  if (hero) observer.observe(hero);
}

function initScrollReveal() {
  const els = document.querySelectorAll(".reveal-up");
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

function initMusic() {
  const btn = document.getElementById("music-toggle");
  if (!btn) return { start: () => {} };

  const audio = new Audio(WEDDING.audio?.src || "");
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = "auto";

  let playing = false;

  function syncUi() {
    btn.textContent = playing ? "🔊" : "🔇";
    btn.setAttribute("aria-label", playing ? "Mute music" : "Play music");
    btn.setAttribute("aria-pressed", String(playing));
    btn.classList.toggle("is-playing", playing);
  }

  async function start() {
    if (playing) return;
    try {
      await audio.play();
      playing = true;
      syncUi();
      btn.classList.add("is-visible");
    } catch {
      /* autoplay blocked — still show mute control so user can tap */
      syncUi();
      btn.classList.add("is-visible");
    }
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
      syncUi();
      btn.classList.add("is-visible");
    } catch {
      syncUi();
    }
  });

  syncUi();
  return { start };
}

function initGuestGreetingLocal() {
  initGuestGreeting();
  const inviteEl = document.getElementById("journey-heading");
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("guest");
  if (guest && inviteEl) {
    inviteEl.innerHTML = `Dear ${guest}, we cordially invite you<br />to our reception`;
  }
}

function scrollToJourney() {
  window.scrollTo(0, 0);
  const journey = document.getElementById("journey") || document.getElementById("home");
  if (journey) journey.scrollIntoView({ block: "start" });
}

function initIntro(onOpen) {
  const overlay = document.getElementById("intro-overlay");
  const enter = document.getElementById("intro-enter");
  if (!overlay) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.body.classList.add("intro-locked", "has-intro");
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  function openInvitation() {
    if (overlay.classList.contains("is-open")) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intro-locked");
    document.body.classList.add("intro-done");
    if (typeof onOpen === "function") onOpen();
    scrollToJourney();
    window.setTimeout(scrollToJourney, 50);
    window.setTimeout(() => overlay.remove(), 1600);
  }

  if (reduced) {
    overlay.remove();
    document.body.classList.remove("intro-locked");
    document.body.classList.add("intro-done");
    if (typeof onOpen === "function") onOpen();
    scrollToJourney();
    return;
  }

  if (enter) enter.addEventListener("click", (e) => {
    e.stopPropagation();
    openInvitation();
  });
  overlay.addEventListener("click", openInvitation);
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  const music = initMusic();
  initIntro(() => music.start());
  initNav();
  initParallax();
  renderTimeline();
  initTimelineReveal();
  initFilmstrip();
  initRsvpForm();
  initCountdown();
  initCalendar(WEDDING.events);
  initGuestGreetingLocal();
  initScrollReveal();
});
