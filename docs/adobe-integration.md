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

---

## UX/UI Improvements (Elena Audit)

### Toast Notification System
Replaced all native `alert()` calls with a custom toast system.

| Component | File |
|-----------|------|
| ToastProvider + useToast hook | `src/components/ui/toast.tsx` |
| App-level provider wrapper | `src/components/providers.tsx` |
| Layout integration | `src/app/layout.tsx` |

**Toast types:** success (green), error (red), warning (amber), info (ignite)
**Features:** Auto-dismiss 4s, slide-in animation, `aria-live="polite"`, dismiss button

### Accessibility Fixes (WCAG 2.1 AA)

| Fix | File | Details |
|-----|------|---------|
| Dropzone keyboard support | `image-field.tsx` | `role="button"`, `tabIndex={0}`, Enter/Space activation, visible focus ring |
| ARIA labels on actions | `image-field.tsx` | Remove button, file input, upload dropzone |
| Modal focus trap | `asset-picker-modal.tsx` | Tab cycling, Escape to close, click-outside close |
| Modal ARIA attributes | `asset-picker-modal.tsx` | `role="dialog"`, `aria-modal`, `aria-label` |
| Auto-focus search | `asset-picker-modal.tsx` | Focus search input on modal open |
| Descriptive alt text | `image-field.tsx` | `"{label} preview"` instead of generic "Uploaded" |

### Files Modified
- `src/components/studio/template-editor.tsx` — toast on export success/error
- `src/components/studio/presentation-editor.tsx` — toast on export success/error
- `src/app/assets/page.tsx` — toast on upload success/error
- `src/components/studio/image-field.tsx` — ARIA labels + keyboard nav
- `src/components/studio/asset-picker-modal.tsx` — focus trap + ARIA

---

## After Effects Integration (Local Scripting)

### Connection Method
After Effects is controlled via **ExtendScript** executed through `osascript`:
```bash
osascript -e 'tell application "After Effects" to DoScriptFile "/path/to/script.jsx"'
```

**Requirement:** After Effects > Settings > Scripting & Expressions > "Allow Scripts to Write Files and Access Network" must be enabled.

### What's Been Created

#### 1. calidevs Logo Reveal (Custom)
- **Comp:** "CALIDEVS — Elena Reveal"
- **Size:** 1080x1920 (story/reel)
- **Duration:** 20 seconds, 30fps
- **Layers:** 68
- **5-Act Structure:**
  1. **The Awakening** (0-5s): 12 floating particles, scan line, pulse rings
  2. **Glitch Reveal** (4-6s): Logo "cali" + "devs" glitch entrance, flash frames, interference bars
  3. **The Flame** (5.5-8s): Multi-layer flame icon, energy burst, 8 radial rays
  4. **The Message** (8-14s): Headline fade-up, subtitle, accent bars, ambient grid dots
  5. **The Brand Close** (14-20s): Branding, tagline "Built with fire. Shipped with code."

#### 2. Vertical Fire Wall Logo (Envato Template)
- **Template:** `vertical-fire-wall-logo-after-effects-2026-02-06-02-50-46-utc`
- **Comp:** "Vertical Fire Wall Logo"
- **Size:** 2304x4096 (hi-res vertical)
- **Duration:** 6.4 seconds, 30fps
- **Features:** Real fire footage, mesh warp, displacement map, fractal noise textures
- **Customizations applied:**
  - Logo Placeholder 01: calidevs flame icon (3-layer teardrop)
  - Logo Placeholder 02: "cali" (white) + "devs" (ignite) wordmark + flame dot
  - Text Placeholder: "WE BUILD WITH FIRE" (tracking 200)

### ExtendScript Patterns Used
```javascript
// Create comp
app.project.items.addComp(name, width, height, pixelAspect, duration, fps);

// Add shape layers
var layer = comp.layers.addShape();
var grp = layer.property("Contents").addProperty("ADBE Vector Group");
grp.property("Contents").addProperty("ADBE Vector Shape - Rect");
grp.property("Contents").addProperty("ADBE Vector Graphic - Fill");

// Add text
var txt = comp.layers.addText("content");
var doc = txt.property("Source Text").value;
doc.fontSize = 120;
doc.fillColor = [1, 1, 1];
txt.property("Source Text").setValue(doc);

// Keyframe animation
prop.setValueAtTime(time, value);

// File I/O for verification
var f = new File("/tmp/output.txt");
f.open("w"); f.writeln("data"); f.close();
```

### Motion Design Trends Applied (2025-2026)
- **Spring physics easing** (overshoot + settle)
- **Glitch aesthetic** (rapid position shifts, interference bars, flash frames)
- **Staggered cascade** (2-4 frame offsets between elements)
- **Dark premium palette** (charcoal #161618, ignite #E8501A, amber #F5A623)
- **Particle systems** (floating dots with drift + opacity fade)
- **Energy burst** (expanding rings + radial rays from focal point)
