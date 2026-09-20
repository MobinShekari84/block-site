# Build Scripts Documentation

This document explains the internal mechanisms of the `.mjs` scripts located in `generator-apps/`. These scripts constitute the Static Site Generator (SSG) compiler that turns your raw JavaScript objects and image folders into deployable HTML files.

## 1. `generate_assets.mjs`

### Purpose
To eliminate the tedious, error-prone task of manually typing image paths into `projects.js`. It crawls the `assets/villa/` and `assets/renovation/` directories and outputs a mapping file.

### How It Works
1. **Directory Crawling:** Uses Node.js `fs.readdirSync` to recursively scan through `assets/`.
2. **Project Matching:** It looks for folders that correspond to project IDs (e.g., `Damas-Villa`). It normalizes these folder names to lowercase with hyphens so they match the IDs in `projects.js`.
3. **Categorization:** It sorts discovered images (`.webp`, `.jpg`, `.jpeg`, `.png`) into strict architectural buckets:
   - `exterior-design` -> `exteriorDesign`
   - `interior-design` -> `interiorDesign`
   - `landscape-design` -> `landscapeDesign`
   - `documents` -> `documents`
   - `photos` -> `photos`
4. **Output:** It writes the resulting JSON object directly into `js/data/assetManifest.js` as an ES Module export: `export const assetManifest = { ... };`.

### Usage
Run `node generator-apps/generate_assets.mjs` whenever you add, rename, or delete an image in the `assets/` folder.

---

## 2. `build_ssg.mjs`

### Purpose
This is the core compiler. It takes the empty HTML templates and the raw data from `projects.js` and `siteMeta.js`, generating the final, fully-populated HTML files for every page in both English and Farsi.

### Internal Logic Flow

#### A. DOM Generation (`generateProjectHTML`)
Instead of relying on the browser to execute Javascript and build the DOM, `build_ssg.mjs` contains a function called `generateProjectHTML`. 
- It accepts a project object and a language string (`'en'` or `'fa'`).
- It iterates over `assetManifest.js` to build complex HTML grids (diptychs, triptychs).
- It injects the project's title, narrative, and specifications into semantic HTML wrappers.
- It returns a massive raw HTML string representing the entire `<main>` block of the project page.

#### B. Template String Replacement
The script reads `generator-apps/templates/project.html` into memory as a string. It then uses `.replace()` to inject:
- The generated DOM from step A.
- The "Next Project" teaser data (Title, Cover Image, URL) at the bottom of the page.
- The raw `enTitle` or `faTitle` into the `<title>` tag.

#### C. Localization & Routing (`injectSEO`)
To create the English counterpart of the site, the script runs `injectSEO()`, which:
- Swaps `lang="fa" dir="rtl"` to `lang="en" dir="ltr"`.
- Modifies the Language Toggle button to switch between EN and FA correctly.
- Scans the HTML string for hardcoded links (e.g., `href="about-us/"` or `href="projects/..."`) and forcefully injects the `/en/` prefix to trap the user in the English locale context.

#### D. Relative Path Resolution (`makeRelativePaths`)
Because the final HTML files are deeply nested (e.g., `en/projects/damas-villa/index.html` is 3 folders deep), absolute paths like `src="/assets/..."` will break if the website is hosted in a subfolder instead of a root domain.
- The script calculates the file's depth.
- It calculates a `prefix` (e.g., `../../../`).
- It runs a Regex over the HTML to replace absolute paths pointing to core folders (`assets`, `css`, `js`, `projects`, `about-us`, `en`) with the calculated relative prefix.

#### E. File Writing
Finally, the script writes the processed Farsi HTML string to the root (e.g., `projects/damas-villa/index.html`) and the processed English HTML string to the `en/` folder (e.g., `en/projects/damas-villa/index.html`).

### Usage
Run `node generator-apps/build_ssg.mjs` *after* running `generate_assets.mjs`, or whenever you modify text inside `projects.js` or `siteMeta.js`.
