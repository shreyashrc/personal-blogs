import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Prose } from "@/components/Prose";
import NextImage from "next/image";
import { FigureImage } from "@/components/FigureImage";
import { Callout } from "@/components/Callout";
import { Gallery } from "@/components/Gallery";
import { Video } from "@/components/Video";
import { Tweet } from "@/components/Tweet";

const components = {
  a: (props: any) => {
    const href = props.href as string | undefined;
    const isInternal = href?.startsWith("/");
    if (isInternal && href) {
      return <Link href={href} {...props} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
  // Use <Image .../> directly in MDX for optimized images
  Image: NextImage,
  // And a convenience wrapper with caption support
  FigureImage,
  // Content helpers
  Callout,
  Gallery,
  Video,
  Tweet,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <Prose>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [
                // Syntax highlighting with shiki via rehype-pretty-code
                rehypePrettyCode,
                {
                  theme: {
                    dark: "github-dark-dimmed",
                    light: "github-light",
                  },
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
        components={components}
      />
    </Prose>
  );
}

