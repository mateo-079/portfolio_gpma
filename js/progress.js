/* progress.js — Barre de progression de lecture */
(function () {
  const bar = document.getElementById('readProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docH     = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();