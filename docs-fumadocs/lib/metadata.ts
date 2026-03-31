import type { Metadata } from 'next';

const SITE_URL = 'https://nestflow.organit.dev';
const SITE_NAME = 'NestflowJS';
const DEFAULT_TITLE = 'NestflowJS - Decorator-Driven State Machine for NestJS';
const DEFAULT_DESCRIPTION =
  'Build type-safe workflows in NestJS with decorator-driven state machines. Define states, transitions, and event handlers using familiar NestJS patterns. Open-source workflow engine for Node.js.';

/**
 * Shared OG image configuration.
 * Place an OG image at public/og-image.png (1200x630).
 */
const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'NestflowJS - Decorator-Driven State Machine for NestJS',
  type: 'image/png',
};

/**
 * Base metadata shared across the entire site.
 * Import and spread this in your root layout or merge with page-specific metadata.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'NestJS state machine',
    'NestJS workflow',
    'state machine TypeScript',
    'workflow engine Node.js',
    'durable execution NestJS',
    'NestJS decorator',
    'state management NestJS',
    'NestflowJS',
    'TypeScript workflow',
    'serverless state machine',
    'NestJS event handler',
    'state transitions NestJS',
    'workflow orchestration',
    'Node.js state machine library',
  ],
  authors: [{ name: 'NestflowJS Contributors' }],
  creator: 'NestflowJS',
  publisher: 'NestflowJS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, OG_IMAGE };
