import urllib.request,hashlib,json,time
from pathlib import Path
base='https://gaviaworks-dev.github.io/dadagastro-mobil/';ev=Path('v3-app/verification/gallery-release');before=json.loads((ev/'live-before.json').read_text());out={}
for name,old in before.items():
 try:
  with urllib.request.urlopen(base+name+'?verify=gallery-release') as r:body=r.read();out[name]={'status':r.status,'sha256':hashlib.sha256(body).hexdigest()}
 except urllib.error.HTTPError as e:out[name]={'status':e.code}
 out[name]['unchanged']=all(out[name].get(k)==v for k,v in old.items())
(ev/'live-root-check.json').write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
