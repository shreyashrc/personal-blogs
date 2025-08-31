import { getAllPostsMeta, getAllTags } from "@/lib/mdx";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600; // regenerate at most once per hour

export default async function sitemap() {
  const site = getSiteUrl();
  const posts = getAllPostsMeta();
  const tags = getAllTags();

  const entries = [
    { url: new URL("/", site).toString(), lastModified: new Date().toISOString() },
    { url: new URL("/blog", site).toString(), lastModified: new Date().toISOString() },
    { url: new URL("/tags", site).toString(), lastModified: new Date().toISOString() },
    ...tags.map((t) => ({ url: new URL(`/tags/${encodeURIComponent(t)}`, site).toString(), lastModified: new Date().toISOString() })),
    ...posts.map((p) => ({ url: new URL(`/blog/${p.slug}`, site).toString(), lastModified: p.date })),
  ];

  return entries;
}

