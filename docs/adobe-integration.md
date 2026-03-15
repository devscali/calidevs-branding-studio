# Adobe Creative Suite Integration — Status & Roadmap

## What's Built (Local Processing)

Everything below works **without** Adobe API credentials. Files are parsed locally on the server.

### PSD (Photoshop)
| Feature | Status | File |
|---------|--------|------|
| Parse layers (text, image, shape, group) | Done | `src/lib/parsers/psd-parser.ts` |
| Extract composite image as PNG | Done | `src/lib/parsers/psd-parser.ts` |
| Generate thumbnail (400px) | Done | `src/lib/parsers/psd-parser.ts` |
| Upload to Vercel Blob | Done | `src/app/api/assets/upload/route.ts` |
| Convert PSD → editable template | Done | `src/lib/parsers/template-generator.ts` |
| Import wizard (upload → layers → configure) | Done | `src/components/studio/import-wizard.tsx` |

### AI (Illustrator)
| Feature | Status | File |
|---------|--------|------|
| Rasterize first page via Sharp (PDF-based) | Done | `src/lib/parsers/ai-parser.ts` |
| Generate thumbnail | Done | `src/lib/parsers/ai-parser.ts` |
| Upload to Vercel Blob | Done | `src/app/api/assets/upload/route.ts` |
| SVG import (recommended Illustrator export) | Done | native via Sharp |

### InDesign
| Feature | Status | File |
|---------|--------|------|
| Extract embedded JPEG preview from .indd | Done | `src/lib/parsers/indd-parser.ts` |
| IDML file detection (ZIP/XML) | Done | `src/lib/parsers/idml-parser.ts` |
| Upload + thumbnail generation | Done | `src/app/api/assets/upload/route.ts` |
| Full IDML XML parsing (text extraction) | Placeholder | needs JSZip |

### After Effects
| Feature | Status | File |
|---------|--------|------|
| AEP project info extraction | Done | `src/lib/parsers/aep-parser.ts` |
| Lottie JSON import (Bodymovin export) | Done | `src/lib/parsers/aep-parser.ts` |
| Upload + thumbnail generation | Done | `src/app/api/assets/upload/route.ts` |
| Video rendering (Remotion) | Not started | Phase 2 roadmap |

### Asset Library
| Feature | Status | File |
|---------|--------|------|
| Upload dropzone (multi-format) | Done | `src/app/assets/page.tsx` |
| Grid view with thumbnails | Done | `src/app/assets/page.tsx` |
| Filter by format (PSD/AI/InDesign/PNG/etc) | Done | `src/app/assets/page.tsx` |
| Search by filename | Done | `src/app/api/assets/route.ts` |
| Sort (newest/oldest/name) | Done | `src/app/api/assets/route.ts` |
| Copy URL, Download, Delete | Done | `src/app/assets/page.tsx` |
| Asset picker modal (for template editor) | Done | `src/components/studio/asset-picker-modal.tsx` |
| Tags (CRUD) | Done | `src/app/api/assets/[id]/route.ts` |

### Templates
| Feature | Status | File |
|---------|--------|------|
| Image field type in templates | Done | `src/lib/templates/types.ts` |
| Quote + Background (image demo) | Done | `src/lib/templates/social/quote-bg.tsx` |
| 3 Presentation templates | Done | `src/lib/templates/presentation/` |
| 2 Motion templates | Done | `src/lib/templates/motion/` |
| Dynamic template renderer (JSON layers) | Done | `src/lib/templates/dynamic-renderer.tsx` |
| Multi-page PDF export | Done | `src/app/api/export/pdf/route.ts` |

---

## What's Needed: Adobe Creative Cloud API

Adobe CC APIs require credentials from the **Adobe Developer Console**.

### Step 1: Get Adobe Developer Credentials

1. Go to [Adobe Developer Console](https://developer.adobe.com/console)
2. Create a new project
3. Add APIs:
   - **Photoshop API** (image manipulation, smart objects, layer editing)
   - **Lightroom API** (auto-tone, presets, image adjustments)
   - **Firefly API** (AI image generation — optional)
4. Generate credentials:
   - `ADOBE_CLIENT_ID` (API Key)
   - `ADOBE_CLIENT_SECRET`
   - `ADOBE_TECHNICAL_ACCOUNT_ID`
   - `ADOBE_ORG_ID`
   - `ADOBE_PRIVATE_KEY` (for JWT auth)

### Step 2: Add to Environment

```bash
# .env.local
ADOBE_CLIENT_ID=your_client_id
ADOBE_CLIENT_SECRET=your_client_secret
ADOBE_ORG_ID=your_org_id
```

### Step 3: What Adobe APIs Unlock

#### Photoshop API (Most Valuable)
- **Smart Object replacement** — swap layers in PSD templates server-side
- **Text layer editing** — change text in PSD without full re-render
- **Action playback** — run Photoshop Actions on uploaded files
- **Image cutout** — remove backgrounds automatically
- **Depth blur** — professional depth-of-field effects
- **Auto-tone/color** — auto-correct uploaded photos

```
POST https://image.adobe.io/pie/psdService/documentOperations
```

#### Lightroom API
- **Auto-tone** — one-click photo enhancement
- **Presets** — apply Lightroom presets to uploaded images
- **Image adjustments** — exposure, contrast, saturation

```
POST https://image.adobe.io/lrService/autoTone
```

#### Firefly API (AI Generation)
- **Text-to-image** — generate brand visuals from prompts
- **Generative fill** — extend/modify images with AI
- **Style transfer** — apply brand styles to photos

```
POST https://firefly-api.adobe.io/v3/images/generate
```

---

## Implementation Plan: Adobe API Integration

### Phase A: Auth Module
**Create:** `src/lib/adobe/auth.ts`
```typescript
// JWT authentication with Adobe IMS
// Token exchange: JWT → access_token
// Token caching + refresh
```

### Phase B: Photoshop API Client
**Create:** `src/lib/adobe/photoshop.ts`
```typescript
// Smart Object replacement
// Text layer editing
// PSD rendering (server-side)
// Background removal
```

### Phase C: API Routes
**Create:** `src/app/api/adobe/edit/route.ts`
```typescript
// POST: Upload image → Apply Photoshop operation → Return result
// Operations: remove-bg, auto-tone, smart-replace, text-edit
```

### Phase D: UI Integration
**Modify:** `src/components/studio/image-field.tsx`
```typescript
// Add "Edit with Photoshop" button
// Add "Remove Background" quick action
// Add "Auto-Enhance" quick action
```

### Phase E: Lightroom Presets
**Create:** `src/app/api/adobe/presets/route.ts`
```typescript
// Apply Lightroom presets to uploaded photos
// Brand-specific presets (warm tones, high contrast, etc.)
```

---

## Architecture

```
Current (Local Processing):
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Upload   │ →   │  Parser  │ →   │  Vercel  │
│  (File)   │     │  (ag-psd │     │  Blob    │
│           │     │   sharp) │     │  Storage │
└──────────┘     └──────────┘     └──────────┘

Future (Adobe API):
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Upload   │ →   │  Adobe   │ →   │  Process │ →   │  Vercel  │
│  (File)   │     │  Cloud   │     │  Result  │     │  Blob    │
│           │     │  Storage │     │  (API)   │     │  Storage │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

Adobe APIs require files in Adobe Cloud Storage (S3-compatible presigned URLs).
Flow: Upload to Vercel Blob → Pass URL to Adobe API → Get result → Store in Blob.

---

## Database Tables (Already Created)

### `assets`
Stores all uploaded files (PSD, AI, PNG, etc.) with metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| filename | text | Storage filename |
| originalFilename | text | User's original filename |
| mimeType | text | MIME type |
| fileSize | integer | Size in bytes |
| blobUrl | text | Vercel Blob URL |
| thumbnailUrl | text | Thumbnail Blob URL |
| width | integer | Image width |
| height | integer | Image height |
| sourceFormat | text | psd/ai/indd/aep/png/svg/jpeg/lottie/idml |
| layerCount | integer | Number of layers (PSD) |
| metadata | jsonb | Layer info, project data, etc. |
| tags | text[] | User-defined tags |
| createdAt | timestamp | Upload date |

### `generated_templates`
Stores templates created from PSD imports.

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| name | text | Template name |
| sourceAssetId | integer | FK → assets.id |
| config | jsonb | TemplateConfig (fields, metadata) |
| layers | jsonb | GeneratedLayer[] (positions, styles) |
| canvasWidth | integer | Original PSD width |
| canvasHeight | integer | Original PSD height |
| category | text | Always 'custom' |
| createdAt | timestamp | Creation date |

---

## File Structure

```
src/lib/parsers/
├── psd-parser.ts          # PSD → layers, composite, text data
├── ai-parser.ts           # AI → rasterized preview
├── indd-parser.ts         # INDD → embedded JPEG preview
├── idml-parser.ts         # IDML → XML structure (placeholder)
├── aep-parser.ts          # AEP → project info, Lottie JSON
├── template-generator.ts  # ParsedPsd → TemplateConfig
└── validation.ts          # Upload limits, MIME types, extensions

src/lib/templates/
├── types.ts               # FieldType: 'image', TemplateCategory
├── registry.ts            # 28 templates, dynamic template support
├── dynamic-renderer.tsx   # Runtime JSON → JSX (Satori + preview)
├── social/quote-bg.tsx    # Image background template
├── presentation/
│   ├── pitch-deck.tsx     # Sales pitch (multi-page)
│   ├── brand-guidelines.tsx
│   └── case-study.tsx
└── motion/
    ├── logo-animation.tsx
    └── social-animation.tsx

src/app/api/assets/
├── upload/route.ts        # POST: multi-format upload
├── route.ts               # GET: list, DELETE: remove
└── [id]/route.ts          # GET: single, PATCH: update tags

src/app/api/templates/
└── generate/route.ts      # POST: PSD → template

src/components/studio/
├── image-field.tsx         # Drag-drop upload + preview
├── asset-picker-modal.tsx  # Select from library
├── import-wizard.tsx       # PSD → template wizard
└── presentation-editor.tsx # Multi-slide editor
```

---

## Supported File Types

| Extension | Format | Max Size | Processing |
|-----------|--------|----------|------------|
| .psd | Photoshop | 50MB | ag-psd: layers, composite, text |
| .ai | Illustrator | 50MB | Sharp: rasterize (PDF-based) |
| .svg | Vector | 10MB | Sharp: convert to PNG |
| .png | Raster | 10MB | Sharp: metadata + thumbnail |
| .jpg/.jpeg | Raster | 10MB | Sharp: metadata + thumbnail |
| .indd | InDesign | 50MB | Binary: extract JPEG preview |
| .idml | InDesign XML | 50MB | ZIP: detect structure |
| .aep | After Effects | 50MB | Binary: project info |
| .json | Lottie | 10MB | JSON: parse dimensions + data |
