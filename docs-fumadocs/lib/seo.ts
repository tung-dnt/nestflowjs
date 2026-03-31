import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, OG_IMAGE, baseMetadata } from './metadata';
import { seoDescriptions } from './seo-descriptions';
import { canonicalUrl } from './canonical';

export { baseMetadata, SITE_URL, SITE_NAME };

/**
 * Generate page-specific metadata for documentation pages.
 * Merges base metadata with page-level overrides for title, description,
 * canonical URL, and Open Graph tags.
 *
 * @param path - The page route path (e.g., "/docs/introduction")
 * @param title - The page title (without site name suffix)
 * @param descriptionOverride - Optional manual description override
 */
export function createPageMetadata(path: string, title: string, descriptionOverride?: string): Metadata {
  const description = descriptionOverride ?? seoDescriptions[path] ?? DEFAULT_DESCRIPTION;

  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Generate metadata for the homepage.
 */
export function createHomeMetadata(): Metadata {
  return {
    ...baseMetadata,
    alternates: {
      canonical: SITE_URL,
    },
  };
}
