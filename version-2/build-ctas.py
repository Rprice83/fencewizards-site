from pathlib import Path
import re
R=Path(__file__).resolve().parent
for p in (R/'dist').rglob('*.html'):
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'(<header class="site-header">.*?</nav>)<a class="button" href="[^"]*">[^<]*</a>',r'\1<a class="button" href="/estimate/">Get an Estimate</a>',s,flags=re.S)
 if p==R/'dist/index.html':
  s=s.replace('<a class="button" href="#request-quote">Request a quote <span aria-hidden="true">↗</span></a>','<a class="button planner-hero-button" href="/estimate/">Draw Your Fence &amp; See Pricing</a>',1)
  s=re.sub(r'<a class="plot-link"[^>]*>.*?</a>','',s)
  s=s.replace('<a class="text-link" href="/contact/?project=Emergency">Request emergency fencing','<a class="text-link" href="tel:+13172964015">Call for emergency fencing')
 s=re.sub(r'/site.js\?v=[^"\s]+','/site.js?v=safari-media-2',s)
 s=re.sub(r'/styles.css\?v=[^"\s]+','/styles.css?v=safari-media-2',s)
 s=re.sub(r'/pages.css\?v=[^"\s]+','/pages.css?v=annotations-1',s)
 p.write_text(s,encoding='utf-8')
