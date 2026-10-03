import {receiptToken,receiptURL,receiptActive} from './receipts.mjs';
export async function notifyQuote(env,row){
 // Delivery status means accepted by the email provider, not confirmed inbox delivery.
 if(!env.RESEND_API_KEY||!env.QUOTE_NOTIFY_TO||!env.QUOTE_NOTIFY_FROM){await env.QUOTES_DB.prepare("UPDATE quotes SET notification_status='not_configured' WHERE id=? AND notification_status!='accepted'").bind(row.id).run();return;}
 const claim=await env.QUOTES_DB.prepare("UPDATE quotes SET notification_status='sending', notification_attempts=notification_attempts+1, notification_updated_at=? WHERE id=? AND notification_status!='accepted' AND (notification_status!='sending' OR notification_updated_at < ?)").bind(new Date().toISOString(),row.id,new Date(Date.now()-120000).toISOString()).run();
 if(!claim.meta.changes)return;
 const data=JSON.parse(row.payload_json),pricing=JSON.parse(row.estimate_json);
 let status='failed';
 try{
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`quote-${row.id}`},signal:AbortSignal.timeout(12000),body:JSON.stringify({from:env.QUOTE_NOTIFY_FROM,to:env.QUOTE_NOTIFY_TO.split(',').map(s=>s.trim()),reply_to:data.contact.email,subject:`New fence quote request ${row.id}`,text:`A quote request is saved in your inbox.\n\nReference: ${row.id}\nCustomer: ${data.contact.name}\nCompany: ${data.contact.company}\nPhone: ${data.contact.phone}\nEmail: ${data.contact.email}\nProject: ${data.address}\nPreliminary amount: ${pricing.total===null?'Custom quote needed':'$'+pricing.total.toFixed(2)+' before tax'}\n\nReview securely: ${env.PUBLIC_ORIGIN}/staff/quotes/?id=${row.id}\n\nThis is a request for review, not an accepted booking.`})});
  if(r.ok)status='accepted';
 }catch{/* Saved requests remain available even when email is unavailable. */}
 await env.QUOTES_DB.prepare('UPDATE quotes SET notification_status=?, notification_updated_at=? WHERE id=?').bind(status,new Date().toISOString(),row.id).run();
}
export async function notifyCustomer(env,row){
 if(!receiptActive(row))return;
 if(!env.RESEND_API_KEY||!env.QUOTE_NOTIFY_FROM){await env.QUOTES_DB.prepare("UPDATE quotes SET customer_notification_status='not_configured' WHERE id=? AND customer_notification_status!='accepted'").bind(row.id).run();return;}
 const claim=await env.QUOTES_DB.prepare("UPDATE quotes SET customer_notification_status='sending',customer_notification_attempts=customer_notification_attempts+1,customer_notification_updated_at=? WHERE id=? AND receipt_revoked_at IS NULL AND receipt_expires_at>? AND customer_notification_status!='accepted' AND (customer_notification_status!='sending' OR customer_notification_updated_at<?)").bind(new Date().toISOString(),row.id,new Date().toISOString(),new Date(Date.now()-120000).toISOString()).run();
 if(!claim.meta.changes)return;
 let status='failed';
 try{
  const token=await receiptToken(env,row),data=JSON.parse(row.payload_json);
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`customer-receipt-${row.id}`},signal:AbortSignal.timeout(12000),body:JSON.stringify({from:env.QUOTE_NOTIFY_FROM,to:[data.contact.email],subject:`Your Fence Wizards quote request ${row.id}`,text:`Your quote request has been saved for Richard to review.\n\nQuote request ID: ${row.id}\n\nView your submitted fence plan and preliminary estimate:\n${receiptURL(env,row.id,token)}\n\nThis private link expires on ${new Date(row.receipt_expires_at).toUTCString()} (30 days after submission). Anyone with the link can view your plan and project location, so keep it private.\n\nRichard must confirm the details, price and installation schedule before booking. No payment is due through this confirmation page.\n\nQuestions or emergency fencing? Call (317) 296-4015.\n\nIf you did not make this request, please contact Richard.\nFence Wizards`})});
  if(r.ok)status='accepted';
 }catch{/* Customer email failure never removes the saved request. */}
 await env.QUOTES_DB.prepare('UPDATE quotes SET customer_notification_status=?,customer_notification_updated_at=? WHERE id=?').bind(status,new Date().toISOString(),row.id).run();
}
