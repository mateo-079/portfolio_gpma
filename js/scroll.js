/* scroll.js — Smooth scroll sur les ancres internes */
(function () {
  const nav = document.getElementById('nav');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (nav?.offsetHeight ?? 80) + 20;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
})();