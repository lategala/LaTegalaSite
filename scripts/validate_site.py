from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote
import json, re, subprocess, tempfile

ROOT=Path(".")
REQUIRED={
    "index.html","espectaculos.html","formacion.html","quienes.html","documentacion.html",
    "actualidad.html","contacto.html","la-parte-que-falta.html","que-diablos.html",
    "escuela-haria.html","escuela-graciosa.html","antonio-orellana.html",
    "ligazon.html","caleidoscopio.html","style.css","site.js"
}

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.ids=[]; self.img_without_alt=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if "id" in d: self.ids.append(d["id"])
        for key in ("href","src"):
            if key in d: self.refs.append((tag,key,d[key]))
        if tag=="img" and "alt" not in d:
            self.img_without_alt.append(d.get("src","(sin src)"))

issues=[]
htmls=list(ROOT.glob("*.html"))
parsed={}
for page in htmls:
    p=P()
    try: p.feed(page.read_text(encoding="utf-8"))
    except Exception as e:
        issues.append((str(page),"PARSE",str(e))); continue
    parsed[page.name]=p
    if len(p.ids)!=len(set(p.ids)):
        dup=sorted({x for x in p.ids if p.ids.count(x)>1})
        issues.append((str(page),"IDs duplicados",", ".join(dup)))
    for src in p.img_without_alt:
        issues.append((str(page),"IMG sin alt",src))

for req in REQUIRED:
    if not (ROOT/req).exists():
        issues.append(("ROOT","Falta archivo requerido",req))

for page,p in parsed.items():
    for tag,key,raw in p.refs:
        if not raw or raw.startswith(("http://","https://","mailto:","tel:","javascript:","data:")):
            continue
        if raw.startswith("#"):
            frag=raw[1:]
            if frag and frag not in set(p.ids):
                issues.append((page,"Ancla inexistente",raw))
            continue
        clean=unquote(raw.split("#",1)[0].split("?",1)[0])
        if not clean: continue
        target=ROOT/clean
        if not target.exists():
            issues.append((page,"Referencia local rota",raw))
            continue
        if "#" in raw and clean.endswith(".html"):
            frag=raw.split("#",1)[1].split("?",1)[0]
            tp=parsed.get(clean)
            if tp and frag and frag not in set(tp.ids):
                issues.append((page,"Ancla destino inexistente",raw))

for jf in (ROOT/"data").glob("*.json"):
    try: json.loads(jf.read_text(encoding="utf-8"))
    except Exception as e: issues.append((str(jf),"JSON inválido",str(e)))

# Syntax-check the shared JS and every inline script.
js_targets=[ROOT/"site.js"]
with tempfile.TemporaryDirectory() as td:
    td=Path(td)
    for page in htmls:
        txt=page.read_text(encoding="utf-8")
        scripts=re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>',txt,re.I|re.S)
        for i,script in enumerate(scripts):
            if script.strip():
                f=td/f"{page.stem}-{i}.js"; f.write_text(script,encoding="utf-8"); js_targets.append(f)
    for js in js_targets:
        if not js.exists(): continue
        r=subprocess.run(["node","--check",str(js)],capture_output=True,text=True)
        if r.returncode:
            issues.append((str(js),"JavaScript inválido",(r.stderr or r.stdout).strip()))

# Hidden statistics page must stay out of sitemap.
sitemap=(ROOT/"sitemap.xml").read_text(encoding="utf-8") if (ROOT/"sitemap.xml").exists() else ""
if "panel-lategala-" in sitemap or "estadisticas.html" in sitemap:
    issues.append(("sitemap.xml","Privacidad","El panel interno aparece en el sitemap"))

if issues:
    print("VALIDACIÓN FALLIDA:")
    for x in issues: print(" -",x)
    raise SystemExit(1)

print(f"OK: {len(htmls)} HTML revisados; enlaces, anclas, JSON y JavaScript válidos.")
