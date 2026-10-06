// Decides what happens to a form submission, from the two spam signals: the hidden "leave this empty" field (honeypot)
// and Cloudflare Turnstile (server/turnstile.js). A lost lead costs more than a spam message, so anything that could be
// a real customer is saved and flagged (spam_check column) instead of refused. Only a request whose spam check passed
// (or is switched off) gets the customer confirmation email, so the forms can't be used to send email to strangers.
import { SPAM_FLAGS } from '../public/js/spam-check.js';

/**
 * honeypot: the hidden field's value. check: the Turnstile status. blocked: the browser said the Turnstile script never loaded.
 * → { reject: true } (show the robot message) or
 *   { save, flag, notify (email Richard), confirm (email the customer), track (count an ad conversion) }
 */
export function spamVerdict({ honeypot, check, blocked }) {
  if (honeypot) {
    // A person whose browser auto-filled the field still passes Turnstile; a script posting to the API doesn't.
    // The fake success keeps bots from learning anything.
    return check === 'passed'
      ? { save: true, flag: 'honeypot', notify: true, confirm: false, track: false }
      : { save: false, flag: 'honeypot', notify: false, confirm: false, track: false };
  }
  const keep = (flag, confirm = false) => ({ save: true, flag, notify: true, confirm, track: true });
  switch (check) {
    case 'passed': return keep(null, true);
    case 'skipped': return keep('not-checked', true);
    case 'setup-error': return keep('setup-error');
    case 'unreachable': return keep('unreachable');
    case 'no-token': return blocked ? keep('blocked') : { reject: true };
    default: return { reject: true }; // Cloudflare said this token isn't from a person
  }
}

// Puts the flag's explanation at the top of Richard's notification email and marks the subject.
export function flagMail(mail, flag) {
  const f = flag && SPAM_FLAGS[flag];
  if (!f) return mail;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const banner = `<div style="max-width:640px;margin:0 auto 12px;padding:12px 16px;border-radius:8px;background:#fff7e6;color:#6b4a00;font:14px/1.5 Arial,Helvetica,sans-serif"><strong>${esc(f.short)}:</strong> ${esc(f.long)}</div>`;
  return {
    ...mail,
    subject: `[${f.short}] ${mail.subject}`,
    html: mail.html.replace(/<body[^>]*>/, m => m + banner),
    text: `${f.short.toUpperCase()}: ${f.long}\n\n${mail.text}`,
  };
}
