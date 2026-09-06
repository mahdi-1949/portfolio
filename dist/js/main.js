const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const year = document.querySelector('#year');

// Load portrait and layout polish after the core stylesheet.
if (!document.querySelector('link[data-portrait-styles]')) {
  const portraitStyles = document.createElement('link');
  portraitStyles.rel = 'stylesheet';
  portraitStyles.href = 'css/portraits.css?v=20260907-2';
  portraitStyles.dataset.portraitStyles = 'true';
  document.head.appendChild(portraitStyles);
}

if (!document.querySelector('link[data-portfolio-fixes]')) {
  const portfolioFixes = document.createElement('link');
  portfolioFixes.rel = 'stylesheet';
  portfolioFixes.href = 'css/portfolio-fixes.css?v=20260907-2';
  portfolioFixes.dataset.portfolioFixes = 'true';
  document.head.appendChild(portfolioFixes);
}

// Personal-brand photography: hero, about and final CTA.
const portraitVersion = '20260907-hq';
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && !heroVisual.querySelector('.hero-person-card')) {
  heroVisual.insertAdjacentHTML('afterbegin', `
    <div class="hero-person-card" aria-label="Portrait of Mahdi Tavakoli">
      <img src="images/mahdi-portrait-1.webp?v=${portraitVersion}" alt="Mahdi Tavakoli, web designer and front-end developer" width="1122" height="1402" fetchpriority="high" decoding="async">
      <div class="hero-person-meta">
        <strong>Mahdi Tavakoli</strong>
        <small>Web Designer · Front-End Developer</small>
      </div>
    </div>
  `);
}

const aboutPortrait = document.querySelector('.portrait-frame img');
if (aboutPortrait) {
  aboutPortrait.src = `images/mahdi-portrait-2.webp?v=${portraitVersion}`;
  aboutPortrait.alt = 'Mahdi Tavakoli working from a modern creative workspace';
  aboutPortrait.width = 1122;
  aboutPortrait.height = 1402;
  aboutPortrait.decoding = 'async';
}

const contactCard = document.querySelector('.contact-card');
if (contactCard && !contactCard.querySelector('.contact-portrait')) {
  contactCard.insertAdjacentHTML('beforeend', `
    <div class="contact-portrait" aria-hidden="true">
      <img src="images/mahdi-portrait-3.webp?v=${portraitVersion}" alt="" width="1122" height="1402" loading="lazy" decoding="async">
    </div>
  `);
}

if (year) year.textContent = new Date().getFullYear();

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    siteNav.classList.toggle('open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  revealItems.forEach(item => revealObserver.observe(item));
}
