import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd, TechArticleJsonLd } from '@/components/structured-data';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

/**
 * Build breadcrumb items from the slug segments.
 * Example: ["concepts", "workflow-definition"] becomes:
 *   [{ name: "Docs", href: "/docs" }, { name: "Concepts", href: "/docs/concepts" }, ...]
 */
function buildBreadcrumbs(slug: string[]) {
  const items = [{ name: 'Docs', href: '/docs/introduction' }];
  let accumulated = '/docs';
  for (const segment of slug) {
    accumulated += `/${segment}`;
    items.push({
      name: segment
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      href: accumulated,
    });
  }
  return items;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = page.data as any;
  const MDX = data.body;
  const slug = params.slug ?? [];
  const pagePath = `/docs/${slug.join('/')}`;
  const breadcrumbs = buildBreadcrumbs(slug);

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <TechArticleJsonLd title={data.title} description={data.description ?? ''} path={pagePath} />
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) return {};

  const slug = params.slug ?? [];
  const pagePath = `/docs/${slug.join('/')}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = page.data as any;
  return createPageMetadata(pagePath, data.title, data.description);
}
