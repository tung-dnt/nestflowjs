# NestflowJS Documentation - SEO Checklist

## Implemented SEO Features

### Technical SEO

- [x] **robots.txt** - `/public/robots.txt` with crawl directives and sitemap reference
- [x] **sitemap.xml** - `/public/sitemap.xml` with all 18 page URLs, priorities, and lastmod dates
- [x] **Canonical URLs** - `lib/canonical.ts` helper generates consistent canonical URLs for every page
- [x] **Base metadata** - `lib/metadata.ts` exports site-wide OG, Twitter, and robot directives
- [x] **Page metadata helper** - `lib/seo.ts` provides `createPageMetadata()` for per-page metadata
- [x] **SEO descriptions** - `lib/seo-descriptions.ts` has optimized 150-160 character descriptions for all 18 routes
- [x] **Structured data (JSON-LD)** - `components/structured-data.tsx` with Organization, SoftwareApplication, WebSite, BreadcrumbList, and TechArticle schemas

### Metadata Configuration

- [x] Title template: `%s | NestflowJS`
- [x] Default title: `NestflowJS - Decorator-Driven State Machine for NestJS`
- [x] Open Graph type, locale, site name, images
- [x] Twitter card: `summary_large_image`
- [x] Googlebot directives: index, follow, max-image-preview large
- [x] Keywords targeting: NestJS state machine, NestJS workflow, state machine TypeScript, workflow engine Node.js, durable execution NestJS

---

## Integration Steps for the Frontend Engineer

### 1. Root layout (`app/layout.tsx`)

Import and apply the base metadata and global structured data:

```tsx
import { baseMetadata } from "@/lib/metadata";
import { GlobalStructuredData } from "@/components/structured-data";

export const metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GlobalStructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Documentation pages

For each doc page, use `createPageMetadata` from `lib/seo.ts`:

```tsx
import { createPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/structured-data";

export const metadata = createPageMetadata(
  "/docs/concepts/workflow-definition",
  "Workflow Definition",
);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", href: "/docs/introduction" },
          { name: "Concepts", href: "/docs/concepts/workflow-definition" },
          { name: "Workflow Definition", href: "/docs/concepts/workflow-definition" },
        ]}
      />
      <TechArticleJsonLd
        title="Workflow Definition"
        description="Learn how to define workflows with NestflowJS decorators."
        path="/docs/concepts/workflow-definition"
      />
      {/* Page content */}
    </>
  );
}
```

### 3. OG image

Place an Open Graph image at `public/og-image.png` (1200x630 pixels). Recommended content:
- NestflowJS logo
- Tagline: "Decorator-Driven State Machine for NestJS"
- Dark background with brand colors

### 4. Logo

A logo already exists at `public/img/logo.jpeg`. Structured data references this path.

---

## Remaining Manual Steps

### Google Search Console

1. Verify ownership at https://search.google.com/search-console
2. Submit `https://nestflow.organit.dev/sitemap.xml`
3. Request indexing for the homepage
4. Monitor crawl stats and coverage reports
5. Check for mobile usability issues

### Google Analytics / Plausible

1. Add analytics tracking (GA4 or Plausible for privacy-friendly option)
2. Set up conversion events for:
   - GitHub star clicks
   - npm install copy actions
   - Quick start page completion

### Bing Webmaster Tools

1. Verify at https://www.bing.com/webmasters
2. Submit sitemap
3. Monitor indexing

---

## Content Optimization Tips by Page

### Homepage (`/`)
- H1 should contain "NestJS state machine" or "state machine for NestJS"
- Include a code snippet showing a minimal workflow definition
- Add social proof: GitHub stars, npm downloads
- Link to Quick Start prominently

### Introduction (`/docs/introduction`)
- H1: "Introduction to NestflowJS"
- Cover the problem (workflow orchestration in NestJS is complex)
- Position NestflowJS as the solution with decorator-driven approach
- Include comparison table vs. alternatives (XState, machina.js, etc.)

### Quick Start (`/docs/quick-start`)
- H1: "Quick Start Guide"
- Step-by-step with numbered headings (H2s)
- Include `npm install` and `bun install` commands
- Time estimate ("Get running in under 5 minutes")

### Concept Pages (`/docs/concepts/*`)
- Each page should focus on one concept
- Use diagrams where possible (state diagrams, flowcharts)
- Link between concept pages for internal linking
- Include practical code examples

### Recipe Pages (`/docs/recipes/*`)
- Problem-solution format
- "When to use this pattern" section
- Complete working code examples
- Link to relevant API reference pages

### Example Pages (`/docs/examples/*`)
- Full working project structure
- Step-by-step walkthrough
- Expected output / behavior description
- Link to GitHub repo with complete example code

### API Reference Pages (`/docs/api-reference/*`)
- Use consistent format: signature, parameters, return type, example
- Mark required vs. optional parameters
- Include TypeScript type definitions
- Cross-link between related APIs

---

## Link Building Suggestions

### Internal Linking Strategy
- Every concept page should link to at least one recipe and one example
- Every example should link back to the concepts it demonstrates
- API reference pages should link to concepts that use them
- Quick Start should link to all concept pages as "next steps"

### External Link Building
1. **npm package page** - Ensure README links to docs site
2. **GitHub README** - Link to all major doc sections
3. **Dev.to / Hashnode articles** - Write tutorials linking to docs
4. **NestJS community** - Share in NestJS Discord, Reddit r/nestjs
5. **Awesome NestJS list** - Submit for inclusion
6. **StackOverflow** - Answer NestJS workflow questions with links to docs
7. **Compare pages** - Create "NestflowJS vs XState" or "NestflowJS vs custom state machine" content

---

## Performance Optimization Notes

### Core Web Vitals
- Static export ensures fast LCP (no server rendering delay)
- Minimize JavaScript bundle size; Fumadocs is already optimized
- Use `next/image` for any images with proper `width`/`height` attributes
- Preload critical fonts with `<link rel="preload">`

### Caching
- Static export outputs HTML files; configure CDN caching headers:
  - HTML: `Cache-Control: public, max-age=3600, s-maxage=86400`
  - Assets (`_next/static`): `Cache-Control: public, max-age=31536000, immutable`
  - Images: `Cache-Control: public, max-age=604800`

### Accessibility (also impacts SEO)
- Ensure all images have `alt` attributes
- Maintain proper heading hierarchy (H1 > H2 > H3, no skipping)
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<aside>`)
- Ensure sufficient color contrast (WCAG AA minimum)
- All links should have descriptive text (avoid "click here")

---

## Keyword Targets by Page

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| `/` | NestJS state machine | workflow engine Node.js, TypeScript state machine |
| `/docs/introduction` | NestflowJS introduction | NestJS workflow library, decorator state machine |
| `/docs/quick-start` | NestflowJS quick start | install NestJS state machine, getting started |
| `/docs/concepts/workflow-definition` | NestJS workflow definition | define state machine TypeScript |
| `/docs/concepts/states-and-transitions` | NestJS state transitions | state machine transitions TypeScript |
| `/docs/concepts/events-and-handlers` | NestJS event handlers | state machine events TypeScript |
| `/docs/concepts/entity-service` | NestJS entity service | workflow persistence NestJS |
| `/docs/plugins/durable-lambda` | durable execution NestJS | serverless state machine AWS Lambda |
| `/docs/recipes/retry-and-error-handling` | NestJS retry pattern | error handling state machine |
| `/docs/recipes/human-in-the-loop` | human in the loop workflow | approval workflow NestJS |
| `/docs/recipes/custom-adapter` | NestJS custom adapter | state machine adapter pattern |
| `/docs/examples/lambda-order-state-machine` | order state machine Lambda | serverless order workflow |
| `/docs/examples/payment-with-retry` | payment retry workflow | payment state machine NestJS |
| `/docs/api-reference/*` | NestflowJS API reference | NestflowJS decorators, services, interfaces |

---

## Monitoring Checklist (Monthly)

- [ ] Check Google Search Console for indexing issues
- [ ] Review search performance (impressions, clicks, CTR, position)
- [ ] Validate structured data with Google Rich Results Test
- [ ] Run Lighthouse SEO audit (target 100 score)
- [ ] Check for broken links with a crawler
- [ ] Review Core Web Vitals in PageSpeed Insights
- [ ] Update sitemap `lastmod` dates when content changes
- [ ] Review and update meta descriptions based on CTR data
