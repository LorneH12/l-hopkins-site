# Decisions log

Snapshot of the Notion Decisions database, 2026-10-20. Notion is authoritative; add new decisions there and here.

| # | Date | Area | Decision | Status | Approved by | Why / notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | — | Images | Original photos only: background removal only, no AI generation or edits to the person | Approved | Owner (l-hopkins-next README, superseding correction) | Truthful likeness. No reconstruction, recolouring, face or body edits, added anatomy or footwear. |
| 2 | — | Images | Remove AI-generated Student and Track stills | Approved | Owner (l-hopkins-next README) | Follows rule 1. They remain in old Git history only. |
| 3 | 2026-10-19 | Images | Use the owner-selected ChatGPT-edited images for the track hands-on-hips pose and the smiling school pose | Approved | Owner (`provenance/selected-edited-provenance.json`) | Exception to rule 1. Approved for Accomplishments and Contact; the rebuild moved the track pose to the Hero, which still needs owner confirmation. |
| 4 | 2026-10-19 | Images | Use the owner-selected edited/upscaled image for the Track card | Approved | Owner (`provenance/track-card-provenance.json`) | Only web downsampling and framing applied. |
| 5 | — | Images | Leave out the hoodie pose | Approved | l-hopkins-next README | Source photo clips the head. |
| 6 | — | Privacy & safety | Make the project repositories public | Approved | Owner | Needed for free GitHub Pages hosting. |
| 7 | 2026-10-20 | Code & hosting | Rebuild in a new repo, l-hopkins-site, with separate folders for content, CSS, JS and media | Approved | Owner (chat request) | Easier maintenance and handover. l-hopkins-next stays as an untouched archive. |
| 8 | 2026-10-20 | Code & hosting | Content in JSON, rendered to HTML at build time with Vite; auto-publish to GitHub Pages on push | Proposed | Claude; owner to confirm | One place to edit text and stats; works without JavaScript; no manual publishing. |
| 9 | 2026-10-20 | Copy | Remove behind-the-scenes production notes from visitor-facing text | Proposed | Claude; owner to confirm | Internal notes ("rough preview", "likeness deviations") confused visitors. |
| 10 | 2026-10-20 | Video | Keep the AI rough-cut video off the site; Hero uses a photo instead | Needs owner decision | — | Generated footage with likeness and uniform deviations conflicts with rule 1. |
| 11 | 2026-10-20 | Design | Fonts: Barlow Condensed (headlines, numbers) and Inter (body), self-hosted | Proposed | Claude; owner to confirm | Athletic look, clear numbers, no external requests. |
| 12 | 2026-10-20 | Images | Web photos: trim empty transparent margins, convert to WebP, max 1400 px | Proposed | Claude; owner to confirm | About 20× smaller files. No pixels of the person changed. Originals stay in l-hopkins-next. |
| 13 | 2026-10-20 | Privacy & safety | Public Cash App link and personal details for a minor | Needs owner decision | — | Confirm the family is comfortable; check with the school athletic director about eligibility rules on accepting money. |
| 14 | 2026-10-20 | Copy | Student card headline changed to "Student. Mentor. Leader." | Needs owner decision | — | Previous headline repeated "Class of 2030". Revert in `src/content/chapters.json` if not wanted. |
| 15 | 2026-10-20 | Process | Git repo is the source of truth for files; Notion for decisions, approvals and status | Proposed | Set up by Claude at owner's request | Avoids two competing copies of the same text or image. |
