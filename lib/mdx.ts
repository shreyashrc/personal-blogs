import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO or YYYY-MM-DD
  excerpt?: string;
  author?: string;
  tags: string[];
  featuredImage?: string;
  draft?: boolean;
  readingTime: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
}

export function getMdxFiles(): string[] {
  ensureBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function filenameToSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getAllSlugs(options?: { includeDrafts?: boolean; includeFuture?: boolean }): string[] {
  return getAllPostsMeta(options).map((m) => m.slug);
}

export function getPostBySlug(slug: string): Post {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
    ? mdPath
    : null;

  if (!filePath) throw new Error(`Post not found: ${slug}`);

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  const meta: PostMeta = {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? new Date().toISOString(),
    excerpt: (data.excerpt as string) ?? (data.description as string) ?? undefined,
    author: (data.author as string) ?? undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    featuredImage: (data.featuredImage as string) ?? (data.cover as string) ?? undefined,
    draft: Boolean(data.draft ?? false),
    readingTime: readingTime(content).text,
  };

  return { meta, content };
}

export function getAllPostsMeta(options?: { includeDrafts?: boolean; includeFuture?: boolean }): PostMeta[] {
  const includeDrafts = options?.includeDrafts ?? false;
  const includeFuture = options?.includeFuture ?? false;
  const now = new Date();

  return getMdxFiles()
    .map((file) => {
      const slug = filenameToSlug(file);
      return getPostBySlug(slug).meta;
    })
    .filter((m) => (includeDrafts ? true : !m.draft))
    .filter((m) => {
      if (includeFuture) return true;
      const d = new Date(m.date);
      return isNaN(d.getTime()) ? true : d <= now;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const meta of getAllPostsMeta()) {
    for (const t of meta.tags || []) set.add(t);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function filterPostsByTag(tag: string): PostMeta[] {
  const norm = tag.toLowerCase();
  return getAllPostsMeta().filter((p) => (p.tags || []).some((t) => t.toLowerCase() === norm));
}

export function searchPosts(query: string): PostMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllPostsMeta();
  return getAllPostsMeta().filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      (p.excerpt?.toLowerCase().includes(q) ?? false) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  });
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    total,
    pageCount,
    current,
    pageSize,
  };
}

