# Bloomtype

**A generative typography garden.** Type a word and watch stems, leaves, and flowers grow around each letter. Explore flower styles and colour palettes, add small interactions, and export stills or animated poster loops.

## Live demo

Deploy this repository to Vercel to get a live URL.

## Features

- Interactive, canvas-based generative typography
- Type-to-grow interactions with keyboard and touch support
- Multiple flower styles and colour palettes
- Type and Poster modes
- Glow and motion controls
- PNG and SVG export in Type mode
- Poster export options for video, PNG frames, and still images
- Responsive layout with safe-area handling for mobile devices
- Reduced-motion preference support

## Run locally

This is a static site and does not require a build step or package installation.

1. Clone or download this repository.
2. Open `index.html` in a modern browser.

For a local HTTP server, run one of the following from the repository directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Vercel

### Option A — GitHub import (recommended)

1. Create a new repository on GitHub.
2. Upload the files in this project or push the repository using Git.
3. In Vercel, choose **Add New → Project** and import the GitHub repository.
4. Keep the framework preset as **Other**.
5. Leave **Build Command** and **Output Directory** empty/default; this is a static HTML site.
6. Deploy.

Every push to the connected production branch will trigger a new deployment.

### Option B — Vercel CLI

Install the Vercel CLI, sign in, and run:

```bash
vercel
```

Follow the prompts. To deploy to production:

```bash
vercel --prod
```

## Project structure

```text
bloomtype/
├── index.html    # App, styles, and client-side JavaScript
├── vercel.json   # Static deployment and security headers
├── README.md     # Project and deployment guide
└── .gitignore    # Local/editor/deployment artefacts
```

## Notes

- Google Fonts are loaded from Google Fonts; the page falls back to system serif and monospace fonts if the service is unavailable.
- Video export depends on the browser's `MediaRecorder` and canvas capture support. If video export is unavailable, use the PNG frame export.
- The project is intentionally dependency-free: no Node.js build pipeline is required.
- No analytics or server-side API is configured by default.

## Customization

- **Page title and social metadata:** edit the `<head>` section in `index.html`.
- **Palettes:** find the `PAL` array in the script.
- **Flower styles:** find the `FS` object and flower drawing logic.
- **Fonts:** update the Google Fonts URL and the `F` font constant.

## License

No license has been added. Add a license file if you want to explicitly define reuse and redistribution terms.
