#!/usr/bin/env python3
"""Regenerate scripts/*.js from data/artists.csv."""
import csv, json, pathlib, datetime
root = pathlib.Path(__file__).resolve().parent.parent
rows = list(csv.DictReader(open(root/'data/artists.csv', encoding='utf-8')))
arts = [[r['apple_artist_id'], r['name'], r['group']] for r in rows]
today = datetime.date.today().isoformat()
tpl = (root/'scripts/block.template.js').read_text(encoding='utf-8')
utpl = (root/'scripts/unblock.template.js').read_text(encoding='utf-8')
def render(t, a, key='amru_progress_v1'):
    return (t.replace('__ARTISTS__', json.dumps(a, ensure_ascii=False, separators=(',', ':')))
             .replace('__GENERATED__', today).replace('__COUNT__', str(len(a))).replace('__KEY__', key))
(root/'scripts/block.js').write_text(render(tpl, arts), encoding='utf-8')
core = [a for a in arts if a[2] == 'core']
(root/'scripts/block-core.js').write_text(render(tpl, core, 'amru_progress_core_v1'), encoding='utf-8')
(root/'scripts/unblock.js').write_text(render(utpl, arts), encoding='utf-8')
ch = root/'scripts/chunks'; ch.mkdir(exist_ok=True)
for f in ch.glob('block-part-*.js'): f.unlink()
N = 200
for i in range(0, len(arts), N):
    n = i // N + 1
    (ch/f'block-part-{n:02d}.js').write_text(render(tpl, arts[i:i+N], f'amru_part_{n:02d}'), encoding='utf-8')
print(f'{len(arts)} artists ({len(core)} core), {((len(arts)-1)//N)+1} chunks')
