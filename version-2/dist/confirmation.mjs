import {$,el,project,api} from './quote-view.mjs';
import {sample} from './quote-demo.mjs';
let privateLink=null;
const demo=new URLSearchParams(location.search).get('demo')==='1';
$('copy-confirmation').onclick=async()=>{if(!privateLink)return;try{await navigator.clipboard.writeText(privateLink);$('link-message').textContent='Private link copied. Keep it somewhere safe.';}catch{$('link-message').textContent='Copy your private link from the field below.';$('private-link').hidden=false;$('private-link').value=privateLink;$('private-link').select();}};
$('print-request').onclick=()=>window.print();
async function start(){try{
 let receipt;
 if(demo){$('demo-notice').hidden=false;receipt={...sample,...sample.payload};$('confirmation-title').textContent='Your confirmation, at a glance.';}
 else{let key;const fragment=new URLSearchParams(location.hash.slice(1));
 if(fragment.has('token')||fragment.has('id')){key={id:fragment.get('id'),token:fragment.get('token')};history.replaceState(null,'',location.pathname+location.search);if(!/^FW-[A-F0-9]{16}$/.test(key.id||'')||!/^[A-Za-z0-9_-]{43}$/.test(key.token||''))throw Error('This confirmation link is invalid. Please use the complete link from your email.');try{sessionStorage.setItem('fw-quote-receipt',JSON.stringify(key));}catch{}}
 else{try{key=JSON.parse(sessionStorage.getItem('fw-quote-receipt'));}catch{}}
 if(!key?.token)throw Error('Open the private confirmation link from your email. If you need help, call Richard at (317) 296-4015 with your quote request ID.');
 receipt=await api('/api/quote-receipt',{method:'POST',body:JSON.stringify(key)});privateLink=location.origin+location.pathname+'#'+new URLSearchParams(key);$('confirmation-title').textContent='Your quote request is saved.';}
 $('copy-confirmation').disabled=demo;
 $('link-expiry').textContent=demo?'Example: private links expire 30 days after submission.':`Your private link expires ${new Date(receipt.expiresAt).toLocaleDateString()}. Anyone with this link can view your plan and project location. Keep it private. Richard retains your request after the link expires.`;
 $('request-id').textContent=receipt.id;$('request-date').textContent=new Date(receipt.createdAt).toLocaleString();$('confirmation-status').textContent=demo?'Awaiting Richard’s confirmation':receipt.status;
 $('confirmation-message').textContent=demo?'Sample confirmation only. No request was submitted and no email was sent.':'Your plan is saved for Richard to review. Keep this reference when you call. This is not a booking or an approved quote.';
 project(receipt,$('receipt-project'));$('receipt-content').hidden=false;$('receipt-error').textContent='';
 }catch(error){$('receipt-error').textContent=error.message;$('confirmation-title').textContent='Let’s find your request.';}}
start();
