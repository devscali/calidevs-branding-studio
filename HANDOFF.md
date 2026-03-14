# Calidevs Branding Studio — Handoff Document

**Fecha:** 2026-03-14
**Repo:** https://github.com/devscali/calidevs-branding-studio
**Live:** https://branding.calidevs.com (DNS: A record `branding` → `76.76.21.21`)
**Vercel:** https://branding-studio-nine.vercel.app

---

## Estado Actual — Phase 1 COMPLETE

### Lo que esta live y funcionando:
- **Landing** (`/`) — Hero con BoldBlaze flame + wordmark + 2 cards (Gallery, Studio)
- **Gallery** (`/gallery`) — 8 brand HTML files con iframe viewer, fullscreen, download
- **Studio** (`/studio`) — 22 templates con editor de 2 paneles (form + live preview)
- **Export API** — JPG/PNG/SVG/PDF a 6 tamanos (IG Square/Story/Landscape, OG, Twitter, LinkedIn)
- **Iconos** — Lucide React (profesionales, stroke-based, dark theme optimized)
- **Preview dinamico** — Cambia aspect ratio cuando seleccionas otro Export Size

### Stack:
- Next.js 16 + TypeScript + Tailwind CSS
- Satori + Sharp (image generation serverless, ~200ms)
- Lucide React (icon system)
- Neon PostgreSQL + Drizzle ORM
- Vercel (SFO region)

### Neon DB:
- **Project ID:** `weathered-tree-42736632`
- **Connection:** `postgresql://neondb_owner:npg_q0gWDK4AlIJn@ep-long-flower-ak9bw5yc-pooler.c-3.us-west-2.aws.neon.tech/neondb`
- **Tables:** `templates` (15 seeded), `creations` (export history)

---

## NON-NEGOTIABLE: Logo Lock

### CORRECTO (aprobado):
La flamita **reemplaza la "v"** en el wordmark: `cali` + `de` + 🔥 + `s`
- Fondo oscuro: "cali" blanco, "de" naranja, flame, "s" naranja
- La flamita es PARTE de la palabra, entre "de" y "s"

### INCORRECTO (no usar):
- Flamita como punto/periodo al final de "calidevs."
- Flamita separada del wordmark
- Usar "." en lugar de la flamita SVG de 3 capas

### Bold Blaze (3 capas, SIEMPRE):
```
Outer: M30 0C30 0 8 24 4 42C0 60 12 76 30 76C48 76 60 60 56 42C52 24 30 0 30 0Z  fill=#E8501A
Inner: M30 24C30 24 16 40 14 50C12 60 20 70 30 70C40 70 48 60 46 50C44 40 30 24 30 24Z  fill=#F5A623
Core:  M30 42C30 42 22 52 22 58C22 64 26 68 30 68C34 68 38 64 38 58C38 52 30 42 30 42Z  fill=#FFECD2
viewBox: 0 0 60 76
```

---

## 22 Templates Disponibles

### Terminal (5):
1. **Insight Post** (`terminal-insight`) — Terminal-style insight con command prompt
2. **Deploy Post** (`terminal-deploy`) — Celebrar un deploy con flair de terminal
3. **Diff Post** (`terminal-diff`) — Before/after code diff
4. **CLI Card** (`terminal-cli-card`) — Dev card personal estilo CLI
5. **Package.json** (`terminal-package`) — Proyecto como package.json estilizado

### Social (5):
6. **Quote Post** (`social-quote`) — Cita con brand styling
7. **Service Spotlight** (`social-service`) — Destacar un servicio
8. **Stat Highlight** (`social-stat`) — Numero grande con impacto
9. **Milestone** (`social-milestone`) — Celebrar un logro (fondo Ignite)
10. **Shipped This Week** (`social-shipped`) — Roundup semanal

### Dev (5):
11. **Git Log** (`dev-git-log`) — Progreso como git log estilizado
12. **Release Notes** (`dev-release`) — Anunciar nueva version
13. **Status Page** (`dev-status`) — Estado del sistema (4 estados)
14. **Code Review** (`dev-review`) — Testimonial como PR review
15. **Deploy Card** (`dev-deploy-card`) — Notificacion estilo Vercel

### Campaign — Canada (7):
16. **Brand Hook** (`campaign-brand-hook`) — Story 01: "Born in Tijuana. Conquering Canada."
17. **Package Base** (`campaign-package-base`) — Story 02: 5 services + $1,200/mo pricing
18. **Manifesto** (`campaign-manifesto`) — Story 03: Border origin story, violet accents
19. **Full Package** (`campaign-full-package`) — Story 04: 6 services + "everything custom. nothing generic."
20. **Tagline** (`campaign-tagline`) — "Mexican work ethic. California quality. Canadian ambition."
21. **Competitor Hook** (`campaign-competitor`) — "Your competitors just hired a tech team." + CTA
22. **CTA Closing** (`campaign-cta`) — Closing slide con wordmark grande + book a call

**Todas las campaign templates:**
- Fondo `#0d0d0d` (dark minimal)
- Acento violet `#a78bfa`
- Wordmark con flame: top=violet variant, footer=standard ignite variant
- Default size: IG Story (1080x1920)
- Service dots con colores unicos por servicio
- Todo el copy es editable desde el Studio

---

## PENDIENTES

### P1 — Canada Campaign (Alta Prioridad)
**Brief completo en:** `/Users/concepcion/Downloads/CaliDevs_Canada_Campaign_Brief.md`

La campana de Canada tiene todo el copy listo. Se necesita:

- [x] **4 Instagram Stories** (dark minimal, 1080x1920) **DONE — 7 templates totales**
  - Story 01: Brand/Hook — "Born in Tijuana. Conquering Canada." ✓
  - Story 02: Paquete Base + Precio ($1,200/mo, 5 servicios) ✓
  - Story 03: Manifesto — "We were born on the border..." (acento violeta `#a78bfa`) ✓
  - Story 04: Full Package (6 servicios + "everything custom. nothing generic.") ✓
  - EXTRA: Tagline — "Mexican work ethic. California quality. Canadian ambition." ✓
  - EXTRA: Competitor Hook — "Your competitors just hired a tech team." ✓
  - EXTRA: CTA Closing — Book a call + price badge ✓
- [ ] **Decisiones de diseno pendientes:**
  - Paleta: fondo `#0d0d0d`, acento violeta `#a78bfa` (diferente de la paleta Ignite habitual)
  - Puntos de servicio: colores variados (teal, violeta, amber, coral, azul)
  - Foto de fondo Tijuana/border con overlay oscuro? (propuesta alternativa para stories 01 y 03)
- [x] **Crear templates en Studio** para las stories de Canada **DONE — 7 templates en categoria Campaign**
- [ ] **Meta Ads** — 2 variantes (Hook A: competencia, Hook B: urgencia)
- [ ] **Google Ads** — Search copy (headlines + description)
- [ ] **LinkedIn Ad** — Copy para SMBs canadienses
- [ ] **Email Campaign** — 3 subject lines + body template
- [ ] **Landing Page** — Hero section copy listo
- [ ] **Video/Reel** — Script 30 segundos listo

### P2 — Studio Enhancements
- [x] **Mas templates para Canada:** 7 templates con paleta violeta/dark **DONE**
- [x] **Story 3 y 4 como nuevos templates** — Manifesto + Full Package **DONE**
- [x] **Tagline Canada** como template **DONE**
- [ ] **Foto de fondo Tijuana/border** con overlay oscuro para stories 01 y 03 (propuesta alternativa)

### P3 — Phase 2 (Later)
- [ ] Video Studio con Remotion (motion templates, max 50s, export MP4)
- [ ] Publicacion directa a Instagram via Graph API
- [ ] Historial mensual de contenido creado
- [ ] Calendario de contenido basico

### P4 — Fixes Menores
- [ ] ~~Preview no cambia cuando seleccionas otro size~~ **FIXED**
- [ ] ~~Emojis en lugar de iconos profesionales~~ **FIXED (Lucide React)**
- [ ] ~~Logo lock — flamita como punto vs reemplazando "v"~~ **CONFIRMADO: flame reemplaza "v"**

---

## Archivos Clave

### Proyecto:
```
branding-studio/
├── src/lib/brand/constants.ts    ← Source of truth (colores, fonts, flame paths, Canada palette)
├── src/lib/brand/flame.tsx       ← BoldBlaze component (3 capas) + BoldBlazeSatori
├── src/lib/brand/wordmark.tsx    ← 4 variantes del wordmark + WordmarkSatori
├── src/lib/brand/fonts.ts        ← Font loading para Satori (TTF → ArrayBuffer)
├── src/lib/brand/gallery-items.ts← 8 items de gallery con Lucide icons
├── src/lib/templates/registry.ts ← Registro de los 22 templates (4 categories)
├── src/lib/templates/campaign/   ← 7 Canada campaign templates
├── src/lib/export/satori-renderer.ts ← Pipeline core de render
├── src/components/studio/template-editor.tsx ← Editor de 2 paneles
└── public/brand-files/           ← 8 HTMLs de brand identity
```

### Brand Files (en /public/brand-files/):
1. `calidevs-brand-guidelines.html` — Brandbook completo
2. `calidevs-sales-deck.html` — 18 slides de ventas
3. `calidevs-stationery.html` — Papeleria (cards, letterhead, invoice, etc.)
4. `calidevs-dev-applications.html` — Terminal posts, wallpapers, 404
5. `calidevs-flame-proposals.html` — 10 propuestas de flamita
6. `calidevs-flame-iconic.html` — 6 refinamientos (A-F)
7. `logo-calidevs-2026.html` — Conceptos de logo v1
8. `logo-calidevs-FIRE.html` — Iteraciones con fuego

### Campaign Brief:
- `/Users/concepcion/Downloads/CaliDevs_Canada_Campaign_Brief.md`

---

## Colores de Marca

| Color | Hex | Uso |
|-------|-----|-----|
| Ignite | `#E8501A` | Acento principal, CTA, flamita outer |
| Amber | `#F5A623` | Secundario, flamita inner |
| Sand | `#FFECD2` | Flamita core, highlights suaves |
| Charcoal | `#161618` | Background principal |
| Light Sand | `#F8F5F0` | Background claro (on-light variant) |
| Muted | `#888888` | Texto secundario |

### Canada Campaign (paleta alternativa):
| Color | Hex | Uso |
|-------|-----|-----|
| Dark BG | `#0d0d0d` | Fondo stories |
| Violeta | `#a78bfa` | Acento en frases clave |
| Teal | `#5dcaa5` | Dot servicio |
| Coral | `#f0997b` | Dot servicio |
| Blue | `#85b7eb` | Dot servicio |

---

## Deploy Checklist

- [x] GitHub repo: `devscali/calidevs-branding-studio`
- [x] Vercel project: `branding-studio` (calidevs-projects)
- [x] DATABASE_URL env var en Vercel
- [x] DNS A record: `branding.calidevs.com` → `76.76.21.21`
- [x] SSL auto-provisioned por Vercel
- [x] Build exitoso (17/17 paginas)
- [x] Export API testeado (JPEG 1080x1080 working)

---

*Actualizado 2026-03-14 · Calidevs Branding Studio v1.1 (22 templates, Canada Campaign)*
