(function () {
  const btn = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  const desktopNav = document.getElementById('nav-desktop');
  if (!btn || !mobileNav) return;

  const setExpanded = (el, val) => el.setAttribute('aria-expanded', String(val));

  // Highlight the actual current page in both navs
  function markActiveLinks() {
    const current = location.pathname.replace(/index\.html?$/i, '/');
    const allLinks = [
      ...document.querySelectorAll('#nav-mobile a[href], #nav-desktop a[href]')
    ];
    allLinks.forEach(a => {
      a.classList.remove('is-active');
      a.removeAttribute('aria-current');

      const href = a.getAttribute('href');
      if (!href || href === '#') return; // skip dropdown toggles

      const linkPath = new URL(a.href, location.origin).pathname.replace(/index\.html?$/i, '/');
      if (linkPath === current) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  markActiveLinks();

  // Toggle open/close (focus the panel, not the first link)
  btn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    setExpanded(btn, open);
    if (open) {
      mobileNav.focus({ preventScroll: true }); // focus container; no link highlight
    }
  });

  // Close on outside click (mobile only)
  document.addEventListener('click', (e) => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    if (mobileNav.classList.contains('is-open') &&
        !mobileNav.contains(e.target) &&
        !btn.contains(e.target)) {
      mobileNav.classList.remove('is-open');
      setExpanded(btn, false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileNav.classList.remove('is-open');
      setExpanded(btn, false);
      btn.focus({ preventScroll: true });
    }
  });

  // Close the menu after tapping a link (nice on mobile)
  mobileNav.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) {
      mobileNav.classList.remove('is-open');
      setExpanded(btn, false);
    }
  });

  // Re-evaluate active link on history changes (if any)
  window.addEventListener('popstate', markActiveLinks);
})();
