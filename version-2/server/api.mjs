import {HttpError,normalize,text,hash,requestKey} from './validation.mjs';
import {authorize} from './auth.mjs';
import {notifyQuote,notifyCustomer} from './notifications.mjs';
import {newReceipt,receiptConfigured,receiptToken,verifyReceipt,receiptActive} from './receipts.mjs';
const statuses=['new','contacted','quoted','closed'];
const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers});
async function body(request){
 if(!request.headers.get('content-type')?.startsWith('application/json'))throw new HttpError(415,'Send JSON.');
 const reader=request.body?.getReader();if(!reader)throw new HttpError(400,'Missing request.');
 const chunks=[];let length=0;
 while(true){const {value,done}=await reader.read();if(done)break;length+=value.length;if(length>65536){await reader.cancel();throw new HttpError(413,'Request is too large.');}chunks.push(value);}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 try{return JSON.parse(new TextDecoder().decode(bytes));}catch{throw new HttpError(400,'Invalid JSON.');}
}
function origin(request,env){if(!env.PUBLIC_ORIGIN||request.headers.get('Origin')!==env.PUBLIC_ORIGIN||new URL(request.url).origin!==env.PUBLIC_ORIGIN)throw new HttpError(403,'Request origin is not allowed.');}
const publicReceipt=row=>{const p=JSON.parse(row.payload_json),e=JSON.parse(row.estimate_json);return {id:row.id,createdAt:row.created_at,status:row.status==='new'||row.status==='contacted'?'Awaiting Richard’s confirmation':'Reviewed — contact Richard for the latest details',address:p.address,installDate:p.installDate,plan:p.plan,options:p.options,pricing:e,expiresAt:row.receipt_expires_at};};
function detail(row){return {id:row.id,createdAt:row.created_at,updatedAt:row.updated_at,status:row.status,revision:row.revision,internalNotes:row.internal_notes,notification:row.notification_status,customerNotification:row.customer_notification_status,receiptExpiresAt:row.receipt_expires_at,receiptRevoked:!!row.receipt_revoked_at,payload:JSON.parse(row.payload_json),pricing:JSON.parse(row.estimate_json)};}
async function getRow(db,id){const row=await db.prepare('SELECT * FROM quotes WHERE id=?').bind(id).first();if(!row)throw new HttpError(404,'Quote request not found.');return row;}
export function createHandler({auth=authorize,verifyChallenge,notify=notifyQuote,customerNotify=notifyCustomer}={}){
 return async function handle(context){const {request,env}=context;const db=env.QUOTES_DB,url=new URL(request.url),path=url.pathname.replace(/\/$/,'');
 try{
  if(path==='/api/quote-config'&&request.method==='GET')return json({enabled:!!(db&&env.ACCEPT_QUOTES==='true'&&env.TURNSTILE_SITE_KEY&&env.TURNSTILE_SECRET_KEY&&env.PUBLIC_ORIGIN&&receiptConfigured(env)),siteKey:env.TURNSTILE_SITE_KEY||null});
  if(!db)throw new HttpError(503,'Quote storage is not connected yet.');
  if(request.method!=='GET')origin(request,env);
  if(path==='/api/quotes'&&request.method==='POST'){
   if(env.ACCEPT_QUOTES!=='true'||!env.TURNSTILE_SITE_KEY||!env.TURNSTILE_SECRET_KEY||!receiptConfigured(env))throw new HttpError(503,'Online quote submissions are not enabled yet.');
   const raw=await body(request);if(raw.botcheck)throw new HttpError(400,'Unable to accept this request.');
   const key=requestKey(raw.submissionId),keyHash=await hash(key),data=normalize(raw),payloadHash=await hash(JSON.stringify(data.payload));
   const existing=await db.prepare('SELECT * FROM quotes WHERE request_key_hash=?').bind(keyHash).first();
   if(existing){if(existing.payload_hash!==payloadHash)throw new HttpError(409,'This submission reference was already used for different details. Start a new request.');return json({id:existing.id,saved:true,receiptToken:await receiptToken(env,existing),receiptExpiresAt:existing.receipt_expires_at},200);}
   const token=text(raw.turnstileToken??'',2048,true);
   let verified;
   if(verifyChallenge)verified=await verifyChallenge(token,env);
   else{const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get('CF-Connecting-IP'),idempotency_key:key}),signal:AbortSignal.timeout(10000)});const result=await response.json();verified=result.success&&result.action==='quote'&&result.hostname===new URL(env.PUBLIC_ORIGIN).hostname;}
   if(!verified)throw new HttpError(400,'Please complete the security check again.');
   const id='FW-'+crypto.randomUUID().replaceAll('-','').slice(0,16).toUpperCase(),now=new Date().toISOString(),receipt=newReceipt(now);
   await db.batch([
    db.prepare('INSERT OR IGNORE INTO quotes (id,request_key_hash,payload_hash,created_at,updated_at,name,email,address,payload_json,estimate_json,receipt_nonce,receipt_expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,keyHash,payloadHash,now,now,data.payload.contact.name,data.payload.contact.email,data.payload.address,JSON.stringify(data.payload),JSON.stringify(data.pricing),receipt.nonce,receipt.expiresAt),
    db.prepare("INSERT OR IGNORE INTO quote_events (quote_id,created_at,actor,revision,status) SELECT id,created_at,'customer',1,status FROM quotes WHERE request_key_hash=?").bind(keyHash)
   ]);
   const row=await db.prepare('SELECT * FROM quotes WHERE request_key_hash=?').bind(keyHash).first();if(!row)throw new Error('Storage failed');
   if(row.payload_hash!==payloadHash)throw new HttpError(409,'Submission reference conflict.');
   context.waitUntil(Promise.allSettled([notify(env,row),customerNotify(env,row)]));return json({id:row.id,saved:true,receiptToken:await receiptToken(env,row),receiptExpiresAt:row.receipt_expires_at},201);
  }
  if(path==='/api/quote-receipt'&&request.method==='POST'){
   const raw=await body(request);
   const row=await db.prepare('SELECT * FROM quotes WHERE id=?').bind(text(raw.id,32,true)).first();
   if(!row||!await verifyReceipt(env,row,raw.token))throw new HttpError(404,'This private confirmation link is invalid. Contact Richard with your quote request ID.');
   if(!receiptActive(row))throw new HttpError(410,'This private confirmation link has expired or been disabled. Your request is still saved with Richard. Call (317) 296-4015 for help.');
   return json(publicReceipt(row));
  }
  if(path.startsWith('/api/staff/')){
   const actor=await auth(request,env);
   if(path==='/api/staff/quotes'&&request.method==='GET'){
    const q=(url.searchParams.get('q')||'').trim().slice(0,100),status=url.searchParams.get('status')||'';
    if(status&&!statuses.includes(status))throw new HttpError(400,'Invalid status.');
    const page=Math.max(0,Math.min(10000,Number(url.searchParams.get('page'))||0));if(!Number.isInteger(page))throw new HttpError(400,'Invalid page.');
    const escaped=q.replace(/[!%_]/g,'!$&'),like=`%${escaped}%`;
    const rows=await db.prepare("SELECT id,created_at,name,address,status,estimate_json,notification_status FROM quotes WHERE (?='' OR status=?) AND (?='' OR id LIKE ? ESCAPE '!' OR name LIKE ? ESCAPE '!' OR address LIKE ? ESCAPE '!') ORDER BY created_at DESC,id DESC LIMIT 26 OFFSET ?").bind(status,status,q,like,like,like,page*25).all();
    return json({quotes:rows.results.slice(0,25).map(r=>({id:r.id,createdAt:r.created_at,name:r.name,address:r.address,status:r.status,pricing:JSON.parse(r.estimate_json),notification:r.notification_status})),hasMore:rows.results.length>25});
   }
   const match=path.match(/^\/api\/staff\/quotes\/(FW-[A-F0-9]{16})(\/(?:notify|customer-notify|revoke-receipt))?$/);
   if(match){const row=await getRow(db,match[1]);
    if(request.method==='GET'&&!match[2])return json(detail(row));
    if(request.method==='POST'&&match[2]){
     if(match[2]==='/notify')await notify(env,row);
     else if(match[2]==='/customer-notify')await customerNotify(env,row);
     else await db.prepare('UPDATE quotes SET receipt_revoked_at=? WHERE id=? AND receipt_revoked_at IS NULL').bind(new Date().toISOString(),row.id).run();
     return json(detail(await getRow(db,row.id)));
    }
    if(request.method==='PATCH'&&!match[2]){
     const raw=await body(request);if(!statuses.includes(raw.status)||!Number.isInteger(raw.revision))throw new HttpError(400,'Invalid update.');
     const notes=text(raw.internalNotes,5000),now=new Date().toISOString();
     const result=await db.batch([
      db.prepare('UPDATE quotes SET status=?, internal_notes=?, updated_at=?, revision=revision+1,last_edited_by=? WHERE id=? AND revision=?').bind(raw.status,notes,now,actor,row.id,raw.revision),
      db.prepare('INSERT OR IGNORE INTO quote_events (quote_id,created_at,actor,revision,status) SELECT id,updated_at,last_edited_by,revision,status FROM quotes WHERE id=? AND revision=? AND last_edited_by=?').bind(row.id,raw.revision+1,actor)
     ]);
     if(!result[0].meta.changes)throw new HttpError(409,'Someone updated this request. Reload it before saving your changes.');
     return json(detail(await getRow(db,row.id)));
    }
   }
  }
  throw new HttpError(404,'Not found.');
 }catch(error){return json({error:error instanceof HttpError?error.message:'Unable to complete this request. Your details have not been cleared; please try again.'},error instanceof HttpError?error.status:503);}
 };
}
export const handle=createHandler();
