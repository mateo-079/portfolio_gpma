/* skills.js — Skill bars animation */
(function () {
  document.querySelectorAll('.skill-fill').forEach(fill => {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setTimeout(() => { fill.style.width = fill.dataset.w + '%'; }, 250);
        obs.unobserve(fill);
      });
    }, { threshold: 0.4 }).observe(fill);
  });
})();