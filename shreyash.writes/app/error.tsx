"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <section className="py-24 text-center animate-fade-in">
          <p className="text-sm text-foreground/60">Something went wrong</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Unexpected error</h1>
          <p className="mt-3 text-foreground/70">{error.message || "Please try again."}</p>
          <div className="mt-6">
            <button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm">
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
