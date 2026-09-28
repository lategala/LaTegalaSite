from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse

ROOT=Path(".")
class P(HTMLParser):
    def __init__(self): super().__init__(); self.refs=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        for key in ("href","src"):
            if key in d: self.refs.append((tag,key,d[key]))

missing=[]
htmls=list(ROOT.glob("*.html"))
for page in htmls:
    p=P()
    try: p.feed(page.read_text(encoding="utf-8"))
    except Exception as e:
        missing.append((str(page),"PARSE",str(e))); continue
    for tag,key,raw in p.refs:
        if not raw or raw.startswith(("#","http://","https://","mailto:","tel:","javascript:","data:")): continue
        clean=unquote(raw.split("#",1)[0].split("?",1)[0])
        if not clean: continue
        target=(page.parent/clean)
        if not target.exists():
            missing.append((str(page),raw,str(target)))
if missing:
    print("REFERENCIAS LOCALES ROTAS:")
    for x in missing: print(" -",x)
    raise SystemExit(1)
print(f"OK: {len(htmls)} HTML revisados; sin referencias locales rotas.")
