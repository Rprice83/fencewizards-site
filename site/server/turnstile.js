// Cloudflare Turnstile: confirms a form was sent by a person, not a bot.
// The page's widget puts a one-time token in the form; we ask Cloudflare whether it's genuine.
//
// Env: TURNSTILE_SECRET (Cloudflare secret, never committed). Without it the check is skipped
// (the honeypot field still catches simple bots); TODO.md makes setting it a launch step.
// Returns { status } and server/spam-check.js decides what to do with it:
//   passed | skipped (no secret) | no-token | failed (Cloudflare says not a person)
//   | setup-error (Cloudflare refused our secret) | unreachable (Cloudflare didn't answer)

export const ROBOT_MESSAGE = 'We couldn’t confirm you’re not a robot. Please try sending again.';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const SETUP_ERRORS = ['missing-input-secret', 'invalid-input-secret'];

export async function verifyTurnstile(token, env, ip, { fetchImpl = fetch } = {}) {
  if (!env.TURNSTILE_SECRET) return { status: 'skipped' };
  if (typeof token !== 'string' || !token) return { status: 'no-token' };
  if (token.length > 2048) return { status: 'failed' };

  const body = new FormData();
  body.set('secret', env.TURNSTILE_SECRET);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  let res;
  try { res = await fetchImpl(VERIFY_URL, { method: 'POST', body }); } catch { return { status: 'unreachable' }; }
  if (!res.ok) return { status: 'unreachable' };
  const data = await res.json().catch(() => null);
  if (!data) return { status: 'unreachable' };
  if (data.success === true) return { status: 'passed' };
  const codes = data['error-codes'] || [];
  return { status: codes.some(c => SETUP_ERRORS.includes(c)) ? 'setup-error' : 'failed', codes };
}
