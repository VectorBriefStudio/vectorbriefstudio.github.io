// Rebuilds index.html from template.html, briefs.json and the snippet files.
// Run from this folder: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL('./' + p, import.meta.url), 'utf8');
const data = JSON.parse(read('briefs.json'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (s) => esc(s).replace(/\x60([^\x60]+)\x60/g, '<code>$1</code>');

const ICONS = {
  youtube: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
  github: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
};
const icon = (name) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
const PLAY = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 2l7 4-7 4z" fill="currentColor"/></svg>';

const links = data.links.map((l) =>
  '<a href="' + esc(l.href) + '">' + icon(l.icon) + '<b>' + esc(l.label) + '</b><span>' + esc(l.sub) + '</span></a>'
).join('\n      ');

const ordered = data.briefs.slice().reverse(); // newest first

const tabs = ordered.map((b, i) =>
  '<button type="button" role="tab" id="tab-' + b.id + '" aria-controls="' + b.id + '" aria-selected="' + (i === 0) + '"' +
  (i === 0 ? '' : ' tabindex="-1"') + ' style="--accent:' + esc(b.accent) + '"><span class="n">' + esc(b.n) + '</span>' + esc(b.short) + '</button>'
).join('\n      ');

const snippet = (b, s, i) => {
  const id = 's-' + b.id + '-' + i;
  const body = read(s.file).replace(/\n$/, '');
  return (s.intro ? '<p class="lead-in">' + inline(s.intro) + '</p>' : '') +
    '<div class="snip"><div class="snip-head"><span class="path">' + esc(s.where) + '</span>' +
    '<button class="copy" type="button" data-target="' + id + '">Copy</button></div>' +
    '<pre id="' + id + '"><code>' + esc(body) + '</code></pre></div>';
};

const slide = (b, i) => {
  const notes = b.notes.length
    ? '<details class="fine"><summary>Fine print</summary><ul>' + b.notes.map((n) => '<li>' + inline(n) + '</li>').join('') + '</ul></details>'
    : '';
  const docs = b.docs.map((d) => '<a href="' + esc(d.url) + '">' + esc(d.label) + '</a>').join(' · ');
  return '\n      <article class="slide" id="' + b.id + '" role="tabpanel" aria-labelledby="tab-' + b.id + '" aria-roledescription="slide" style="--accent:' + esc(b.accent) + '">' +
    '\n        <a class="poster" href="' + esc(b.video) + '" aria-label="Watch brief ' + esc(b.n) + ' on YouTube"><img src="' + esc(b.cover) + '" width="360" height="640" alt="" loading="' + (i === 0 ? 'eager' : 'lazy') + '"><span class="play">' + PLAY + 'Watch</span></a>' +
    '\n        <div class="meta"><p class="kicker">Brief ' + esc(b.n) + '</p><h3>' + esc(b.title) + '</h3></div>' +
    '\n        <p class="take">' + inline(b.takeaway) + '</p>' +
    '\n        <div class="body">' + b.snippets.map((s, k) => snippet(b, s, k)).join('') + notes + '<p class="docs">Checked against the official docs on ' + esc(b.verified) + ': ' + docs + '</p></div>' +
    '\n      </article>';
};

const fill = {
  title: esc(data.site.title),
  description: esc(data.site.description),
  url: esc(data.site.url),
  repo: esc(data.site.repo),
  email: esc(data.site.email),
  links,
  tabs,
  slides: ordered.map(slide).join(''),
  count: '1 / ' + ordered.length,
};
const html = read('template.html').replace(/\{\{(\w+)\}\}/g, (m, k) => (k in fill ? fill[k] : m));
writeFileSync(new URL('./index.html', import.meta.url), html);
console.log('wrote index.html with', ordered.length, 'briefs');
