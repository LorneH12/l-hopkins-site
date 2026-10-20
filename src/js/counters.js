// Counts stats up from zero when they scroll into view.
// The HTML already holds the final number, so screen readers and no-JS visitors see the real value.
const DURATION = 1200;

function animate(node) {
  const target = Number(node.dataset.count);
  const decimals = (node.dataset.count.split('.')[1] || '').length;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    node.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
    else node.textContent = node.dataset.count;
  };
  requestAnimationFrame(step);
}

export function initCounters({ reducedMotion }) {
  const nodes = document.querySelectorAll('[data-count]');
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      animate(entry.target);
    });
  }, { threshold: 0.6 });
  nodes.forEach((node) => {
    if (Number.isNaN(Number(node.dataset.count))) return;
    node.closest('.stat-value')?.setAttribute('aria-label', node.dataset.count);
    observer.observe(node);
  });
}
