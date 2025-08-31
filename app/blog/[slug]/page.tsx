import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { MDXContent } from "@/components/MDXContent";
import { PostHeader } from "@/components/PostHeader";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl, getSiteName } from "@/lib/site";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";

export async function generateStaticParams() {
  return getAllSlugs({ includeDrafts: false, includeFuture: false }).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug);
    return {
      title: `${meta.title} | ${getSiteName()}`,
      description: meta.excerpt,
      alternates: { canonical: `/blog/${meta.slug}` },
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        type: "article",
        images: meta.featuredImage ? [{ url: meta.featuredImage, width: 1200, height: 630, alt: meta.title }] : undefined,
      },
      twitter: {
        card: meta.featuredImage ? "summary_large_image" : "summary",
        title: meta.title,
        description: meta.excerpt,
        images: meta.featuredImage ? [meta.featuredImage] : undefined,
      },
    };
  } catch {
    return { title: `Post not found | ${getSiteName()}` };
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }
  if (!post) return null;

  const siteUrl = getSiteUrl();
  const url = new URL(`/blog/${post.meta.slug}`, siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.excerpt,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    author: post.meta.author ? { "@type": "Person", name: post.meta.author } : undefined,
    image: post.meta.featuredImage ? new URL(post.meta.featuredImage, siteUrl).toString() : undefined,
    mainEntityOfPage: url,
    url,
    publisher: { "@type": "Organization", name: getSiteName() },
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <article className="py-12 animate-fade-in">
      <JsonLd data={jsonLd} />
      <PostHeader meta={post.meta} />
      <MDXContent source={post.content} />
      {/* Share */}
      <ShareButtons url={url} title={post.meta.title} />
      <hr className="mt-12 border-border" />
      {/* Related posts */}
      <RelatedPosts slug={post.meta.slug} />
    </article>
  );
}

