# rozeta labs website

## What
Static marketing website for Rozeta Labs, an AI enablement company for SMB operators. Deployed on Firebase Hosting.

**Live URL:** https://rozeta-labs-website.web.app
**Branch:** `redesign/stripe-light`

## Stack
- Pure HTML/CSS/JS — no build step, no framework, no package manager
- Firebase Hosting (deploy: `firebase deploy --only hosting`)
- Nav and footer are injected via `js/components.js` into a `#nav-placeholder` div on every page

## File map
```
index.html          — Home page
services.html       — Services / offerings
about.html          — About page
case-studies.html   — Case studies
podcast.html        — Podcast (The Rozeta Room)
intel.html          — Blog
css/design-system.css  — CSS custom properties (colors, type scale, spacing)
css/main.css           — All component and layout styles
css/animations.css     — Scroll reveal + nav scroll behavior (.nav-scrolled)
js/components.js       — Nav + footer HTML injection, scroll handler
js/main.js             — Scroll reveal, accordion, misc interactions
assets/avatars/        — AI-generated headshots (Imagen 4)
assets/logo/           — SVG logos
```

## Design system (key tokens)
- Background: `#f5f0e8` (`--color-bg`) — cream, used everywhere including nav scroll state
- Accent/red: `#9c1f22` (`--color-accent`)
- Primary text: `#22373b` (`--color-text-primary`) — dark teal
- Display font: Newsreader (serif) via Google Fonts
- Body font: Figtree (sans-serif)
- Design direction: transparent/cream cards over cream background — avoid white card backgrounds

## CSS versioning
CSS and JS files use query-string cache-busting (`?v=7`). Bump the version number in each HTML file's `<link>` and `<script>` tags when making significant CSS/JS changes.

## Deploy
```bash
firebase deploy --only hosting
```
No build step needed — edit files and deploy directly.
