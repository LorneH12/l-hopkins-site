// One function per page section. Each takes content from src/content and returns HTML.
// vite.config.js calls these at build time and drops the result into index.html.

import { esc, lines, photo, extLink, counter } from './helpers.js';

export function hero(site) {
  const h = site.hero;
  return `
<section class="hero" id="home" aria-labelledby="hero-title">
  <div class="hero__copy">
    <p class="eyebrow">${esc(h.eyebrow)}</p>
    <h1 id="hero-title">${esc(h.headline[0])}<br><em>${esc(h.headline[1])}</em></h1>
    <p class="hero__intro">${esc(h.intro)}</p>
    <a class="button button--solid" href="#about">Meet L <span aria-hidden="true">↓</span></a>
  </div>
  <div class="hero__photo">${photo(h.photo, { eager: true })}</div>
  <p class="hero__tags">Flag football <span aria-hidden="true">•</span> Student <span aria-hidden="true">•</span> Track &amp; field</p>
</section>`;
}

export function about(site) {
  const a = site.about;
  return `
<section class="about split" id="about" aria-labelledby="about-title">
  <div class="cutout reveal">${photo(a.photo)}</div>
  <div class="copy">
    <p class="eyebrow">${esc(a.eyebrow)}</p>
    <h2 id="about-title">${lines(a.headline)}</h2>
    <p class="subtitle">${esc(a.subtitle)}</p>
    ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    <a class="text-link" href="#accomplishments">A few milestones <span aria-hidden="true">↓</span></a>
  </div>
</section>`;
}

export function accomplishments(results) {
  const cards = results.map((r) => `
    <li class="result">
      <p class="result__place">${esc(r.place)}</p>
      <p class="result__mark">${counter(r.mark, r.unit)}</p>
      <h3>${esc(r.meet)}</h3>
      <p class="result__detail">${esc(r.detail)}</p>
      <p>${r.links.map((l) => extLink(l)).join(' · ')}</p>
    </li>`).join('');
  return `
<section class="accomplishments" id="accomplishments" aria-labelledby="accomplishments-title">
  <div class="section-heading">
    <p class="eyebrow">My accomplishments</p>
    <h2 id="accomplishments-title">A national title.<br>National podium finishes.</h2>
    <p>Every result links to the official meet record.</p>
  </div>
  <ul class="results" role="list">${cards}
  </ul>
</section>`;
}

export function chapters(list) {
  const cards = list.map((c) => {
    const stats = c.stats.map((s) => `
          <li>
            <p class="chapter__stat">${counter(s.value, s.unit)}</p>
            <p>${esc(s.label)}${s.href ? `<br>${extLink({ label: 'Official result', href: s.href })}` : ''}</p>
          </li>`).join('');
    return `
  <article class="chapter chapter--${esc(c.id)}">
    <div class="chapter__photo">${photo(c.photo)}</div>
    <div class="chapter__body">
      <p class="chapter__number">${esc(c.number)}</p>
      <h3>${esc(c.title)}</h3>
      <h4>${esc(c.headline)}</h4>
      <p>${esc(c.summary)}</p>
      <ul class="chapter__stats" role="list">${stats}
      </ul>
      ${c.extra ? `<p>${esc(c.extra)}</p>` : ''}
      ${c.source ? `<p class="source-note">${esc(c.source)}</p>` : ''}
    </div>
  </article>`;
  }).join('');
  return `
<section class="chapters" id="known" aria-labelledby="known-title">
  <div class="section-heading">
    <p class="eyebrow">Three parts. One story.</p>
    <h2 id="known-title">What I am known for.</h2>
  </div>
  <div class="chapter-grid">${cards}
  </div>
</section>`;
}

export function videos(v) {
  const f = v.featured;
  const cards = v.library.map((item) => `
    <article class="video-card">
      <video controls playsinline preload="none" poster="${esc(item.poster)}" aria-label="${esc(item.title)}">
        <source src="${esc(item.src)}" type="video/mp4">
      </video>
      <p class="eyebrow">${esc(item.tag)}</p>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
    </article>`).join('');
  return `
<section class="videos" id="videos" aria-labelledby="videos-title">
  <div class="section-heading">
    <p class="eyebrow">In motion</p>
    <h2 id="videos-title">${esc(f.title)}.</h2>
  </div>
  <figure class="featured-video">
    <video controls playsinline preload="none" poster="${esc(f.poster)}" aria-label="${esc(f.title)}">
      <source src="${esc(f.src)}" type="video/mp4">
      <track kind="descriptions" src="${esc(f.descriptions)}" srclang="en" label="Visual descriptions">
    </video>
    <figcaption>${esc(f.description)}</figcaption>
  </figure>
  <h3 class="library-heading">More of the journey</h3>
  <div class="video-grid">${cards}
  </div>
</section>`;
}

export function contact(site) {
  const c = site.contact;
  const blocks = c.links.map((l) => `
      <div class="contact__block">
        <h3>${esc(l.heading)}</h3>
        <p>${esc(l.text)}</p>
        ${extLink(l, `button button--${esc(l.style)}`)}
      </div>`).join('');
  return `
<section class="contact split" id="contact" aria-labelledby="contact-title">
  <div class="copy">
    <p class="eyebrow">${esc(c.eyebrow)}</p>
    <h2 id="contact-title">${lines(c.headline)}</h2>${blocks}
  </div>
  <div class="cutout reveal">${photo(c.photo)}</div>
</section>`;
}
