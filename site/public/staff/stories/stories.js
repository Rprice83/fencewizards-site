// Job stories (Field Notes intake): Richard sends a job with photos; the reviewer drafts and publishes it.
// Views by hash: '' = list, '#new' = form, '#FN-…' = one story. Customer-entered text always goes through esc().

const $ = s => document.querySelector(s);
const main = $('#st-main');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const JOB_TYPES = { construction: 'Construction', event: 'Event', emergency: 'Emergency or restoration', other: 'Other' };
const PRODUCTS = { panels: 'Panels & stands', driven: 'Post-driven chain link', windscreen: 'Windscreen', barricades: 'Crowd-control barricades' };
const STATUS = { uploading: 'Not finished sending', submitted: 'New: needs a draft', drafted: 'Drafted', published: 'Published', archived: 'Archived' };
const MAX_PHOTOS = 12;

async function api(path, opts = {}) {
  const res = await fetch(`/api/staff/${path}`, { credentials: 'same-origin', ...opts });
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) throw new Error('Your sign-in expired. Reload the page to sign in again.');
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}
const jsonOpts = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
function toast(msg, err) {
  const t = document.createElement('div');
  t.className = `ib-toast${err ? ' err' : ''}`; t.textContent = msg; document.body.append(t);
  setTimeout(() => t.remove(), 3500);
}
const day = iso => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// Photos a browser can't preview (e.g. iPhone HEIC in Chrome) show their file name instead
const imageFallbacks = root => root.querySelectorAll('img[data-fallback]').forEach(img => img.addEventListener('error', () => {
  const tag = document.createElement('span');
  tag.className = 'st-noprev';
  tag.textContent = img.dataset.fallback || 'Photo';
  img.replaceWith(tag);
}, { once: true }));

/* ---------- list ---------- */
async function showList() {
  main.innerHTML = '<div class="ib-empty"><p>Loading…</p></div>';
  try {
    const { stories } = await api('stories');
    main.innerHTML = `<div class="st-wrap">
      <a class="st-new-btn" href="#new">+ New job story</a>
      <p class="st-hint">After a job goes in: a few photos and a few answers. We write it up and check it with you before anything goes on the website.</p>
      <ul class="st-list">${stories.map(s => `<li><a href="#${esc(s.id)}">
        <strong>${esc(JOB_TYPES[s.answers.jobType] || 'Job')} · ${esc(s.answers.town)}</strong>
        <span>${day(s.created_at)} · ${s.photos.length} photo${s.photos.length === 1 ? '' : 's'} · from ${esc(s.author)}</span>
        <span class="st-status st-${esc(s.status)}">${esc(STATUS[s.status] || s.status)}</span>
      </a></li>`).join('') || '<li class="st-none">No job stories yet.</li>'}</ul>
    </div>`;
  } catch (e) { main.innerHTML = `<div class="ib-empty"><p>${esc(e.message)}</p></div>`; }
}

/* ---------- form ---------- */
function showForm() {
  const month = new Date().toISOString().slice(0, 7);
  main.innerHTML = `<form class="st-wrap st-form" id="st-form" novalidate>
    <h1>New job story</h1>

    <fieldset class="ib-card"><legend>Photos</legend>
      <p class="st-hint">3 to 8 straight from your phone: one wide shot of the whole run, a close-up (gates, windscreen, posts), and the crew or truck at work if you have one.</p>
      <label class="st-photo-pick"><input type="file" id="st-files" accept="image/*" multiple>Choose photos</label>
      <ul class="st-thumbs" id="st-thumbs"></ul>
    </fieldset>

    <fieldset class="ib-card"><legend>The job</legend>
      <label>Where? <small>Town, or the nearest one. No street address.</small><input name="town" required maxlength="80" placeholder="e.g. Carmel"></label>
      <label>When did it go in?<input type="month" name="jobDate" value="${month}"></label>
      <div class="st-choice" role="radiogroup" aria-label="What kind of job?"><span>What kind of job?</span>
        ${Object.entries(JOB_TYPES).map(([v, l]) => `<label><input type="radio" name="jobType" value="${v}"> ${esc(l)}</label>`).join('')}
      </div>
      <label>What was the site? <small>Apartment build, demo, festival, storm damage…</small><input name="site" maxlength="300"></label>
    </fieldset>

    <fieldset class="ib-card"><legend>What went in</legend>
      <div class="st-choice">${Object.entries(PRODUCTS).map(([v, l]) => `<label><input type="checkbox" name="products" value="${v}"> ${esc(l)}</label>`).join('')}</div>
      <div class="st-row">
        <label>Roughly how many feet?<input type="number" name="feet" min="0" max="100000" inputmode="numeric"></label>
        <label>Gates?<input name="gates" maxlength="200" placeholder="e.g. 2 double gates"></label>
      </div>
      <label>How long is it staying up?<input name="duration" maxlength="100" placeholder="e.g. about 6 months"></label>
    </fieldset>

    <fieldset class="ib-card"><legend>The story</legend>
      <label>What made it interesting? <small>Tight timeline, rock in the ground, moved it mid-job, night install, inspector request… Tap the microphone on your keyboard to talk instead of typing.</small>
        <textarea name="interesting" rows="5" required maxlength="5000"></textarea></label>
      <div class="st-choice" role="radiogroup" aria-label="Can we name the customer or the site?"><span>Can we name the customer or the site?</span>
        <label><input type="radio" name="canName" value="no" checked> No</label>
        <label><input type="radio" name="canName" value="yes"> Yes</label>
      </div>
      <label id="st-name-field" hidden>Name we can use<input name="customerName" maxlength="200"></label>
      <label>Anything we should NOT show? <small>Secure sites, people's faces, other companies' logos, license plates…</small><textarea name="doNotShow" rows="2" maxlength="2000"></textarea></label>
      <label>Link to a won job <small>(optional)</small><select name="quoteId" id="st-quote"><option value="">None</option></select></label>
    </fieldset>

    <p class="st-error" id="st-error" role="alert" hidden></p>
    <button class="st-send" type="submit" id="st-send">Send job story</button>
    <p class="st-hint">Nothing is posted automatically. You'll see the write-up before it goes live.</p>
  </form>`;

  const files = [];
  const thumbs = $('#st-thumbs');
  const renderThumbs = () => {
    thumbs.innerHTML = files.map((f, i) => `<li><img src="${f.url}" alt="" data-fallback="${esc(f.file.name)}"><button type="button" data-rm="${i}" aria-label="Remove ${esc(f.file.name)}">×</button></li>`).join('');
    imageFallbacks(thumbs);
  };
  $('#st-files').addEventListener('change', e => {
    for (const file of e.target.files) {
      if (files.length >= MAX_PHOTOS) { toast(`Up to ${MAX_PHOTOS} photos.`, true); break; }
      files.push({ file, url: URL.createObjectURL(file) });
    }
    e.target.value = '';
    renderThumbs();
  });
  thumbs.addEventListener('click', e => {
    const i = e.target.dataset.rm;
    if (i == null) return;
    URL.revokeObjectURL(files[i].url);
    files.splice(Number(i), 1);
    renderThumbs();
  });
  const form = $('#st-form');
  form.addEventListener('change', () => { $('#st-name-field').hidden = form.canName.value !== 'yes'; });

  // Won jobs, to link the story to (optional)
  api('items?status=won').then(d => {
    $('#st-quote').insertAdjacentHTML('beforeend', d.items.map(it => `<option value="${esc(it.id)}">${esc(it.name)}${it.location ? ` · ${esc(it.location)}` : ''}</option>`).join(''));
  }).catch(() => {});

  let storyId = null, sent = 0; // kept so a failed upload can resume where it stopped
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const err = $('#st-error');
    err.hidden = true;
    const fd = new FormData(form);
    const answers = {
      town: fd.get('town'), jobDate: fd.get('jobDate'), jobType: fd.get('jobType'), site: fd.get('site'),
      products: fd.getAll('products'), feet: fd.get('feet'), gates: fd.get('gates'), duration: fd.get('duration'),
      interesting: fd.get('interesting'), canName: fd.get('canName'), customerName: fd.get('customerName'), doNotShow: fd.get('doNotShow'),
    };
    const problem = !files.length ? 'Add at least one photo.' : !String(answers.town || '').trim() ? 'Add the town.'
      : !answers.jobType ? 'Pick what kind of job it was.' : !String(answers.interesting || '').trim() ? 'Add a few words about what made it interesting.' : '';
    if (problem) { err.textContent = problem; err.hidden = false; return; }

    const btn = $('#st-send');
    btn.disabled = true;
    try {
      if (!storyId) {
        btn.textContent = 'Saving answers…';
        storyId = (await api('stories', jsonOpts('POST', { answers, quoteId: fd.get('quoteId') }))).id;
      }
      for (; sent < files.length; sent++) {
        const f = files[sent].file;
        btn.textContent = `Uploading photo ${sent + 1} of ${files.length}…`;
        const put = () => api(`stories/${storyId}/photos`, { method: 'POST', headers: { 'Content-Type': f.type || 'application/octet-stream', 'X-File-Name': encodeURIComponent(f.name) }, body: f });
        await put().catch(put); // one retry for a flaky phone connection
      }
      btn.textContent = 'Finishing…';
      await api(`stories/${storyId}/submit`, { method: 'POST' });
      files.forEach(f => URL.revokeObjectURL(f.url));
      main.innerHTML = `<div class="st-wrap st-done"><h1>Sent. Thank you!</h1><p>It's on its way for a write-up. You'll get to check it before it goes on the website.</p>
        <a class="st-new-btn" href="#">Back to job stories</a></div>`;
    } catch (ex) {
      err.textContent = `${ex.message} Your answers are saved. Press the button again to finish sending.`;
      err.hidden = false;
      btn.disabled = false;
      btn.textContent = 'Try sending again';
    }
  });
}

/* ---------- one story ---------- */
async function showStory(id) {
  main.innerHTML = '<div class="ib-empty"><p>Loading…</p></div>';
  try {
    const s = await api(`stories/${encodeURIComponent(id)}`);
    const a = s.answers;
    const row = (k, v) => (v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : '');
    main.innerHTML = `<div class="st-wrap">
      <a href="#" class="st-back">‹ All job stories</a>
      <h1>${esc(JOB_TYPES[a.jobType] || 'Job')} · ${esc(a.town)}</h1>
      <p class="st-meta"><code>${esc(s.id)}</code> · from ${esc(s.author)} · ${day(s.created_at)} · <span class="st-status st-${esc(s.status)}">${esc(STATUS[s.status] || s.status)}</span></p>
      <div class="ib-card"><h2>Photos (${s.photos.length})</h2>
        <ul class="st-gallery">${s.photos.map(p => `<li><a href="/api/staff/stories/${esc(s.id)}/photos/${p.n}" target="_blank" rel="noopener"><img loading="lazy" src="/api/staff/stories/${esc(s.id)}/photos/${p.n}" alt="Photo ${p.n}" data-fallback="${esc(p.name)}"></a></li>`).join('')}</ul>
        <p class="st-hint">Originals, which may still contain the phone's GPS location. The publishing tool strips it.</p></div>
      <div class="ib-card"><h2>Answers</h2><dl class="ib-dl">
        ${row('When', esc(a.jobDate))}
        ${row('Site', esc(a.site))}
        ${row('What went in', esc((a.products || []).map(p => PRODUCTS[p]).join(', ')))}
        ${row('Footage', a.feet ? `${Number(a.feet).toLocaleString()} ft` : '')}
        ${row('Gates', esc(a.gates))}
        ${row('Staying up', esc(a.duration))}
        ${row('Name the customer/site', a.canName === 'yes' ? `Yes${a.customerName ? `: ${esc(a.customerName)}` : ''}` : 'No')}
        ${row('Do NOT show', esc(a.doNotShow))}
        ${row('Linked job', s.quote_id ? `<a href="/staff/#${esc(s.quote_id)}">${esc(s.quote_id)}</a>` : '')}
      </dl>
      <h3 class="st-sub">What made it interesting</h3><p class="ib-quote">${esc(a.interesting)}</p></div>
      <div class="ib-card"><h2>Status</h2><div class="st-actions">
        ${['submitted', 'drafted', 'published', 'archived'].map(st => `<button type="button" data-status="${st}" aria-pressed="${s.status === st}">${esc(STATUS[st])}</button>`).join('')}
      </div><p class="st-hint">To publish: ask Claude in the project folder to "make a field note from job story ${esc(s.id)}" (FIELD-NOTES.md).</p></div>
    </div>`;
    imageFallbacks(main);
    main.querySelectorAll('[data-status]').forEach(b => b.addEventListener('click', async () => {
      try { await api(`stories/${encodeURIComponent(s.id)}`, jsonOpts('PATCH', { status: b.dataset.status })); toast('Status updated'); showStory(s.id); }
      catch (e) { toast(e.message, true); }
    }));
  } catch (e) { main.innerHTML = `<div class="ib-empty"><p>${esc(e.message)}</p></div>`; }
}

function route() {
  const h = location.hash.slice(1);
  window.scrollTo(0, 0);
  if (h === 'new') showForm();
  else if (/^FN-/.test(h)) showStory(h);
  else showList();
}
window.addEventListener('hashchange', route);
route();
