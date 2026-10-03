from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'dist'
GOOGLE='https://share.google/i9AcVkwA7IiM7xEJh'
PHONE_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 3a15 15 0 0 1-7-7l3-2-2-5Z"/></svg>'
STARS='<span class="rating-stars" aria-hidden="true"><span>★★★★★</span></span>'
BADGE='<a class="google-rating-badge" href="'+GOOGLE+'" target="_blank" rel="noopener noreferrer" aria-label="Previously published Google rating: 4.6 out of 5, from 39 reviews. View latest on Google.">'+STARS+'<span><strong>4.6 / 5</strong> · 39 Google reviews</span></a>'
PANEL='<section class="wrap google-review-panel"><div class="review-score"><strong>4.6<span>/ 5</span></strong>'+STARS+'<span>39 Google reviews</span></div><div><p class="eyebrow red">Hear from our customers</p><h2>Read their experience.</h2><p>See what customers have shared about working with Fence Wizards.</p><small>Rating shown on our existing website. See Google for the latest reviews.</small></div><a class="text-link" href="'+GOOGLE+'" target="_blank" rel="noopener noreferrer">Read Google reviews ↗</a></section>'
for p in OUT.rglob('*.html'):
 s=p.read_text(encoding='utf-8')
 s=s.replace('layout-refinement-2','local-proof-3')
 s=re.sub(r'(<a class="(?:phone-link|footer-phone)" href="tel:\+13172964015">)\(317\) 296-4015</a>',lambda m:m[1]+PHONE_ICON+'<span class="call-number"><small>Call Richard</small><span>(317) 296-4015</span></span></a>',s)
 if p==OUT/'index.html':
  s=re.sub(r'<a class="google-rating-badge".*?</a>', '', s, count=1, flags=re.S) if 'review-topbar' not in s else s
  s=re.sub(r'<div class="wrap"><div class="review-link-row">.*?</div></div>',PANEL,s,count=1,flags=re.S)
 if p==OUT/'contact/index.html' and 'google-rating-badge' not in s:s=s.replace('</main>','<div class="wrap contact-rating">'+BADGE+'</div></main>')
 if 'review-topbar' not in s:
  banner='<div class="review-topbar"><div class="wrap review-topbar-inner"><span class="topbar-hours"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><strong>7:30 a.m.–9 p.m.</strong><span class="hours-days">Seven days a week</span></span>'+BADGE+'</div></div>'
  s=s.replace('<header class="site-header">',banner+'<header class="site-header">',1)
 if 'emergency-banner-link' not in s:
  s=s.replace('</span></span><a class="google-rating-badge"', '</span></span>'+'<a class="emergency-banner-link" href="tel:+13172964015" aria-label="Need emergency fencing? Call now."><span class="emergency-message" aria-hidden="true"><span>Need emergency fencing? <strong>Call now.</strong></span></span></a>'+'<a class="google-rating-badge"',1)
 s=s.replace('local-proof-3','emergency-pulse-7')
 p.write_text(s,encoding='utf-8')
