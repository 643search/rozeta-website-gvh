/* ============================================================
   rozeta labs — Main JS
   Scroll reveals, accordion, pricing toggle, aurora
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initAccordion();
  initPricingToggle();
  initCounters();
});

/* ── Scroll Reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ── FAQ Accordion ──────────────────────────────────────────── */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const c = i.querySelector('.accordion-content');
        const ic = i.querySelector('.accordion-icon');
        if (c) c.classList.remove('open');
        if (ic) ic.textContent = '+';
      });

      // Open clicked
      if (!isOpen) {
        item.classList.add('open');
        content.classList.add('open');
        if (icon) icon.textContent = '×';
      }
    });

    // Keyboard
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

/* ── Pricing Toggle (monthly / annual) ─────────────────────── */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  const monthlyEls = document.querySelectorAll('[data-monthly]');
  const annualEls  = document.querySelectorAll('[data-annual]');
  const saveEls    = document.querySelectorAll('.pricing-save');

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;

    monthlyEls.forEach(el => {
      el.textContent = isAnnual
        ? el.getAttribute('data-annual')
        : el.getAttribute('data-monthly');
    });

    saveEls.forEach(el => {
      el.style.display = isAnnual ? 'inline-block' : 'none';
    });
  });
}

/* ── Animated counters ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count-to'), 10);
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ── Filter buttons (case studies / intel) ──────────────────── */
function initFilter(containerSelector, cardSelector, categoryAttr) {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll(cardSelector);

  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 0);
        } else {
          const cat = card.getAttribute(categoryAttr) || '';
          const show = cat.includes(filter);
          card.style.opacity = show ? '1' : '0';
          card.style.display = show ? '' : 'none';
        }
      });
    });
  });
}

// Auto-init filters on case studies + intel pages
if (document.querySelector('.case-grid')) {
  initFilter('.case-grid', '.case-card', 'data-category');
}
if (document.querySelector('.intel-grid')) {
  initFilter('.intel-grid', '.intel-card', 'data-category');
}
