document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNavigation = document.querySelector('.mobile-navigation');
  const mobileLinks = document.querySelectorAll('.mobile-navigation a');

  const updateScrollState = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
    if (progress) progress.style.width = `${progressValue}%`;
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileNavigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    mobileNavigation.classList.remove('is-open');
    document.body.classList.remove('menu-is-open');
  };

  if (menuToggle && mobileNavigation) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
      mobileNavigation.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-is-open', !isOpen);
    });

    mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  const revealElements = document.querySelectorAll('.reveal-item, .reveal-image');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-revealed'));
  }
});