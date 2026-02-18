/* ============================================================
   rozeta labs — Shared Components
   Nav + Footer injection via JS
   ============================================================ */

const NAV_HTML = `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="assets/logo/rozeta-labs-logo.jpg" alt="rozeta labs" style="height:40px;width:auto;">
    </a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="case-studies.html">Case Studies</a>
      <a href="intel.html">Intel</a>
      <a href="podcast.html">Podcast</a>
    </div>
    <div class="nav-cta">
      <a href="contact.html" class="btn btn-primary btn-sm btn-arrow">Book a Call</a>
    </div>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="case-studies.html">Case Studies</a>
    <a href="intel.html">Intel</a>
    <a href="podcast.html">Podcast</a>
    <a href="contact.html" class="btn btn-primary btn-arrow">Book a Call</a>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo/rozeta-labs-logo.jpg" alt="rozeta labs">
        <div class="footer-brand-name">rozeta labs</div>
        <p class="footer-tagline">Where AI stops being confusing and starts being useful.</p>
        <div class="footer-social">
          <a href="#" aria-label="X (Twitter)">𝕏</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="YouTube">▶</a>
          <a href="#" aria-label="Instagram">◎</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <a href="case-studies.html">Case Studies</a>
        <a href="intel.html">Intel</a>
        <a href="podcast.html">Podcast</a>
      </div>
      <div class="footer-col">
        <h4>Get Started</h4>
        <a href="contact.html">Book a Call</a>
        <a href="services.html#community">Join the Community</a>
        <a href="mailto:hey@rozetalabs.com">hey@rozetalabs.com</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 rozeta labs. All rights reserved.</p>
      <p>Built for operators, by operators.</p>
    </div>
  </div>
</footer>
`;

const MOBILE_CTA_HTML = `
<div class="mobile-cta-bar">
  <a href="contact.html" class="btn btn-primary btn-arrow">Book a Call</a>
</div>
`;

function injectComponents() {
  // Nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = NAV_HTML;
    highlightActiveNav();
    initHamburger();
    initNavScroll();
  }

  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
  }

  // Mobile CTA bar
  const mobileCta = document.getElementById('mobile-cta');
  if (mobileCta) {
    mobileCta.innerHTML = MOBILE_CTA_HTML;
  }
}

function highlightActiveNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('#')[0];
    if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', !isOpen);
    hamburger.classList.toggle('open', !isOpen);
    hamburger.setAttribute('aria-expanded', !isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}
