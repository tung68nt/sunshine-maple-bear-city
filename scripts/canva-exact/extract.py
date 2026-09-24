import os
WORK=os.environ.get("CANVA_WORK","build-canva")
import pymupdf, json, os, re
PDF=os.environ.get("CANVA_PDF","design.pdf")
FAM={'TheSeasons-Reg','Gordita-Regular','Gordita-RegularItalic','OpenSans-Regular','OpenSans-Light','PlayfairDisplay-Regular','PlayfairDisplay-SemiBoldItalic'}
FONTALIAS={'PlayfairDisplay-SemiBold':'PlayfairDisplay-SemiBoldItalic'}
SCALE=2
os.makedirs(WORK+'/bg',exist_ok=True)
def ov(a,b): return not (a[2]<=b[0] or b[2]<=a[0] or a[3]<=b[1] or b[3]<=a[1])
d=pymupdf.open(PDF)
pages=[]
for pno in range(len(d)):
  p=d[pno]; W,H=p.rect.width,p.rect.height
  td=p.get_text("rawdict")
  spans=[]
  for b in td["blocks"]:
    for l in b.get("lines",[]):
      for s in l["spans"]:
        txt=''.join(c['c'] for c in s['chars'])
        if not txt.strip(): continue
        f=FONTALIAS.get(s['font'],s['font'])
        spans.append(dict(font=f,size=s['size'],color='#%06x'%s['color'],alpha=s.get('alpha',255),bbox=s['bbox'],origin=s['origin'],text=txt,
             x=[c['origin'][0] for c in s['chars']], t3=f.startswith('Type3')))
  t3=[s['bbox'] for s in spans if s['t3']]
  vis=[s for s in spans if not s['t3'] and s['alpha']>0]
  items=[]
  for s in spans:
    if s['t3']: continue
    key=(s['text'].strip(),tuple(round(v) for v in s['bbox']))
    bake = any(ov(s['bbox'],r) for r in t3)
    if s['alpha']==0:
      if any((v['text'].strip(),tuple(round(x) for x in v['bbox']))==key for v in vis): continue
      bake=True
    s['mode']='bake' if bake else 'text'
    items.append(s)
  # dedupe identical visible spans
  seen=set(); uniq=[]
  for s in items:
    k=(s['text'],tuple(round(v,1) for v in s['bbox']),s['color'])
    if k in seen: continue
    seen.add(k); uniq.append(s)
  # background: remove live text
  q=pymupdf.open(); q.insert_pdf(d,from_page=pno,to_page=pno); qp=q[0]
  for s in uniq:
    if s['mode']=='text':
      r=pymupdf.Rect(s['bbox']); qp.add_redact_annot(r,fill=False)
  qp.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,text=pymupdf.PDF_REDACT_TEXT_REMOVE)
  pix=qp.get_pixmap(matrix=pymupdf.Matrix(SCALE,SCALE),alpha=False)
  pix.save(f'{WORK}/bg/p{pno+1}.png')
  full=p.get_pixmap(matrix=pymupdf.Matrix(SCALE,SCALE),alpha=False); full.save(f'{WORK}/bg/ref{pno+1}.png')
  pages.append(dict(page=pno+1,width=W,height=H,spans=uniq))
  print(pno+1,W,H,len(uniq),sum(s['mode']=='bake' for s in uniq))
json.dump(pages,open(WORK+'/pages.json','w'),ensure_ascii=False)
