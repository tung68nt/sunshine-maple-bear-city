import os
WORK=os.environ.get("CANVA_WORK","build-canva")
"""Render static HTML (pixel-exact) from out/site.json"""
import json, html, os, shutil
OUT = WORK+"/out"
S = json.load(open(f"{OUT}/site.json"))
P = S["pages"]
FONTS = sorted(set(S["fonts"].values()))
FCLS = {f: f"f{i}" for i, f in enumerate(FONTS)}
FILE = {p["route"]: p["file"] + ".html" for k, p in P.items() if k != "menu"}


def href(h):
    if h.startswith("/"):
        path, _, frag = h.partition("#")
        return FILE.get(path, "index.html") + ("#" + frag if frag else "")
    return h


def n(v): return f"{v:g}" if isinstance(v, (int, float)) else v


def texts(p):
    out = []
    for t in p["text"]:
        tag = t.get("tag", "p")
        st = f"--x:{n(t['x'])};--y:{n(t['y'])};--s:{n(t['s'])};--c:{t['c']}"
        if "ls" in t: st += f";--ls:{n(t['ls'])}"
        if "o" in t: st += f";opacity:{t['o']}"
        cls = f"cv-t {FCLS[t['f']]}" + (" cv-ghost" if t.get("hidden") else "")
        out.append(f'<{tag} class="{cls}" style="{st}">{html.escape(t["t"])}</{tag}>')
    return "\n".join(out)


def bgs(p, eager=1):
    return "\n".join(f'<img class="cv-bg" src="assets/{b["src"]}" alt="" style="--y:{n(b["y"])};--h:{n(b["h"])}"'
                     f'{" fetchpriority=high" if i < eager else " loading=lazy"} decoding="async">' for i, b in enumerate(p["bg"]))


def links(p):
    out = []
    for l in p["links"]:
        st = f"--x:{n(l['x'])};--y:{n(l['y'])};--w:{n(l['w'])};--h:{n(l['h'])}"
        lab = html.escape(l["label"])
        if l["href"] == "menu":
            out.append(f'<button type="button" class="cv-a" data-menu-open aria-label="{lab}" style="{st}"></button>')
        elif l["href"] == "submit":
            out.append(f'<button type="submit" form="cv-contact" class="cv-a" aria-label="{lab}" style="{st}"></button>')
        else:
            out.append(f'<a class="cv-a" href="{href(l["href"])}" aria-label="{lab}" style="{st}"></a>')
    return "\n".join(out)


def form(p):
    f = p["form"]
    if not f: return ""
    fields = []
    for x in f["fields"]:
        st = f"--x:{n(x['x'])};--y:{n(x['y'])};--w:{n(x['w'])};--h:{n(x['h'])}"
        req = " required" if x["required"] else ""
        if x["type"] == "textarea":
            fields.append(f'<textarea name="{x["name"]}" aria-label="{x["label"]}" placeholder=" " style="{st}"{req}></textarea>')
        else:
            ty = "text" if x["type"] == "date" else x["type"]
            dt = " data-date" if x["type"] == "date" else ""
            fields.append(f'<input type="{ty}"{dt} name="{x["name"]}" aria-label="{x["label"]}" placeholder=" " style="{st}"{req}>')
    return (f'<span id="contact" class="cv-anchor" style="--y:{n(f["anchorY"])}"></span>'
            f'<form id="cv-contact" class="cv-form" style="--x:{n(f["x"])};--y:{n(f["y"])}" novalidate>' + "".join(fields) +
            '<p class="cv-form-ok" role="status" hidden>Thank you! We will contact you shortly.</p></form>')


MENU = P["menu"]
menu_html = f'''<div class="cv-menu" id="cv-menu" hidden>
  <div class="cv-menu-backdrop" data-menu-close style="background:{MENU['overlay']}"></div>
  <nav class="cv-menu-panel" aria-label="Main menu">
    <div class="cv-page" style="--h:{n(MENU['height'])};--W:{n(MENU['width'])}">
{bgs(MENU, 0)}
{texts(MENU)}
{links(MENU)}
      <input class="cv-search" type="search" aria-label="Search" style="--x:46;--y:28;--w:218;--h:26">
      <button type="button" class="cv-menu-close" data-menu-close aria-label="Close menu">×</button>
    </div>
  </nav>
</div>'''

fontface = "\n".join(f"@font-face{{font-family:'{f}';src:url(../fonts/{f}.woff2) format('woff2');font-display:block}}" for f in FONTS)
fcls = "\n".join(f".{FCLS[f]}{{font-family:'{f}',serif}}" for f in FONTS)
CSS = f"""/* Canva-exact renderer — generated. 1 design unit = 1 PDF point, design width 1024.5 */
{fontface}
{fcls}
html,body{{margin:0;background:#fff8ee}}
.cv{{container-type:inline-size;width:100%;overflow:hidden}}
.cv-page{{--W:1024.5;--u:calc(100cqw / var(--W));position:relative;width:100cqw;height:calc(var(--h) * var(--u));overflow:hidden}}
.cv-bg{{position:absolute;left:0;width:100%;top:calc(var(--y) * var(--u));height:calc((var(--h) + .5) * var(--u));display:block;user-select:none;pointer-events:none}}
.cv-t{{position:absolute;margin:0;padding:0;white-space:pre;line-height:normal;font-weight:400;font-style:normal;
  left:calc(var(--x) * var(--u));top:calc(var(--y) * var(--u));font-size:calc(var(--s) * var(--u));
  letter-spacing:calc(var(--ls, 0) * var(--u));color:var(--c);
  text-rendering:geometricPrecision;font-kerning:none;font-variant-ligatures:none;-webkit-font-smoothing:antialiased}}
.cv-ghost{{color:transparent}}
.cv-a{{position:absolute;display:block;left:calc(var(--x) * var(--u));top:calc(var(--y) * var(--u));width:calc(var(--w) * var(--u));height:calc(var(--h) * var(--u));
  background:transparent;border:0;padding:0;margin:0;cursor:pointer;transition:background-color .2s;z-index:2}}
.cv-a:hover{{background:rgba(255,255,255,.14)}}
.cv-a:focus-visible,.cv-form :focus-visible{{outline:2px solid #ca9c57;outline-offset:2px}}
.cv-anchor{{position:absolute;top:calc(var(--y) * var(--u))}}
.cv-form{{position:absolute;left:calc(var(--x) * var(--u));top:calc(var(--y) * var(--u));margin:0;z-index:2}}
.cv-form input,.cv-form textarea{{position:absolute;box-sizing:border-box;left:calc(var(--x) * var(--u));top:calc(var(--y) * var(--u));
  width:calc(var(--w) * var(--u));height:calc(var(--h) * var(--u));border:0;border-radius:calc(6 * var(--u));margin:0;
  padding:0 calc(10 * var(--u));font:calc(11 * var(--u))/1.3 'OpenSans-Regular',sans-serif;color:#3d3d3d;background:transparent;resize:none}}
.cv-form textarea{{padding-top:calc(6 * var(--u))}}
.cv-form input:focus,.cv-form textarea:focus,.cv-form input:not(:placeholder-shown),.cv-form textarea:not(:placeholder-shown),
.cv-form input[type=date]:valid{{background:#fbfaf8}}
.cv-form [aria-invalid=true]{{box-shadow:inset 0 0 0 1px #9b1d22}}
.cv-form-ok{{position:absolute;left:0;top:calc(342 * var(--u));width:calc(412 * var(--u));margin:0;text-align:center;
  font:calc(12 * var(--u)) 'OpenSans-Regular',sans-serif;color:#7e0e12}}
/* menu (Canva page 2) */
.cv-menu{{position:fixed;inset:0;z-index:100}}
.cv-menu[hidden]{{display:none}}
.cv-menu-backdrop{{position:absolute;inset:0;animation:cvFade .3s ease}}
.cv-menu-panel{{position:absolute;top:0;right:0;height:100%;width:calc(315.5 * 100vw / 1024.5);container-type:inline-size;background:#fff8ee;overflow:auto;animation:cvSlide .35s cubic-bezier(.2,.7,.2,1)}}
.cv-menu-panel .cv-page{{--W:315.5}}
.cv-search{{position:absolute;left:calc(var(--x) * var(--u));top:calc(var(--y) * var(--u));width:calc(var(--w) * var(--u));height:calc(var(--h) * var(--u));
  border:0;background:transparent;font:calc(14 * var(--u)) 'OpenSans-Regular',sans-serif;outline:none;z-index:2}}
.cv-menu-close{{position:absolute;left:calc(8 * var(--u));top:calc(6 * var(--u));width:calc(26 * var(--u));height:calc(26 * var(--u));border:0;background:none;
  color:#9b1d22;font-size:calc(22 * var(--u));line-height:1;cursor:pointer;z-index:2}}
@keyframes cvFade{{from{{opacity:0}}}}
@keyframes cvSlide{{from{{transform:translateX(100%)}}}}
@media (prefers-reduced-motion:reduce){{.cv-menu-backdrop,.cv-menu-panel{{animation:none}}}}
"""

JS = """(function(){
  var m=document.getElementById('cv-menu');
  function open(){m.hidden=false;document.documentElement.style.overflow='hidden'}
  function close(){m.hidden=true;document.documentElement.style.overflow=''}
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-menu-open]')){e.preventDefault();open()}
    else if(e.target.closest('[data-menu-close]')){close()}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  document.querySelectorAll('[data-date]').forEach(function(el){
    el.addEventListener('focus',function(){el.type='date'});
    el.addEventListener('blur',function(){if(!el.value)el.type='text'});
  });
  var f=document.getElementById('cv-contact');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    f.querySelectorAll('input,textarea').forEach(function(el){var bad=!el.checkValidity()||(el.required&&!el.value.trim());el.setAttribute('aria-invalid',bad);if(bad)ok=false});
    if(!ok)return;
    // TODO: POST new FormData(f) to your endpoint
    f.reset();f.querySelectorAll('[data-date]').forEach(function(el){el.type='text'});f.querySelector('.cv-form-ok').hidden=false;
  });
})();"""

os.makedirs(f"{OUT}/assets/css", exist_ok=True); os.makedirs(f"{OUT}/assets/js", exist_ok=True)
open(f"{OUT}/assets/css/canva.css", "w").write(CSS)
open(f"{OUT}/assets/js/canva.js", "w").write(JS)

for k, p in P.items():
    if k == "menu": continue
    preload = "".join(f'<link rel="preload" href="assets/fonts/{f}.woff2" as="font" type="font/woff2" crossorigin>' for f in FONTS)
    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{p['title']} | Sunshine Maple Bear International Kindergarten</title>
{preload}
<link rel="stylesheet" href="assets/css/canva.css">
</head>
<body>
<main class="cv">
  <div class="cv-page" style="--h:{n(p['height'])}">
{bgs(p)}
{texts(p)}
{links(p)}
{form(p)}
  </div>
</main>
{menu_html}
<script src="assets/js/canva.js" defer></script>
</body>
</html>
"""
    open(f"{OUT}/{p['file']}.html", "w").write(page)
print("ok", os.listdir(OUT))
