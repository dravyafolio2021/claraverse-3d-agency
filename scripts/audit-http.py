from html.parser import HTMLParser
from urllib.request import urlopen
from pathlib import Path
from time import perf_counter
from statistics import median
import json,sys

base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3001'
class Page(HTMLParser):
    def __init__(self):super().__init__();self.nodes=[]
    def handle_starttag(self,tag,attrs):self.nodes.append((tag,dict(attrs)))
def get(path):
    with urlopen(base+path,timeout=60) as response:
        assert response.status==200,path
        return response.read(),dict(response.headers)

html,_=get('/');text=html.decode();page=Page();page.feed(text)
assert 'claraverse' in text and 'commerce operation.' in text
assert len([a for t,a in page.nodes if t=='article' and a.get('class')=='service-chapter'])==5
assert any(t=='img' and a.get('src')=='/globe/poster-v1.svg' for t,a in page.nodes)
font_preloads=[a['href'] for t,a in page.nodes if t=='link' and a.get('rel')=='preload' and a.get('as')=='font']
assert len(font_preloads)==2
for url in font_preloads:assert get(url)[0]
styles=[a['href'] for t,a in page.nodes if t=='link' and a.get('rel')=='stylesheet']
css=''.join(get(url)[0].decode() for url in styles)
assert 'fonts.googleapis.com' not in css and '--font-display-local' in css
for variant in ['mobile','desktop']:
    data,headers=get('/globe/land-'+variant+'-v1.bin')
    assert data[:4]==b'CLP1'
    assert any(k.lower()=='cache-control' and 'max-age=86400' in v for k,v in headers.items())
assert b'<svg' in get('/globe/poster-v1.svg')[0]
for name in ['commerce-scenes-v1','commerce-scenes-v2']:
    image,_=get('/portfolio/'+name+'.webp');assert image[:4]==b'RIFF'
for slug in ['development','design','integrations','migration','growth']:
    assert get('/services/'+slug)[0]
assert get('/quote?service=integrations')[0]
timings=[]
for _ in range(5):
    start=perf_counter()
    with urlopen(base+'/',timeout=30) as response:
        timings.append((perf_counter()-start)*1000);response.read()
report={'base':base,'checks':'SSR content, five service categories, local font preload, globe assets/cache headers, WebP sheets and enquiry page passed.','warmLocalHeaderMedianMs':round(median(timings),2),'timingScope':'Unthrottled localhost production HTTP response headers; not a browser load, LCP or TTI measurement.'}
(Path(sys.argv[2]) if len(sys.argv)>2 else Path('docs/audits/http-production-latest.json')).write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
