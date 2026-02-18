/* ============================================================
   rozeta labs — Main JS
   Scroll reveals, accordion, pricing toggle, aurora
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initAccordion();
  initPricingToggle();
  initCounters();
  initGSearchAnimation();
  initIMsgAnimation();
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

/* ── Google Search Mockup Typewriter Animation ──────────────── */
function initGSearchAnimation() {
  const mockup = document.querySelector('.gsearch-mockup');
  if (!mockup) return;

  const typedEl    = mockup.querySelector('.gsearch-typed');
  const aiOverview = mockup.querySelector('.gsearch-ai-overview');
  const aiIntro    = mockup.querySelector('.gsearch-ai-intro');
  const aiItems    = mockup.querySelectorAll('.gsearch-ai-list li');
  const aiClosing  = mockup.querySelector('.gsearch-ai-closing');

  const isMobile = window.innerWidth <= 768;
  const FULL_QUERY = isMobile
    ? 'What businesses benefit from AI?'
    : 'what types of businesses benefit most from AI?';

  // Shorten autocomplete suggestions on mobile to match shorter query
  if (isMobile) {
    const acItems = mockup.querySelectorAll('.gsearch-ac-item span:last-child');
    const mobileAc = [
      ['What businesses benefit from ', '<strong>AI tools</strong>'],
      ['What businesses benefit from ', '<strong>automation</strong>'],
      ['What businesses benefit from ', '<strong>AI? guide</strong>'],
      ['What businesses benefit from ', '<strong>machine learning</strong>'],
    ];
    acItems.forEach((el, i) => {
      if (mobileAc[i]) el.innerHTML = mobileAc[i][0] + mobileAc[i][1];
    });
  }

  let hasRun = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        observer.unobserve(entry.target);
        setTimeout(runAnimation, 600);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(mockup);

  function runAnimation() {
    // Type the full query straight through
    typeText(FULL_QUERY, typedEl, 42, () => {

      // Brief "Enter" pause, then AI Overview fades in
      setTimeout(() => {
        aiOverview.style.opacity = '1';

        setTimeout(() => {
          aiIntro.style.opacity = '1';

          setTimeout(() => {
            aiItems.forEach((li, i) => {
              setTimeout(() => {
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
              }, i * 70);
            });

            setTimeout(() => {
              aiClosing.style.opacity = '1';
            }, aiItems.length * 70 + 100);
          }, 200);
        }, 300);
      }, 350);
    });
  }

  function typeText(text, el, baseSpeed, callback) {
    let i = 0;
    function tick() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(tick, baseSpeed + Math.random() * 28 - 8);
      } else if (callback) {
        callback();
      }
    }
    tick();
  }
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
function initFilter(btnSelector, cardSelector, categoryAttr) {
  const btns = document.querySelectorAll(btnSelector);
  const cards = document.querySelectorAll(cardSelector);

  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
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
  initFilter('.filter-btn', '.case-card', 'data-category');
}
if (document.querySelector('.intel-list')) {
  initFilter('.intel-tab', '.intel-row', 'data-category');
}

/* ── iMessage Animation ─────────────────────────────────────── */
function initIMsgAnimation() {
  const mockup = document.querySelector('.imsg-mockup');
  if (!mockup) return;

  const youRow = mockup.querySelector('.imsg-row--you');
  const typingWrap = mockup.querySelector('.imsg-typing-wrap');
  const themRow = mockup.querySelector('.imsg-row--them');

  const allEls = [youRow, typingWrap, themRow].filter(Boolean);
  allEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el === youRow ? 'translateX(16px)' : 'translateX(-16px)';
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  });

  function show(el) {
    if (!el) return;
    el.style.opacity = '1';
    el.style.transform = 'none';
  }

  function hide(el) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(-16px)';
  }

  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  async function runSequence() {
    show(youRow);
    await delay(600);
    show(typingWrap);
    await delay(1000);
    hide(typingWrap);
    await delay(150);
    show(themRow);
  }

  let animated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          setTimeout(runSequence, 400);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(mockup);
}
