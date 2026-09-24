import os
WORK=os.environ.get("CANVA_WORK","build-canva")
# Merge Canva-embedded subset fonts into one TTF per family (exact glyph outlines from the PDF)
import pymupdf, io, re, json, hashlib
from fontTools.ttLib import TTFont
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.recordingPen import DecomposingRecordingPen
PDF=os.environ.get("CANVA_PDF","design.pdf")
d=pymupdf.open(PDF)
fam={}
for p in d:
  for f in p.get_fonts(full=True):
    xref,ext,typ,base=f[:4]
    if typ=='Type3': continue
    b=re.sub(r'^[A-Z]{6}\+','',base)
    fam.setdefault(b,set()).add(xref)
out={}
for b,xrefs in fam.items():
  glyphs={}; widths={}; cmap={}; meta=None
  for x in sorted(xrefs):
    buf=d.extract_font(x)[3]
    t=TTFont(io.BytesIO(buf)); gs=t.getGlyphSet(); cm=t.getBestCmap() or {}
    if meta is None:
      hh=t['hhea']; os2=t['OS/2'] if 'OS/2' in t else None
      meta=dict(upm=t['head'].unitsPerEm,asc=hh.ascent,desc=hh.descent)
    for cp,gn in cm.items():
      if cp in cmap: continue
      name=f'u{cp:04X}'
      pen=TTGlyphPen(gs)
      try:
        gs[gn].draw(pen); g=pen.glyph()
      except Exception:
        # decompose composites
        rp=DecomposingRecordingPen(gs); gs[gn].draw(rp); pen=TTGlyphPen(None); rp.replay(pen); g=pen.glyph()
      glyphs[name]=g; widths[name]=(gs[gn].width,0); cmap[cp]=name
  order=['.notdef']+sorted(glyphs)
  glyphs['.notdef']=TTGlyphPen(None).glyph(); widths['.notdef']=(meta['upm']//2,0)
  for n in order:
    g=glyphs[n]
    if hasattr(g,'recalcBounds'): pass
  fb=FontBuilder(meta['upm'],isTTF=True)
  fb.setupGlyphOrder(order); fb.setupCharacterMap(cmap)
  fb.setupGlyf({n:glyphs[n] for n in order})
  # lsb from glyph bounds
  gl=fb.font['glyf']
  mt={}
  for n in order:
    g=gl[n]; g.recalcBounds(gl); mt[n]=(widths[n][0], getattr(g,'xMin',0) or 0)
  fb.setupHorizontalMetrics(mt)
  asc,desc=meta['asc'],meta['desc']
  fb.setupHorizontalHeader(ascent=asc,descent=desc,lineGap=0)
  safe=b.replace(' ','')
  fb.setupNameTable({'familyName':'CV '+safe,'styleName':'Regular'})
  fb.setupOS2(sTypoAscender=asc,sTypoDescender=desc,sTypoLineGap=0,usWinAscent=asc,usWinDescent=-desc,fsSelection=0x80)
  fb.setupPost()
  fb.save(f'{WORK}/{safe}.ttf')
  out[b]=dict(file=safe,upm=meta['upm'],asc=asc,desc=desc,chars=''.join(chr(c) for c in sorted(cmap)))
  print(b,len(xrefs),'subsets ->',len(cmap),'chars',asc,desc,meta['upm'])
json.dump(out,open(WORK+'/fonts.json','w'),ensure_ascii=False,indent=1)
