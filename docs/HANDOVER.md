# Handover: L Hopkins site

**Read this first** if you are a person or an AI picking up this project.

Notion hub (decisions, approvals, asset and copy tracking):
https://app.notion.com/p/3ff0ca41bc738177b59cf0471151b02a

`HANDOVER.md`, `DECISIONS.md` and `ASSETS.md` back up that hub (snapshot 2026-10-20). If they disagree with Notion, Notion wins. If Notion is unavailable, these files are the record. Also read `PRODUCT.md` (the site brief: audiences, voice, rules) and `QUESTIONS.md` (open questions for the owner).

## What this is

The public site for L Hopkins: Xavier College Preparatory, Class of 2030, Xavier Gators flag football (#7), sprints and long jump. Two audiences: college coaches and recruiters, and family and supporters.

## Where things live

| What | Where |
| --- | --- |
| Live site | https://lorneh12.github.io/l-hopkins-site/ (deploys on every push to `main`) |
| Code and web-sized media (source of truth for what is live) | this repo, `main` branch |
| Full-size original photos and video | `assets-raw/` on the owner's computer only. **Not in Git and not backed up anywhere else yet.** `npm run media` (`scripts/prepare-media.mjs`) builds `public/media/` from it. |
| Alternative rebuild from a cloud session (not used) | branch `archive/cloud-rebuild-2026-10-20` |
| Earlier prototype (archive, do not edit) | https://github.com/LorneH12/l-hopkins-next (first-pass cutouts and provenance records) |
| Earlier draft | https://l-hopkins-athlete.t94rpvbjtf.chatgpt.site |

## How the code is organised

```
index.html                 home page: hero, meets, title figure, long-jump pit, results sheet,
                           football, three uniforms, film, contact
credits.html               photo and video credits
src/main.js                entry: GSAP scroll motion, page behaviour
src/pit.js                 three.js long-jump pit
src/contact.js             contact form (Web3Forms relay; needs VITE_WEB3FORMS_KEY)
src/credits.js             credits page script
src/style.css              all styles
public/media/              web-sized photos and video (made by scripts/prepare-media.mjs)
.github/workflows/         build and deploy to GitHub Pages
PRODUCT.md                 site brief          QUESTIONS.md   open owner questions
```

```bash
npm install
npm run dev      # local preview
npm run build    # production build
npm run media    # rebuild public/media from assets-raw/ (owner's computer only)
```

## Rules

1. **The repo is the source of truth for what is live.** Notion records why and who approved, and is updated when the site changes.
2. **Log every meaningful decision** in Notion (Decisions) and in `DECISIONS.md`.
3. **Register every photo or video** in Notion (Asset Registry) and `ASSETS.md` before it goes on the site.
4. **Real photos only.** Original photos, or cutouts made directly from them. No generated, reconstructed or AI-edited images.
5. **Every result links to its official record.** Family-reported numbers are labelled as such.
6. **The parent email never appears** in the repo, build output, page source or Git history. Contact goes through the form relay.
7. **No internal production notes in public copy.**
8. **Never push or publish without the owner's go-ahead.**

## Open items (2026-10-20)

- **Back up `assets-raw/`** (for example to Google Drive). Right now the full-size originals exist only on one computer.
- Add the Web3Forms key (`VITE_WEB3FORMS_KEY`) so the contact form sends. Steps in `QUESTIONS.md`.
- Owner answers to `QUESTIONS.md`: club name, copy check.
- Confirm the live site loads at the link above.
- The prototype referenced an earlier Notion page (https://app.notion.com/p/3fdaae3a01ed81bc985eeee41d952020) that the current Notion connection cannot open; merge anything useful into the hub.

## Handover prompt for a new AI

```
You are taking over the L Hopkins athlete website. Read the Notion page
"L Hopkins Site · Source of Truth" (https://app.notion.com/p/3ff0ca41bc738177b59cf0471151b02a)
and its Decisions, Asset Registry and Copy & Content databases. Then clone
github.com/LorneH12/l-hopkins-site and read docs/HANDOVER.md, PRODUCT.md and QUESTIONS.md.
Follow the rules in HANDOVER.md. Do not push or publish without the owner's approval.
Start by summarising the current status and open items back to me.
```
