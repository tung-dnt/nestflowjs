import Link from 'next/link';

export function Community() {
  return (
    <section className="px-6 py-16 text-center md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl font-bold text-fd-foreground">Get Involved</h2>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <a
            href="https://github.com/tung-dnt/nestflow-js"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-6 py-3 font-semibold text-fd-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md no-underline"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/nestflow-js"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-6 py-3 font-semibold text-fd-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md no-underline"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0h-2.666V8.667h2.666v5.331zm12 0h-1.332v-4h-1.335v4h-1.333v-4h-1.335v4H15.33V8.667h7.336v5.331zM10 10h1.334v2.667H10V10z" />
            </svg>
            View on npm
          </a>
          <Link
            href="/docs/quick-start"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-6 py-3 font-semibold text-fd-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md no-underline"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            Read the Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
