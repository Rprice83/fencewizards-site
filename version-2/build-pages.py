from pathlib import Path
from html import escape as e
from urllib.parse import urlparse, quote
import csv,json,re,runpy,shutil

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'dist'
PROJECT=ROOT.parent
data=runpy.run_path(str(ROOT/'page-content.py'))
PAGES,CITIES,FAQ_GROUPS=data['PAGES'],data['CITIES'],data['FAQ_GROUPS']
ARTICLES=runpy.run_path(str(ROOT/'article-content.py'))['ARTICLES']
ORIGIN='https://fence-wizards-design-preview.omniring09.chatgpt.site'
LIVE='https://www.fencewizards.com'
SITEMAP=list(csv.DictReader((PROJECT/'fencewizards-content-inventory/fencewizards-sitemap.csv').open(encoding='utf-8-sig')))
inventory={urlparse(r['url']).path:r for r in SITEMAP}
asset_names={'panels.jpg':'fence-wizards-street-frontage-panels-p021.jpg','chain-link.jpg':'fence-wizards-open-field-run-p003.jpg','printed-screen.jpg':'fence-wizards-printed-windscreen-banners-p011.jpg','barricades.jpg':'fence-wizards-barricades-indoor-line-p017.jpg'}
for name,source in asset_names.items():shutil.copy2(PROJECT/'organized-assets/named-photos'/source,OUT/'assets'/name)
ALTS={'construction.jpg':'Temporary fence around an excavation site','events.jpg':'Windscreen on temporary fencing beside an event tent','windscreen.jpg':'Screened temporary fence along a city sidewalk','panels.jpg':'Freestanding temporary panels beside a street frontage','chain-link.jpg':'Chain link perimeter across an open field','printed-screen.jpg':'Company graphics printed on a fence windscreen','barricades.jpg':'Interlocking steel barricades arranged inside a venue','family.jpg':'Fence Wizards team member beside a company truck'}
LABELS={'/estimate/':'Fence planner','/construction-fencing/':'Construction fencing','/event-fencing/':'Event fencing','/emergency-fencing/':'Emergency fencing','/fence/panels-and-stands/':'Panels & stands','/fence/post-driven-chain-link/':'Post-driven chain link','/fence/windscreen/':'Windscreen','/fence/barricades/':'Crowd-control barricades','/pricing/':'Pricing','/service-area/':'Service area','/about/':'About Fence Wizards','/contact/':'Contact Richard','/faq/':'Frequently asked questions','/blog/':'Field Notes'}
for slug,row in CITIES.items():LABELS[f'/service-area/{slug}/']=row[0]
for slug,title,*rest in ARTICLES:LABELS[f'/blog/{slug}/']=title
def link(path,label=None,cls=''):
    return f'<a href="{e(path,quote=True)}"'+(f' class="{cls}"' if cls else '')+f'>{e(label or LABELS.get(path,path))}</a>'
def dropdown(title,paths):
    return f'<details class="nav-dropdown"><summary>{title}</summary><div class="nav-dropdown-links">'+''.join(link(p) for p in paths)+'</div></details>'
NAV='<nav class="nav full-nav" id="main-nav" aria-label="Main navigation">'+dropdown('Services',['/construction-fencing/','/event-fencing/','/emergency-fencing/'])+dropdown('Fence types',['/fence/panels-and-stands/','/fence/post-driven-chain-link/','/fence/windscreen/','/fence/barricades/'])+link('/pricing/')+link('/service-area/')+link('/blog/')+dropdown('Company',['/about/','/faq/','/contact/'])+'</nav>'
HEADER='<a class="skip" href="#main">Skip to content</a><div class="preview-bar">Fence Wizards · Private design preview <span>Full website draft · Integrations pending</span></div><header class="site-header"><div class="wrap header-inner"><a class="brand" href="/" aria-label="Fence Wizards home"><img src="/assets/logo.png" alt="Fence Wizards — Rental Fence Solutions" width="561" height="212"></a>'+NAV+'<a class="button" href="/estimate/">Get an Estimate</a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button></div></header>'
FOOTER='<footer class="site-footer"><div class="wrap"><div class="footer-wide"><div><a href="/" class="footer-brand">Fence <span>Wizards</span></a><p>Family-owned temporary fence rental.<br>Based in Greenwood, Indiana.</p><a class="footer-phone" href="tel:+13172964015">(317) 296-4015</a><p>7:30 a.m.–9 p.m. · Seven days a week</p></div>'
for label,paths in [('Services',['/construction-fencing/','/event-fencing/','/emergency-fencing/']),('Fence types',['/fence/panels-and-stands/','/fence/post-driven-chain-link/','/fence/windscreen/','/fence/barricades/']),('Plan your project',['/pricing/','/service-area/','/blog/','/about/','/faq/','/contact/'])]:
    FOOTER+=f'<nav aria-label="Footer {label}"><strong>{label}</strong>'+''.join(link(p) for p in paths)+'</nav>'
FOOTER+='</div><div class="footer-bottom"><span>© 2026 Fence Wizards. All rights reserved.</span><a href="https://share.google/i9AcVkwA7IiM7xEJh" target="_blank" rel="noopener noreferrer">Find us & read reviews on Google ↗</a><span>Private preview · Final integrations pending</span></div></div></footer>'
def head(title,desc,path,schema=None):
    title=title+' | Fence Wizards' if ' | Fence Wizards' not in title else title
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">'+f'<title>{e(title)}</title><meta name="description" content="{e(desc,quote=True)}"><link rel="canonical" href="{LIVE+path}"><meta property="og:title" content="{e(title,quote=True)}"><meta property="og:description" content="{e(desc,quote=True)}"><meta property="og:type" content="website"><meta property="og:url" content="{ORIGIN+path}"><meta name="twitter:card" content="summary">'+'''<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23db1824'/%3E%3Ctext x='7' y='25' font-family='Arial' font-size='25' font-weight='900' fill='white'%3EF%3C/text%3E%3C/svg%3E"><link rel="stylesheet" href="/styles.css?v=emergency-pulse-7"><link rel="stylesheet" href="/pages.css?v=emergency-pulse-7"><script src="/site.js?v=emergency-pulse-7" defer></script>'''+(f'<script type="application/ld+json">{json.dumps(schema,ensure_ascii=False).replace("<","\\u003c")}</script>' if schema else '')+'</head><body>'+HEADER
def breadcrumb(items):
    return '<nav class="breadcrumb" aria-label="Breadcrumb">'+link('/','Home')+''.join(' <span aria-hidden="true">/</span> '+(link(p,n) if p else f'<span aria-current="page">{e(n)}</span>') for p,n in items)+'</nav>'
def paragraphs(items):return ''.join(f'<p>{e(p)}</p>' for p in items)
def sections(items):return ''.join(f'<section class="copy-section"><h2>{e(h)}</h2>{paragraphs(ps)}</section>' for h,ps in items)
def facts(items):return '<dl class="spec-list">'+''.join(f'<div><dt>{e(a)}</dt><dd>{e(b)}</dd></div>' for a,b in items)+'</dl>' if items else ''
def faqs(items,title='Questions about this service'):
    return f'<section class="copy-section"><h2>{e(title)}</h2>'+''.join(f'<details class="answer"><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q,a in items)+'</section>' if items else ''
def related(paths):return '<section class="related"><p class="eyebrow red">Useful next steps</p><div class="related-links">'+''.join(link(p,cls='related-link') for p in paths)+'</div></section>'
def quote_box(city=None,urgent=False):
    url='/contact/'+('?city='+quote(city) if city else '')
    return '<aside class="project-sidebar"><div class="sidebar-quote"><p class="eyebrow red">Talk with Richard</p><h2>Get a project quote.</h2><p>Send the location, fence type, approximate length, gates, and rental duration. Rough details are fine to start.</p>'+link(url,'Request a quote','button')+'<a class="sidebar-phone" href="tel:+13172964015">(317) 296-4015</a><p class="small">'+('Urgent fencing? Call to confirm availability.' if urgent else '7:30 a.m.–9 p.m. · Seven days a week')+'</p><div class="sidebar-terms">Flat fee for the agreed term.<br>Installation and removal included.</div><button class="link-button" data-plotquote>PlotQuote · Coming soon</button></div></aside>'
def closing(city=None):return '<section class="section contact-section"><div class="wrap closing-quote"><div><p class="eyebrow red">Let’s plan the job</p><h2>Ready for a fence quote?</h2><p>Tell Richard where you need fencing and what you have in mind.</p></div>'+link('/contact/'+('?city='+quote(city) if city else ''),'Request a quote','button')+'</div></section>'
def photo(name,caption=False):
    return f'<figure class="page-photo"><img src="/assets/{name}" alt="{e(ALTS[name],quote=True)}" width="1200" height="800">'+('<figcaption>Fence Wizards project photo. Shown as a fencing example; project location is not confirmed here.</figcaption>' if caption else '')+'</figure>'
def write(path,html):
    target=OUT/path.strip('/')/'index.html' if path!='/' else OUT/'index.html'
    target.parent.mkdir(parents=True,exist_ok=True);target.write_text(html,encoding='utf-8')

LOCAL_PHOTOS=json.loads((ROOT/'location-photos.json').read_text(encoding='utf-8'))
def local_gallery(city):
    photos=LOCAL_PHOTOS.get(city,[])
    if not photos:return ''
    heading='Fence Wizards in '+city
    lead='A look at our trucks in the area.' if city in ['Carmel','Greenwood'] else 'A closer look at fencing photographed in '+city+'.'
    figures=''.join(f'<figure><img src="/assets/{p["image"]}" alt="{e(p["caption"],quote=True)}" width="{p["width"]}" height="{p["height"]}" loading="lazy"><figcaption><span>{e(city)}, IN</span>{e(p["caption"])}</figcaption></figure>' for p in photos)
    return '<section class="wrap local-gallery '+('single' if len(photos)==1 else 'multiple')+'"><div class="local-gallery-intro"><p class="eyebrow red">From the field</p><h2>'+e(heading)+'</h2><p>'+e(lead)+'</p></div><div class="local-gallery-grid" style="--photo-columns:'+str(len(photos))+'">'+figures+'</div></section>'

def shell(path,title,intro,body,items=None,kind='information',image=None,city=None,faq=None,related_paths=None,fact_items=None):
    crumbs=items or [(None,LABELS.get(path,title))]
    schema={'@context':'https://schema.org','@type':'WebPage','name':title,'url':LIVE+path,'description':intro}
    hero='<section class="page-hero"><div class="wrap">'+breadcrumb(crumbs)+'<div class="page-hero-grid'+(' no-photo' if not image else '')+'"><div><p class="eyebrow red">'+('Serving '+e(city)+', Indiana' if city else {'service':'Commercial temporary fencing','product':'Fence types','article':'Field Notes / Rental guide'}.get(kind,'Fence Wizards'))+'</p><h1>'+e(title)+'</h1><p class="page-lead">'+e(intro)+'</p><div class="actions">'+link('/contact/'+('?city='+quote(city) if city else ''),'Request a quote','button')+'<a class="phone-link" href="tel:+13172964015">(317) 296-4015</a></div></div>'+(photo(image,kind=='location') if image else '')+'</div>'+facts(fact_items or [])+'</div></section>'
    html=head(title,intro,path,schema)+'<main id="main">'+hero+local_gallery(city)+'<div class="wrap page-body"><div class="page-copy">'+body+faqs(faq or [])+related(related_paths or ['/pricing/','/faq/','/contact/'])+'</div>'+quote_box(city,path=='/emergency-fencing/')+'</div>'+closing(city)+'</main>'+FOOTER+'<div data-plot-dialog></div></body></html>'
    write(path,html)

for path,p in PAGES.items():
    crumbs=[('/','Fence types'),(None,LABELS[path])] if p['kind']=='product' else None
    if p['kind']=='product':crumbs=[('/#types','Fence types'),(None,LABELS[path])]
    shell(path,p['title'],p['intro'],sections(p['sections']),items=crumbs,kind=p['kind'],image=p['image'],faq=p['faq'],related_paths=p['related'],fact_items=p['facts'])

for slug,row in CITIES.items():
    city,subtitle,intro,h1,p1,h2,p2=row
    path=f'/service-area/{slug}/'
    local_intro=f'Temporary fence rental for construction, events, and restoration in {city}, Indiana. {subtitle}.'
    body=sections([(subtitle,[intro]),(h1,[p1]),(h2,[p2])])
    body+='<section class="copy-section"><h2>Choose the fence for your site</h2><div class="local-products">'+''.join(link(p,cls='related-link') for p in ['/fence/panels-and-stands/','/fence/post-driven-chain-link/','/fence/windscreen/','/fence/barricades/'])+'</div><p>Choose portable panels for a changing layout, driven chain link for a fixed run, windscreen for privacy or graphics, and barricades for event queues. Richard can help combine them when the site needs more than one option.</p></section>'
    body+=sections([('Pricing and scheduling',['The normal installation window is 24–48 hours. Call about urgent work and confirm the date for your project. The quote includes delivery, installation, the agreed rental term, and removal.','Standard rentals cover up to 12 months, with discounted rates for short jobs. Travel is accounted for in the quote. Send the full address, especially for a site near the edge of our roughly 80-mile coverage around downtown Indianapolis.'])])
    neighbor_paths=[f'/service-area/{x}/' for x in list(CITIES) if x!=slug][:3]
    shell(path,f'Temporary Fence Rental in {city}',local_intro,body,items=[('/service-area/','Service area'),(None,city)],kind='location',city=city,related_paths=['/construction-fencing/','/event-fencing/','/service-area/'])

faq_body=''.join(faqs(qs,title) for title,qs in FAQ_GROUPS)
shell('/faq/','Temporary Fence Rental Questions','Practical answers about quotes, installation, fence types, service, and pickup.',faq_body,related_paths=['/pricing/','/service-area/','/contact/'])

for slug,title,intro,img,parts,rel in ARTICLES:
    path=f'/blog/{slug}/'
    body='<p class="article-label">Rental guide · Fence Wizards</p>'+sections(parts)
    shell(path,title,intro,body,items=[('/blog/','Field Notes'),(None,title)],kind='article',image=img,related_paths=rel)

def article_cards(limit=None):
    return '<div class="guide-grid">'+''.join('<article class="guide-card">'+f'<a href="/blog/{slug}/"><img src="/assets/{img}" alt="{e(ALTS[img],quote=True)}" width="800" height="500" loading="lazy"></a><div><p class="eyebrow red">Rental guide</p><h2>'+link(f'/blog/{slug}/',title)+'</h2><p>'+e(intro)+'</p>'+link(f'/blog/{slug}/','Read the guide ↗','text-link')+'</div></article>' for slug,title,intro,img,*rest in ARTICLES[:limit])+'</div>'
path='/blog/'
write(path,head('Field Notes','Practical guides to temporary fence rental, pricing, site access, and event planning from Fence Wizards.',path)+'<main id="main"><section class="page-hero"><div class="wrap">'+breadcrumb([(None,'Field Notes')])+'<p class="eyebrow red">From the fence line</p><h1>Field Notes</h1><p class="page-lead">Useful answers for planning your next fence rental. Explore the options, prepare a quote request, and know what to expect on site.</p></div></section><section class="section wrap">'+article_cards()+'</section>'+closing()+'</main>'+FOOTER+'<div data-plot-dialog></div></body></html>')

priority=['indianapolis','fishers','carmel','noblesville','bloomington']
area_body=sections([('About 80 miles around downtown Indianapolis',['Fence Wizards is based in Greenwood and serves the Indianapolis metro and surrounding communities. Our coverage includes Bloomington to the south, Lafayette to the northwest, Muncie and Anderson to the northeast, Terre Haute to the west, and Richmond to the east.','The radius is measured from downtown Indianapolis, not from the Greenwood yard. For a project near the edge, between listed cities, or beyond the area, send the full address and ask Richard to confirm coverage.']),('What distance changes',['Travel is part of the quote. We discuss it before the job is scheduled, especially for projects farther from Greenwood. The flat-fee structure and included removal remain the same.','On a distant site, a clear plan for footage, gates, ground conditions, and access helps organize the crew and material for the installation.'])])
area_body+='<section class="copy-section"><h2>Find your location</h2><div class="priority-cities">'+''.join(link('/service-area/'+s+'/',CITIES[s][0],'city-button') for s in priority)+'</div><ul class="all-cities">'+''.join('<li>'+link('/service-area/'+s+'/',CITIES[s][0])+'</li>' for s in sorted(CITIES))+'</ul></section>'
area_body+='<section class="copy-section"><h2>Based in Greenwood</h2><address>1176 Newark Ct<br>Greenwood, IN 46143</address><p>7:30 a.m.–9 p.m., seven days a week.<br><a href="tel:+13172964015">(317) 296-4015</a></p><a class="text-link" href="https://share.google/i9AcVkwA7IiM7xEJh" target="_blank" rel="noopener noreferrer">View our Google Business Profile ↗</a><p class="preview-note">Preview note: the interactive 80-mile coverage map will be added once the map setup is available.</p></section>'
shell('/service-area/','Temporary Fencing Across Central Indiana','Based in Greenwood, serving Indianapolis and roughly 80 miles around downtown. Find the page for your project location below.',area_body,related_paths=['/pricing/','/contact/'])

# Preserve the approved homepage/contact layouts, replacing only shared navigation
# and connecting their existing sections to the new destinations.
for path in ['/','/contact/']:
    p=OUT/'index.html' if path=='/' else OUT/'contact/index.html'
    s=p.read_text(encoding='utf-8')
    s=re.sub(r'<a class="skip".*?</header>',HEADER,s,count=1,flags=re.S)
    s=s.replace('<div data-footer></div>',FOOTER)
    if '<footer class="site-footer">' in s and '<div class="footer-wide">' not in s:
        s=re.sub(r'<footer class="site-footer">.*?</footer>',FOOTER,s,flags=re.S)
    s=re.sub(r'href="/styles.css[^\"]*"','href="/styles.css?v=emergency-pulse-7"',s)
    if '/pages.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/pages.css?v=emergency-pulse-7"></head>')
    s=re.sub(r'src="/site.js[^\"]*"','src="/site.js?v=emergency-pulse-7"',s)
    if 'rel="canonical"' not in s:s=s.replace('</head>',f'<link rel="canonical" href="{LIVE+path}"></head>')
    if path=='/':
        for title,dest in [('Keep the site moving.','/construction-fencing/'),('Ready before gates open.','/event-fencing/'),('A perimeter when it matters.','/emergency-fencing/')]:
            s=s.replace('<h3>'+title+'</h3>','<h3>'+link(dest,title)+'</h3>')
        for label,dest in [('Panels &amp; stands','/fence/panels-and-stands/'),('Post-driven chain link','/fence/post-driven-chain-link/'),('Windscreen','/fence/windscreen/'),('Crowd-control barricades','/fence/barricades/')]:
            s=s.replace('<strong>'+label+'</strong>','<strong>'+link(dest,label.replace('&amp;','&'))+'</strong>')
        for city in priority:s=s.replace('<li>'+CITIES[city][0]+'</li>','<li>'+link('/service-area/'+city+'/',CITIES[city][0])+'</li>')
        s=s.replace('<li>& surrounding communities</li>','<li>'+link('/service-area/','All service areas ↗')+'</li>')
        if 'id="field-notes"' not in s:
            s=s.replace('<section class="section contact-section">','<section class="section wrap" id="field-notes"><div class="section-heading"><div><p class="eyebrow red">Field Notes</p><h2>Before the fence goes in.</h2></div>'+link('/blog/','All guides ↗','text-link')+'</div>'+article_cards(3)+'</section><section class="section contact-section">',1)
        # Anchor retained for product breadcrumb navigation.
        s=s.replace('<div class="equipment">','<div class="equipment" id="types">')
    p.write_text(s,encoding='utf-8')

missing=[path for path in inventory if not (OUT/path.strip('/')/'index.html' if path!='/' else OUT/'index.html').exists()]
if missing:raise RuntimeError('Missing original routes: '+str(missing))
(OUT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+e(LIVE+p)+'</loc></url>' for p in inventory)+'</urlset>',encoding='utf-8')
(OUT/'404.html').write_text(head('Page Not Found','Find your way back to Fence Wizards services and quote requests.','/')+'<main id="main" class="section wrap"><p class="eyebrow red">404</p><h1>That page isn’t here.</h1><p>Use the navigation to find a service, or head back to the homepage.</p>'+link('/','Back to home','button')+'</main>'+FOOTER+'</body></html>',encoding='utf-8')
(ROOT/'route-inventory.json').write_text(json.dumps([{'path':p,'source_url':inventory[p]['url'],'type':inventory[p]['page_type']} for p in inventory],indent=2),encoding='utf-8')
print(json.dumps({'pages':len(inventory),'missing':missing,'articles':len(ARTICLES),'locations':len(CITIES)}))

runpy.run_path(str(ROOT/'enhance-presentation.py'))

runpy.run_path(str(ROOT/'build-estimator.py'))
