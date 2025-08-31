#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();

function getAllPosts() {
  const blogDir = path.join(root, 'blog');
  return fs.readdirSync(blogDir).filter(f => /\.(md|mdx)$/.test(f)).map(f => {
    const full = path.join(blogDir, f);
    const raw = fs.readFileSync(full, 'utf8');
    const { data } = matter(raw);
    return { file: f, data };
  });
}

function main() {
  const posts = getAllPosts();
  const outDir = path.join(root, 'backup');
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g,'-');
  const jsonPath = path.join(outDir, `blog-${stamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`Wrote backup: ${path.relative(root, jsonPath)}`);
}

main();

