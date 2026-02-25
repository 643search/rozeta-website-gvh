# Session Notes — 2026-02-20

## Session Summary
Afternoon/evening session focused on visual polish across the Rozeta Labs website. The primary theme was making UI components transparent so the cream background (`#f5f0e8`) shows through consistently, rather than having white card backgrounds break the aesthetic. Also fixed a nav scroll bug, updated services page copy, created a CLAUDE.md, and had a strategic discussion about blog/CMS infrastructure.

---

## Features / Changes Implemented

### 1. Podcast Platform Buttons — Transparent Background
- Changed `.subscribe-btn` background from `var(--color-white)` to `transparent`
- Removed `box-shadow` from button idle state
- Hover state unchanged (border darkens, slight lift)

### 2. Slack Cards (What We Do section) — Transparent
- `.slack-card` background: `#ffffff` → `transparent`
- `.slack-card` border changed from `none` + box-shadow to `1px solid rgba(0,0,0,0.10)`
- `.slack-card-header` background: `#ffffff` → `transparent`
- `.slack-msg:hover` background: `#f8f8f8` → `rgba(0,0,0,0.04)` (avoids white flash on hover)

### 3. Google Search Mockup (Who We Serve section) — Transparent
- `.gsearch-bar` background: `#fff` → `transparent`
- `.gsearch-autocomplete` background: `#fff` → `transparent`, box-shadow removed
- `.gsearch-ai-body` background: `#fff` → `transparent`

### 4. Services Page Hero — Copy Update
- Removed "From the Owner to the Newest Hire." line entirely
- Headline now: "AI Enablement for **Your Entire Organization**"
- "Your Entire Organization" wrapped in `<span>` with `color: var(--color-accent)` (red)

### 5. Services Page Hero Spheres — Added then Reverted
- Added three hero orbs (top-right copper, bottom-right teal, bottom-left red) to services page
- Added `.page-hero-orb--left` CSS class with correct bottom positioning
- Mobile hide rule added for left orb
- **Reverted** at user's request — spheres removed from services page

### 6. Nav Scroll Color Fix
- `.nav-scrolled` background changed from `rgba(255,255,255,0.95)` to `rgba(240,236,228,0.95)`
- Nav now stays cream-colored when scrolled instead of flashing white
- Located in `css/animations.css`

### 7. Chat Card (Problem Section) — Transparent
- `.chat-card` background: `#ffffff` → `transparent`, box-shadow removed
- `.chat-header` background: `#fafafa` → `transparent`
- `.chat-msg--ai .chat-bubble` background: `#f4f4f4` → `rgba(0,0,0,0.06)`
- `.chat-input-bar` background: `#fafafa` → `transparent`

### 8. CLAUDE.md Created
- Created project-level `CLAUDE.md` following HumanLayer best practices
- Covers: WHY (AI enablement for SMBs), WHAT (file map, pages, assets), HOW (no build step, deploy command, CSS versioning)
- 46 lines — intentionally concise, universally applicable context only

---

## Files Modified

| File | What Changed |
|---|---|
| `css/main.css` | Transparent backgrounds for subscribe-btn, slack-card, gsearch components, chat-card; nav orb mobile rules |
| `css/animations.css` | `.nav-scrolled` background swapped from white to cream |
| `css/design-system.css` | No changes this session |
| `services.html` | Hero headline updated; spheres added then reverted |
| `CLAUDE.md` | Created — project onboarding context for Claude Code |

---

## Key Decisions Made

- **Transparent-first design rule**: All card/panel components should use `transparent` or `rgba` backgrounds rather than `#fff`/`#fafafa`, so the cream site background shows through everywhere. Applied to: podcast buttons, Slack cards, Google mockup, chat card.
- **Services page headline**: "From the Owner to the Newest Hire." was too long and redundant — trimmed to just the core message with red accent.
- **Spheres on services page**: Tried adding home page orbs to the services hero, but reverted — didn't work visually on that page.
- **Nav scroll fix**: Nav was betraying the design by going white on scroll. Fixed to match the site background color.
- **CLAUDE.md philosophy**: Followed HumanLayer's "less is more" framework — no style guides, no exhaustive command lists, just the minimal stable facts Claude needs to orient itself each session.

---

## Blog / CMS Strategy Discussion

- All 6 blog post stubs are already live on `intel.html` — titles, excerpts, authors, categories, filter tabs all working
- The real gap: no individual post pages yet (no `href` on the cards)
- **Recommendation agreed on**: Start with plain HTML post pages, migrate to Sanity when post volume or contributor needs grow
- **Sanity setup blocked**: API key found in `/Desktop/ENV Files/.env` but no Project ID or Dataset available — user needs to grab from sanity.io/manage
- Blog posts to write (pending Sanity setup):
  1. How to Automate Your Entire Lead Follow-Up Without Writing a Single Line of Code (Greg, 12 min)
  2. Claude vs. ChatGPT vs. Gemini: Which AI Actually Wins for Small Business Operators? (Hunter, 8 min)
  3. What AI Is Doing to Home Services Revenue in 2026 (Greg, 10 min)
  4. The AI Audit: How to Find Every Task in Your Business That AI Can Handle This Week (Hunter, 15 min)
  5. Building Rozeta Labs in Public: Month 1 (Greg & Hunter, 18 min)
  6. n8n vs. Make vs. Zapier: The Honest Comparison (Hunter, 9 min)

---

## Commits Made (this session)

```
0e16d4b feat: transparent background on podcast platform buttons
44da355 feat: transparent Slack cards in What We Do section
4225c90 feat: transparent Google search mockup in Who We Serve section
d369263 feat: simplify services hero headline, highlight Your Entire Organization in red
62ed9d2 feat: add hero spheres to services page, hide left orb on mobile
3e7ff53 Revert "feat: add hero spheres to services page, hide left orb on mobile"
6dc8e9a fix: nav scrolled background matches cream site color instead of white
fe36a1b docs: add CLAUDE.md with project onboarding context
bde3e77 feat: transparent chat card in problem section
```

All commits pushed to `origin/redesign/stripe-light`. All deploys successful to `rozeta-labs-website.web.app`.

---

## Pending Items / Next Steps

1. **Blog post pages** — Need Sanity Project ID + Dataset name from sanity.io/manage to proceed. Once provided: create schema, write all 6 posts, push as drafts for review, wire intel.html to fetch from Sanity API.
2. **Services page spheres** — May want to revisit a different sphere treatment for the services hero in a future session.
3. **Individual blog post HTML template** — Design the post page layout (header, body, author bio, related posts, CTA) before content is written.
4. **Intel page card links** — Cards currently have no `href`. Will be linked once post pages exist.
