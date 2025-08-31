import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'blog-images');

function getStagedFiles() {
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function isImage(file) {
  return /\.(png|jpe?g|webp)$/i.test(file);
}

async function optimizeFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  const base = absPath.slice(0, -ext.length);
  const buf = fs.readFileSync(absPath);
  const img = sharp(buf, { failOn: 'none' });
  const meta = await img.metadata();

  if (ext === '.jpg' || ext === '.jpeg') {
    await img.jpeg({ quality: 82, progressive: true }).toFile(absPath);
  } else if (ext === '.png') {
    await img.png({ compressionLevel: 8 }).toFile(absPath);
  } else if (ext === '.webp') {
    await img.webp({ quality: 78 }).toFile(absPath);
  }

  // Create webp sibling if not exists
  const webpPath = `${base}.webp`;
  if (!fs.existsSync(webpPath) && ext !== '.webp') {
    await sharp(buf).webp({ quality: 78 }).toFile(webpPath);
    // stage generated file
    execSync(`git add -- "${path.relative(ROOT, webpPath)}"`);
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) return;
  const staged = getStagedFiles()
    .filter((f) => f.startsWith('public/blog-images/'))
    .filter(isImage);

  if (staged.length === 0) return;

  for (const rel of staged) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    try {
      await optimizeFile(abs);
      // re-stage possibly modified file
      execSync(`git add -- "${rel}"`);
      console.log(`Optimized: ${rel}`);
    } catch (e) {
      console.warn(`Failed to optimize ${rel}:`, e.message || e);
    }
  }
}

main();

