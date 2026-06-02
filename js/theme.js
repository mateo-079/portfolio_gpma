/* theme.js — Bascule thème sombre / clair */
(function () {
  const STORAGE_KEY = 'pmg-theme';
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  if (!btn) return;

  /* ── Thème initial ── */
  const saved         = localStorage.getItem(STORAGE_KEY);
  const prefersDark   = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme  = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme, false);

  /* ── Clic ── */
  btn.addEventListener('click', () => {
    const current = root.dataset.theme || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  });

  /* ── Changement de préférence système (si pas de choix manuel) ── */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  function applyTheme(theme, save) {
    root.dataset.theme = theme;
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'
    );
    if (save) localStorage.setItem(STORAGE_KEY, theme);
  }
})();
