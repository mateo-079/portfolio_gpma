/* premium.js — Magnetic buttons · Text scramble hero · Cursor glow */
(function () {

  /* ── TEXT SCRAMBLE sur le hero au load ── */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

  function scramble(el, finalText, duration) {
    if (!el) return;
    const original = finalText || el.textContent;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);

    const timer = setInterval(() => {
      el.textContent = original.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        const progress = frame / totalFrames;
        const charReveal = i / original.length;
        if (progress > charReveal + 0.3) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      frame++;
      if (frame >= totalFrames) {
        el.textContent = original;
        clearInterval(timer);
      }
    }, 16);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const line1 = document.querySelector('.hero-title .line:first-child');
    const line2 = document.querySelector('.hero-title .line.italic');
    if (line1) setTimeout(() => scramble(line1, line1.textContent, 900), 300);
    if (line2) setTimeout(() => scramble(line2, line2.textContent, 900), 550);
  });

  /* ── MAGNETIC BUTTONS ── */
  function initMagnetic(selector, strength) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect   = btn.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) * strength;
        const dy     = (e.clientY - cy) * strength;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    initMagnetic('.btn-primary', 0.28);
    initMagnetic('.btn-ghost',   0.22);
    initMagnetic('.btn-cv',      0.22);
    initMagnetic('.project-arrow', 0.35);
  });

  /* ── CURSOR GLOW en mode clair ── */
  const cursor = document.getElementById('cursor');
  if (cursor) {
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      cursor.style.background    = isLight ? '#3b5bdb' : '#c8ff00';
      cursor.style.mixBlendMode  = isLight ? 'normal'  : 'difference';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  /* ── HOVER GLOW sur les project cards ── */
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        card.style.setProperty('--glow-op', '1');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--glow-op', '0');
      });
    });
  });

})();