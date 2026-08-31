---
name: fullstack-arch-web
description: End-to-end full-stack development for high-end architectural studios, portfolios, and real-time visualization platforms.
---

# Full-Stack Architecture Web Development Workflow

## Purpose
Build robust, high-performance web platforms for architectural studios, incorporating high-res media pipelines, dynamic CMS capabilities, automated SEO schemas, edge deployment, and transactional inquiries.

## Core Stack Standards
* **Framework:** Next.js (App Router, Server Components) or Astro (Content Collections).
* **Styling & UI:** Tailwind CSS, Radix UI / Shadcn UI primitives, CSS Grid blueprints.
* **Database & Storage:** PostgreSQL (Supabase / Neon), Cloudflare R2 / AWS S3 for lossless renders and 3D assets.
* **ORM & Data Layer:** Prisma or Drizzle ORM, Zod for schema validation.
* **SEO & Metadata:** Schema.org (`LocalBusiness`, `ArchitecturalFirm`, `ImageGallery`), dynamic OpenGraph generation, automated `sitemap.xml`, and robots directives.

## Execution Rules & Guidelines

1. **Asset Pipeline & Performance:**
   * Never deliver uncompressed architectural renders. Configure Next.js Image Optimization with WebP/AVIF output.
   * Implement blur hash placeholders (`plaiceholder` or Sharp) for smooth media loading.
   * Use responsive `srcset` tailored for high-DPI displays (Retina/4K architectural presentation).

2. **SEO & Structured Data Engine:**
   * Every project page must inject JSON-LD structured data including project location, completion year, materials, and photographer credits.
   * Generate canonical URLs and clean semantic slugs (`/projects/[category]/[slug]`).

3. **Inquiry & Lead Capture Architecture:**
   * Implement Server Actions or API routes for project consultation requests.
   * Integrate email dispatch via Resend / SendGrid with DKIM-verified custom domains.
   * Add rate-limiting with Upstash Redis on public contact endpoints.

4. **Code Delivery Standard:**
   * Write strict TypeScript with zero `any`.
   * Separate business logic, database queries, and presentational components cleanly.
