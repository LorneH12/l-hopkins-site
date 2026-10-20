# L Hopkins · Class of 2030

The athlete site for L Hopkins: flag football, student life, and track & field.

Live site: https://lorneh12.github.io/l-hopkins-site/

**New to this project?** Read [`docs/HANDOVER.md`](docs/HANDOVER.md) first. Decisions, approvals and status are tracked in Notion: https://app.notion.com/p/3ff0ca41bc738177b59cf0471151b02a

## Updating the site

Most changes only need one JSON file in `src/content/`. Push to `main` and the site rebuilds and publishes by itself (about a minute).

| To change… | Edit |
| --- | --- |
| Name, headline, intro, About text, Instagram or Cash App links | `src/content/site.json` |
| Competition results (the green cards) | `src/content/results.json` |
| Flag football, Student and Track stats | `src/content/chapters.json` |
| Videos and their descriptions | `src/content/videos.json` |
| Colours, fonts, spacing | `src/css/tokens.css` |

To add a new result, copy one block in `results.json`, paste it below, and change the values.

To add a photo or video, put the file in `public/media/photos/` or `public/media/video/` and reference it as `media/photos/your-file.webp`.

## Folder structure

```
l-hopkins-site/
├── index.html               page shell; <!-- @section --> markers are filled at build time
├── vite.config.js           build setup, and the plugin that turns content into HTML
├── public/media/
│   ├── photos/              cut-out photos (WebP)
│   └── video/               videos, posters and the visual-description track
├── src/
│   ├── content/             all text, stats, results and links (JSON)
│   ├── templates/           one function per page section (sections.js) and shared helpers
│   ├── css/
│   │   ├── tokens.css       colours, fonts, sizes
│   │   ├── base.css         reset and typography
│   │   ├── layout.css       sections and grids
│   │   └── components/      one file per part of the page (hero, results, videos…)
│   └── js/
│       ├── main.js          entry point: loads fonts, styles and the modules below
│       ├── reveal.js        photos fade in on scroll
│       ├── counters.js      numbers count up on scroll
│       └── videos.js        only one video plays at a time
├── docs/
│   ├── HANDOVER.md          start here: rules, status, handover prompt
│   ├── DECISIONS.md         decisions log (backup of Notion)
│   ├── ASSETS.md            every photo and video, source and approval (backup of Notion)
│   └── provenance/          original source and approval records
└── .github/workflows/       automatic build and publish to GitHub Pages
```

## Working on it locally

Needs Node.js 20 or newer.

```bash
npm install
npm run dev       # live preview at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build
```

The page is plain HTML after the build: content is rendered at build time, so it reads correctly with JavaScript turned off. JavaScript only adds the scroll animations.

## Media and credits

Photos are the owner-approved cut-outs from the earlier `l-hopkins-next` prototype, trimmed and converted to WebP for the web. Videos keep their original sound and visible broadcaster and creator credits. See `docs/provenance/` for sources and approvals.
