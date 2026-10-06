// What each spam_check flag on a quote/inquiry means, in Richard's words. Shared by the server (his emails) and the Quote Inbox.
// No flag (null) = the spam check passed normally.
export const SPAM_FLAGS = {
  honeypot: {
    short: 'Possible spam',
    long: 'A hidden “leave this empty” field was filled in. Robots do that, but so can a browser’s auto-fill, so this may be a real customer. Check before you reply. No confirmation email was sent to them.',
  },
  blocked: {
    short: 'Not verified',
    long: 'The spam check couldn’t load on their device (often a company network that blocks it), so we let the request through unchecked. Probably genuine. No confirmation email was sent to them.',
  },
  'setup-error': {
    short: 'Spam check broken',
    long: 'The spam check is set up wrong (its key was refused), so this request wasn’t checked. Let your website person know. No confirmation email was sent to them.',
  },
  unreachable: {
    short: 'Not verified',
    long: 'Cloudflare’s spam check didn’t answer, so we let the request through unchecked. Probably genuine. No confirmation email was sent to them.',
  },
  'not-checked': {
    short: 'Spam check off',
    long: 'The spam check is switched off on this site (no key is set), so this request wasn’t checked. Let your website person know.',
  },
};

export const spamFlag = flag => (flag && SPAM_FLAGS[flag]) || null;
