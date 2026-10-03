import {estimate,totalFeet,validatePlan} from '../dist/estimator-core.mjs';
export class HttpError extends Error {constructor(status,message){super(message);this.status=status;}}
export const fail=(message)=>{throw new HttpError(400,message);};
export function text(value,max,required=false){if(typeof value!=='string'||value.length>max||(required&&!value.trim()))fail('Please check the required fields and text lengths.');return value.trim();}
const integer=(n,max)=>{if(!Number.isInteger(n)||n<0||n>max)fail('Invalid quantity.');return n;};
const choice=(v,values)=>{if(!values.includes(v))fail('Invalid selection.');return v;};
const bool=v=>{if(typeof v!=='boolean')fail('Invalid selection.');return v;};
export function normalize(raw){
 if(!raw||typeof raw!=='object')fail('Invalid request.');
 const c=raw.contact||{},o=raw.options||{};
 const contact={name:text(c.name,150,true),company:text(c.company??'',180),email:text(c.email,200,true).toLowerCase(),phone:text(c.phone,40,true)};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))fail('Enter a valid email.');
 let plan;try{plan=validatePlan(raw.plan);}catch{fail('Invalid fence drawing.');}
 const feet=Math.round(totalFeet(plan)*10)/10;if(feet<=0||feet>100000)fail('Enter a valid fence length.');
 const months=integer(o.months,60);if(months<1)fail('Enter rental months.');
 const options={months,fence:choice(o.fence,['panels','driven','barricades','mixed']),project:choice(o.project,['construction','event','emergency','other']),screen:choice(o.screen,['none','plain','printed','unsure']),zone:choice(o.zone,['unknown','near','far']),shortJob:bool(o.shortJob),topRail:bool(o.topRail),reinforce:bool(o.reinforce),asphalt:integer(o.asphalt,10000),bags:integer(o.bags,10000),locks:integer(o.locks,100),wheels:integer(o.wheels,100)};
 const single=plan.gates.filter(g=>g.type==='single').length+plan.extraGates.single,double=plan.gates.filter(g=>g.type==='double').length+plan.extraGates.double;
 if(single>200||double>200)fail('Maximum 200 gates of each type.');
 const date=text(raw.installDate??'',10);if(date&&(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date))fail('Invalid installation date.');
 const payload={contact,address:text(raw.address,300,true),installDate:date,notes:text(raw.notes??'',3000),plan,options};
 const pricing=estimate({...options,feet,single,double});
 return {payload,pricing,feet,single,double};
}
export async function hash(value){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('');}
export function requestKey(value){if(typeof value!=='string'||!/^\w{8}-\w{4}-4\w{3}-[89ab]\w{3}-\w{12}$/i.test(value))fail('Invalid request reference.');return value;}
