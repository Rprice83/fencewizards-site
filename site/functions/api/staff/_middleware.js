// Every /api/staff/* request must come from a verified staff member (see server/staff-auth.js).
import { staffUser, forbidden } from '../../../server/staff-auth.js';

export async function onRequest(context) {
  const user = await staffUser(context.request, context.env).catch(() => null);
  if (!user) return forbidden(true);
  context.data.user = user;
  const res = await context.next();
  const out = new Response(res.body, res);
  out.headers.set('Cache-Control', 'no-store');
  out.headers.set('X-Robots-Tag', 'noindex');
  return out;
}
