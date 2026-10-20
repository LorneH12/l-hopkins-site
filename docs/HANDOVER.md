# Handover: L Hopkins site

**Read this first** if you are a person or an AI picking up this project.

Notion hub (authoritative for decisions, approvals and status):
https://app.notion.com/p/3ff0ca41bc738177b59cf0471151b02a

This file, `DECISIONS.md` and `ASSETS.md` are backup snapshots of that hub, taken 2026-10-20. If they disagree with Notion, Notion wins. If Notion is unavailable, these files are the record.

## What this is

A public athlete website for L Hopkins, Xavier College Preparatory, Class of 2030: flag football, student life, and track & field (sprints and long jump).

## Where things live

| What | Where |
| --- | --- |
| Live site | https://lorneh12.github.io/l-hopkins-site/ (after the first push and enabling Pages) |
| Code, images, copy (source of truth for files) | this repo |
| Previous prototype (archive, do not edit) | https://github.com/LorneH12/l-hopkins-next (full-size original PNGs and provenance) |
| Earlier media source | LorneH12/l-hopkins-athlete |
| Older ChatGPT-built version | https://l-hopkins-athlete.t94rpvbjtf.chatgpt.site (not yet reviewed) |
| Decisions, approvals, asset and copy tracking | Notion hub above |

## Rules

1. **This repo is the source of truth for files.** Live text and stats are in `src/content/*.json`; photos and videos are in `public/media/`. Notion records why and who approved, and is updated whenever files change.
2. **Log every meaningful decision** in Notion (Decisions), and add it to `DECISIONS.md` when you commit.
3. **Register every image or video** in Notion (Asset Registry) and `ASSETS.md` before it goes on the site.
4. **Track copy changes** in Notion (Copy & Content).
5. **Images:** original photos only, background removal only. No AI generation, no face or body edits, no added anatomy, footwear or uniform changes, no recolouring. Known exceptions: the two ChatGPT-edited images the owner selected on 2026-10-19 (`track-hands-on-hips.webp`, `school-smiling.webp`). Add no more edited images without a new owner decision.
6. **Facts must be verifiable.** Every competition result links to its official meet record. Family-reported stats are labelled family-reported. Do not publish the pending claims listed in `provenance/track-records-provenance.json` (`unpublished_pending`).
7. **Never push or publish without the owner's go-ahead.**

## Status (2026-10-20)

Done:
- Site rebuilt with a clean structure (see the README)
- Behind-the-scenes production notes removed from visitor-facing copy
- Photos trimmed and converted to WebP

Open:
- First push to GitHub: the Claude GitHub App needs access to this repo, or the owner pushes from their computer
- Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
- Owner review of copy marked "Needs review" in Notion
- Owner to confirm the edited track photo in the Hero, or choose an original photo
- Family decision on the public Cash App link and personal details for a minor
- Confirm the classmate in the Spanish class video is happy to appear publicly
- Owner decision on the AI rough-cut video (currently off the site)
- Review the ChatGPT-built version for anything worth keeping
- The prototype referenced an earlier Notion page (https://app.notion.com/p/3fdaae3a01ed81bc985eeee41d952020) that the current Notion connection cannot open; merge anything useful into the hub

## Handover prompt for a new AI

```
You are taking over the L Hopkins athlete website. Read the Notion page
"L Hopkins Site · Source of Truth" (https://app.notion.com/p/3ff0ca41bc738177b59cf0471151b02a)
and its Decisions, Asset Registry and Copy & Content databases. Then clone
github.com/LorneH12/l-hopkins-site and read docs/HANDOVER.md. Follow the rules there:
the repo is the source of truth for files, log decisions in Notion, register every asset
before use, original photos only, every result links to its official record, and do not
push or publish without the owner's approval. Start by summarising the current status
and open items back to me.
```
