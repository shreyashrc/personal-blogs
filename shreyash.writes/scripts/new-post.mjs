#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { title: '', slug: '', tags: [], draft: true };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--title') out.title = args[++i] || '';
    else if (a === '--slug') out.slug = args[++i] || '';
    else if (a === '--date') out.date = args[++i] || '';
    else if (a === '--tags') out.tags = (args[++i] || '').split(',').map(s => s.trim()).filter(Boolean);
    else if (a === '--draft') out.draft = true;
    else if (a === '--publish') out.draft = false;
  }
  if (!out.title && !out.slug) {
    console.error('Usage: npm run post:new -- --title "My Post" [--slug my-post] [--date 2025-09-01] [--tags tag1,tag2] [--publish]');
    process.exit(1);
  }
  if (!out.slug) out.slug = slugify(out.title);
  if (!out.date) out.date = new Date().toISOString().slice(0, 10);
  return out;
}

function main() {
  const root = process.cwd();
  const blogDir = path.join(root, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  const { title, slug, date, tags, draft } = parseArgs();
  const file = path.join(blogDir, `${slug}.mdx`);
  if (fs.existsSync(file)) {
    console.error(`File already exists: ${file}`);
    process.exit(1);
  }
  const mdx = `---\nslug: ${slug}\ntitle: ${title || slug}\ndate: ${date}\nexcerpt: \nauthor: Shreyash Choppawar\ntags: [${tags.join(', ')}]\nfeaturedImage: /blog-images/${slug}/cover.jpg\ndraft: ${draft}\n---\n\n# ${title || slug}\n\n> Write your introduction here.\n\n## Section\n\nSome content...\n\n<Callout type="info" title="Heads up">\nUse FigureImage or Image directly to add images.\n</Callout>\n\n\n<FigureImage\n  src="/blog-images/${slug}/cover.jpg"\n  alt="Cover image"\n  width={1200}\n  height={630}\n  caption="Optional caption"\n/>\n\n\n\n`;
  fs.writeFileSync(file, mdx, 'utf8');
  const imgDir = path.join(root, 'public', 'blog-images', slug);
  fs.mkdirSync(imgDir, { recursive: true });
  console.log(`Created: ${path.relative(root, file)}`);
  console.log(`Image folder: ${path.relative(root, imgDir)}`);
}

main();

