/* reveal.js — Scroll reveal (fallback JS si le browser ne supporte pas scroll-driven CSS) */
(function () {
  if (CSS.supports('animation-timeline', 'view()')) return;

  document.querySelectorAll('.reveal-up').forEach(el => {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseFloat(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }).observe(el);
  });
})();