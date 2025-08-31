import Image from "next/image";

export type FigureImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function FigureImage({
  src,
  alt,
  width,
  height,
  caption,
  sizes = "(min-width: 768px) 768px, 100vw",
  priority = false,
  className = "",
}: FigureImageProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={["w-full h-auto rounded-xl border border-border", className].join(" ")}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-foreground/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

