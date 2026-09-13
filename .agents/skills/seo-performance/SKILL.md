---
name: seo-performance
description: Handles search engine optimization, JSON-LD structured data, metadata generation, dynamic sitemaps, and Core Web Vitals optimization. Use when optimizing performance, setting up metadata, or auditing SEO.
---

# SEO & Web Vitals Skill

## Core Principles
- **Sub-Second LCP:** Preload critical project hero images and defer off-screen imagery.
- **Semantic Meta:** Every project page must dynamically resolve its title, description, canonical link, and OpenGraph/Twitter card tags.

## Architecture Guidelines
1. **JSON-LD Structured Data:**
   - Global: Inject `ArchitectureStudio` or `LocalBusiness` schema on the homepage.
   - Project Pages: Inject `VisualArtwork` or `CreativeWork` schemas with artist credits, completion year, and high-res image arrays.
   - Breadcrumbs: Provide `BreadcrumbList` for all nested views.
2. **Media Optimization:**
   - Enforce WebP/AVIF delivery.
   - Supply responsive `sizes` attributes for studio gallery grids.
   - Provide low-quality image placeholders (LQIP / blur hashes) during loading.
