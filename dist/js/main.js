const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const year = document.querySelector('#year');

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
