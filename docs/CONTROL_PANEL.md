# Control Panel (CMS) Architecture

## 1. Overview
The Control Panel is a streamlined, internal dashboard allowing the Block Architecture Studio team to perform full CRUD operations on projects, categories, and site copy without editing raw JSON files or code.

## 2. Authentication & Session Management
- **Routing Isolation:** All control panel routes live under `/admin` and are protected by Next.js Middleware.
- **Session Handling:** Uses stateless JWTs stored in secure, HTTP-only, `SameSite=Strict` cookies.
- **API Protection:** Every mutation endpoint under `/api/admin/*` verifies the authorization token before proceeding to schema validation or database operations.

## 3. CRUD Workflows

### 3.1 Flow of a Data Mutation (e.g., Creating a Project)
1. **Client Form Submission:** The studio admin submits the project form. Client-side Zod validation provides immediate UI feedback.
2. **API Request:** A `POST` request is sent to `/api/admin/projects`.
3. **Authentication Validation:** The route handler extracts and validates the JWT.
4. **Server Schema Validation:** The request payload is parsed against `ProjectSchema` using `ProjectSchema.safeParse(req.body)`.
   - If invalid, returns `400 Bad Request` with `{ success: false, errors: ... }`.
5. **Data Access Layer (DAL):** The validated payload is passed to the DAL.
   - The DAL reads the current `projects.json`.
   - The new project is appended to the array.
   - The array is written to a `.tmp` file and atomically renamed over `projects.json`.
6. **Revalidation:** The server triggers `revalidatePath('/')` and `revalidatePath('/projects')` to flush the SSG cache for the affected public pages.
7. **Response:** Returns `201 Created` with `{ success: true, data: project }`.

### 3.2 Image & Asset Orchestration
Architectural photography involves large, high-resolution files. The Control Panel handles uploads via the following workflow:
1. **Upload Trigger:** Admin drops an image into the Control Panel uploader.
2. **Pre-processing (Client/Edge):** The image is checked for size and mime-type.
3. **Storage:** The file is streamed to the `/public/assets` directory (or a dedicated object store like S3/R2).
4. **Optimization Pipeline:** 
   - A WebP/AVIF version is generated.
   - A BlurHash (low-quality image placeholder) is computed and saved in the JSON media block.
5. **Metadata Assignment:** The returned asset URL, dimensions, and blurhash are appended to the Project JSON payload.

## 4. UI State Handling
- React Hook Form is integrated with `@hookform/resolvers/zod` for strictly typed form states.
- Optimistic UI updates are utilized for sorting/reordering projects and gallery images to ensure a snappy user experience.
