export function Callout({ type = "info", title, children }: { type?: "info" | "success" | "warn" | "error" | "note"; title?: string; children: React.ReactNode }) {
  const base = "rounded-lg px-4 py-3 border";
  const styles: Record<string, { box: string; title: string }> = {
    info:   { box: "border-blue-500/30 bg-blue-500/5",   title: "text-blue-600 dark:text-blue-400" },
    success:{ box: "border-green-500/30 bg-green-500/5", title: "text-green-600 dark:text-green-400" },
    warn:   { box: "border-amber-500/30 bg-amber-500/5", title: "text-amber-600 dark:text-amber-400" },
    error:  { box: "border-red-500/30 bg-red-500/5",     title: "text-red-600 dark:text-red-400" },
    note:   { box: "border-sky-500/30 bg-sky-500/5",     title: "text-sky-600 dark:text-sky-400" },
  };
  const s = styles[type] || styles.info;
  return (
    <div className={`${base} ${s.box}`}> 
      {title && <div className={`mb-1 text-sm font-semibold ${s.title}`}>{title}</div>}
      <div className="text-sm text-foreground/80">
        {children}
      </div>
    </div>
  );
}

