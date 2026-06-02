/* hero.js — Entrance animation + parallax */
(function () {
  /* ── Hero entrance ── */
  window.addEventListener('DOMContentLoaded', () => {
    const els = [
      document.querySelector('.hero-tag'),
      document.querySelector('.hero-title .line:first-child'),
      document.querySelector('.hero-title .line.italic'),
      document.querySelector('.hero-sub'),
      document.querySelector('.hero-cta'),
    ];

    els.forEach((el, i) => {
      if (!el) return;
      el.style.transitionDelay = `${0.05 + i * 0.12}s`;
      setTimeout(() => el.classList.add('visible'), 80 + i * 120);
    });
  });

  /* ── Parallax bg text ── */
  const heroBgText = document.querySelector('.hero-bg-text');

  window.addEventListener('scroll', () => {
    if (!heroBgText) return;
    heroBgText.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });
})();