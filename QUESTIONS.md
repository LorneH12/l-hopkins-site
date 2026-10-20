# Open questions and decisions

Written while the site was built without you. Answer any of these and I'll update the site. Nothing here blocks the build.

## Needs you before launch

1. **Contact form key.** The form relays messages to the parent email through Web3Forms, so the address never appears in the site.
   - Go to https://web3forms.com and enter the parent email to get a free access key. It's emailed to you; no account is needed.
   - In GitHub, open the repo, then **Settings → Secrets and variables → Actions → Variables**, and add `VITE_WEB3FORMS_KEY` with the key.
   - Until then, the form checks what's typed but tells visitors it isn't sending yet.
2. **Club name.** The official results list L's club as "Tha Truth Track Tribe". I put it on "The sprinter" card. Keep it?
3. **Copy check.** Read the copy in the beat-writer voice. Every number comes from the old sites and links to its official result, but the phrasing is mine. Lines worth a look:
   - "Here is the file."
   - "Thirty seconds of the case"
   - "Don't take the results sheet's word for it"
   - "Lines up on defense and gets home"
   - "The track and the field come after the school day, not instead of it"

## Decisions I made (easy to change)

- **Results shown.** 11 entries from 2025–2026, each linked to its official result: Adkins Trak, AthleticLIVE, Athletic.net, Flash Results and MileSplit. Three come from the old results page and weren't on the home pages before:
  - the 2025 Nike 100 m (3rd, 12.30)
  - the 2026 AZ JO 200 m (1st, 25.58)
  - MileSplit's No. 1 long jump, 17′ 11.5″
- **Sacks.** "12 sacks", with a small note "Family count. MaxPreps lists 10."
- **Photos.** Only real photos and the cutouts made directly from the original photos. I left out every generated or reconstructed image and the master package's flagged F03 and F05.
- **Video.**
  - The highlight montage loops only its first 31 seconds, which skips the classroom clip that shows another student.
  - The Nike 100 m final plays with its sound only when someone presses play. It's credited to the broadcaster (RunnerSpace) on the credits page.
- **Credits.**
  - Team photo: Pattysflicks.
  - Everything else: family-owned, as you said.
- **No email anywhere.** The parent address isn't in the code, the build or the git history.

## Things I can't do from here

- **Email you.** No email tool is connected to this session, so everything is in this file and in the session summary instead.
