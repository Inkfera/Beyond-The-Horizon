<div align="center">

# 🌹 Bloomtype

**Type a word. Watch it grow into a garden.**

Stems, leaves and flowers sprout from every letter you type. Cut the vines with space, wither them with backspace, then export your garden as an image, an SVG or a looping video.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR-USERNAME%2Fbloomtype)

![Static site](https://img.shields.io/badge/static%20site-no%20build-000?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/vanilla-JS%20%2B%20canvas-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
![No tracking](https://img.shields.io/badge/tracking-none-2EA043?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

</div>

---

## ✨ Features

- **Live growth** – every keystroke grows stems, leaves, thorns, curls and flowers from the letter.
- **8 flowers** – rose, daisy, tulip, poppy, aster, sunflower, lily and cosmos. Each has its own leaves and stems.
- **35 colour palettes** – from *Rose noir* and *Paper* to *Neon*, *Terracotta* and a *Rainbow* mode.
- **12 typefaces** – serifs, bold display faces and scripts, all self‑hosted.
- **Poster mode** – 13 timed motion loops (Breathe, Gust, Reach, Orbit, Ripple…) with a 1:1 canvas.
- **Alive details** – butterflies that land on flowers, petals that drift as you type, blooms that lean toward your pointer, soft glow (you can switch it off).
- **Crowd control** – blooms thin themselves out so the words always stay readable.
- **Exports** – PNG, SVG, MP4/WebM loop and a PNG frame sequence (`.zip`).
- **Touch friendly** – works with phone keyboards, tap and double‑tap.

## ⌨️ Controls

| Action | Desktop | Phone |
| --- | --- | --- |
| Grow | type | tap, then type |
| Cut the stems / start a new word | `Space` | space |
| Wither the last letter | `Backspace` | ⌫ |
| Clear everything | `Enter` | return |
| Summon a butterfly | click | tap |
| Leave a rose | double‑click | double‑tap |
| Save PNG / SVG | `Ctrl/⌘ + S` / `Ctrl/⌘ + Shift + S` | buttons |

## 🚀 Deploy on Vercel

This is a plain static site – **no build step, no dependencies, no environment variables.**

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Leave **Framework Preset** as *Other*, **Build Command** empty and **Output Directory** empty.
4. Click **Deploy**.

`vercel.json` already adds the security headers and long‑term caching for fonts.

Or from the terminal:

```bash
npm i -g vercel
vercel --prod
```

## 🧪 Run locally

Any static file server works (opening `index.html` directly also works, but fonts load more reliably over HTTP):

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open <http://localhost:8080>.

## 🗂 Project structure

```
bloomtype/
├── index.html        # page markup + meta tags
├── styles.css        # layout and UI styling
├── app.js            # growth, drawing, motion presets, exports
├── favicon.svg       # tab icon
├── vercel.json       # security headers + caching
├── fonts/
│   ├── fonts.css     # @font-face rules (self-hosted)
│   ├── *.woff2       # Latin subsets
│   └── licenses/     # OFL licence for every family
├── NOTICE.md         # third-party notices
├── LICENSE
└── README.md
```

## 🎨 Make it yours

Everything lives in `app.js`:

| Want to change… | Look for |
| --- | --- |
| Colour palettes (`name, background, flower, stem, flower line, type`) | `const PAL` |
| Typefaces | `const FONTS` (add the font file to `fonts/` and a rule to `fonts/fonts.css`) |
| Motion presets in Poster mode | `const PRE` and `posterDraw()` |
| Leaf width, stem thickness, thorns per flower | `const FS` |
| Flower drawings | `bloom()` (daisy, aster, poppy, tulip, sunflower, lily, cosmos) and `rose()` |
| Density, boil, recoil | `const OPT` |

## 🔒 Privacy

- No cookies, no analytics, no accounts, no ads.
- No requests to third parties – fonts are served from the same origin.
- Everything you type stays in your browser. Exports are generated locally.

## 🛡 Security

`vercel.json` sets a strict Content‑Security‑Policy (scripts only from this origin), `nosniff`, clickjacking protection (`frame-ancestors 'none'`), a referrer policy, a locked‑down permissions policy and HSTS.

## 🌐 Browser support

Current Chrome, Edge, Safari and Firefox. MP4 export needs a browser whose `MediaRecorder` supports MP4 (Chrome, Safari); others save WebM. Use the PNG frame export if video recording isn't available.

## ♿ Accessibility notes

The hidden input that receives typing is labelled for screen readers, the interface is keyboard operable, and the drifting pollen turns off when the visitor prefers reduced motion. The garden itself is a canvas illustration and is decorative.

## 🩹 Troubleshooting

| Problem | Fix |
| --- | --- |
| Fonts look wrong | Hard refresh; check that `fonts/` was committed. |
| Nothing happens when typing | Click the garden once to focus it. |
| No MP4 option | Your browser can't record MP4 – it will save WebM or use PNG frames. |
| Slow on an old phone | Turn glow off and use a shorter word. |

## 🤝 Contributing

Issues and pull requests are welcome. Keep it dependency‑free and keep the Content‑Security‑Policy intact (no inline scripts).

## 📜 Credits & licences

- Idea and drawing approach adapted from **Type Garden** by Akshat Agarwal – see [`NOTICE.md`](NOTICE.md).
- Fonts: SIL Open Font License 1.1 – see [`fonts/licenses`](fonts/licenses).
- Code changes in this repository: [MIT](LICENSE).

> ⚠️ **Before you publish:** make sure you have the original author's permission to reuse the code this project is based on, and replace `YOUR-USERNAME` in the Deploy button above.
