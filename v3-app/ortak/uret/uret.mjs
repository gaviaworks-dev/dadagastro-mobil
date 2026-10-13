// Tek kök üreticisi (docs/53 §1, Seçenek A). Girdi: ortak/tokens.json. Çıktılar (elle değiştirilmez):
//   ortak/dg-tokens.css            → --dg-* CSS değişkenleri (bütün kanon + geçiş değerleri)
//   ortak/dg-kopru.css             → bugünkü CSS adları (--tomato, --role-*, --space-* …) → var(--dg-*)
//   ortak/flutter/dg_tokens.g.dart → Flutter sabitleri (renk, tipografi, boşluk, radius, gölge, hareket, ölçü, ikon)
// Çalıştır (proje kökünden ya da herhangi bir yerden): node v3-app/ortak/uret/uret.mjs
// Bağımlılık yok. Çıktı deterministiktir (aynı girdi → bayt bayt aynı çıktı).
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ORTAK = path.resolve(HERE, '..');
const T = JSON.parse(fs.readFileSync(path.join(ORTAK, 'tokens.json'), 'utf8'));
const HEAD = 'Üretildi: ortak/uret/uret.mjs ← ortak/tokens.json (v' + T.meta.version + '). Elle değiştirmeyin.';

const kebab = s => String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const isMeta = k => k.startsWith('_') || ['note', 'status', 'use', 'kullanim', 'canliKullanim', 'rule'].includes(k);
const px = v => typeof v === 'number' ? (v === 0 ? '0px' : v + 'px') : v;
const em = v => (v === 0 ? '0' : String(v)) + 'em';
const get = p => p.split('.').reduce((o, k) => o?.[k], T);

// ---------- Token yolu → CSS değişken adı ----------
function cssName(p) {
  const [root, ...rest] = p.split('.');
  if (root === 'font') return '--dg-font-' + kebab(rest[0]);
  if (root === 'spaceAlias') return '--dg-space-' + kebab(rest.join('-'));
  if (root === 'color' && rest[0] === 'primary' && rest[1] === 'adaylar') return '--dg-color-primary-aday-' + kebab(rest[2]);
  return '--dg-' + [root, ...rest].map(kebab).join('-');
}

// ---------- dg-tokens.css ----------
const decl = [];
const add = (p, v) => decl.push(`${cssName(p)}:${v}`);
for (const [g, grp] of Object.entries(T.color)) {
  for (const [k, o] of Object.entries(grp)) if (!isMeta(k)) add(`color.${g}.${k}`, o.value);
}
add('font.regular', T.font.regular.stack);
add('font.bold', `${T.font.bold.family},${T.font.regular.stack}`);
for (const [role, r] of Object.entries(T.typography)) {
  if (isMeta(role)) continue;
  const base = `--dg-type-${kebab(role)}`;
  decl.push(`${base}-family:var(--dg-font-${r.family})`, `${base}-size:${px(r.size)}`, `${base}-weight:${r.weight}`, `${base}-line:${r.line}`, `${base}-tracking:${em(r.tracking)}`);
}
for (const [k, v] of Object.entries(T.space)) add(`space.${k}`, px(v));
for (const [k, v] of Object.entries(T.spaceAlias)) add(`spaceAlias.${k}`, px(v));
for (const [k, v] of Object.entries(T.radius)) if (!isMeta(k)) add(`radius.${k}`, px(v));
for (const [k, v] of Object.entries(T.shadow)) add(`shadow.${k}`, v);
add('overlay.base', T.overlay.base);
add('overlay.scrim', `color-mix(in srgb,${T.overlay.base} ${T.overlay.scrimPercent}%,transparent)`);
add('overlay.floatingIcon', `color-mix(in srgb,${T.overlay.base} ${T.overlay.floatingIconPercent}%,transparent)`);
add('motion.ease', T.motion.ease);
for (const [k, v] of Object.entries(T.motion)) if (typeof v === 'number') add(`motion.${k}`, v + 'ms');
for (const [k, v] of Object.entries(T.motion.oneri)) if (typeof v === 'number') add(`motion.oneri.${k}`, v + 'ms');
// Hareket eğrileri ve yaylar (docs/58): --dg-motion-easing-<ad>, --dg-motion-spring-<ad> (CSS linear() örneklemesi), --dg-motion-spring-<ad>-ms
for (const [k, v] of Object.entries(T.motion.easing || {})) if (!isMeta(k)) add(`motion.easing.${k}`, v);
for (const [k, v] of Object.entries(T.motion.spring || {})) if (!isMeta(k)) { add(`motion.spring.${k}`, v.css); add(`motion.spring.${k}.ms`, v.ms + 'ms'); }
for (const [k, v] of Object.entries(T.size)) {
  if (typeof v === 'number') add(`size.${k}`, px(v));
  else for (const [k2, v2] of Object.entries(v)) if (!isMeta(k2)) add(`size.${k}.${k2}`, px(v2));
}
const tokensCss = `/* ${HEAD} */\n:root{\n${decl.map(d => '  ' + d + ';').join('\n')}\n}\n`;

// ---------- dg-kopru.css ----------
const legacyRoles = ['display', 'page', 'section', 'sheet', 'subheading', 'card', 'featured', 'body', 'meta', 'label', 'button', 'nav'];
const bridge = [];
for (const [name, p] of Object.entries(T.kopru)) {
  if (name.startsWith('_')) continue;
  if (name === '--role-*') { for (const r of legacyRoles) for (const f of ['size', 'weight', 'line', 'tracking']) bridge.push(`--role-${r}-${f}:var(--dg-type-${r}-${f})`); continue; }
  if (name === '--space-*') { for (const k of Object.keys(T.space)) bridge.push(`--space-${k}:var(--dg-space-${k})`); continue; }
  if (get(p) === undefined) throw new Error('köprü yolu yok: ' + name + ' → ' + p);
  const target = p === 'font.regular.stack' ? '--dg-font-regular' : cssName(p.replace(/\.value$/, ''));
  bridge.push(`${name}:var(${target})`);
}
const kopruCss = `/* ${HEAD}\n   Köprü: bugünkü CSS adları tek kökün --dg-* değerlerine bağlanır. tokens.css'ten hemen sonra yüklenir.\n   Değerler bugünkü etkin değerlerle aynıdır; görsel fark 0 (docs/55 §3). Primary ailesi canlı\n   dadagastro.com token'larına bağlandı (Beyar kararı, docs/55 §2). */\n:root{\n${bridge.map(d => '  ' + d + ';').join('\n')}\n}\n`;

// ---------- dg_tokens.g.dart ----------
const camel = s => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const dartColor = hex => 'Color(0xFF' + hex.replace('#', '').toUpperCase() + ')';
const dartShadow = css => css.split(/,(?![^(]*\))/).map(s => s.trim()).map(s => {
  const m = s.match(/^(-?[\d.]+)(?:px)? (-?[\d.]+)(?:px)? (-?[\d.]+)(?:px)?(?: (-?[\d.]+)(?:px)?)? (.+)$/);
  if (!m) return null;
  const col = m[5];
  const rgba = col.match(/rgba\((\d+),(\d+),(\d+),([.\d]+)\)/);
  const c = rgba ? `Color.fromRGBO(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${Number(rgba[4])})` : (col.startsWith('#') ? dartColor(col) : null);
  if (!c) return null;
  return `BoxShadow(offset: Offset(${Number(m[1])}, ${Number(m[2])}), blurRadius: ${Number(m[3])}, spreadRadius: ${Number(m[4] || 0)}, color: ${c})`;
});
const L = [];
L.push(`// ${HEAD}`, '// Flutter fazında lib/tema/ altına kopyalanır; ThemeData ve ThemeExtension<DgTokens> bu sabitlerden kurulur.', '// ignore_for_file: constant_identifier_names', '', "import 'package:flutter/physics.dart';\nimport 'package:flutter/widgets.dart';", '');
L.push('abstract final class DgColors {');
for (const [g, grp] of Object.entries(T.color)) {
  for (const [k, o] of Object.entries(grp)) if (!isMeta(k)) L.push(`  static const ${g === 'primary' ? k : g + k[0].toUpperCase() + k.slice(1)} = ${dartColor(o.value)};`);
}
L.push('}', '');
L.push('abstract final class DgFonts {', `  static const regular = '${T.font.regular.family}';`, `  static const bold = '${T.font.bold.family}';`, '}', '');
L.push('/// Tipografi rolleri: letterSpacing = tracking(em) × size; height = satır çarpanı.', 'abstract final class DgType {');
for (const [role, r] of Object.entries(T.typography)) {
  if (isMeta(role)) continue;
  const ls = Math.round(r.tracking * r.size * 1000) / 1000;
  L.push(`  static const ${role} = TextStyle(fontFamily: DgFonts.${r.family}, fontSize: ${r.size}, fontWeight: FontWeight.w${r.weight}, height: ${r.line}, letterSpacing: ${ls}${r.family === 'regular' ? '' : ''});`);
}
L.push('}', '');
L.push('abstract final class DgSpace {');
for (const [k, v] of Object.entries(T.space)) L.push(`  static const double s${k} = ${v};`);
for (const [k, v] of Object.entries(T.spaceAlias)) L.push(`  static const double ${k} = ${v};`);
L.push('}', '');
L.push('abstract final class DgRadius {');
for (const [k, v] of Object.entries(T.radius)) if (!isMeta(k) && typeof v === 'number') L.push(`  static const double ${k} = ${v};`);
L.push('  // avatar: daire (BoxShape.circle)', '}', '');
L.push('abstract final class DgShadows {');
for (const [k, v] of Object.entries(T.shadow)) { const s = dartShadow(v); if (s.every(Boolean)) L.push(`  static const ${k} = [${s.join(', ')}];`); else L.push(`  // ${k}: primary rengine bağlı, tema içinde kurulur (${v})`); }
L.push('}', '');
const ease = T.motion.ease.slice(T.motion.ease.indexOf('(') + 1, -1).split(',').map(Number);
L.push('abstract final class DgMotion {', `  static const ease = Cubic(${ease.join(', ')});`);
for (const [k, v] of Object.entries(T.motion)) if (typeof v === 'number') L.push(`  static const ${k} = Duration(milliseconds: ${v});`);
L.push('  // Eğriler (Material 3 Expressive / Apple HIG)');
for (const [k, v] of Object.entries(T.motion.easing || {})) if (!isMeta(k)) L.push(`  static const ${k} = Cubic(${v.slice(v.indexOf('(') + 1, -1).split(',').map(Number).join(', ')});`);
L.push('  // Yaylar: SpringSimulation / Animation.animateWith için');
for (const [k, v] of Object.entries(T.motion.spring || {})) if (!isMeta(k)) L.push(`  static final spring${k[0].toUpperCase() + k.slice(1)} = SpringDescription(mass: ${v.mass}, stiffness: ${v.stiffness}, damping: ${v.damping});`);
L.push('  // Öneriler (karar bekliyor, docs/54 (c))');
for (const [k, v] of Object.entries(T.motion.oneri)) if (typeof v === 'number') L.push(`  static const oneri${k[0].toUpperCase() + k.slice(1)} = Duration(milliseconds: ${v});`);
L.push('}', '');
L.push('abstract final class DgSize {');
for (const [k, v] of Object.entries(T.size)) {
  if (typeof v === 'number') L.push(`  static const double ${k} = ${v};`);
  else for (const [k2, v2] of Object.entries(v)) if (!isMeta(k2)) L.push(`  static const double ${k}${k2[0].toUpperCase() + k2.slice(1)} = ${v2};`);
}
L.push('}', '');
L.push('/// Kavram → Font Awesome Free 6 Solid adı (font_awesome_flutter: FontAwesomeIcons.<camelCase>).', 'abstract final class DgIcons {');
for (const [k, v] of Object.entries(T.icons)) if (!isMeta(k)) L.push(`  static const ${k} = '${v}'; // FontAwesomeIcons.${camel(v)}`);
L.push('}', '');
L.push('/// Alt menü sırası veri olarak (Beyar kararı 8; patron teyidi bekliyor).', 'abstract final class DgNav {', '  static const items = [');
for (const it of T.nav.items) L.push(`    (id: '${it.id}', label: '${it.label}', icon: '${it.icon}', center: ${!!it.center}),`);
L.push('  ];', '}', '');
const dart = L.join('\n');

// ---------- Yaz ----------
fs.mkdirSync(path.join(ORTAK, 'flutter'), {recursive: true});
const write = (f, s) => { const p = path.join(ORTAK, f); const old = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; fs.writeFileSync(p, s); console.log((old === s ? 'aynı  ' : 'yazıldı') + ' ' + f + ' (' + s.length + ' bayt)'); };
write('dg-tokens.css', tokensCss);
write('dg-kopru.css', kopruCss);
write('flutter/dg_tokens.g.dart', dart);
// JS tarafının ihtiyaç duyduğu yapısal tokenlar (alt menü sırası, ikon sözlüğü, süreler): sayfalar değer kopyalamaz.
const js = {nav: T.nav.items, modules: Object.fromEntries(Object.entries(T.modules || {}).filter(([k]) => !k.startsWith('_'))), icons: Object.fromEntries(Object.entries(T.icons).filter(([k]) => !isMeta(k))), motion: Object.fromEntries(Object.entries(T.motion).filter(([, v]) => typeof v === 'number'))};
write('dg-tokens.js', `/* ${HEAD} */\nwindow.DGTOKENS=${JSON.stringify(js)};\n`);
console.log('token:', decl.length, '· köprü:', bridge.length);
