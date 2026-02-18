/* ===========================
   PORTFOLIO — Prince-Matéo Gounou
   script.js
   =========================== */

/* ── PAGE LOAD FADE-IN ── */
document.body.style.opacity = '0';
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
});

/* ── CUSTOM CURSOR ── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let trailX = mouseX;
let trailY = mouseY;
let rafId;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.11;
  trailY += (mouseY - trailY) * 0.11;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  rafId = requestAnimationFrame(animateTrail);
}
animateTrail();

// Hover state
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity      = '0';
  cursorTrail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity      = '1';
  cursorTrail.style.opacity = '1';
});

/* ── NAV SCROLL EFFECT ── */
const nav = document.getElementById('nav');

const updateNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── HAMBURGER / MOBILE MENU ── */
const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose   = document.getElementById('mobileClose');
const mobileLinks   = document.querySelectorAll('.mobile-link');

const openMenu = () => {
  hamburger.classList.add('active');
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-label', 'Fermer le menu');
};

const closeMenu = () => {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-label', 'Ouvrir le menu');
};

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ── HERO ENTRANCE ANIMATION ── */
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

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseFloat(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay * 1000);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BARS ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target;
    const w    = fill.dataset.w;
    setTimeout(() => { fill.style.width = w + '%'; }, 250);
    skillObserver.unobserve(fill);
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1400) {
  let current   = 0;
  const step    = 16;
  const steps   = duration / step;
  const inc     = target / steps;

  const timer = setInterval(() => {
    current += inc;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, step);
}

const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    animateCounter(el, target);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

statNums.forEach(el => counterObserver.observe(el));

/* ── PROJECT CARD 3D TILT ── */
document.querySelectorAll('.project-card').forEach(card => {
  const screen = card.querySelector('.project-screen');
  if (!screen) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 .. 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    screen.style.transform =
      `perspective(700px) rotateY(${nx * 6}deg) rotateX(${-ny * 6}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    screen.style.transform = '';
  });
});

/* ── HERO BG TEXT PARALLAX ── */
const heroBgText = document.querySelector('.hero-bg-text');

const handleParallax = () => {
  if (!heroBgText) return;
  heroBgText.style.transform = `translateY(${window.scrollY * 0.28}px)`;
};

window.addEventListener('scroll', handleParallax, { passive: true });

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id     = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 20;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeSectionObserver.observe(s));
