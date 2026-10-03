// The Quote Inbox pages (/staff/*) are only served to verified staff (see server/staff-auth.js).
import { staffUser, forbidden } from '../../server/staff-auth.js';

export async function onRequest(context) {
  const user = await staffUser(context.request, context.env).catch(() => null);
  if (!user) return forbidden(false);
  const res = await context.next();
  const out = new Response(res.body, res);
  out.headers.set('Cache-Control', 'no-store');
  out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  // Only our own scripts (plus Leaflet from cdnjs) may run here, even if bad data slipped into the page
  out.headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    'font-src https://fonts.gstatic.com',
    "img-src 'self' data: blob: https://server.arcgisonline.com",
    "connect-src 'self'",
    "frame-ancestors 'none'", "base-uri 'none'", "form-action 'self'",
  ].join('; '));
  out.headers.set('Referrer-Policy', 'no-referrer');
  return out;
}
