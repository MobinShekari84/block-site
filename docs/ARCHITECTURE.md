# Block Architecture Studio — System Architecture

This document details the architectural foundation, build pipeline, and runtime execution of the Block Architecture Studio portfolio site.

## 1. High-Level Concept

The platform utilizes a **Custom Static Site Generator (SSG)** built on Node.js (`generator-apps/build_ssg.mjs`). This script parses plain Javascript configuration files (`projects.js`, `siteMeta.js`) and compiles them into heavily optimized, fully static HTML documents for both English (`en/`) and Persian (`/`) locales.

Because the site is 100% statically generated at compile-time:
* **Zero Client-Side Layout Shift (CLS):** Project DOM structures are physically present in the HTML upon load.
* **Instant LCP:** No waiting for Javascript to fetch data or render UI before displaying hero images and layouts.
* **SEO Supremacy:** Crawlers immediately see all textual content, tags, and semantic metadata without needing to execute Javascript.

## 2. Directory Architecture

```text
/
├── index.html                    # Root FA Homepage (Source Template)
├── about-us/index.html           # FA About Us Page
├── projects/                     # Generated FA Project Pages
├── en/                           # Generated EN Locale Mirror
│   ├── index.html
│   ├── about-us/index.html
│   └── projects/
├── css/                          # Core stylesheets
├── js/                           # Runtime Scripts & Data
│   ├── data/
│   │   ├── projects.js           # Single Source of Truth for projects
│   │   ├── aboutData.js          # About Us content payload
│   │   ├── siteMeta.js           # Global navigation & Hero text
│   │   └── assetManifest.js      # AUTO-GENERATED mapping of all imagery
│   ├── script.js                 # Global runtime (Sliders, UI toggles)
│   ├── project-template.js       # Intersection observers & lightboxes for projects
│   └── about.js                  # About Us runtime logic
├── components/
│   └── InteractivePlan/          # Standalone WebGL/Canvas spatial mapping tool
├── generator-apps/               # The Build Pipeline
│   ├── templates/
│   │   └── project.html          # Base HTML skeleton for project generation
│   ├── generate_assets.mjs       # Scrapes /assets and creates assetManifest.js
│   └── build_ssg.mjs             # The SSG Engine. Compiles the entire site.
└── assets/                       # Static media (Images, webp, docs)
```

## 3. The Build Pipeline (`generator-apps/`)

The site is not hand-coded. It is compiled by running two Node.js scripts sequentially.

### A. `generate_assets.mjs`
Instead of manually typing image paths, this script recursively scans the `/assets/villa/...` directories and automatically builds `js/data/assetManifest.js`. It groups images by strict architectural categories (`exteriorDesign`, `interiorDesign`, `landscapeDesign`, `documents`).

### B. `build_ssg.mjs`
This is the core engine of the platform. When executed, it:
1. **Reads Templates:** Reads the source `index.html` and `templates/project.html`.
2. **Generates DOM:** Loops through every project defined in `js/data/projects.js`. It dynamically constructs the complex HTML for Diptych/Triptych galleries, specification grids, and narratives.
3. **Injects HTML:** Injects the generated DOM strictly into the `<main id="project-container">` of the template.
4. **Localization:** It duplicates the process for both Farsi (`lang="fa"`) and English (`lang="en"`). For English pages, it sweeps the HTML and rigorously rewrites all internal `href` attributes (e.g., `href="about-us/"` becomes `href="/en/about-us/"`) to guarantee hermetic locale routing.
5. **Path Resolution:** It calculates the exact nested depth of the destination file (e.g., `en/projects/damas-villa/index.html` is depth 3) and converts absolute paths to relative prefixes (`../../../`). This ensures the site can be hosted on *any* subfolder without 404ing.
6. **File Output:** Writes the final, pristine HTML files to their respective destinations.

## 4. Frontend Runtime Strategy

While the HTML is statically generated, Javascript handles the interactive "leaf nodes" of the experience.

* **Lazy Intersection Observers:** In `js/project-template.js`, an `IntersectionObserver` watches elements with the `.reveal` class. As the user scrolls, it applies `.active` to trigger CSS opacity and translation transitions.
* **Interactive Spatial Plan:** The `InteractivePlan.js` component mounts to `#spatial-container` and binds to the `spatialPlan` object defined in `projects.js`.
* **State Management:** The user's language preference is stored in `localStorage('blockLang')` to ensure a consistent experience.
