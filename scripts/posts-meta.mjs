#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const blogDir = path.join(root, 'blog');

function usage() {
  console.log('Usage:');
  console.log('  node scripts/posts-meta.mjs list');
  console.log('  node scripts/posts-meta.mjs publish --slug my-post');
  console.log('  node scripts/posts-meta.mjs rename --from old-slug --to new-slug');
}

function list() {
  const files = fs.readdirSync(blogDir).filter(f => /\.(md|mdx)$/.test(f));
  const rows = files.map(f => {
    const raw = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const { data } = matter(raw);
    return { file: f, slug: data.slug || f.replace(/\.(md|mdx)$/,''), title: data.title, date: data.date, draft: !!data.draft };
  });
  console.table(rows);
}

function publish(slug) {
  const file = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) throw new Error(`Not found: ${file}`);
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = matter(raw);
  parsed.data.draft = false;
  parsed.data.date = new Date().toISOString().slice(0,10);
  const out = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(file, out, 'utf8');
  console.log(`Published: ${slug}`);
}

function rename(from, to) {
  const fromFile = path.join(blogDir, `${from}.mdx`);
  const toFile = path.join(blogDir, `${to}.mdx`);
  if (!fs.existsSync(fromFile)) throw new Error(`Not found: ${fromFile}`);
  if (fs.existsSync(toFile)) throw new Error(`Target exists: ${toFile}`);
  const raw = fs.readFileSync(fromFile, 'utf8');
  const parsed = matter(raw);
  parsed.data.slug = to;
  const out = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(toFile, out, 'utf8');
  fs.unlinkSync(fromFile);
  console.log(`Renamed ${from} -> ${to}`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (!cmd) { usage(); process.exit(1); }

try {
  if (cmd === 'list') list();
  else if (cmd === 'publish') {
    const idx = rest.indexOf('--slug');
    const slug = idx >= 0 ? rest[idx+1] : null;
    if (!slug) throw new Error('Missing --slug');
    publish(slug);
  } else if (cmd === 'rename') {
    const iFrom = rest.indexOf('--from');
    const iTo = rest.indexOf('--to');
    const from = iFrom >= 0 ? rest[iFrom+1] : null;
    const to = iTo >= 0 ? rest[iTo+1] : null;
    if (!from || !to) throw new Error('Missing --from/--to');
    rename(from, to);
  } else {
    usage();
    process.exit(1);
  }
} catch (e) {
  console.error('Error:', e.message || e);
  process.exit(1);
}

