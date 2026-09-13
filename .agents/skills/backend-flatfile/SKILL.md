---
name: backend-flatfile
description: Manages JSON-based data stores, atomic file I/O operations, schema validation, and control panel CRUD endpoints. Use when reading, writing, validating, or modifying JSON data or admin API routes.
---

# Backend & Flat-File Data Skill

## Core Principles
- **Single Source of Truth:** All project, taxonomy, and studio data reside in typed `.json` stores in `/data` (e.g., `data/projects.json`).
- **Strict Validation:** Every read, write, or mutation must pass through strict schema validation (e.g., Zod) before touching disk or client state.

## Safety & Concurrency Rules
1. **Atomic Writes:** Never write directly to the target file with unbuffered writes. Always write to a temporary file (`.tmp`) and atomically rename/replace (`fs.rename`) to prevent data corruption during crashes or simultaneous edits.
2. **Validation First:** If incoming data fails schema parsing, reject the request with descriptive field errors before triggering any file write.
3. **Control Panel Endpoints:**
   - Enforce authentication/session validation on all mutation handlers (`/api/admin/*`).
   - Standardize responses: `{ success: true, data: ... }` or `{ success: false, errors: ... }`.
