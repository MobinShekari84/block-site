# Codebase Section Map
This document maps the major visual sections of the website to their exact files and logic chains, helping you navigate the codebase quickly.

## 1. Homepage (`index.html`)
The homepage acts as the global template.

* **Navbar:**
  * **HTML Structure:** `index.html`
  * **CSS (Navbar design):** `css/styles.css`
  * **Javascript (Toggle Logic):** `js/script.js`
* **Mega-Menu Overlay (Projects List):**
  * **HTML Structure:** `index.html`
  * **CSS (Mega-Menu design):** `css/styles.css`
* **Hero Slideshow (The big rotating images):**
  * **HTML Structure:** `index.html`
  * **CSS (Layout & Animations):** `css/styles.css`
* **Projects Grid (The cards below the slideshow):**
  * **HTML Structure:** `index.html`
  * **CSS (Card design):** `css/styles.css`
* **Footer:**
  * **HTML Structure:** `index.html`
  * **CSS:** `css/styles.css`

---

## 2. About Us Page (`about-us/index.html`)
This page is generated dynamically by Javascript on the client. The `about-us/index.html` file acts as an empty container.

* **Raw Data (The actual text you read):** `js/data/aboutData.js`
* **Javascript (HTML builder):** `js/about.js`
* **CSS:** `css/about.css`

---

## 3. Project Detail Pages (e.g., `projects/damas-villa/index.html`)
Unlike the About page, project pages are **100% Statically Generated** by the build script. The raw HTML file contains the full DOM.

* **Raw Data (Text, specs):** `js/data/projects.js`
* **Image Arrays:** `js/data/assetManifest.js`
* **HTML Generator Logic:** `generator-apps/build_ssg.mjs` (Inside the `generateProjectHTML` function)
* **Base Template:** `generator-apps/templates/project.html`
* **CSS:** `css/project-template.css`
* **Javascript (Intersection Observers & Lightbox Only):** `js/project-template.js`

### Project Sections Map:
* **Project Hero (The massive cover photo & title):**
  * Built by `build_ssg.mjs`
  * Styled by `css/project-template.css` -> `/* Hero Parallax */`
* **Metadata Bar (Location, Year, Typology):**
  * Built by `build_ssg.mjs`
  * Styled by `css/project-template.css` -> `/* Metadata Bar */`
* **Visual Archive (The image galleries):**
  * Arrays sourced from `assetManifest.js`
  * Built into HTML Diptychs and Triptychs by `build_ssg.mjs`
  * Styled by `css/project-template.css` -> `/* Dynamic Gallery Rhythms */`
* **Interactive Floor Plan (The Blueprint Viewer):**
  * Triggered via HTML injected by `build_ssg.mjs` (`<div id="spatial-container"></div>`)
  * Logic handled purely by `components/InteractivePlan/InteractivePlan.js`
  * Styled by `components/InteractivePlan/InteractivePlan.css`

---

## 4. Typography Global Overrides
If you need to change fonts, weights, or spacing globally, edit the bottom sections of `css/styles.css`:

* **Farsi (Yekan Bakh) Overrides:** `css/styles.css`
* **English (Helvetica) Display Typography:** `css/styles.css`
* **English (Helvetica) Body Typography:** `css/styles.css`
