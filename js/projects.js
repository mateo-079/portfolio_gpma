/* projects.js — 3D tilt effect sur les project cards */
(function () {
  document.querySelectorAll('.project-card').forEach(card => {
    const screen = card.querySelector('.project-screen');
    if (!screen) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      screen.style.transform =
        `perspective(700px) rotateY(${nx * 6}deg) rotateX(${-ny * 6}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      screen.style.transform = '';
    });
  });
})();