// Entry point: loads fonts and styles, then starts each small behaviour.
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource-variable/inter';

import '../css/tokens.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/components/buttons.css';
import '../css/components/nav.css';
import '../css/components/hero.css';
import '../css/components/cutout.css';
import '../css/components/about.css';
import '../css/components/results.css';
import '../css/components/chapters.css';
import '../css/components/videos.css';
import '../css/components/contact.css';
import '../css/components/footer.css';

import { initReveal } from './reveal.js';
import { initCounters } from './counters.js';
import { initVideos } from './videos.js';

document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initReveal({ reducedMotion });
initCounters({ reducedMotion });
initVideos();
