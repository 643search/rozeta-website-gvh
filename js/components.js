/* ============================================================
   rozeta labs - Shared Components
   Nav + Footer injection via JS
   ============================================================ */

const NAV_HTML = `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="assets/logo/rozeta-labs-horizontal-v5.svg" alt="rozeta labs" style="height:44px;width:auto;">
    </a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <div class="nav-dropdown">
        <a href="about.html" class="nav-dropdown-trigger">About <span class="nav-dropdown-arrow">&#8964;</span></a>
        <div class="nav-dropdown-menu">
          <a href="about.html">About Us</a>
          <a href="intel.html">Blog</a>
          <a href="podcast.html">Podcast</a>
          <a href="index.html#pricing">Pricing</a>
        </div>
      </div>
      <a href="services.html">Services</a>
      <a href="case-studies.html">Case Studies</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="nav-cta">
      <a href="apply-for-membership.html" class="btn btn-primary btn-sm">Book Discovery Call</a>
    </div>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="index.html">Home</a>
    <a href="about.html">About Us</a>
    <a href="intel.html">Blog</a>
    <a href="podcast.html">Podcast</a>
    <a href="services.html">Services</a>
    <a href="case-studies.html">Case Studies</a>
    <a href="contact.html">Contact</a>
    <a href="apply-for-membership.html" class="btn btn-primary">Book Discovery Call</a>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/logo/rozeta-labs-horizontal-v5.svg" alt="rozeta labs" style="height:48px;width:auto;margin-bottom:var(--space-4);">
        <p class="footer-tagline">Where AI stops being confusing and starts being useful.</p>
        <div class="footer-social">
          <a href="#" aria-label="X (Twitter)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
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
        <a href="intel.html">Blog</a>
        <a href="podcast.html">Podcast</a>
      </div>
      <div class="footer-col">
        <h4>Get Started</h4>
        <a href="apply-for-membership.html">Book Discovery Call</a>
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
  <a href="apply-for-membership.html" class="btn btn-primary">Book Discovery Call</a>
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

/* ============================================================
   Rozeta Labs AI Chatbot — Custom Widget
   ============================================================ */
(function initChatbot() {
  var API_ENDPOINT = '/api/chat';

  /* ── Styles ── */
  var style = document.createElement('style');
  style.textContent = [
    '#rl-chat-bubble{position:fixed;bottom:24px;right:24px;z-index:9999;height:44px;padding:0 20px;border-radius:22px;background:#9c1f22;border:none;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(156,31,34,.35);transition:transform .2s,box-shadow .2s;font-family:inherit;font-size:14px;font-weight:600;color:#fff;white-space:nowrap}',
    '#rl-chat-bubble:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(156,31,34,.45);background:#7a1719}',
    '#rl-chat-bubble svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}',
    '#rl-chat-panel{position:fixed;bottom:80px;right:24px;z-index:9999;width:360px;max-width:calc(100vw - 32px);height:320px;max-height:calc(100vh - 120px);background:#f5f0e8;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.15);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(.97);pointer-events:none;transition:opacity .22s,transform .22s}',
    '#rl-chat-panel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}',
    '#rl-chat-close{position:absolute;top:10px;right:12px;background:none;border:none;color:#22373b;cursor:pointer;padding:4px;opacity:.4;font-size:20px;line-height:1;z-index:1}',
    '#rl-chat-close:hover{opacity:.8}',
    '#rl-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.5}',
    '.rl-msg{max-width:82%;padding:10px 13px;border-radius:12px;word-break:break-word}',
    '.rl-msg.bot{background:#fff;color:#22373b;align-self:flex-start;border-bottom-left-radius:3px;box-shadow:0 1px 4px rgba(0,0,0,.06)}',
    '.rl-msg.user{background:#22373b;color:#fff;align-self:flex-end;border-bottom-right-radius:3px}',
    '.rl-typing{display:flex;gap:4px;padding:12px 14px;background:#fff;border-radius:12px;border-bottom-left-radius:3px;align-self:flex-start;box-shadow:0 1px 4px rgba(0,0,0,.06)}',
    '.rl-typing span{width:7px;height:7px;background:#c7c8c8;border-radius:50%;animation:rl-bounce 1.2s infinite}',
    '.rl-typing span:nth-child(2){animation-delay:.2s}.rl-typing span:nth-child(3){animation-delay:.4s}',
    '@keyframes rl-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}',
    '#rl-chat-footer{padding:10px 12px;border-top:1px solid #c7c8c8;background:#f5f0e8;display:flex;gap:8px;flex-shrink:0}',
    '#rl-chat-input{flex:1;border:1px solid #c7c8c8;border-radius:8px;padding:9px 12px;font-size:14px;outline:none;font-family:inherit;resize:none;height:40px;overflow:hidden;background:#fff;color:#22373b}',
    '#rl-chat-input:focus{border-color:#22373b}',
    '#rl-chat-send{background:#22373b;border:none;border-radius:8px;color:#fff;cursor:pointer;width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '#rl-chat-send:hover{background:#1a1a1a}',
    '#rl-chat-send svg{width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}',
    '@media(max-width:768px){#rl-chat-bubble{bottom:84px;right:16px}#rl-chat-panel{bottom:140px;right:16px;left:16px;width:auto}}',
  ].join('');
  document.head.appendChild(style);

  /* ── HTML ── */
  var panel = document.createElement('div');
  panel.id = 'rl-chat-panel';
  panel.innerHTML = [
    '<button id="rl-chat-close" aria-label="Close">&times;</button>',
    '<div id="rl-chat-messages">',
    '  <div class="rl-msg bot">Hey! Welcome to Rozeta Labs 👋 I\'m Rozie. How can I help you?</div>',
    '</div>',
    '<div id="rl-chat-footer">',
    '  <input id="rl-chat-input" type="text" placeholder="Ask a question…" autocomplete="off" />',
    '  <button id="rl-chat-send" aria-label="Send">',
    '    <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    '  </button>',
    '</div>',
  ].join('');

  var bubble = document.createElement('button');
  bubble.id = 'rl-chat-bubble';
  bubble.setAttribute('aria-label', 'Chat with Rozie');
  bubble.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Chat with Rozie';

  document.body.appendChild(panel);
  document.body.appendChild(bubble);

  /* ── Logic ── */
  var msgs    = panel.querySelector('#rl-chat-messages');
  var input   = panel.querySelector('#rl-chat-input');
  var history = [];
  var busy    = false;

  function openPanel()  { panel.classList.add('open'); input.focus(); }
  function closePanel() { panel.classList.remove('open'); }
  window.rlOpenChat = openPanel;

  bubble.addEventListener('click', function() {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  panel.querySelector('#rl-chat-close').addEventListener('click', closePanel);

  function addMsg(text, role) {
    var el = document.createElement('div');
    el.className = 'rl-msg ' + role;
    el.textContent = text;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'rl-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function send() {
    var q = input.value.trim();
    if (!q || busy) return;
    busy = true;
    input.value = '';
    addMsg(q, 'user');
    var typing = showTyping();

    var histStr = JSON.stringify(history.map(function(h) {
      return [h.prompt, h.response];
    }));

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, history: histStr }),
    }).then(function(res) {
      if (!res.ok || !res.body) {
        throw new Error('Chat request failed');
      }
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var answer = '';
      typing.remove();
      var botEl = addMsg('', 'bot');

      function read() {
        reader.read().then(function(d) {
          if (d.done) {
            history.push({ prompt: q, response: answer });
            if (history.length > 20) history.shift();
            busy = false;
            return;
          }
          var chunk = decoder.decode(d.value, { stream: true });
          chunk.split('\n').forEach(function(line) {
            if (!line.startsWith('data:')) return;
            try {
              var obj = JSON.parse(line.slice(5));
              if (obj.type === 'answer') { answer += obj.answer; botEl.textContent = answer; msgs.scrollTop = msgs.scrollHeight; }
            } catch(e) {}
          });
          read();
        });
      }
      read();
    }).catch(function() {
      typing.remove();
      addMsg('Sorry, something went wrong. Please try again.', 'bot');
      busy = false;
    });
  }

  panel.querySelector('#rl-chat-send').addEventListener('click', send);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
}());
