(() => {
  // Where this visitor came from, so a quote can say "Google Ads" (or a site, or direct). Kept in this browser
  // for 90 days and sent with any form. A new ad click replaces it; ordinary visits keep the first one seen.
  const SRC_KEY = 'fw-src';
  const readSource = () => {
    try {
      const s = JSON.parse(localStorage.getItem(SRC_KEY) || 'null');
      return s && Date.now() - s.t < 90 * 864e5 ? s : null;
    } catch { return null; }
  };
  try {
    const p = new URLSearchParams(location.search);
    const fromUrl = {};
    ['gclid', 'gbraid', 'wbraid', 'msclkid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .forEach(k => { if (p.get(k)) fromUrl[k] = p.get(k).slice(0, 200); });
    let referrer = '';
    try { const r = new URL(document.referrer); if (r.host !== location.host) referrer = r.host; } catch { /* no referrer */ }
    if (Object.keys(fromUrl).length || !readSource()) {
      localStorage.setItem(SRC_KEY, JSON.stringify({ ...fromUrl, referrer, landing: location.pathname, t: Date.now() }));
    }
  } catch { /* storage blocked: forms just send no source */ }
  window.fwSource = readSource;

  // Google Ads / Analytics events. Does nothing unless the Google tag is on (INTEGRATIONS in build/lib/site.mjs).
  // The request id goes along as transaction_id so a lead is never counted twice.
  const gtagOn = () => window.FW_GTAG && typeof window.gtag === 'function';
  window.fwTrack = {
    lead(formType, id) {
      if (!gtagOn()) return;
      if (FW_GTAG.lead) gtag('event', 'conversion', { send_to: FW_GTAG.lead, transaction_id: id || '' });
      if (FW_GTAG.ga4) gtag('event', 'generate_lead', { form_type: formType });
    },
    phoneTap() {
      if (!gtagOn()) return;
      if (FW_GTAG.phone) gtag('event', 'conversion', { send_to: FW_GTAG.phone });
      if (FW_GTAG.ga4) gtag('event', 'phone_tap', { page_path: location.pathname });
    },
  };
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('a[href^="tel:"]')) window.fwTrack.phoneTap(); });

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');

  // Header turns solid once you scroll past the top of the hero
  // (pages without a hero mark the header data-solid and keep it white)
  if (!header.hasAttribute('data-solid')) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile drawer (ad landing pages have no menu)
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  // Dropdown triggers (click/tap + keyboard; hover handled in CSS on desktop)
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

  // Hero video: smaller file on phones, skip autoplay for reduced motion
  const video = document.querySelector('.hero-video');
  const videoBtn = document.querySelector('.video-toggle');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (video) {
  video.src = window.innerWidth < 900 ? video.dataset.srcSm : video.dataset.srcLg;
  if (reduce) { video.removeAttribute('autoplay'); video.pause(); videoBtn.setAttribute('aria-pressed', 'true'); }
  videoBtn.addEventListener('click', () => {
    if (video.paused) { video.play(); videoBtn.setAttribute('aria-pressed', 'false'); videoBtn.setAttribute('aria-label', 'Pause background video'); }
    else { video.pause(); videoBtn.setAttribute('aria-pressed', 'true'); videoBtn.setAttribute('aria-label', 'Play background video'); }
  });
  }

  // Gentle reveal as sections scroll into view
  const targets = document.querySelectorAll('.section-head, .use-card, .type-card, .steps li, .compare, .pricing-copy, .trust-photo, .trust-list li, .area-copy, .area-map, .quote-form, .quote-copy, .feature, .prose-figure, .intro-figure, .fact-list li');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      io.unobserve(el);
      // Hand control back to hover effects once the reveal finishes
      setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; }, 1200);
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  }

  // Cloudflare Turnstile spam check: load its script only on pages with a form
  if (document.querySelector('.cf-turnstile')) {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true; s.defer = true;
    document.head.appendChild(s);
  }
  // The token can take a moment after the page loads; wait briefly rather than fail the send
  const turnstileToken = async form => {
    if (!form.querySelector('.cf-turnstile')) return '';
    for (let i = 0; i < 40; i++) {
      const v = form.querySelector('[name="cf-turnstile-response"]')?.value;
      if (v) return v;
      await new Promise(r => setTimeout(r, 150));
    }
    return '';
  };
  const resetTurnstile = form => { try { const w = form.querySelector('.cf-turnstile'); if (w && window.turnstile) window.turnstile.reset(w); } catch { /* ignore */ } };

  // Quick-quote and contact forms → /api/contact
  document.querySelectorAll('form.js-inquiry').forEach(form => {
    const status = form.querySelector('.form-status');
    const fileInput = form.querySelector('input[type="file"]');
    const fileList = form.querySelector('.file-list');
    if (fileInput && fileList) {
      const showFiles = () => { fileList.textContent = [...fileInput.files].map(f => `${f.name} (${Math.max(1, Math.round(f.size / 1024))} KB)`).join(' · '); };
      fileInput.addEventListener('change', showFiles);
      const drop = fileInput.closest('.file-drop');
      ['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('drag'); }));
      ['dragleave', 'drop'].forEach(t => drop.addEventListener(t, () => drop.classList.remove('drag')));
      drop.addEventListener('drop', e => { e.preventDefault(); fileInput.files = e.dataTransfer.files; showFiles(); });
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';
      let firstBad = null;
      form.querySelectorAll('[required]').forEach(el => {
        const bad = !el.value.trim() || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.classList.toggle('invalid', bad);
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) {
        status.className = 'form-status err';
        status.textContent = 'Please fill in the highlighted fields.';
        firstBad.focus();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';
      const token = await turnstileToken(form);
      const fd = new FormData(form);
      fd.set('kind', form.dataset.kind || 'quick');
      fd.set('page', location.pathname);
      if (token) fd.set('cf-turnstile-response', token);
      fd.set('source', JSON.stringify(readSource() || {}));
      try {
        const hasFiles = fileInput && fileInput.files.length;
        const res = await fetch('/api/contact', hasFiles
          ? { method: 'POST', body: fd }
          : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string'))) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Something went wrong.');
        window.fwTrack.lead(form.dataset.kind === 'contact' ? 'contact' : 'quick', data.id);
        form.classList.add('sent');
        status.className = 'form-status ok';
        const first = (fd.get('name') || '').toString().trim().split(' ')[0];
        status.textContent = `Thanks${first ? `, ${first}` : ''}! Richard has your details and will reach out within 24 hours.`;
      } catch (err) {
        resetTurnstile(form); // tokens are single-use
        status.className = 'form-status err';
        status.innerHTML = '';
        status.append(`${err.message} You can also call Richard at `);
        const a = document.createElement('a'); a.href = 'tel:+13172964015'; a.textContent = '(317) 296-4015';
        status.append(a, '.');
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  });
})();
