# Beyond The Horizon — Treasure Hunt

Static site (no build step).

## Deploy on Vercel
1. Push this folder to a GitHub repo (index.html and assets/ at the repo root).
2. In Vercel: Add New > Project > import the repo.
3. Framework Preset: **Other**. Leave build/output settings empty. Deploy.

## Edit the hunt
Open `index.html` and edit `KEYWORDS` and `STAGES` near the bottom of the file.
Replace the maps by overwriting `assets/room1-map.jpg` and `assets/room2-map.jpg`.

## Reset behaviour
Nothing is saved (no localStorage/cookies). Leaving, refreshing or reopening the page resets the hunt and timer.
