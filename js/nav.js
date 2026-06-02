/* nav.js — Nav scroll · Hamburger · Theme toggle · Active links */
(function () {
  const nav           = document.getElementById('nav');
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose   = document.getElementById('mobileClose');
  const themeToggle   = document.getElementById('themeToggle');

  /* ── NAV SCROLL ── */
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── HAMBURGER FIX
     cursor:none sur html bloque pointer-events sur certains mobiles.
     On force pointer-events et cursor sur le bouton lui-même. ── */
  hamburger.style.pointerEvents = 'all';
  hamburger.style.cursor = 'pointer';

  const openMenu = () => {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fermer le menu');
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Ouvrir le menu');
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (mobileClose)   mobileClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ── THEME TOGGLE ── */
  const savedTheme = localStorage.getItem('pmg-theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeToggle) themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
      if (themeToggle) themeToggle.innerHTML = iconMoon();
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) themeToggle.setAttribute('aria-label', 'Passer en mode clair');
      if (themeToggle) themeToggle.innerHTML = iconSun();
    }
    localStorage.setItem('pmg-theme', theme);
  }

  if (themeToggle) {
    themeToggle.style.cursor = 'pointer';
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  function iconSun() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>`;
  }

  function iconMoon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
  }

  /* ── ACTIVE NAV LINK ── */
  const navAnchors = document.querySelectorAll('.nav-links a');
  document.querySelectorAll('section[id]').forEach(section => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
        );
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(section);
  });
})();