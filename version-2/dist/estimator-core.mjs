export const RATE_VERSION='FW-2026-08-10';
export const rates={driven:{short:4.2,medium:5.1,long:6},panels:{short:5.65,medium:6.85,long:8.2},singleGate:140,doubleGate:280,topRail:1.6,screen:1.8,asphaltPost:30,reinforcement:1.25,sandbag:8,chainLock:50,gateWheel:50,travelPerFoot:1};
export function segmentFeet(a,b,scale){return Math.hypot(b[0]-a[0],b[1]-a[1])*scale/40;}
export function totalFeet(plan){if(plan.mode==='manual')return Number(plan.manual)||0;return plan.runs.reduce((sum,run)=>sum+run.points.slice(1).reduce((s,p,i)=>s+(run.lengths[i]??segmentFeet(run.points[i],p,plan.scale)),0),0);}
export function estimate(input){
 const feet=Number(input.feet),months=Number(input.months);const items=[],review=[];
 if(!Number.isFinite(feet)||feet<=0||feet>100000)return {items,review:['Add a valid fence length.'],total:null};
 if(!Number.isInteger(months)||months<1||months>60)return {items,review:['Enter a rental duration between 1 and 60 months.'],total:null};
 const type=input.fence;let base;
 if(type==='driven'){if(months===24)review.push('Richard needs to confirm the rate at the 24-month boundary.');else base=months<=18?rates.driven.short:months<24?rates.driven.medium:rates.driven.long;}
 else if(type==='panels'){if(months>18&&months<24)review.push('Panel pricing for 19–23 months is not listed.');else base=months<=12?rates.panels.short:months<=18?rates.panels.medium:rates.panels.long;}
 else review.push('This fence selection requires a custom quote.');
 if(input.project==='emergency')review.push('Emergency timing and any applicable charges need confirmation.');
 if(input.shortJob)review.push('Richard will confirm any short-term or event discount.');
 const add=(label,quantity,rate)=>{if(quantity>0)items.push({label,quantity,rate,amount:Math.round(quantity*rate*100)/100});};
 const count=k=>{const n=Number(input[k]||0);if(!Number.isInteger(n)||n<0||n>10000)throw Error('Invalid accessory quantity');return n;};
 if(base!==undefined)add(type==='panels'?'Panels & stands · agreed rental term':'Post-driven fence · agreed rental term',feet,base);
 if(type==='driven'){add('Single gates',count('single'),rates.singleGate);add('Double gates',count('double'),rates.doubleGate);if(input.topRail)add('Top rail',feet,rates.topRail);add('Posts through asphalt',count('asphalt'),rates.asphaltPost);}
 if(type==='panels'){if(input.reinforce)add('Posts every other panel',feet,rates.reinforcement);add('Additional sandbags',count('bags'),rates.sandbag);if(input.screen!=='none')review.push('Richard must confirm stand count and windscreen ballast requirements.');}
 if(input.screen==='plain')add('Plain windscreen · purchased',feet,rates.screen);
 if(input.screen==='printed'||input.screen==='unsure')review.push('Windscreen specification and pricing need confirmation.');
 add('Chain & lock',count('locks'),rates.chainLock);add('Gate wheels',count('wheels'),rates.gateWheel);
 if(input.zone==='far')add('50+ mile new-installation surcharge',feet,rates.travelPerFoot);
 else if(input.zone!=='near')review.push('Delivery distance is unconfirmed; the $1/ft outer-area surcharge is not included.');
 const total=base===undefined?null:Math.round(items.reduce((s,i)=>s+i.amount,0)*100)/100;
 return {items,review,total,version:RATE_VERSION};
}
export function validatePlan(raw){
 if(!raw||raw.version!==1||!['draw','manual'].includes(raw.mode)||![5,10,20,50].includes(raw.scale)||!Array.isArray(raw.runs)||raw.runs.length>30)throw Error('Invalid plan file');
 let points=0;const runs=raw.runs.map(r=>{if(!r||!Array.isArray(r.points)||r.points.length>80||!Array.isArray(r.lengths))throw Error('Invalid run');points+=r.points.length;return {points:r.points.map(p=>{if(!Array.isArray(p)||p.length!==2||p.some((n,i)=>!Number.isFinite(n)||n<0||n>(i?500:800)))throw Error('Invalid point');return p;}),lengths:r.points.slice(1).map((_,i)=>{const n=r.lengths[i];if(n!==null&&n!==undefined&&(!Number.isFinite(n)||n<=0||n>100000))throw Error('Invalid segment length');return n??null;})};});
 if(points>80)throw Error('Plan limit: 80 points');const manual=Number(raw.manual||0);if(!Number.isFinite(manual)||manual<0||manual>100000)throw Error('Invalid footage');
 const gates=raw.gates??[];
 if(!Array.isArray(gates)||gates.length>100)throw Error('Invalid gates');
 const cleanGates=gates.map(g=>{if(!g||!['single','double'].includes(g.type)||!Number.isInteger(g.run)||!Number.isInteger(g.segment)||!runs[g.run]||g.segment<0||g.segment>=runs[g.run].points.length-1||!Number.isFinite(g.t)||g.t<0||g.t>1)throw Error('Invalid gate placement');return {type:g.type,run:g.run,segment:g.segment,t:g.t};});
 const extraGates=raw.extraGates??{single:0,double:0};if(!extraGates||['single','double'].some(k=>!Number.isInteger(extraGates[k])||extraGates[k]<0||extraGates[k]>200))throw Error('Invalid gate counts');
 return {version:1,mode:raw.mode,scale:raw.scale,manual,runs,gates:cleanGates,extraGates:{single:extraGates.single,double:extraGates.double}};
}
