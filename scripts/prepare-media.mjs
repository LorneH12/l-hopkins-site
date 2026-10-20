// Turns the full-size originals in assets-raw/ (kept out of git) into the
// web-sized files the site ships in public/media/. Run: npm run media
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const RAW = 'assets-raw';
const OUT = 'public/media';

const photo = (id) => `${RAW}/photos/${id}_o.jpg`;
const cutout = (name) => `${RAW}/cutouts-firstpass/${name}.png`;

// [output name, source, width, height, options]
const jobs = [
  // Hero: the first screen's full-height portrait
  ['hero-portrait', photo('55562979016_ee1ab67d12'), 1000, 1800, { position: 'top' }],
  // Football showcase, tight on the jersey: a band from the hair to the shorts of the upright original (4640 x 6960)
  ['football-close', photo('55561953342_8c28d82e29'), 2400, 1350, { extract: { left: 0, top: 1150, width: 4640, height: 2610 } }],
  ['football-close-phone', photo('55561953342_8c28d82e29'), 900, 1500, { extract: { left: 700, top: 700, width: 3240, height: 5400 } }],
  ['football-whole', photo('55563135809_28f07b1129'), 720, 480],
  // "Three uniforms" portraits, 4:5
  ['portrait-football', photo('55563378245_88cd6570fb'), 1000, 1250, { position: 'top' }],
  ['portrait-school', cutout('School-Standing-IMG2523'), 1000, 1250, { cutout: true }],
  ['portrait-track', cutout('Track-Side-Walking-IMG1966'), 640, 800, { cutout: true }],
  // Team photo for the film sequence
  ['team', photo('55561952312_f6e2d2dfd9'), 2400, 1350],
  ['team-phone', photo('55561952312_f6e2d2dfd9'), 900, 1500],
  // Social card
  ['og', photo('55561955322_cf60f4d266'), 1200, 630, { format: 'jpg' }],
];

await fs.mkdir(OUT, { recursive: true });

for (const [name, src, width, height, opts = {}] of jobs) {
  let img = sharp(src).rotate();
  if (opts.extract) img = sharp(await img.toBuffer()).extract(opts.extract);
  if (opts.cutout) {
    // Trim the transparent canvas to the subject, then fit it inside the frame without enlarging.
    img = sharp(await img.trim().toBuffer()).resize(width, height, {
      fit: 'contain',
      withoutEnlargement: true,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  } else {
    img = img.resize(width, height, { fit: 'cover', position: opts.position ?? 'centre' });
  }
  const file = path.join(OUT, `${name}.${opts.format ?? 'webp'}`);
  await (opts.format === 'jpg' ? img.jpeg({ quality: 82, mozjpeg: true }) : img.webp({ quality: 78, alphaQuality: 90 })).toFile(file);
  const { size } = await fs.stat(file);
  console.log(`${file}  ${Math.round(size / 1024)} KB`);
}

// Videos and the montage poster ship as they are (no encoder on this machine).
for (const [from, to] of [
  [`${RAW}/video/L-Hopkins-41.5-second-montage.mp4`, 'montage.mp4'],
  [`${RAW}/video/l-hopkins-highlights-poster.jpg`, 'montage-poster.jpg'],
  [`${RAW}/video/nike-100m-final.mp4`, 'nike-100m-final.mp4'],
]) {
  await fs.copyFile(from, path.join(OUT, to));
  console.log(`${OUT}/${to}  copied`);
}
