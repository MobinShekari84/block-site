# Codebase Section Map
This document maps the major visual sections of the website to their exact file and line numbers, helping you navigate the codebase quickly.

> **Note:** Line numbers are approximate and may shift slightly as you add or remove code.

## 1. Homepage (`index.html`)
The homepage is mostly static HTML, styled by the global `styles.css`.

* **Navbar:**
  * **HTML Structure:** `index.html` (Lines 52–87)
  * **CSS (Navbar design):** `css/styles.css` (Line 273: `# NAVBAR`)
  * **Javascript (Toggle Logic):** `js/script.js`
* **Mega-Menu Overlay (Projects List):**
  * **HTML Structure:** `index.html` (Lines 52–87)
  * **CSS (Mega-Menu design):** `css/styles.css` (Line 1336: `# Mega Menu / Projects Overlay`)
* **Hero Slideshow (The big rotating images):**
  * **HTML Structure:** `index.html` (Lines 89–137)
  * **CSS (Layout & Animations):** `css/styles.css` (Line 500: `# HERO / SLIDESHOW`)
* **Projects Grid (The cards below the slideshow):**
  * **HTML Structure:** `index.html` (Lines 139–152)
  * **CSS (Card design):** `css/styles.css` (Line 701: `# PROJECTS SECTION`)
* **Footer:**
  * **HTML Structure:** `index.html` (Lines 154–207)
  * **CSS:** `css/styles.css` (Line 860: `# FOOTER`)

---

## 2. About Us Page (`about.html` -> Headless)
This page is generated dynamically by Javascript. The `about.html` file acts as an empty container.

* **Raw Data (The actual text you read):** `js/data/aboutData.js` (Lines 1-96)
* **Hero Section (The Gradient & Manifesto):**
  * **Javascript (HTML builder):** `js/about.js` (Line 10: `// --- 1. Hero Section ---`)
  * **CSS (Gradient, Layout, Fonts):** `css/about.css` (Line 17: `/* --- Hero & Manifesto --- */`)
* **Studio Narrative (The text paragraphs):**
  * **Javascript (HTML builder):** `js/about.js` (Line 20: `// --- 2. Studio Narrative ---`)
  * **CSS:** `css/about.css` (Line 71: `/* --- Narrative Section --- */`)
* **Team Roster (The grid of portraits):**
  * **Javascript (HTML builder):** `js/about.js` (Line 50: `// --- 3. Team ---`)
  * **CSS:** `css/about.css` (Line 96: `/* --- Team Collective --- */`)
* **Spatial Gallery (The grid of studio photos):**
  * **Javascript (HTML builder):** `js/about.js` (Line 83: `// --- 4. Gallery ---`)
  * **CSS:** `css/about.css` (Line 211: `/* --- Strict 3-Column Gallery --- */`)
* **Philosophy / Practice:**
  * **Javascript (HTML builder):** `js/about.js` (Line 108: `// --- 5. Philosophy ---`)
  * **CSS:** `css/about.css` (Line 262: `/* --- Philosophy --- */`)
* **Contact Module:**
  * **Javascript (HTML builder):** `js/about.js` (Line 134: `// --- 6. Contact ---`)
  * **CSS:** `css/about.css` (Line 300: `/* --- Contact Module --- */`)

---

## 3. Project Detail Pages (e.g., `damas-villa.html` -> Headless)
Just like the About page, the HTML file is an empty container. The `js/project-template.js` engine reads the data from `projects.js` and builds the page on the fly.

* **Raw Data (Text, image paths, specs):** `js/data/projects.js`
* **Project Hero (The massive cover photo & title):**
  * **Javascript (HTML builder):** `js/project-template.js` (Lines 108–114)
  * **CSS:** `css/project-template.css` (Line 275: `/* Hero Parallax */`)
* **Metadata Bar (Location, Year, Typology):**
  * **Javascript (HTML builder):** `js/project-template.js` (Lines 88–104)
  * **CSS:** `css/project-template.css` (Line 311: `/* Metadata Bar */`)
* **Narrative Section (Description):**
  * **Javascript (HTML builder):** `js/project-template.js` (Lines 118–129)
  * **CSS:** `css/project-template.css` (Line 357: `/* Editorial Brief */`)
* **Visual Archive (The image galleries):**
  * **Javascript (HTML builder):** `js/project-template.js` (Lines 132–143)
  * **CSS:** `css/project-template.css` (Line 373: `/* Dynamic Gallery Rhythms */`)
* **Specs Drawer:**
  * **CSS:** `css/project-template.css` (Line 410: `/* Specs Drawer */`)
* **Next Project Teaser:**
  * **CSS:** `css/project-template.css` (Line 467: `/* Next Project Teaser */`)
* **Interactive Floor Plan (The Blueprint Lightbox):**
  * **Javascript (HTML & Logic):** `components/InteractivePlan/InteractivePlan.js`
  * **CSS:** `components/InteractivePlan/InteractivePlan.css`

---

## 4. Typography Global Overrides
If you need to change fonts, weights, or spacing globally, edit the bottom sections of `css/styles.css`:

* **Farsi (Yekan Bakh) Overrides:** `css/styles.css` (Lines 1126-1256)
* **English (Helvetica) Display Typography:** `css/styles.css` (Line 1257: `# ENGLISH (LTR) HELVETICA DISPLAY TYPOGRAPHY`)
* **English (Helvetica) Body Typography:** `css/styles.css` (Line 1293: `# ENGLISH (LTR) ULTRA-MINIMAL BODY TYPOGRAPHY`)
