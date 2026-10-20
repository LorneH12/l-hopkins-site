// Shared helpers for the build-time templates.

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text before it goes into HTML. Every value from content/*.json passes through this. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** Join a headline array with line breaks: ["One athlete.", "Every possibility."] */
export const lines = (parts) => parts.map(esc).join('<br>');

/** A cut-out photo. Paths in content are relative to public/. */
export const photo = ({ src, alt, width, height }, { eager = false, className = '' } = {}) =>
  `<img class="${className}" src="${esc(src)}" alt="${esc(alt)}" width="${width}" height="${height}" ` +
  `${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

/** An external link that opens in a new tab. */
export const extLink = ({ label, href }, className = '') =>
  `<a class="${className}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;

/** A number that counts up on scroll. The final value is in the HTML, so it reads correctly without JavaScript. */
export const counter = (value, unit = '') =>
  `<span class="stat-value"><span data-count="${esc(value)}">${esc(value)}</span>` +
  (unit ? `<span class="stat-unit">${esc(unit)}</span>` : '') + `</span>`;
