import NextImage from "next/image";

export function Gallery({
  items,
  columns = 2,
}: {
  items: { src: string; alt: string; width: number; height: number }[];
  columns?: 2 | 3;
}) {
  if (!items?.length) return null;
  return (
    <div className={`grid gap-4 ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} grid-cols-1`}>
      {items.map((it) => (
        <figure key={it.src} className="">
          <NextImage
            src={it.src}
            alt={it.alt}
            width={it.width}
            height={it.height}
            className="w-full h-auto rounded-xl border border-border"
            sizes="(min-width: 768px) 768px, 100vw"
            loading="lazy"
          />
          {it.alt && (
            <figcaption className="mt-2 text-center text-sm text-foreground/70">{it.alt}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

