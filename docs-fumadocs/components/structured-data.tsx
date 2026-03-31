import React from 'react';

const SITE_URL = 'https://nestflow.organit.dev';
const SITE_NAME = 'NestflowJS';

// ---------------------------------------------------------------------------
// Utility: render a JSON-LD script tag
// ---------------------------------------------------------------------------

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// ---------------------------------------------------------------------------
// Organization schema
// ---------------------------------------------------------------------------

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.jpeg`,
  sameAs: ['https://github.com/tung-dnt/nestflow-js', 'https://www.npmjs.com/package/nestflow-js'],
};

export function OrganizationJsonLd() {
  return <JsonLd data={organizationSchema} />;
}

// ---------------------------------------------------------------------------
// SoftwareApplication schema
// ---------------------------------------------------------------------------

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  description:
    'A decorator-driven state machine library for NestJS. Build type-safe workflows with states, transitions, and event handlers using familiar NestJS patterns.',
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  programmingLanguage: ['TypeScript', 'JavaScript'],
  runtimePlatform: 'Node.js',
};

export function SoftwareApplicationJsonLd() {
  return <JsonLd data={softwareApplicationSchema} />;
}

// ---------------------------------------------------------------------------
// WebSite schema with SearchAction
// ---------------------------------------------------------------------------

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Official documentation for NestflowJS, the decorator-driven state machine library for NestJS.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/docs?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function WebSiteJsonLd() {
  return <JsonLd data={webSiteSchema} />;
}

// ---------------------------------------------------------------------------
// BreadcrumbList schema (dynamic per page)
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Renders a BreadcrumbList JSON-LD schema.
 *
 * @example
 * <BreadcrumbJsonLd
 *   items={[
 *     { name: "Docs", href: "/docs/introduction" },
 *     { name: "Concepts", href: "/docs/concepts/workflow-definition" },
 *     { name: "Workflow Definition", href: "/docs/concepts/workflow-definition" },
 *   ]}
 * />
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return <JsonLd data={breadcrumbSchema} />;
}

// ---------------------------------------------------------------------------
// TechArticle schema for documentation pages
// ---------------------------------------------------------------------------

export interface TechArticleProps {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Renders a TechArticle JSON-LD schema for a documentation page.
 *
 * @example
 * <TechArticleJsonLd
 *   title="Workflow Definition"
 *   description="Learn how to define workflows with NestflowJS decorators."
 *   path="/docs/concepts/workflow-definition"
 *   datePublished="2026-03-01"
 *   dateModified="2026-04-01"
 * />
 */
export function TechArticleJsonLd({
  title,
  description,
  path,
  datePublished = '2026-04-01',
  dateModified = '2026-04-01',
}: TechArticleProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/img/logo.jpeg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${path}`,
    },
    proficiencyLevel: 'Beginner',
    programmingLanguage: 'TypeScript',
    dependencies: 'NestJS',
  };

  return <JsonLd data={articleSchema} />;
}

// ---------------------------------------------------------------------------
// Combined: all global structured data for the root layout
// ---------------------------------------------------------------------------

/**
 * Drop this component into your root layout to emit
 * Organization + SoftwareApplication + WebSite schemas on every page.
 */
export function GlobalStructuredData() {
  return (
    <>
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      <WebSiteJsonLd />
    </>
  );
}
