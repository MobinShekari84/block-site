# Block Architecture Studio

Welcome to the Block Architecture Studio platform repository.

This project is a hybrid statically-generated website built purely on Node.js, HTML, CSS, and Vanilla Javascript. There is no React, Vue, or complex build bundler (like Webpack or Vite), keeping the site incredibly fast and completely transparent.

## Workflow Instructions

If you add a new project, upload new photos, or change any text, you must follow this 2-step workflow:

### Step 1: Add your Assets & Update Data
1. Put your new `.webp` or `.jpg` images into the correct folders inside `/assets/villa/...`.
2. Open `/js/data/projects.js` and add/edit your project configuration (title, specs, cover image).
3. Ensure the `id` of your project in `projects.js` matches the folder name you intend to use.

### Step 2: Compile the Site
Because this site uses a Custom Static Site Generator to guarantee perfect SEO and instant loading speeds, your changes will not reflect in the HTML until you compile them.

Run the following commands in your terminal (at the root of the project):

```bash
# 1. First, tell the system to scan your folders and build the asset manifest
node generator-apps/generate_assets.mjs

# 2. Then, command the generator to build all HTML files for FA and EN locales
node generator-apps/build_ssg.mjs
```

Once `SSG Build Complete!` prints in your terminal, the site is fully updated and ready for deployment.

## Documentation

For deep technical details on how the system works, refer to the files in the `/docs/` folder:

*   **[Architecture (docs/ARCHITECTURE.md)](docs/ARCHITECTURE.md):** Detailed breakdown of the SSG build process, routing, and directory structure.
*   **[Data Structure (docs/DATA_STRUCTURE.md)](docs/DATA_STRUCTURE.md):** The strict Javascript object schemas used in `/js/data`. Read this if you are adding new projects.
*   **[Project Page Enhancements (docs/PROJECT_PAGE_ENHANCEMENTS.md)](docs/PROJECT_PAGE_ENHANCEMENTS.md):** Details on the Interactive Spatial Plan (WebGL/Canvas viewports).
