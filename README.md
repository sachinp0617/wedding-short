# Sachin & Lavanya — Reception Invitation Website

A mobile-first reception invitation site. Edit **`js/config.js`** only — everything else is filled from that file.

## Features

- Full-bleed hero with parallax
- Journey panel + scroll-driven story filmstrip
- Inline RSVP with QR confirmation
- Event timeline + Getting There / maps
- Live countdown timer
- Optional background music (tap to play)
- Personalized greeting via `?guest=Name`
- `prefers-reduced-motion` support

## Run locally

```bash
cd /home/sachin_patil_ubona/website
python3 -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765)

**Test guest greeting:** [http://localhost:8765/?guest=Priya](http://localhost:8765/?guest=Priya)

## Customize (single file)

Edit **`js/config.js`** only.

| What | Where in `config.js` |
|------|----------------------|
| Names / initials | `couple` |
| City / country | `city`, `country` |
| Wedding date & venue | `muhurtham` |
| Events + dress code | `events[]` — each event has `displayDate`, `displayTime`, `dressNote` |
| Hero / journey / RSVP / venue photos | `images` |
| Story filmstrip frames + photos | `story[]` |
| Travel tips | `travel.tips[]` |
| RSVP deadline | `rsvpDeadline` |
| Music file | `audio.src` |

### Add your photos

1. Copy files into `assets/images/` (e.g. `hero.jpg`, `story-01.jpg`)
2. Point config at them:

```javascript
images: {
  hero: "assets/images/hero.jpg",
  journey: "assets/images/journey.jpg",
  rsvp: "assets/images/rsvp.jpg",
  venue: "assets/images/venue.jpg",
},

story: [
  {
    num: "01",
    year: "2022",
    title: "First Meeting",
    text: "…",
    img: "assets/images/story-01.jpg",
  },
  // …
],
```

You can also keep Unsplash / any `https://…` URL.

### Add your music

Place a short MP3/WAV at `assets/audio/nadaswaram.wav` (or change `audio.src`). Keep it small for mobile.

## Deploy free on Netlify

1. Push this folder to a GitHub repository.
2. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.` (root — see `netlify.toml`)
4. Deploy. Your site will be live at `your-site.netlify.app`.
5. **Custom domain:** Domain management → Add a domain → point your registrar DNS to Netlify (free SSL).

### RSVP Google Sheet

1. Create a new Google Sheet → Extensions → Apps Script → paste `js/rsvp-sheet.gs`.
2. Deploy → Web app → Execute as **Me** → Who has access: **Anyone**.
3. Paste the `/exec` URL into `js/config.js` as `WEDDING.forms.sheetUrl`.

## Share with guests

Send personalized links:

```
https://your-domain.com/?guest=Priya
https://your-site.netlify.app/?guest=Uncle%20Ravi
```

## Project structure

```
website/
├── index.html
├── css/          # Styles (mobile-first)
├── js/
│   ├── config.js # ← Edit this for your wedding details
│   └── ...
└── assets/
    ├── images/
    └── audio/
```

## License

Personal use for your wedding invitation.
