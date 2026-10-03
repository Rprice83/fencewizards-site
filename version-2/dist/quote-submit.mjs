export async function setupSubmission({getPlan,getOptions}){
 const form=document.getElementById('estimate-form'),status=document.getElementById('send-status'),button=form.querySelector('[type=submit]');
 form.addEventListener('submit',e=>e.preventDefault());
 let config=null,busy=false,widget=null,token='',lastAttempt=null;
 const say=message=>{status.textContent=message;};
 button.disabled=true;say('Checking quote submission availability…');
 try{const r=await fetch('/api/quote-config',{signal:AbortSignal.timeout(7000)});if(!r.ok)throw Error();config=await r.json();if(!config.enabled)throw Error();}
 catch{say('Preview only: saved quote submissions are not connected on this host. You can explore the sample confirmation and inbox below.');document.getElementById('quote-demo-links').hidden=false;button.textContent='Submissions available after Cloudflare setup';return;}
 document.getElementById('quote-mode-note').textContent='Your request will be saved for Richard to review. You’ll receive a reference number after it is saved.';
 say('');
 const challenge=document.createElement('div');challenge.id='quote-security';button.before(challenge);
 const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
 script.onload=()=>{widget=window.turnstile.render(challenge,{sitekey:config.siteKey,action:'quote',callback:value=>{token=value;button.disabled=false;},'expired-callback':()=>{token='';button.disabled=true;},'error-callback':()=>{token='';button.disabled=true;say('Security check unavailable. Refresh to try again, or call Richard.');}});};
 script.onerror=()=>say('The security check could not load. Refresh to try again, or call Richard.');document.head.append(script);
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||form.elements.botcheck.checked||!form.reportValidity())return;
  const address=document.getElementById('site-address');if(!address.value.trim()){say('Enter the project address or city first.');address.focus();return;}
  const invalid=[...document.querySelectorAll('.estimate-page input,.estimate-page select')].find(e=>!e.checkValidity());if(invalid){invalid.reportValidity();return;}
  if(!(getOptions().feet>0)){say('Add your fence footage before sending.');return;}
  const payload={contact:{name:form.elements.name.value,company:form.elements.company.value,email:form.elements.email.value,phone:form.elements.phone.value},address:address.value,installDate:document.getElementById('install-date').value,notes:document.getElementById('project-notes').value,plan:getPlan(),options:getOptions()};
  const fingerprint=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(payload))))).map(b=>b.toString(16).padStart(2,'0')).join('');
  try{lastAttempt=JSON.parse(sessionStorage.getItem('fw-quote-attempt')||'null')||lastAttempt;}catch{}
  if(!lastAttempt||lastAttempt.fingerprint!==fingerprint)lastAttempt={fingerprint,id:crypto.randomUUID()};
  try{sessionStorage.setItem('fw-quote-attempt',JSON.stringify(lastAttempt));}catch{}
  busy=true;button.disabled=true;button.textContent='Saving your request…';say('');
  try{
   const r=await fetch('/api/quotes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,submissionId:lastAttempt.id,turnstileToken:token}),signal:AbortSignal.timeout(25000)});
   const data=await r.json();if(!r.ok||!data.saved)throw Error(data.error||'Your request could not be saved.');
   if(!data.receiptToken){say(`Your request is saved. Reference: ${data.id}. Contact Richard to retrieve its details.`);button.textContent='Request saved';return;}
   const receipt={id:data.id,token:data.receiptToken};
   try{try{sessionStorage.setItem('fw-quote-receipt',JSON.stringify(receipt));sessionStorage.removeItem('fw-quote-attempt');}catch{}location.assign('/quote-confirmation/#'+new URLSearchParams(receipt));}
   catch{say(`Your request is saved. Quote request ID: ${data.id}. Please keep this reference and call (317) 296-4015 if needed.`);button.textContent='Request saved';return;}
  }catch(error){say(error.name==='TimeoutError'?'We could not confirm the result. Your details are still here. Try again with the same details; this will not create a duplicate.':error.message);token='';if(widget!==null)window.turnstile.reset(widget);}
  finally{busy=false;if(button.textContent!=='Request saved')button.textContent='Send my plan for a quote';button.disabled=!token;}
 });
}
