import os
WORK=os.environ.get("CANVA_WORK","build-canva")
"""Build pixel-exact HTML + Next.js data from the Canva PDF.

Layers per page:
  1. background slices (PDF rendered at 2x with live text removed)
  2. live text runs (real HTML text, embedded Canva fonts, exact position/size/spacing)
  3. interaction layer (links, buttons, contact form inputs, menu toggle)
"""
import json, os, shutil, html, re
import pymupdf
from PIL import Image

PDF = os.environ.get("CANVA_PDF","design.pdf")
OUT = WORK+"/out"
SCALE = 2
SLICE = 1024  # css px per background slice

PAGES = {1: ("home", "index", "Home"), 3: ("about", "about", "About Us"), 4: ("academics", "academics", "Academics"),
         5: ("admissions", "admissions", "Admissions"), 6: ("founding-families", "founding-families", "Founding Families")}
ROUTE = {"home": "/", "about": "/about", "academics": "/academics", "admissions": "/admissions",
         "founding-families": "/admissions/founding-families"}

L = {p["page"]: p for p in json.load(open(WORK+"/layout.json"))}
F = json.load(open(WORK+"/fonts.json"))
doc = pymupdf.open(PDF)

shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(f"{OUT}/assets/bg", exist_ok=True)
os.makedirs(f"{OUT}/assets/fonts", exist_ok=True)

# ---------- fonts (woff2) ----------
from fontTools.ttLib import TTFont
for k, v in F.items():
    t = TTFont(f"{WORK}/{v['file']}.ttf"); t.flavor = "woff2"; t.save(f"{OUT}/assets/fonts/{v['file']}.woff2")


def slice_bg(png, key, width_pt, top=0, height=None, left=0, width=None):
    im = Image.open(png).convert("RGB")
    x0, x1 = int(left * SCALE), int((left + (width or width_pt)) * SCALE)
    y_end = (top + height) * SCALE if height else im.height
    out, y = [], top * SCALE
    i = 0
    while y < y_end - 1:
        h = min(SLICE * SCALE, y_end - y)
        name = f"{key}-{i}.webp"
        im.crop((x0, int(y), x1, int(y + h))).save(f"{OUT}/assets/bg/{name}", "WEBP", quality=86, method=6)
        out.append(dict(src=f"bg/{name}", y=round(y / SCALE - top, 2), h=round(h / SCALE, 2)))
        y += h; i += 1
    return out


def rects(pno):
    p = doc[pno - 1]
    btn, icons = [], []
    for dr in p.get_drawings():
        r = dr["rect"]
        if dr["type"] == "s" and 20 < r.width < 300 and 12 < r.height < 60:
            btn.append([r.x0, r.y0, r.x1, r.y1])
    return btn


def inside(a, b, m=2):
    return a[0] >= b[0] - m and a[1] >= b[1] - m and a[2] <= b[2] + m and a[3] <= b[3] + m


def link_for(slug, text, has_contact, y, page_h):
    t = text.strip().lower()
    contact = "#contact" if has_contact else ROUTE["admissions"] + "#contact"
    footer = y > page_h - 520
    m = re.match(r"page (\d)", t)
    if m:
        n = int(m.group(1))
        return "menu" if n == 2 else ROUTE[PAGES[n][0]]
    table = {
        "book a visit": contact, "genaral enquiries": contact, "general enquiries": contact,
        "register interest": ROUTE["founding-families"], "about us": ROUTE["about"], "send": "submit",
    }
    if t in table: return table[t]
    if footer or slug == "menu":
        f = {"about us": ROUTE["about"], "admission": ROUTE["admissions"], "admissions": ROUTE["admissions"],
             "academic": ROUTE["academics"], "academics": ROUTE["academics"], "curriculum": ROUTE["academics"], "new": "#"}
        if t in f: return f[t]
        if "@" in t: return "mailto:" + text.strip()
        if re.fullmatch(r"[\d ]{9,}", t): return "tel:" + t.replace(" ", "")
    if t == "find out more":
        return {"home": ROUTE["academics"] if y < 3500 else ROUTE["about"]}.get(slug, contact)
    if t == "more":
        return {"about": ROUTE["academics"]}.get(slug, contact)
    return None


def tag_for(t, first_h1):
    s = t["size"]
    if s >= 50: return "h1" if first_h1 else "h2"
    if s >= 28: return "h2"
    if s >= 20 and t["font"] == "TheSeasons-Reg": return "h3"
    return "p"


FORM_FIELDS = [  # offsets inside the Canva form image (412 x 293)
    ("name", "Full name of parent / guardian", "text", 4.5, 22, 396.5, 26, True),
    ("phone", "Phone number", "tel", 4.5, 76.5, 192.5, 26, True),
    ("email", "Email address", "email", 209.5, 76.5, 191.5, 26, False),
    ("childName", "Child's full name", "text", 4.5, 131, 192.5, 26, False),
    ("childDob", "Child's date of birth", "date", 209.5, 131, 191.5, 26, False),
    ("currentSchool", "Current school / kindergarten", "text", 4.5, 185, 396.5, 26, False),
    ("message", "Message / special enquiries", "textarea", 4.5, 239.5, 396.5, 47, False),
]


def form_origin(pno):
    for i in doc[pno - 1].get_image_info():
        b = i["bbox"]
        if abs((b[2] - b[0]) - 412) < 3 and abs((b[3] - b[1]) - 293) < 3:
            return b[0], b[1]
    return None


import numpy as np
_IMG = {}
def est_alpha(pno, bbox, color):
    """estimate text opacity by comparing the PDF render with the text-free background"""
    if pno not in _IMG:
        _IMG[pno] = (np.asarray(Image.open(f"{WORK}/bg/ref{pno}.png").convert("RGB"), float),
                     np.asarray(Image.open(f"{WORK}/bg/p{pno}.png").convert("RGB"), float))
    ref, bg = _IMG[pno]
    x0, y0, x1, y1 = [int(round(v * SCALE)) for v in bbox]
    R = ref[max(0, y0):y1, max(0, x0):x1].reshape(-1, 3); B = bg[max(0, y0):y1, max(0, x0):x1].reshape(-1, 3)
    c = np.array([int(color[i:i + 2], 16) for i in (1, 3, 5)], float)
    den = c - B; cont = np.abs(den).max(1)
    ok = cont > 70
    if ok.sum() < 20: return 1.0
    ax = np.argmax(np.abs(den[ok]), 1)
    a = (R[ok] - B[ok])[np.arange(ok.sum()), ax] / den[ok][np.arange(ok.sum()), ax]
    return float(np.clip(np.percentile(a, 97), 0, 1))


def build_page(pno, slug, bg_png, top=0, height=None, left=0, width=None, key=None):
    pg = L[pno]
    W = width or pg["width"]; H = height or pg["height"]
    bg = slice_bg(bg_png, key or slug, pg["width"], top, height, left, width)
    btns = rects(pno)
    fo = form_origin(pno) if slug != "menu" else None
    has_contact = fo is not None
    texts, links, used_btn = [], [], set()
    first_h1 = True
    for t in pg["text"]:
        if not (left - 1 <= t["bbox"][0] and t["bbox"][2] <= left + W + 1 and top - 1 <= t["bbox"][1] and t["bbox"][3] <= top + H + 1):
            continue
        if slug == "menu" and t["bbox"][1] < 150: continue  # header items are covered by the panel
        x, y = t["x"] - left, t["y"] - top
        el = dict(t=t["text"], x=x, y=y, f=t["font"], s=t["size"], c=t["color"])
        if abs(t["ls"]) > 0.005: el["ls"] = t["ls"]
        if t["hidden"]: el["hidden"] = True
        if not t["hidden"]:
            a = est_alpha(pno, t["bbox"], t["color"])
            if a < 0.05: continue  # covered by an opaque layer in the design
            if a < 0.9: el["o"] = round(a, 2)
        tg = tag_for(t, first_h1)
        if tg == "h1": first_h1 = False
        if tg != "p": el["tag"] = tg
        texts.append(el)
        href = link_for(slug, t["text"], has_contact, t["bbox"][1], pg["height"]) if t["size"] < 30 and not t["hidden"] else None
        if href:
            b = t["bbox"]
            cands = [r for r in btns if inside(b, r, 3)]
            box = min(cands, key=lambda r: (r[2] - r[0]) * (r[3] - r[1])) if cands else None
            if box: used_btn.add(tuple(box))
            r = box or [b[0] - 4, b[1] - 3, b[2] + 4, b[3] + 3]
            links.append(dict(x=round(r[0] - left, 1), y=round(r[1] - top, 1), w=round(r[2] - r[0], 1), h=round(r[3] - r[1], 1),
                              href=href, label=t["text"].strip()))
    # merge duplicate links (multi-line labels)
    seen, ul = set(), []
    for l in links:
        k = (l["x"], l["y"], l["href"])
        if k not in seen: seen.add(k); ul.append(l)
    links = ul
    if slug != "menu":
        links.append(dict(x=925, y=84, w=50, h=38, href="menu", label="Open menu"))  # hamburger icon
        links.append(dict(x=0, y=42, w=270, h=120, href="/", label="Sunshine Maple Bear home"))  # logo
    form = None
    if fo:
        form = dict(x=round(fo[0], 2), y=round(fo[1], 2),
                    fields=[dict(name=n, label=lb, type=ty, x=fx, y=fy, w=fw, h=fh, required=rq) for n, lb, ty, fx, fy, fw, fh, rq in FORM_FIELDS])
        # anchor = the panel top (CONTACT US heading)
        form["anchorY"] = round(fo[1] - 140, 1)
    return dict(slug=slug, width=W, height=round(H, 2), bg=bg, text=texts, links=links, form=form)


site = {}
for pno, (slug, fname, title) in PAGES.items():
    data = build_page(pno, slug, f"{WORK}/bg/p{pno}.png")
    data["title"] = title
    data["route"] = ROUTE[slug]
    data["file"] = fname
    site[slug] = data
    print(slug, len(data["text"]), "texts", len(data["links"]), "links", len(data["bg"]), "bg", "form" if data["form"] else "")

# ---------- menu panel from page 2 ----------
menu = build_page(2, "menu", WORK+"/bg/p2.png", top=42, height=576, left=709, width=315.5, key="menu")
menu["overlay"] = "rgba(155,29,34,.73)"
site["menu"] = menu
print("menu", len(menu["text"]), menu["links"])

json.dump(dict(fonts={k: v["file"] for k, v in F.items()}, pages=site), open(f"{OUT}/site.json", "w"), ensure_ascii=False, indent=0)
