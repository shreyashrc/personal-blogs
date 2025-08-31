#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function isValidDate(d) {
  const dt = new Date(d);
  return !isNaN(dt.getTime());
}

function main() {
  const root = process.cwd();
  const blogDir = path.join(root, 'blog');
  const files = fs.readdirSync(blogDir).filter(f => /\.(md|mdx)$/.test(f));
  let ok = true;

  for (const f of files) {
    const full = path.join(blogDir, f);
    const raw = fs.readFileSync(full, 'utf8');
    const { data } = matter(raw);
    const slugFromFile = f.replace(/\.(md|mdx)$/,'');

    if (!data.title) { console.warn(`[warn] ${f}: missing title`); ok = false; }
    if (!data.slug) { console.warn(`[warn] ${f}: missing slug`); ok = false; }
    if (data.slug && data.slug !== slugFromFile) { console.warn(`[warn] ${f}: slug frontmatter (${data.slug}) != filename (${slugFromFile})`); ok = false; }
    if (!data.date || !isValidDate(data.date)) { console.warn(`[warn] ${f}: invalid or missing date`); ok = false; }
    if (data.excerpt && String(data.excerpt).length > 300) { console.warn(`[warn] ${f}: excerpt too long (>300 chars)`); }
    if (data.tags && !Array.isArray(data.tags)) { console.warn(`[warn] ${f}: tags should be an array`); ok = false; }
    if (typeof data.draft !== 'undefined' && typeof data.draft !== 'boolean') { console.warn(`[warn] ${f}: draft should be boolean`); ok = false; }
    if (data.featuredImage && !fs.existsSync(path.join(root, 'public', data.featuredImage))) {
      console.warn(`[warn] ${f}: featuredImage path not found under public: ${data.featuredImage}`);
    }
  }

  if (!ok) {
    console.error('Content validation found issues.');
    process.exit(1);
  } else {
    console.log('Content validation passed.');
  }
}

main();

