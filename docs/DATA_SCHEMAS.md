# Data Schemas & Flat-File Architecture

## 1. Core Principles
- **Single Source of Truth:** All project, taxonomy, and studio data reside in typed `.json` stores in the `/data` directory.
- **Strict Validation:** Every read, write, or mutation must pass through strict schema validation (using Zod) before touching disk or client state.

## 2. Flat-File Operations & Concurrency

To ensure stability during simultaneous edits or server restarts, we strictly enforce **Atomic File Operations**:
1. Data mutations are processed in memory and validated.
2. The payload is written to a temporary file (e.g., `/data/projects.tmp.json`).
3. Upon successful write, the temporary file is atomically renamed/replaced over the target file (`fs.rename`).
4. File locks or read-modify-write queues are implemented in the Data Access Layer (`lib/dal.ts`) to prevent race conditions during concurrent admin edits.

## 3. Entity Schemas (Zod Types)

### 3.1 Project Entity

```typescript
import { z } from 'zod';

export const TranslationSchema = z.object({
  en: z.string(),
  fa: z.string()
});

export const MediaBlockSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['image', 'video', 'plan', '3d_model']),
  url: z.string().url(),
  alt: TranslationSchema,
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  blurHash: z.string().optional()
});

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: TranslationSchema,
  location: TranslationSchema,
  year: z.number().int().min(1990).max(2100),
  categoryId: z.string().uuid(),
  tags: z.array(z.string()),
  specifications: z.record(z.string(), TranslationSchema),
  featured: z.boolean().default(false),
  coverImage: MediaBlockSchema,
  gallery: z.array(MediaBlockSchema),
  floorPlans: z.array(MediaBlockSchema).optional(),
  content: TranslationSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type Project = z.infer<typeof ProjectSchema>;
```

### 3.2 Category Entity

```typescript
export const CategorySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: TranslationSchema,
  description: TranslationSchema.optional(),
  order: z.number().int().default(0)
});

export type Category = z.infer<typeof CategorySchema>;
```

### 3.3 Studio Meta / Settings

```typescript
export const StudioSettingsSchema = z.object({
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    address: TranslationSchema,
  }),
  social: z.object({
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }),
  seo: z.object({
    defaultTitle: TranslationSchema,
    defaultDescription: TranslationSchema,
    ogImage: z.string().url(),
  })
});

export type StudioSettings = z.infer<typeof StudioSettingsSchema>;
```

## 4. Error Handling
- If incoming data fails schema parsing, the Data Access Layer rejects the request with descriptive Zod field errors (`{ success: false, errors: ZodIssue[] }`) before triggering any disk write.
