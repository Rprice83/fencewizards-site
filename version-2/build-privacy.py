from pathlib import Path
import re

R = Path(__file__).resolve().parent
D = R / 'dist'
base = (D / 'about/index.html').read_text(encoding='utf-8')
head = base.split('</head>')[0]
head = re.sub(r'<title>.*?</title>', '<title>Privacy Policy | Fence Wizards</title>', head)
head = re.sub(r'(<meta (?:name="description"|property="og:description") content=")[^"]*', r'\1How Fence Wizards handles contact information, fence plans, quote requests, and private receipt links.', head)
head = re.sub(r'(<meta property="og:title" content=")[^"]*', r'\1Privacy Policy | Fence Wizards', head)
head = head.replace('/about/', '/privacy/')
head = re.sub(r'<script type="application/ld\+json">.*?</script>', '', head)
head += '<link rel="stylesheet" href="/privacy.css?v=1"></head>'
body_start = base.split('</head>')[1].split('<main')[0]
footer = re.search(r'<footer\b.*?</footer>', base, re.S).group()
page = head + body_start + (R / 'privacy-content.html').read_text(encoding='utf-8') + footer + '</body></html>'
(D / 'privacy').mkdir(exist_ok=True)
(D / 'privacy/index.html').write_text(page, encoding='utf-8')
for p in D.rglob('*.html'):
    s = p.read_text(encoding='utf-8')
    existing_footer = re.search(r'<footer\b.*?</footer>', s, re.S)
    if not existing_footer or 'href="/privacy/"' not in existing_footer.group():
        if '<div class="footer-bottom">' in s:
            s = s.replace('<div class="footer-bottom">', '<div class="footer-bottom"><a href="/privacy/">Privacy Policy</a>', 1)
        else:
            s = s.replace('</body>', '<footer class="privacy-simple-footer"><a href="/privacy/">Privacy Policy</a></footer></body>')
    s = re.sub(r'/site.js\?v=[^"\s]+', '/site.js?v=safari-media-2', s)
    p.write_text(s, encoding='utf-8')
sitemap = D / 'sitemap.xml'
if sitemap.exists():
    s = sitemap.read_text(encoding='utf-8')
    if '/privacy/' not in s:
        s = s.replace('</urlset>', '<url><loc>https://www.fencewizards.com/privacy/</loc></url></urlset>')
        sitemap.write_text(s, encoding='utf-8')
print('Privacy page and site-wide links updated.')
