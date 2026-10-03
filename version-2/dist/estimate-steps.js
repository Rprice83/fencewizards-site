const cards=[...document.querySelectorAll('.estimator-main > .planner-card')];
const main=document.querySelector('.estimator-main');
const names=['Plan your fence','Rental options','Review & send'];
let current=0;
const nav=document.createElement('nav');nav.className='planner-steps';nav.setAttribute('aria-label','Quote steps');
const status=document.createElement('p');status.className='step-progress';status.setAttribute('aria-live','polite');
main.prepend(nav);main.prepend(status);
const error=document.createElement('p');error.className='step-error';error.setAttribute('role','alert');
function valid(index){
 error.textContent='';
 if(index===0 && !(Number(document.getElementById('footage-total').textContent.replaceAll(',',''))>0)){error.textContent='Draw a fence line or enter your footage before continuing.';cards[0].append(error);error.tabIndex=-1;error.focus();return false;}
 for(const field of cards[index].querySelectorAll('input,select,textarea')){if(field.closest('[hidden]')||field.disabled)continue;if(!field.checkValidity()){const details=field.closest('details');if(details)details.open=true;field.reportValidity();return false;}}
 return true;
}
function go(index){
 // Review requires visiting rental options first, even from the sidebar shortcut.
 if(index>current+1)index=current+1;
 if(index>current){for(let i=current;i<index;i++){if(!valid(i))return;}}
 current=index;cards.forEach((card,i)=>card.hidden=i!==index);
 [...nav.children].forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 status.textContent=`Step ${index+1} of 3`;
 if(index===2)review();
 const heading=cards[index].querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});nav.scrollIntoView({block:'start',behavior:'instant'});
}
cards.forEach((card,i)=>{
 const tab=document.createElement('button');tab.type='button';tab.textContent=`${i+1}. ${names[i]}`;tab.onclick=()=>go(i);nav.append(tab);
 const controls=document.createElement('div');controls.className='step-actions';
 if(i){const back=document.createElement('button');back.type='button';back.className='step-back';back.textContent='Back';back.onclick=()=>go(i-1);controls.append(back);}
 if(i<2){const next=document.createElement('button');next.type='button';next.className='button';next.textContent=i===0?'Next: rental options':'Next: review & send';next.onclick=()=>go(i+1);controls.append(next);}
 card.append(controls);card.hidden=i!==0;
});
status.textContent='Step 1 of 3';nav.firstChild.setAttribute('aria-current','step');
const reviewBox=document.createElement('div');reviewBox.className='step-review';document.getElementById('estimate-form').before(reviewBox);
function review(){
 reviewBox.replaceChildren();
 const value=id=>{const e=document.getElementById(id);return e.tagName==='SELECT'?e.selectedOptions[0].textContent:e.value;};
 for(const [label,text] of [['Project location',value('site-address')||'Not provided'],['Project type',value('project-type')],['Preferred installation',value('install-date')||'To confirm'],['Notes',value('project-notes')||'None added']]){const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(text));reviewBox.append(p);}
 for(const [label,step] of [['Edit layout & gates',0],['Edit rental options',1]]){const b=document.createElement('button');b.type='button';b.className='step-back';b.textContent=label;b.onclick=()=>go(step);reviewBox.append(b);}
}
document.querySelector('.estimate-summary > a[href="#send-heading"]').addEventListener('click',e=>{e.preventDefault();go(2);});
// One live summary for all steps: expanded on desktop, compact on mobile.
const summary=document.querySelector('.estimate-summary');
const details=document.createElement('details');details.className='responsive-summary';
const toggle=document.createElement('summary');toggle.innerHTML='<span>Preliminary estimate <strong class="compact-price"></strong></span><span class="breakdown-label">View breakdown</span>';
details.append(toggle);summary.before(details);details.append(summary);
const media=matchMedia('(max-width:800px)');
function adapt(){details.open=!media.matches;}adapt();media.addEventListener('change',adapt);
const price=document.getElementById('price-total');function sync(){toggle.querySelector('.compact-price').textContent=price.textContent;}sync();new MutationObserver(sync).observe(price,{childList:true,subtree:true,characterData:true});
details.addEventListener('toggle',()=>toggle.querySelector('.breakdown-label').textContent=details.open?'Hide breakdown':'View breakdown');
window.addEventListener('beforeprint',()=>{cards.forEach(c=>c.hidden=false);details.open=true;});
window.addEventListener('afterprint',()=>{cards.forEach((c,i)=>c.hidden=i!==current);adapt();});

// Compact rental details without duplicating inputs or changing pricing data.
const rental=cards[1];rental.classList.add('compact-rental');
document.getElementById('rental-heading').textContent='Rental details';
rental.querySelector('.step-heading .eyebrow').textContent='Choose your setup';
const fields=rental.querySelector('.est-fields');
const gateDetails=document.createElement('details');gateDetails.className='rental-disclosure gate-quantities';
const gateLabel=document.createElement('summary');gateLabel.innerHTML='<span class="gate-count-label"></span><span class="disclosure-action">Edit quantities</span>';gateDetails.append(gateLabel);
const gateFields=document.createElement('div');gateFields.className='est-fields';gateDetails.append(gateFields);
for(const id of ['single-gates','double-gates'])gateFields.append(document.getElementById(id).closest('label'));
for(const id of ['project-type','fence-type','install-date','rental-months','screen-type','delivery-zone'])fields.append(document.getElementById(id).closest('label'));
fields.after(gateDetails);
const gatePricing=document.getElementById('gate-pricing');gateDetails.append(gatePricing);
const gateInstructions=[...rental.querySelectorAll('p')].find(p=>p.textContent.startsWith('Gate totals update'));
const help=document.createElement('details');help.className='gate-help';
const helpLabel=document.createElement('summary');helpLabel.textContent='How gate counts work';help.append(helpLabel,gateInstructions);gateDetails.append(help);
const gateHint=document.createElement('p');gateHint.className='est-help gate-hint';gateDetails.after(gateHint);
const notesField=document.getElementById('project-notes').closest('label');
const notesDetails=document.createElement('details');notesDetails.className='rental-disclosure rental-notes';
const notesLabel=document.createElement('summary');notesLabel.innerHTML='Add site details or questions <span class="notes-state">(optional)</span>';
notesField.before(notesDetails);notesDetails.append(notesLabel,notesField);
const windscreenNote=[...rental.querySelectorAll('p')].find(p=>p.textContent.startsWith('Windscreen is purchased'));
windscreenNote.textContent='Windscreen is purchased and stays yours. Screened panels may need extra ballast; Richard confirms the stand count and sandbags.';
document.getElementById('screen-type').closest('label').append(windscreenNote);
// The sidebar already keeps exclusions and final confirmation visible.
const terms=[...rental.querySelectorAll('p')].find(p=>p.textContent.startsWith('Rates cover the rental term'));
terms.textContent='Rates cover the agreed rental term, not a monthly charge.';
let lastManual=null;
function syncRental(){
 const manual=document.getElementById('manual-mode').getAttribute('aria-pressed')==='true';
 if(manual!==lastManual){gateDetails.open=manual;lastManual=manual;}
 gateLabel.querySelector('.gate-count-label').textContent=`Gates: ${document.getElementById('single-gates').value||0} single · ${document.getElementById('double-gates').value||0} double`;
 gateHint.textContent=manual?'Enter the gate quantities you need.':'Updated from your drawing. Edit quantities to include unplaced gates.';
 notesLabel.querySelector('.notes-state').textContent=document.getElementById('project-notes').value.trim()?'Added':'(optional)';
 windscreenNote.hidden=document.getElementById('screen-type').value==='none';
}
gateDetails.addEventListener('toggle',()=>gateLabel.querySelector('.disclosure-action').textContent=gateDetails.open?'Hide quantities':'Edit quantities');
rental.addEventListener('input',syncRental);
new MutationObserver(syncRental).observe(document.getElementById('summary-gates'),{childList:true,characterData:true,subtree:true});
new MutationObserver(syncRental).observe(document.getElementById('manual-mode'),{attributes:true,attributeFilter:['aria-pressed']});
syncRental();
