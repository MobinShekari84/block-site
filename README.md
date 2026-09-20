# Block Architecture Studio

## Project Architecture & Assets

### Image Guidelines
**CRITICAL: Always use a DIFFERENT image for the Hero Cover (`coverImage`) and the first image in the Project Narrative section (`galleryImages[0]`)!**

The website design dictates that the `coverImage` is shown in the fullscreen Hero section when a user first opens a project page. The first image of the `galleryImages` array is shown immediately below it in the "Project Narrative" section. If you put the same image in both places, the user will see a jarring duplicate image as they scroll down.

**Correct Example (`js/data/projects.js`):**
```javascript
  coverImage: '/assets/my-project/cover.webp',
  galleryImages: [
    '/assets/my-project/1.webp',
    '/assets/my-project/2.webp'
  ]
```

### Static Site Generator (SSG)
Whenever `js/data/projects.js` or `js/data/siteMeta.js` is modified, you MUST run:
`node generator-apps/build_ssg.mjs`

This script parses the Javascript databases and injects the raw Farsi HTML into the root directory, and the raw English HTML into the `/en/` subdirectory to ensure flawless Googlebot SEO indexing.
