import os
WORK=os.environ.get("CANVA_WORK","build-canva")
# Build per-page layout data (exact text runs) from pages.json
import json, statistics
from fontTools.ttLib import TTFont
F=json.load(open(WORK+'/fonts.json'))
TT={k:TTFont(f"{WORK}/{v['file']}.ttf") for k,v in F.items()}
def adv(font,ch):
  t=TT[font]; g=t.getBestCmap().get(ord(ch))
  return t['hmtx'][g][0]/F[font]['upm'] if g else 0.5
def runs(s):
  """split a span into runs with uniform letter-spacing"""
  f=s['font']; S=s['size']; txt=s['text']; xs=s['x']
  n=len(txt)
  if f not in F: return []
  gaps=[xs[i+1]-xs[i]-adv(f,txt[i])*S for i in range(n-1)]
  def mk(i,j):
    g=gaps[i:j-1] if j-1>i else []
    ls=statistics.mean(g) if g else 0
    return dict(x=round(xs[i],2),t=txt[i:j],ls=round(ls,3))
  if not gaps or max(gaps)-min(gaps)<0.35: return [mk(0,n)]
  # split into words at spaces, then check each word
  out=[];i=0
  while i<n:
    if txt[i]==' ': i+=1; continue
    j=i
    while j<n and txt[j]!=' ': j+=1
    out.append(mk(i,j)); i=j
  return out
pages=json.load(open(WORK+'/pages.json'))
res=[]
for pg in pages:
  items=[]
  for s in pg['spans']:
    f=s['font']
    if f not in F: print('skip font',f,s['text']); continue
    A=F[f]['asc']/F[f]['upm']; D=-F[f]['desc']/F[f]['upm']
    for r in runs(s):
      items.append(dict(font=F[f]['file'],size=round(s['size'],3),color=s['color'],
        x=r['x'],y=round(s['origin'][1]-s['size']*A,2),text=r['t'],ls=r['ls'],
        hidden=s['mode']=='bake',bbox=[round(v,1) for v in s['bbox']]))
  res.append(dict(page=pg['page'],width=pg['width'],height=pg['height'],text=items))
  print(pg['page'],len(items))
json.dump(res,open(WORK+'/layout.json','w'),ensure_ascii=False)
