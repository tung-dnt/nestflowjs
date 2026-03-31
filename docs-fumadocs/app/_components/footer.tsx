import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-fd-border bg-fd-card px-6 py-12">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {/* Documentation */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fd-muted-foreground">
            Documentation
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/docs/introduction"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Introduction
              </Link>
            </li>
            <li>
              <Link
                href="/docs/quick-start"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Quick Start
              </Link>
            </li>
            <li>
              <Link
                href="/docs/concepts/workflow-definition"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Workflow
              </Link>
            </li>
            <li>
              <Link
                href="/docs/api-reference/adapters"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Adapters
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fd-muted-foreground">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/docs/examples/lambda-order-state-machine"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Examples
              </Link>
            </li>
            <li>
              <Link
                href="/docs/api-reference/workflow-module"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                API Reference
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/tung-dnt/nestflow-js"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/nestflow-js"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                npm
              </a>
            </li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fd-muted-foreground">More</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/tung-dnt/nestflow-js/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Contributing
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tung-dnt/nestflow-js/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                Changelog
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tung-dnt/nestflow-js/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fd-foreground/80 transition-colors hover:text-fd-foreground no-underline"
              >
                License
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl border-t border-fd-border pt-6 text-center text-sm text-fd-muted-foreground">
        Copyright &copy; {new Date().getFullYear()} Thomas Do (tung-dnt). Built with Fumadocs.
      </div>
    </footer>
  );
}
