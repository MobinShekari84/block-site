# Javascript Data Structure

This document establishes the uniform schema pattern for all data definitions residing in `/js/data`. By centralizing and standardizing this data, we strictly separate content from UI logic.

## Directory Tree

```text
/js/
├── data/
│   ├── index.js         # Central hub exporting all data
│   ├── projects.js      # Array of all project entities
│   └── siteMeta.js      # Global UI strings and translations
├── script.js            # Main UI & interactions (imports data)
├── project-template.js  # Project page UI logic (imports data)
└── spatial.js           # Spatial viewer logic (imports data)
```

## Schemas

### 1. `siteMeta.js` Schema

Exports a `siteMeta` object keyed by language code (`en`, `fa`). Each language object contains identical keys to prevent UI breakdown during locale switching.

```typescript
type TranslationDict = {
  nav: {
    home: string;
    projects: string;
    about: string;
  };
  hero: {
    slides: Array<{ title: string; subtitle: string }>;
    btn: string;
  };
  spatial: {
    label: string;
    title: string;
  };
  projects: {
    label: string;
    title: string;
    viewAll: string;
  };
  footer: {
    desc: string;
    nav: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    copyright: string;
    credit: string;
  };
};

// Shape of siteMeta
type SiteMeta = {
  en: TranslationDict;
  fa: TranslationDict;
};
```

### 2. `projects.js` Schema

Exports a `projects` array containing uniform project objects. Every project must contain the exact keys listed below. Fallbacks (e.g., `null` or `[]`) must be used for unused properties rather than omitting them entirely.

```typescript
type BilingualString = {
  en: string | null;
  fa: string | null;
};

type ProjectItem = {
  id: string;               // Unique string identifier
  slug: string;             // URL-friendly string
  title: BilingualString;
  category: string;
  year: number;
  location: BilingualString;
  description: BilingualString;
  coverImage: string | null; // Path to thumbnail/cover
  galleryImages: string[];   // Array of image paths
  specs: {
    area: string | null;
    client: string | null;
    status: string | null;
  };
  isFeatured: boolean;       // Determines display on homepage
  heroTheme: 'light' | 'dark' | null; 
  
  // Optional Spatial Plan Config
  spatialPlan: {
    planImageUrl: string;
    aspectRatio: string;     // e.g. "1755 / 2482"
    hotspots: Array<{
      id: number;
      x: number;
      y: number;
      rot: number;
      title: BilingualString;
      zone: BilingualString;
      renderUrl: string;
    }>;
  } | null;
};
```

## Rules for New Additions
1. **Never omit keys**: If a project doesn't have a `spatialPlan`, set it to `null`.
2. **Never mix cases**: Stick to `camelCase` for all object keys.
3. **Use the index export**: Import data from `/js/data/index.js` into your vanilla scripts using ES Modules (`import { projects } from './data/index.js';`).
