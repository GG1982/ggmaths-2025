document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const body = document.body;
  const navLinks = document.querySelectorAll('.main-nav a');

  navToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
});