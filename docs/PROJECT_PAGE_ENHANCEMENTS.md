# Project Page Interactive Enhancements

This document details 5 high-impact architectural features designed to elevate the digital showcase of Block Architecture Studio. These upgrades focus on immersive storytelling, technical rigor, and tactile user experience.

## 1. CAD / Blueprint Overlay Mode (X-Ray View)
**Concept & Architectural UX Impact:**
Allows users to hit a toggle switch while viewing a final photographic render to fade in the underlying CAD wireframe or construction blueprint perfectly superimposed over the image. This emphasizes the studio's technical precision and bridges the gap between design and reality.

**Schema Extension (`projects.js`):**
```typescript
galleryImages: Array<{
  url: string;
  blueprintOverlayUrl?: string | null; // Matching structural drawing
}>
```

**Frontend Implementation Notes:**
- **Zero-CLS:** Both the render and the SVG/blueprint must be absolutely positioned within a wrapper utilizing the exact aspect ratio (e.g., `aspect-ratio: 16/9`).
- **Performance:** Preload the blueprint overlay when the user hovers over the image to prevent a flash of unloaded content during the transition.
- **Accessibility:** Ensure the toggle button has `aria-pressed` states and clear semantic labels.

## 2. Interactive Daylight & Solar Study Viewer
**Concept & Architectural UX Impact:**
Provide a scrubber slider simulating the sun's path across the sky from morning to dusk. This allows visitors to see how natural light interacts with the exterior massing or interior atrium spaces throughout the day.

**Schema Extension (`projects.js`):**
```typescript
solarStudy: {
  enabled: boolean;
  frames: string[]; // Array of renders from 8AM to 6PM
} | null;
```

**Frontend Implementation Notes:**
- **Performance:** Use a highly compressed image sequence or a sprite sheet. Preload all frames on idle to ensure scrubbing the timeline feels instantaneous without buffering lag.
- **Implementation:** Bind an `<input type="range">` slider to a JavaScript requestAnimationFrame loop that updates the `opacity` of stacked images or a `<canvas>` context for 60fps smoothness.

## 3. Before & After Renovation Slider
**Concept & Architectural UX Impact:**
For adaptive reuse or renovation projects, include a tactile swipe slider comparing the dilapidated "Before" state with the pristine "After" state.

**Schema Extension (`projects.js`):**
```typescript
renovationComparison: {
  beforeImage: string;
  afterImage: string;
  labelBefore: BilingualString;
  labelAfter: BilingualString;
} | null;
```

**Frontend Implementation Notes:**
- **Zero-CLS:** Wrap both images in a container with a fixed aspect ratio.
- **Interactivity:** Utilize a CSS `clip-path: inset(...)` updated via JS pointer events (mouse/touch) for hardware-accelerated rendering.

## 4. Immersive Ambient Acoustic Landscape
**Concept & Architectural UX Impact:**
Architecture is multisensory. When a user enters a project page, gently fade in an ambient soundscape recorded on-site (e.g., wind through the Alborz mountains, subtle city hum for a Tehran commercial complex).

**Schema Extension (`projects.js`):**
```typescript
ambientAudio: {
  trackUrl: string;
  volume: number; // Configurable default volume (e.g., 0.2)
} | null;
```

**Frontend Implementation Notes:**
- **UX Rules:** Never autoplay sound unmuted. Start muted by default, and offer a clear, elegant floating toggle to "Enable Soundscape".
- **Performance:** Use compressed `.m4a` or `.ogg` assets and only begin downloading/buffering them once the page's Core Web Vitals (LCP) have settled.

## 5. Material & Tactile Swatches Breakdown
**Concept & Architectural UX Impact:**
Beyond text descriptions of materials, provide an interactive grid of high-res macro photography showing the textures used in the project (e.g., exposed concrete, brushed steel, travertine). Clicking a swatch highlights where it was used in the gallery.

**Schema Extension (`projects.js`):**
```typescript
materialSwatches: Array<{
  name: BilingualString;
  textureUrl: string; // Macro texture shot
}> | null;
```

**Frontend Implementation Notes:**
- Render as a horizontal, scroll-snapped row (CSS `scroll-snap-type: x mandatory`).
- Use `loading="lazy"` on textures to prioritize above-the-fold content.
