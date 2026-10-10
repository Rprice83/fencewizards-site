// Homepage redesign concept: header, menu, hero video, reveals and a preview-only form.
// Deliberately does NOT load main.js: no lead-source storage, no tracking, no Turnstile, nothing posts to /api.
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header turns solid after the top of the hero; the phone call bar shows once the hero is gone
  const hero = document.querySelector('.hero');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    const past = hero ? hero.getBoundingClientRect().bottom < 80 : true;
    document.body.classList.toggle('rd-past-hero', past);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile drawer
  const closeMenu = () => {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  };
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('nav-open')) { closeMenu(); toggle.focus(); } });

  // Dropdowns (click/tap + keyboard; hover is CSS on desktop)
  document.querySelectorAll('.has-menu').forEach(item => {
    const btn = item.querySelector('.nav-trigger');
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      document.querySelectorAll('.has-menu.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-menu')) document.querySelectorAll('.has-menu.open').forEach(o => o.classList.remove('open'));
  });

  // Hero video: smaller file on phones, no autoplay with reduced motion (the poster shows instead)
  const video = document.querySelector('.hero-video');
  const videoBtn = document.querySelector('.video-toggle');
  if (video) {
    video.src = window.innerWidth < 900 ? video.dataset.srcSm : video.dataset.srcLg;
    if (reduce) { video.removeAttribute('autoplay'); video.pause(); videoBtn.setAttribute('aria-pressed', 'true'); videoBtn.setAttribute('aria-label', 'Play background video'); }
    videoBtn.addEventListener('click', () => {
      if (video.paused) { video.play(); videoBtn.setAttribute('aria-pressed', 'false'); videoBtn.setAttribute('aria-label', 'Pause background video'); }
      else { video.pause(); videoBtn.setAttribute('aria-pressed', 'true'); videoBtn.setAttribute('aria-label', 'Play background video'); }
    });
  }

  // Staggered reveal for things still below the fold (same safety rules as main.js: nothing can stay hidden)
  const targets = document.querySelectorAll('.rd-head, .rd-use, .rd-type, .rd-pricing-copy, .rd-compare, .rd-process-head, .rd-steps li, .rd-trust-photos, .rd-trust-list li, .rd-rating, .rd-area-copy, .rd-map, .rd-quote-copy, .rd-form');
  if ('IntersectionObserver' in window && !reduce) {
    const pending = new Set();
    const show = el => {
      if (!pending.delete(el)) return;
      io.unobserve(el);
      el.classList.add('in');
      setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; }, 1200);
    };
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) show(en.target); }),
      { rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      pending.add(el);
      io.observe(el);
    });
    const sweep = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      pending.forEach(el => { if (atBottom || el.getBoundingClientRect().top < window.innerHeight) show(el); });
    };
    ['scroll', 'resize', 'load', 'pageshow'].forEach(t => window.addEventListener(t, () => requestAnimationFrame(sweep), { passive: true }));
  }

  // Quote form: visual only in this concept
  const form = document.querySelector('.rd-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', e => {
      e.preventDefault();
      status.className = 'form-status rd-preview-note';
      status.textContent = 'Concept preview: this form isn’t connected.';
    });
  }
})();
