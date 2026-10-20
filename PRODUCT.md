# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + vanilla JavaScript, three.js (r186) for 3D, GSAP (3.15) for scroll and timeline motion. Static build deployed to GitHub Pages from `main` via `.github/workflows/deploy.yml`, served under `/l-hopkins-site/`. Chosen by the user (three.js/GSAP requested; scaffold approved).

## Users

Two audiences, weighted equally:

- **College coaches and recruiters.** Scanning many athletes quickly; need grad year, school, events, verified marks, film and a way to reach the family.
- **Family, friends and supporters** (including local sponsors). Following L's seasons, celebrating results, and possibly donating.

## Product Purpose

The public home of L Hopkins, a Class of 2030 student-athlete at Xavier College Preparatory (Phoenix, Arizona) who plays flag football for the Xavier Gators (jersey #7) and runs sprints and long jump. It replaces two earlier drafts (a chatgpt.site build and `lorneh12.github.io/l-hopkins-next`).

Success means a coach can verify who L is, what she has done and how to contact the family within one screen, and a supporter is moved to follow along or donate.

## Positioning

Few athletes this age have nationally ranked, officially sourced results: a 2025 USATF National Junior Olympic long-jump title, a fourth place at Nike Outdoor Nationals, and two meet records. The site is the sourced record of those results, told with a fan's conviction. Every claim links to an official result.

## Operating Context

- Coaches arrive from emails, social links or recruiting lists, often on a phone, and give the site seconds.
- Supporters arrive from Instagram (`@l.h0pkins`).
- Contact channels each have one job:
  - **Parent contact (private):** the primary contact for coaches, sponsors and real interest. The address is never published; visitors reach it through a contact form relayed by a form service (e.g. Web3Forms or Formspree), so only the service's public key appears in the site.
  - **Instagram (`@l.h0pkins`):** additional highlights, updates and following.
  - **Cash App (`$LHopkins7`):** donations, which support L's sports and education.

## Capabilities and Constraints

- Static site; no backend of its own. Parent contact is a form posted to a third-party form relay. No `mailto:` link, and the parent address must not appear anywhere in the repo, build output or page source.
- L is a minor. The adult-owned email is the front door for strangers; never present Instagram DMs as the way to contact the family.
- Stats are stated once, with the source; repeated disclaimers and reconciliation notes stay off the main page (a results/sources page may hold them).
- No internal production notes in public copy ("rough preview", "placeholder", "alpha footage", likeness caveats).
- Photo credit: most images are family-owned and need no credit. Credit others where the source is known, e.g. the team photo ("Pattysflicks", as on the chatgpt.site version) and any broadcast or event frames, on a credits page.

## Brand Commitments

- Name: **L Hopkins**. School: Xavier College Preparatory; team: Xavier Gators; jersey **#7**. The jersey-number idea from the chatgpt.site hero is worth keeping.
- **Voice: a sports beat writer who is a die-hard fan.** Third person, exposé energy, game-story rhythm, confident and specific. The enthusiasm is in the writing; the facts stay exact and sourced. Existing copy refers to L as she/her and she competes in girls' divisions.
- Xavier school colours (navy/blue, green) are an existing association; a visual direction is not yet chosen.

## Evidence on Hand

Results (from both prior sites, each with an official result link to carry over):

- 2025 USATF National Junior Olympics, girls 13–14 long jump: **champion, 5.17 m** (July 25, 2025).
- 2026 Nike Outdoor Nationals, middle-school girls 100 m final: **4th, 12.08 s** (+0.3 m/s, June 22, 2026).
- 2026 New Balance Nationals Indoor: **bronze, 60 m in 7.59 s**, and **bronze in long jump, 5.28 m**.
- 2025 Pioneer Meet: **long-jump meet record, 5.22 m** (April 26, 2025; wind not reported).
- 2025 Arizona Association JO Championships: **100 m meet record, 12.27 s** (June 15, 2025; −0.3 m/s).
- No. 1 in 2026 USATF Region 10 girls 13–14 100 m rankings, and No. 1 Arizona middle-school girls 100 m (final ranking June 27, 2026). Both rankings are dated; recheck before launch.
- 2026 flag football: **12 sacks** and 78 punt-return yards over 5 of 11 regular-season games (family-reported; MaxPreps lists 10 sacks).

Media in `assets-raw/` (gitignored; only optimized copies get committed):

- `photos/`: 25 original photographs (`55…_o.jpg`), plus `IMG_1805.jpeg`, `36AF179D-….jpeg` and `Picture1.png`.
- `cutouts-firstpass/`: six **original-pixel** alpha cutouts (no generated content). These are the preferred cutouts, with provenance in `provenance.json`.
- `cutouts-master/`: the ranked package and placement guide. **Do not use F03** (jersey number altered to 1) or **F05** (reconstructed content). Others are flagged "re-mask original for final".
- `cutouts-existing/`: S01 and T01 are generated or normalized derivatives with known likeness limits. Use only F01.
- `video/L-Hopkins-41.5-second-montage.mp4`; `logos/xavier-college-preparatory-phoenix-az_01dd11c41c.png`.

Absent; do not fabricate: testimonials, coach quotes, GPA or academic awards, height/weight, college interest or offers, sponsor names.

## Product Principles

1. **Proof first, story around it.** The national title and verified marks are the hook. The narrative amplifies them and never delays them.
2. **Fan voice, reporter facts.** Write with a die-hard fan's energy and a beat writer's precision. Every number is exact, dated and linked.
3. **Real likeness only.** Use original photographs and original-pixel cutouts of L. Do not use generated or reconstructed likenesses, altered uniforms or invented footage.
4. **An adult answers the door.** Serious contact goes to the parent email. Instagram is for following and Cash App for donating, and each is labelled for its job.
5. **One clear path per audience.** A coach and a supporter each find their next step without wading through the other's.

## Accessibility & Inclusion

Carry over the prior sites' strengths: a skip link, honoured `prefers-reduced-motion` with a user motion toggle, alt text, and captions or descriptions for video. Minimum readable text size (no functional text under 12px). Motion-heavy 3D must have a static fallback.
