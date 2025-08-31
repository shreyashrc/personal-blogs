import { getAllPostsMeta } from "@/lib/mdx";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const site = getSiteUrl();
  const posts = getAllPostsMeta();

  const items = posts
    .map((p) => `
      <item>
        <title>${escapeXml(p.title)}</title>
        <link>${new URL(`/blog/${p.slug}`, site).toString()}</link>
        <guid>${new URL(`/blog/${p.slug}`, site).toString()}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        ${p.excerpt ? `<description>${escapeXml(p.excerpt)}</description>` : ""}
      </item>
    `)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>shreyash.writes</title>
      <link>${site}</link>
      <description>Posts from shreyash.writes</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}

