import {HttpError} from './validation.mjs';
const encoder=new TextEncoder();
export const RECEIPT_DAYS=30;
export const receiptConfigured=env=>typeof env.RECEIPT_SIGNING_KEY==='string'&&env.RECEIPT_SIGNING_KEY.length>=32;
export function newReceipt(createdAt){return {nonce:[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join(''),expiresAt:new Date(Date.parse(createdAt)+RECEIPT_DAYS*86400000).toISOString()};}
async function key(env){if(!receiptConfigured(env))throw new HttpError(503,'Private confirmation links are not configured.');return crypto.subtle.importKey('raw',encoder.encode(env.RECEIPT_SIGNING_KEY),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
const message=row=>encoder.encode(`fw-receipt-v1\n${row.id}\n${row.receipt_nonce}\n${row.receipt_expires_at}`);
export function receiptActive(row,now=Date.now()){return !!row.receipt_nonce&&!row.receipt_revoked_at&&Date.parse(row.receipt_expires_at)>now;}
export async function receiptToken(env,row){if(!receiptActive(row))return null;const bytes=new Uint8Array(await crypto.subtle.sign('HMAC',await key(env),message(row)));return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');}
export async function verifyReceipt(env,row,token){
 if(typeof token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(token)||!row.receipt_nonce)return false;
 const bytes=Uint8Array.from(atob(token.replaceAll('-','+').replaceAll('_','/')+'='),c=>c.charCodeAt(0));
 return crypto.subtle.verify('HMAC',await key(env),bytes,message(row));
}
export const receiptURL=(env,id,token)=>`${env.PUBLIC_ORIGIN}/quote-confirmation/#${new URLSearchParams({id,token})}`;
