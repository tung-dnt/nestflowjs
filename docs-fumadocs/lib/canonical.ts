import { SITE_URL } from './metadata';

/**
 * Generate the canonical URL for a given page path.
 * Strips trailing slashes and ensures consistent formatting.
 *
 * @param path - The route path (e.g., "/docs/introduction" or "docs/introduction")
 * @returns The full canonical URL (e.g., "https://nestflow.organit.dev/docs/introduction")
 */
export function canonicalUrl(path?: string): string {
  if (!path || path === '/') {
    return SITE_URL;
  }

  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Remove trailing slash
  const cleanPath = normalizedPath.endsWith('/') ? normalizedPath.slice(0, -1) : normalizedPath;

  return `${SITE_URL}${cleanPath}`;
}

/**
 * All documentation page paths for sitemap generation and validation.
 */
export const allDocPaths = [
  '/',
  '/docs/introduction',
  '/docs/quick-start',
  '/docs/concepts/workflow-definition',
  '/docs/concepts/states-and-transitions',
  '/docs/concepts/events-and-handlers',
  '/docs/concepts/entity-service',
  '/docs/plugins/durable-lambda',
  '/docs/recipes/retry-and-error-handling',
  '/docs/recipes/human-in-the-loop',
  '/docs/recipes/custom-adapter',
  '/docs/examples/lambda-order-state-machine',
  '/docs/examples/payment-with-retry',
  '/docs/api-reference/workflow-module',
  '/docs/api-reference/decorators',
  '/docs/api-reference/services',
  '/docs/api-reference/interfaces',
  '/docs/api-reference/adapters',
] as const;

export type DocPath = (typeof allDocPaths)[number];
