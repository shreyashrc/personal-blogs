export default function NotFound() {
  return (
    <section className="py-24 text-center animate-fade-in">
      <p className="text-sm text-foreground/60">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-foreground/70">The page you’re looking for doesn’t exist or has been moved.</p>
      <div className="mt-6">
        <a href="/" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:border-foreground/30">
          ← Back home
        </a>
      </div>
    </section>
  );
}
