# Teang Arpireak: Portfolio

A scrapbook-style portfolio for a UI/UX + graphic designer who also builds.
Home page, a scroll-driven "My Story" journal, and a KAIRO case study.

**Stack:** React 19, Vite, Tailwind CSS 3, Framer Motion, GSAP, Lenis (smooth scroll), React Router.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint (should report 0 warnings)
```

## Project layout

```
src/
  App.jsx               routes, intro timing, section order
  components/           Hero, About, Projects (KAIRO), GraphicWorks, Playground,
                        Contact, Footer, Navigation, Marquee, Lightbox, ...
  pages/                AboutPage (the journal), ProjectDetail (case study)
  utils/session.js      "show the loading screen once per session" helper
public/
  graphic-design/       poster images (WebP)
  journal/              photos for the My Story page (WebP)
  projects/kairo/       KAIRO screenshots (WebP)
```

## Editing content

| What | Where |
|---|---|
| Graphic work cards | `works` list at the top of `src/components/GraphicWorks.jsx` |
| KAIRO case study text and gallery | `projectsData` in `src/pages/ProjectDetail.jsx` |
| KAIRO card on the home page | `screens`, `stickers`, `stack` in `src/components/Projects.jsx` |
| My Story chapters | `Chapter` blocks in `src/pages/AboutPage.jsx` |
| Fonts and colors | `tailwind.config.js` and the font link in `index.html` |

## Contact form

Messages are delivered to the address in `src/config.js` (`CONTACT_EMAIL`) through [Formspree](https://formspree.io).

**One-time setup**

1. On formspree.io create a free account, choose **New form**, enter the inbox address and confirm the verification email.
2. Copy the form URL (`https://formspree.io/f/xxxxxxxx`).
3. Locally: copy `.env.example` to `.env`, paste the URL after `VITE_FORM_ENDPOINT=`, restart `npm run dev`.
4. On Vercel: **Project -> Settings -> Environment Variables**, add `VITE_FORM_ENDPOINT` with the same URL, then **redeploy**
   (Vite bakes `VITE_*` values in at build time, so a change only shows up after a new build).
5. In Formspree, limit the form to your site's domain, send one test message, and check the inbox **and Spam** folder.

Built in: a hidden honeypot field catches bots, input lengths are capped, and replies go straight to the visitor.
Without `VITE_FORM_ENDPOINT` (for example locally) the form opens the visitor's email app instead and says so honestly.

## Deploy (Vercel)

1. Push to GitHub, then on vercel.com choose **Add New -> Project** and import the repo.
   Vercel detects Vite on its own (build `npm run build`, output `dist`).
2. Before the first deploy, add `VITE_FORM_ENDPOINT` under **Environment Variables** (see Contact form above).
3. Click **Deploy**. Every push to `main` redeploys automatically.

`vercel.json` makes pages like `/about` and `/project/auto-repair` keep working on refresh and when shared
(they are client-side routes, so the server must always serve `index.html`), and caches the hashed files in `/assets`.

## Images

Use WebP. Keep long edges around 1200 to 2000 px: bigger files only slow the site down.
