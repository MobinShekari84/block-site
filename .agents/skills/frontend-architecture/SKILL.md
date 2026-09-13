---
name: frontend-architecture
description: Enforces high-end architectural studio frontend patterns, spatial viewports, modern styling, and clean UI/UX components. Use when creating or refactoring UI components, pages, visual layouts, and transitions.
---

# Frontend Architecture Skill

## Core Principles
- **Aesthetic Direction:** Spatial, clean, minimalist architectural aesthetic with high typographic discipline.
- **Modularity:** Separate visual presentation components (`components/ui/`, `components/portfolio/`) from data fetching or layout shells.
- **State Handling:** Avoid bloated client-side state. Favor server-driven rendering where possible; keep interactive viewports (sliders, zoomable plans, 3D/canvas models) isolated to dedicated client leaf nodes.

## Implementation Guidelines
1. **Asset Rendering:** Always wrap media in responsive wrappers with aspect-ratio preservation to prevent Cumulative Layout Shift (CLS).
2. **Animation & Transition:** Restrict animation to CSS transitions or hardware-accelerated transforms (`transform`, `opacity`). Never block the main thread.
3. **Accessibility:** Maintain semantic document outlines (`<main>`, `<article>`, `<nav>`, `<figure>`, `<figcaption>`).
