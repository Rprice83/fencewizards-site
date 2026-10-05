// Cloudflare Turnstile: confirms a form was sent by a person, not a bot.
// The page's widget puts a one-time token in the form; we ask Cloudflare whether it's genuine.
//
// Env: TURNSTILE_SECRET (Cloudflare secret, never committed). Without it the check is skipped
// (the honeypot field still catches simple bots); TODO.md makes setting it a launch step.
// If Cloudflare itself can't be reached we let the form through: a lost lead costs more than one spam message.

export const ROBOT_MESSAGE = 'We couldn’t confirm you’re not a robot. Please try sending again.';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token, env, ip, { fetchImpl = fetch } = {}) {
  if (!env.TURNSTILE_SECRET) return { ok: true, skipped: true };
  if (typeof token !== 'string' || !token || token.length > 2048) return { ok: false };

  const body = new FormData();
  body.set('secret', env.TURNSTILE_SECRET);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  let res;
  try { res = await fetchImpl(VERIFY_URL, { method: 'POST', body }); } catch { return { ok: true, unreachable: true }; }
  if (!res.ok) return { ok: true, unreachable: true };
  const data = await res.json().catch(() => null);
  if (!data) return { ok: true, unreachable: true };
  return { ok: data.success === true, codes: data['error-codes'] || [] };
}
