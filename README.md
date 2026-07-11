# Archit Gupta — Portfolio

A hand-crafted, single-page portfolio — plain HTML/CSS/JS, no build step. Design replicated from a Framer reference: cream paper background, condensed uppercase display type (Antonio), handwritten accents (Patrick Hand), orange highlights, hard-shadow buttons, sticky stacked project cards, and auto-scrolling marquees. Content migrated from [archit-s-ai-studio](https://github.com/ar970/archit-s-ai-studio).

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

## ✏️ Remaining TODOs

All links live in the `LINKS` object at the top of `js/main.js`:

1. **Resume PDF** — currently `#` (drop the file into `assets/documents/` and point `LINKS.resume` at it once finalized)
2. **Nutri Ladooz link** — no external link existed in the old portfolio
