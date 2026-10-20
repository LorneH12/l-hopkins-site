import './style.css';
import { initContact } from './contact.js';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Visitor's own motion switch, remembered in this browser only.
const MOTION_KEY = 'lh-motion-off';
function readMotionOff() {
  try { return localStorage.getItem(MOTION_KEY) === '1'; } catch { return false; }
}
function setMotionOff(off) {
  root.classList.toggle('motion-off', off);
  try { localStorage.setItem(MOTION_KEY, off ? '1' : '0'); } catch { /* storage blocked */ }
  const toggle = document.querySelector('[data-motion-toggle]');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(off));
    toggle.textContent = off ? 'Motion on' : 'Motion off';
  }
  document.querySelectorAll('video[data-loop]').forEach((v) => (off ? v.pause() : null));
}
const motionAllowed = () => !reducedMotion.matches && !root.classList.contains('motion-off');

setMotionOff(readMotionOff());
document.querySelector('[data-motion-toggle]')?.addEventListener('click', () => {
  setMotionOff(!root.classList.contains('motion-off'));
});

// Entrances: heading, text, picture, staggered once as each section arrives.
document.querySelectorAll('section').forEach((section) => {
  section.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--i', i));
});
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.matches('[data-reveal]') ? 'is-in' : 'is-seen');
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
);
document.querySelectorAll('[data-reveal], .film__shot, .football__photo').forEach((el) => revealObserver.observe(el));

// Muted loops play only while on screen, and stop before the clip that shows another student.
const loopObserver = new IntersectionObserver((entries) => {
  for (const { target, isIntersecting } of entries) {
    if (isIntersecting && motionAllowed()) target.play().catch(() => {});
    else target.pause();
  }
}, { threshold: 0.25 });
document.querySelectorAll('video[data-loop]').forEach((video) => {
  const end = parseFloat(video.dataset.loopEnd);
  if (end) {
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= end) video.currentTime = 0;
    });
  }
  loopObserver.observe(video);
});

// The race film plays with its sound only when asked.
const race = document.querySelector('[data-race]');
const raceToggle = document.querySelector('[data-race-toggle]');
if (race && raceToggle) {
  const label = () => {
    const playing = !race.paused;
    raceToggle.setAttribute('aria-pressed', String(playing));
    raceToggle.textContent = playing ? 'Pause the race' : race.currentTime > 0 ? 'Play on, sound on' : 'Play the race, sound on';
  };
  raceToggle.addEventListener('click', () => (race.paused ? race.play() : race.pause()));
  race.addEventListener('play', label);
  race.addEventListener('pause', label);
  race.addEventListener('ended', () => { race.currentTime = 0; label(); });
}

// The pit: load three.js only when the section comes near.
const pit = document.querySelector('[data-pit]');
const form = document.querySelector('[data-measure-form]');
if (pit && form) {
  const range = form.querySelector('input[type=range]');
  const out = form.querySelector('[data-height-out]');
  const result = form.querySelector('[data-measure-result]');
  let scene = null;
  const JUMP = 5.17;
  const render = () => {
    const cm = Number(range.value);
    const times = JUMP / (cm / 100);
    out.textContent = `${cm} cm`;
    result.innerHTML = `At ${cm} cm, it takes <strong>${times.toFixed(1)} of you</strong>, head to toe, to reach her mark.`;
    scene?.setHeight(cm / 100);
  };
  range.addEventListener('input', render);
  form.addEventListener('submit', (e) => e.preventDefault());
  render();

  const pitObserver = new IntersectionObserver(async ([entry]) => {
    if (!entry.isIntersecting) return;
    pitObserver.disconnect();
    try {
      const { createPit } = await import('./pit.js');
      scene = createPit(pit, { jump: JUMP, height: Number(range.value) / 100, animate: motionAllowed });
      pit.classList.add('pit-ready');
    } catch {
      // WebGL unavailable: the written fallback stays in place.
    }
  }, { rootMargin: '400px 0px' });
  pitObserver.observe(pit);
}

initContact(document.querySelector('[data-contact-form]'));
