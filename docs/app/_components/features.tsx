import Link from 'next/link';
import type { ReactNode } from 'react';

interface FeatureItem {
  title: string;
  icon: ReactNode;
  description: string;
  link: string;
}

const features: FeatureItem[] = [
  {
    title: 'State Machine Engine',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#e0234e]"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    description:
      'Define workflows with states, transitions, and events. Built-in support for final states, idle states, and failure handling.',
    link: '/docs/concepts/workflow-definition',
  },
  {
    title: 'Serverless Optimized',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#e0234e]"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description:
      'Built for AWS Lambda with automatic timeout handling, batch processing, and graceful shutdown. Minimal cold start overhead.',
    link: '/docs/api-reference/adapters',
  },
  {
    title: 'Durable Execution',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#e0234e]"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description:
      'Checkpoint and replay execution with the Durable Lambda Adapter. Survive timeouts and resume exactly where you left off.',
    link: '/docs/plugins/durable-lambda',
  },
  {
    title: 'Fully Type-Safe',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#e0234e]"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description:
      'Full TypeScript support with comprehensive type definitions. Catch workflow configuration errors at compile time, not runtime.',
    link: '/docs/concepts/workflow-definition',
  },
  {
    title: 'Tree-Shakable',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#e0234e]"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    description:
      'Subpath exports ensure minimal bundle sizes. Import only what you need for faster cold starts in serverless environments.',
    link: '/docs/quick-start',
  },
  {
    title: 'Retry & Error Handling',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#e0234e]"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
      </svg>
    ),
    description:
      'Built-in retry with exponential backoff and jitter. Handle transient failures gracefully with configurable @WithRetry policies.',
    link: '/docs/api-reference/decorators',
  },
];

function FeatureCard({ title, icon, description, link }: FeatureItem) {
  return (
    <Link
      href={link}
      className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md no-underline"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff0f3] dark:bg-[#2a1520]">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-fd-foreground">{title}</h3>
      <p className="m-0 text-sm leading-relaxed text-fd-muted-foreground">{description}</p>
    </Link>
  );
}

export function Features() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center text-3xl font-bold text-fd-foreground">Why NestflowJS?</h2>
        <p className="mb-10 text-center text-lg text-fd-muted-foreground">
          A modern workflow engine that gets out of your way and lets you focus on business logic
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
