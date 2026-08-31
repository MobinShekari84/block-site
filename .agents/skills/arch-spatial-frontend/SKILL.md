---
name: hitech-spatial-frontend
description: Creative frontend engineering for futuristic, interactive architectural interfaces, 3D floor plans, spatial viewports, and high-tech HUD systems.
---

# High-Tech Spatial Architecture Frontend Workflow

## Purpose
Design and implement futuristic, interactive architectural web interfaces featuring interactive blueprints, 3D camera hotspots, perspective switching, Gaussian splatting/Three.js viewports, and brutalist/minimalist HUDs.

## Tech Stack Standards
* **3D & Canvas:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), Lucide React.
* **Animation Engine:** Framer Motion (layout transitions, spring physics, HUD telemetry).
* **Theme & Atmosphere:** Brutalist minimalism, dark mode by default (`#0a0a0a` to `#121212`), high-contrast typographic hierarchy, micro-grid backdrops, glassmorphism borders (`backdrop-blur`).

## Design & UI Rules

1. **Aesthetic Blueprint:**
   * Palette: Monochromatic carbon, brushed aluminum accents, architectural neon indicators (subtle cyan, amber, or laser green for active cameras/hotspots).
   * Typography: Pairing precision monospace telemetry (e.g., `Geist Mono`, `JetBrains Mono`) for metadata/measurements with refined sans-serif (e.g., `Inter`, `Geist Sans`, `PP Neue Montreal`) for editorial narrative.

2. **Interactive Plan & Hotspot Implementation:**
   * Render SVG or WebGL architectural floor plans with interactive coordinates.
   * Hotspots must feature directional viewing cones, hover states, and smooth click handlers that shift the camera viewport.
   * Include before/after split sliders for comparing wireframe/render or daylight/night studies.

3. **Motion & Interaction Hierarchy:**
   * Keep 3D render loops optimized (use `demand` frameloop in R3F where static scenes allow).
   * Ensure layout transitions between 2D floor plans and 3D viewports complete within 400ms using ease-out spring animations.
   * Add tactile audio-visual micro-interactions (subtle hover scale, coordinate tickers, live FOV calculations).

4. **Deliverable Expectation:**
   * Output complete, self-contained, working React components with mock spatial datasets ready for immediate preview.
