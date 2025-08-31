export function Video({ url, title = "", aspect = "16:9" }: { url: string; title?: string; aspect?: "16:9" | "4:3" | "1:1" }) {
  const [w, h] = aspect === "4:3" ? [4,3] : aspect === "1:1" ? [1,1] : [16,9];
  const padding = (h / w) * 100;
  return (
    <div className="my-6">
      <div className="relative w-full overflow-hidden rounded-xl border border-border" style={{ paddingTop: `${padding}%` }}>
        <iframe
          src={url}
          title={title}
          className="absolute left-0 top-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

