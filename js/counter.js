/* counter.js — Animated stat counters (version fluide) */
(function () {
  function animateCounter(el, target, duration) {
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo — démarre vite, ralentit à la fin
      const eased = progress === 1
        ? 1
        : 1 - Math.pow(2, -10 * progress);

      const current = Math.floor(eased * target);
      el.textContent = current === target ? target + '+' : current;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      // Délai léger pour que la section soit bien visible avant de lancer
      setTimeout(() => animateCounter(el, target, 1600), 150);
      observer.unobserve(el);
    });
  }, { threshold: 0.7 });

  document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
})();