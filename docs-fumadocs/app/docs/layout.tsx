import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { links: _links, ...options } = baseOptions();
  return (
    <DocsLayout
      tree={source.pageTree}
      {...options}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
