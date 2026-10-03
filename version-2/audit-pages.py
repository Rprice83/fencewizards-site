from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json,re
root=Path(__file__).resolve().parent
out=root/'dist'
class Page(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.ids=[];self.h1=0;self.title=False;self.desc=False;self.robots=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        if tag=='title':self.title=True
        if tag=='meta' and a.get('name')=='description' and a.get('content'):self.desc=True
        if tag=='meta' and a.get('name')=='robots' and 'noindex' in a.get('content',''):self.robots=True
        for k in ['href','src']:
            if a.get(k):self.links.append(a[k])
errors=[];parsed={};titles=[]
for p in out.rglob('*.html'):
    parser=Page();s=p.read_text(encoding='utf-8');parser.feed(s);parsed[p]=parser
    if parser.h1!=1 or not parser.title or not parser.desc or not parser.robots:errors.append(str(p)+' metadata/H1 issue')
    if len(parser.ids)!=len(set(parser.ids)):errors.append(str(p)+' duplicate IDs')
    if re.search(r'MyBudgetQuote|mybudgetquote',s):errors.append(str(p)+' obsolete quote tool')
    if p.name!='404.html':titles.append(re.search(r'<title>(.*?)</title>',s).group(1))
for p,parser in parsed.items():
    for href in parser.links:
        url=urlparse(href)
        if url.scheme or url.netloc or url.path=='/cdn-cgi/access/logout':continue # Cloudflare Access owns this route.
        target=out/unquote(url.path).lstrip('/') if url.path.startswith('/') else p.parent/unquote(url.path)
        if not url.path:target=p
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'{p.relative_to(out)} missing {href}')
        if url.fragment and target in parsed and url.fragment not in parsed[target].ids:errors.append(f'{p.relative_to(out)} missing anchor {href}')
if len(titles)!=len(set(titles)):errors.append('Duplicate page titles')
routes=json.loads((root/'route-inventory.json').read_text())
report={'original_routes':len(routes),'html_pages':len(parsed),'errors':errors,'unique_titles':len(set(titles))}
(root/'qa/full-site-static.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report));raise SystemExit(bool(errors))
