/**
 * ═══════════════════════════════════════════════════════════
 *  SINGLE SOURCE OF TRUTH — edit this file only for content
 * ═══════════════════════════════════════════════════════════
 *
 * Photos:
 *  1. Put files in assets/images/  (e.g. hero.jpg, story-01.jpg)
 *  2. Set paths below to "assets/images/your-file.jpg"
 *     (or keep Unsplash / any https URL)
 */

export const WEDDING = {
  couple: {
    bride: "Lavanya",
    groom: "Sachin",
    initials: "L&S",
  },

  /** Short city label used in hero / footer / countdown */
  city: "Bidar",
  state: "Karnataka",
  

  blessing:
    "May the bond of love between you two grow stronger with each passing day.",
  tagline: "Together, we begin our forever.",
  heroScript: "We're getting married",
  journeyHeading: "We cordially invite you",
  journeyHeadingLine2: "to our wedding",
  storyEyebrow: "Our Story",
  storyTitle: "Five Moments",
  storyTitleEm: "That Found Us",
  rsvpEyebrow: "",
  rsvpHeading: "Will you be",
  rsvpHeadingLine2: "our guests?",
  rsvpDeadline: "20 October 2026",
  rsvpWishScript: "A blessing, if you will",
  rsvpWishHint:
    "A few kind words we will carry with us into our forever — laughter, a prayer, or a wish for our home.",
  rsvpWishPlaceholder:
    "May your days be gentle, and your home always full of light…",
  scheduleEyebrow: "The Big Day",
  scheduleHeading: "Order of",
  scheduleHeadingEm: "Celebrations",
  countdownHeading: "The Big Day is",
  countdownHeadingEm: "Almost Here",
  closingCta: "RSVP before you forget",

  /**
   * Site photos — use local paths or remote URLs
   * Local example: "assets/images/hero.jpg"
   */
  images: {
    intro: "assets/images/intro.png",
    hero: "assets/images/intro.png",
    journey: "assets/images/journey.png",
    rsvp: "assets/images/charile-flowers.PNG",
    rsvpBouquet: "",
    venue: "assets/images/venue.png",
    closing: "assets/images/lifting-one.png",
  },

  muhurtham: {
    date: "2026-11-15",
    time: "09:30",
    timezone: "Asia/Kolkata",
    displayDate: "15 November 2026",
    /** Short form for hero / footer lines */
    displayDateShort: "November 15, 2026",
    displayTime: "9:30 AM",
    /** Day number + month abbrev for the date ring */
    day: "15",
    monthShort: "NOV",
    year: "2026",
    venue: "Jira Convention Center",
    address: "Outer Ring Road, Nawadgeri, Bidar, Karnataka 585401",
    /** Multi-line address for Getting There (use \n) */
    addressLines: "Jira Convention Center\nOuter Ring Road, Nawadgeri\nBidar, Karnataka 585401",
    mapsUrl:
      "https://www.google.com/maps/place/Jhira+Convention+Hall/@17.9260779,77.5148632,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcec72abe493f53:0x3fc6e1d7dcda29df!8m2!3d17.9260779!4d77.5174381!16s%2Fg%2F1thmjg4s?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D",
    durationHours: 3,
  },

  events: [

    {
      id: "ceremony",
      title: "Wedding Ceremony",
      date: "2026-11-15",
      time: "09:30",
      displayDate: "15 November 2026",
      displayTime: "Muhurtham at 09:30 AM",
      venue: "Jira Convention Center",
      address: "Outer Ring Road, Nawadgeri, Bidar, Karnataka 585401",
      dressNote: "Traditional South Indian attire in maroon, gold, or ivory",
      mapsUrl:
        "https://www.google.com/maps/place/Jhira+Convention+Hall/@17.9260779,77.5148632,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcec72abe493f53:0x3fc6e1d7dcda29df!8m2!3d17.9260779!4d77.5174381!16s%2Fg%2F1thmjg4s?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D",
      durationHours: 3,
    },
    {
      id: "reception",
      title: "Reception",
      date: "2026-11-15",
      time: "19:00",
      displayDate: "15 November 2026",
      displayTime: "7:00 PM",
      venue: "Jira Convention Center",
      address: "Outer Ring Road, Nawadgeri, Bidar, Karnataka 585401",
      dressNote: "Elegant formal or festive traditional wear",
      mapsUrl:
        "https://www.google.com/maps/place/Jhira+Convention+Hall/@17.9260779,77.5148632,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcec72abe493f53:0x3fc6e1d7dcda29df!8m2!3d17.9260779!4d77.5174381!16s%2Fg%2F1thmjg4s?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D",
      durationHours: 4,
    },
  ],

  /** Horizontal story filmstrip — each frame can have its own photo */
  story: [
    {
      num: "01",
      year: "December 2025",
      title: "Where It Began",
      text: "It started with our dog, Charlie, and a journey to bring him home. Somewhere between Bidar and Bengaluru, a chance talk between our parents and friends quietly opened the door for us.",
      img: "assets/images/lv-charile.jpg",
    },
    {
      num: "02",
      year: "4th March 2026",
      title: "First Words",
      text: "It began over coffee — a conversation that refused to end. Numbers were exchanged, then nights stretched into hours on the phone. Bit by bit we learned each other’s worlds.",
      img: "assets/images/coffee-bike.png",
    },
    {
      num: "03",
      year: "20th April 2026",
      title: "The Long Drive",
      text: "Then came the long drive. Somewhere on that road, something sparked — a gut feeling that she was the one. In that stretch of night we both knew: this was not a maybe. We were meant for each other.",
      img: "assets/images/long-drive.jpg",
    },
    {
      num: "04",
      year: "7th May 2026",
      title: "The Proposal",
      text: "A simple date night turned into the question that changed everything. Days later, on 3 July 2026, we got engaged — the happiest day of our lives.",
      img: "assets/images/date-night-new.PNG",
    },
    {
      num: "05",
      year: "15 November 2026",
      title: "Forever Begins",
      text: "This is the date we have been counting toward. Come bless us with your presence as we begin forever, together.",
      img: "assets/images/preview-2.jpg",
    },
  ],

  dressCode: {
    title: "Dress Code",
    text: "We invite you to dress in festive traditional or elegant formal wear.",
    palette: "Suggested palette: maroon, gold, and ivory.",
  },

  travel: {
    title: "Getting There",
    tips: [
      {
        label: "By Air",
        text: "Nearest airport: Bidar Airport or Rajiv Gandhi International Airport (HYD), Hyderabad — ~145 km (~2.5 hrs by road).",
      },
      {
        label: "By Train",
        text: "Bidar Railway Station is well-connected from Hyderabad, Bengaluru & Solapur. Cab available from station to venue.",
      },
      {
        label: "By Car",
        text: "Bidar is ~150 km from Hyderabad and ~679 km from Bengaluru. Parking available at the venue.",
      },
    ],
  },

  forms: {
    rsvp: "https://forms.gle/PLACEHOLDER_RSVP",
    wishes: "https://forms.gle/PLACEHOLDER_WISHES",
    /**
     * Google Apps Script web-app URL (see js/rsvp-sheet.gs).
     * Paste the /exec URL after you deploy. Leave PLACEHOLDER until then.
     */
    sheetUrl: "https://script.google.com/macros/s/AKfycbxBV3gCKCmpqydM678kLC_NNNZ_j4e_mnuPBlJOTD6PuDMKrC4NvlD3a_avmFvEBjw_uA/exec",
  },

  share: {
    message:
      "You are warmly invited to the wedding of Sachin & Lavanya! View our invitation:",
  },

  audio: {
    src: "assets/audio/wedding-song-short.mp3",
    label: "Play music",
  },
};
