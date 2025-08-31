import { getSiteName } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/80">
      <div className="mx-auto max-w-3xl px-6 md:px-8 py-10 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {getSiteName()}</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/" target="_blank" rel="me noopener noreferrer" aria-label="GitHub" className="hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A12 12 0 0 0 0 12.62c0 5.34 3.44 9.86 8.2 11.46.6.1.82-.27.82-.6v-2.1c-3.34.74-4.04-1.62-4.04-1.62-.55-1.45-1.34-1.84-1.34-1.84-1.1-.77.08-.75.08-.75 1.22.09 1.87 1.29 1.87 1.29 1.08 1.91 2.83 1.36 3.52 1.04.11-.81.42-1.36.77-1.67-2.67-.31-5.47-1.39-5.47-6.2 0-1.37.47-2.5 1.25-3.39-.13-.31-.54-1.56.12-3.24 0 0 1.01-.33 3.3 1.3a11.1 11.1 0 0 1 6 0c2.29-1.63 3.3-1.3 3.3-1.3.66 1.68.25 2.93.12 3.24.78.89 1.25 2.02 1.25 3.39 0 4.83-2.8 5.88-5.47 6.2.43.37.81 1.1.81 2.22v3.29c0 .34.22.71.83.6A12.12 12.12 0 0 0 24 12.62 12 12 0 0 0 12 .5Z"/></svg>
          </a>
          <a href="https://x.com/" target="_blank" rel="me noopener noreferrer" aria-label="X (Twitter)" className="hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.555l-5.13-6.707-5.868 6.707H1.64l7.73-8.842L1.5 2.25h6.72l4.64 6.121 5.384-6.121Zm-1.155 17.28h1.833L7.01 4.355H5.056l12.033 15.176Z"/></svg>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.52h4.56V24H.22zM8.68 8.52h4.37v2.11h.06c.61-1.16 2.11-2.38 4.35-2.38 4.65 0 5.51 3.06 5.51 7.03V24h-4.56v-6.88c0-1.64-.03-3.76-2.29-3.76-2.29 0-2.64 1.79-2.64 3.64V24H8.68z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

