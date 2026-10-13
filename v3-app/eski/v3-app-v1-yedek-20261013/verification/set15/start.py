from pathlib import Path
import hashlib,json,shutil
p=Path('v3-app');out=p/'verification/set15';protected=[f for f in Path('.').glob('*') if f.is_file()]+[f for f in Path('yayin').rglob('*') if f.is_file()]+[f for f in p.glob('*') if f.is_file() and (f.name.startswith('liste') or f.name.startswith('detay'))]
(out/'protected-before.json').write_text(json.dumps({str(f):hashlib.sha256(f.read_bytes()).hexdigest() for f in protected},indent=2))
for name in ['ana-a.html','ana-sayfa-alti.html','family-home.js','family-home.css','hero-light.css']+[f'ana-{n}.html' for n in range(1,7)]:shutil.copy2(p/name,p/'eski/set1-alti-onayli'/name)
