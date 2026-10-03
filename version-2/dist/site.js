const formMarkup = `<form class="form-card" id="quote-form" action="https://api.web3forms.com/submit" method="POST">
<h3>Tell us about the job.</h3><p class="form-help">Fields marked * are required. Everything else can wait.</p>
<input type="hidden" name="access_key" value="236ccc36-ec68-4bbe-8756-3cb05bd5bf63"><input type="hidden" name="subject" value="[Website preview test] Fence Wizards quote request"><input type="hidden" name="from_name" value="Fence Wizards Website Preview"><input type="checkbox" name="botcheck" class="bot-field" tabindex="-1" aria-hidden="true">
<div class="form-grid"><label class="field">Your name *<input name="name" autocomplete="name" required maxlength="120"></label><label class="field">Company <small>(optional)</small><input name="company" autocomplete="organization" maxlength="180"></label><label class="field">Email *<input type="email" name="email" autocomplete="email" required maxlength="200"></label><label class="field">Phone *<input type="tel" name="phone" autocomplete="tel" required maxlength="40"></label><label class="field">Project city or address *<input name="project_location" required maxlength="300" placeholder="Where do you need fencing?"></label><label class="field">Project type *<select name="project_type" required><option value="">Select a project type</option><option>Construction</option><option>Event</option><option>Emergency</option><option>Other / not sure</option></select></label><label class="field full">What do you need? <small>(optional)</small><textarea name="message" maxlength="5000" placeholder="Tell us about the site, your timing, or any questions."></textarea></label></div>
<details><summary>Add fence details <span class="form-help">(optional)</span></summary><div class="form-grid"><label class="field">Fence type<select name="fence_type"><option value="">Not sure yet</option><option>Panels & stands</option><option>Post-driven chain link</option><option>Windscreen</option><option>Crowd-control barricades</option><option>A combination</option></select></label><label class="field">Approximate length (feet)<input name="linear_feet" type="number" min="1" max="1000000" inputmode="numeric"></label><label class="field">Number of gates<input name="gates" type="number" min="0" max="1000" inputmode="numeric"></label><label class="field">When do you need it?<input type="date" name="start_date"></label><label class="field full">How long do you need it?<input name="duration" maxlength="150" placeholder="For example, a weekend or six months"></label></div></details>
<div class="form-footer"><button class="button" type="submit">Request a Quote</button><p>We’ll use these details to respond about your project. <a href="/privacy/">Privacy Policy</a>.</p><p><strong>Preview testing:</strong> Submissions use the supplied test form account. Inbox delivery still needs to be confirmed.</p></div><p class="form-status" role="status" aria-live="polite" tabindex="-1"></p></form>`;
document.querySelectorAll('[data-form-host]').forEach(host => {host.innerHTML = formMarkup;});
const heroForm=document.querySelector('.hero-quote form');
if(heroForm){
  const mainFields=heroForm.querySelector('.form-grid');
  const extraFields=heroForm.querySelector('details .form-grid');
  for(const name of ['company','message'])extraFields.append(heroForm.elements[name].closest('label'));
  for(const name of ['name','phone','email','project_type','project_location'])mainFields.append(heroForm.elements[name].closest('label'));
  heroForm.elements.project_location.closest('label').classList.add('full');
  heroForm.querySelector('h3').textContent='Get your fence quote.';
  heroForm.querySelector('details summary').innerHTML='Add project details <span class="form-help">(optional)</span>';
}

document.querySelectorAll('[data-footer]').forEach(host => {host.innerHTML = `<footer class="site-footer"><div class="wrap"><div class="footer-main"><div><a href="/" class="footer-brand">Fence <span>Wizards</span></a><p>Family-owned temporary fence rental.<br>Greenwood, Indiana · Serving central Indiana.</p></div><nav class="footer-links" aria-label="Footer navigation"><a href="/#services">Services</a><a href="/#pricing">Pricing</a><a href="/#service-area">Service area</a><a href="/contact/">Contact Richard</a></nav></div><div class="footer-bottom"><a href="/privacy/">Privacy Policy</a><span>© ${new Date().getFullYear()} Fence Wizards. All rights reserved.</span><span>Private design preview · Final logo and integrations pending</span></div></div></footer>`;});
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav?.classList.contains('open')){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus();}});
const video=document.querySelector('#hero-video');
if(video){
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=navigator.connection;
  const allowed=()=>!motion.matches&&!connection?.saveData;
  // Set media properties as well as attributes before asking mobile browsers to play.
  video.muted=true;video.defaultMuted=true;video.playsInline=true;
  video.setAttribute('muted','');video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');
  const start=()=>{
    if(!allowed()||document.hidden)return;
    video.autoplay=true;
    if(video.paused)video.play()?.catch(()=>{});
  };
  const sync=()=>{video.autoplay=allowed();if(allowed())start();else video.pause();};
  video.addEventListener('canplay',start);
  window.addEventListener('pageshow',start);
  document.addEventListener('visibilitychange',start);
  // A real tap can recover playback when the browser blocks automatic playback.
  document.addEventListener('touchend',start,{passive:true});
  document.addEventListener('click',start);
  motion.addEventListener('change',sync);
  connection?.addEventListener?.('change',sync);
  // If native media loading stalls (including range requests through preview
  // authentication), fetch the same-origin MP4 normally and play a local blob.
  // This keeps the asset private and does not expose credentials in its URL.
  let blobAttempted=false,blobUrl=null;
  const recoverSource=async()=>{
    if(blobAttempted||!allowed()||document.hidden||video.currentTime>0)return;
    blobAttempted=true;
    const source=video.querySelector('source')?.src;
    if(!source)return;
    try{
      const response=await fetch(source,{credentials:'same-origin'});
      if(!response.ok||!response.headers.get('content-type')?.includes('video/'))return;
      const blob=await response.blob();
      if(!allowed()||video.currentTime>0)return;
      blobUrl=URL.createObjectURL(blob);
      video.src=blobUrl;video.load();start();
    }catch{/* Keep the poster visible if the media request fails. */}
  };
  video.addEventListener('error',recoverSource);
  setTimeout(recoverSource,6000);
  window.addEventListener('pagehide',e=>{if(!e.persisted&&blobUrl)URL.revokeObjectURL(blobUrl);});
  sync();
}
const form=document.querySelector('#quote-form');
const requestedType=new URLSearchParams(location.search).get('project');
if(form && ['Construction','Event','Emergency'].includes(requestedType)){form.elements.project_type.value=requestedType;}
const requestedCity=new URLSearchParams(location.search).get('city');
const supportedCities=['Anderson','Avon','Bloomington','Brownsburg','Carmel','Columbus','Fishers','Franklin','Greenwood','Indianapolis','Lafayette','Muncie','Noblesville','Plainfield','Richmond','Speedway','Terre Haute','Westfield','Zionsville'];
if(form&&supportedCities.includes(requestedCity)){form.elements.project_location.value=requestedCity;}
document.querySelectorAll('.full-nav a').forEach(a=>{if(new URL(a.href).pathname===location.pathname)a.setAttribute('aria-current','page');});
const navMenus=[...document.querySelectorAll('.nav-dropdown')];
navMenus.forEach(menu=>{menu.addEventListener('toggle',()=>{if(menu.open)navMenus.forEach(other=>{if(other!==menu)other.open=false;});});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.open=false;}));});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown'))navMenus.forEach(menu=>{menu.open=false;});});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const open=navMenus.find(menu=>menu.open);if(open){open.open=false;open.querySelector('summary').focus();}}});
if(form){let pending=false;form.addEventListener('submit',async event=>{event.preventDefault();if(pending||!form.reportValidity()||form.elements.botcheck.checked)return;const status=form.querySelector('.form-status');const submit=form.querySelector('[type="submit"]');pending=true;submit.disabled=true;submit.textContent='Sending your request…';status.className='form-status';status.textContent='';const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);try{const payload=Object.fromEntries(new FormData(form));payload.replyto=payload.email;payload.source_page=location.pathname;const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});const result=await response.json();if(!response.ok||!result.success)throw new Error('Submission unsuccessful');status.className='form-status success';status.textContent='Your request has been submitted. Thank you. For urgent fencing, call (317) 296-4015. Preview testers: please confirm that the message reached the test inbox.';form.reset();}catch(error){status.className='form-status error';status.textContent=error.name==='AbortError'?'We couldn’t confirm whether your request arrived. Your details are still here. Please check before sending again, or call (317) 296-4015.':'We couldn’t send your request. Your details are still here. Please try again, or call (317) 296-4015.';}finally{clearTimeout(timeout);pending=false;submit.disabled=false;submit.innerHTML='Request a Quote';status.focus();}});}
// Stage the same visible form for an agent; sending remains a separate user action.
if(form&&document.modelContext?.registerTool){const allowed=['name','company','email','phone','project_location','project_type','message','fence_type','linear_feet','gates','start_date','duration'];try{Promise.resolve(document.modelContext.registerTool({name:'prepare_fence_quote_request',title:'Prepare a fence quote request',description:'Fill the visible Fence Wizards inquiry form for review. Does not submit or send a message.',inputSchema:{type:'object',properties:Object.fromEntries(allowed.map(key=>[key,{type:'string'}])),additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Expected project details.');for(const [key,value] of Object.entries(input)){if(!allowed.includes(key)||typeof value!=='string'||value.length>5000)throw new Error('Invalid form field.');const field=form.elements[key];if(field.tagName==='SELECT' && !Array.from(field.options).some(option=>option.value===value))throw new Error('Invalid selection.');if(field.type==='number' && value!=='' && (!Number.isFinite(Number(value))||Number(value)<Number(field.min)||Number(value)>Number(field.max)))throw new Error('Invalid number.');}for(const [key,value] of Object.entries(input)){form.elements[key].value=value;}form.scrollIntoView({block:'center',behavior:'instant'});return {status:'prepared',submitted:false,fields:Object.keys(input)};}})).catch(()=>{});}catch{}}
