# Portfolio Website

A hand-crafted, single-page portfolio — plain HTML/CSS/JS, no build step. Design replicated from a Framer reference: cream paper background, condensed uppercase display type (Antonio), handwritten accents (Patrick Hand), orange highlights, hard-shadow buttons, sticky stacked project cards, and auto-scrolling marquees.

## Run locally

Open `index.html` in a browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy on Vercel

No configuration needed — import the repo in Vercel and deploy (framework preset: **Other**, no build command, output directory: root).

## Structure

```
index.html        — all sections & content
css/style.css     — full design system (tokens at the top)
js/main.js        — LINKS config, scroll reveals, marquees
assets/fonts/     — self-hosted woff2 (Antonio, DM Sans, Patrick Hand)
assets/images/    — currently SVG placeholders → replace with real images
```

## ✏️ Content checklist (things to replace)

All placeholder spots are marked with `<!-- PLACEHOLDER -->` comments in `index.html`.

1. **Name + tagline** — hero section (`index.html`)
2. **Skills pills** — skills section
3. **4 projects** — title, description, 2 tags, cover image each
4. **Bio paragraphs** — about section
5. **Polaroid captions** — about section
6. **Links** — one spot: the `LINKS` object at the top of `js/main.js` (LinkedIn, Instagram, Behance, resume, art page, other works, per-project links)
7. **Images** — drop real files into `assets/images/` keeping the same filenames (or update the `src` attributes):
   - `avatar` (nav logo), `hero-illustration`
   - `sneak-1…8` (work snapshots in the marquee)
   - `project-1…4` (project covers)
   - `sketch-runner` (art section illustration)
   - `brand-1…8` (brand logos)
   - `polaroid-1…3` (photos)
8. **Page `<title>` + meta description** — `index.html` head
