# DomainMesh — Consolidated Design Tokens

> Unified design reference derived from the Stitch v1 designs.
> The **homepage** (`home.html`) is the primary source of truth for the design language.
> Other pages had inconsistencies which are resolved here.

---

## Color System

### Primary Palette

| Token | Hex | Usage | Source |
|---|---|---|---|
| `--color-midnight` | `#050A30` | Page backgrounds, nav bar | home.html ✅ |
| `--color-surface` | `#0A114A` | Card backgrounds, elevated surfaces | home.html ✅ |
| `--color-surface-hover` | `#121A5D` | Card hover state | home.html ✅ |
| `--color-orange` | `#FF6B00` | Primary accent, CTAs, icons, borders | home.html ✅ |
| `--color-white` | `#FFFFFF` | Primary text on dark backgrounds | all |
| `--color-text-secondary` | `#A0A5CA` | Secondary/muted text | home.html ✅ |
| `--color-border` | `rgba(255,255,255,0.1)` | Card borders (default) | home.html |
| `--color-border-hover` | `#FF6B00` | Card borders (hover) | home.html |

### Discrepancies Across Stitch Files (Resolved)

| File | Background | Primary | Notes |
|---|---|---|---|
| `home.html` | `#050A30` | `#FF6B00` | ✅ **Canonical** |
| `design_system.html` | `#23170F` (warm brown) | `#ff6a00` | ❌ Different bg — ignore |
| `product_overview.html` | `#23170F` (warm brown) | `#f96706` | ❌ Different bg — ignore |
| `technology.html` | `#050A30` | `#FF6B00` | ✅ Matches home |
| `use_cases.html` | `#050A30` | `#FF6B00` | ✅ Matches home |
| `about_us.html` | `#221810` (warm brown) | `#f2740d` | ❌ Different bg — ignore |

**Decision**: Use `#050A30` (midnight blue) + `#FF6B00` (safety orange) consistently.

---

## Typography

### Font Stack

| Role | Font | Source |
|---|---|---|
| **Headings** | `Archivo Black` | home.html, design_system.html |
| **Body** | `Roboto Flex` | home.html, design_system.html |
| **Code / Mono** | `JetBrains Mono` | technology.html |
| **Icons** | `Material Symbols Outlined` | all files |

### Scale

| Element | Font | Weight | Size (desktop) | Transform |
|---|---|---|---|---|
| Hero title | Archivo Black | 900 | 80–96px (text-7xl/8xl) | uppercase |
| Section header (h2) | Archivo Black | 900 | 48–56px (text-4xl/5xl) | uppercase |
| Card title (h3) | Archivo Black | 900 | 20–24px (text-xl) | uppercase |
| Section label | Archivo Black | 700 | 14px (text-sm) | uppercase, tracking-widest |
| Body large | Roboto Flex | 400 | 18–20px (text-lg/xl) | none |
| Body regular | Roboto Flex | 400 | 16px (text-base) | none |
| Body small | Roboto Flex | 400 | 14px (text-sm) | none |
| Nav links | Roboto Flex | 700 | 14px (text-sm) | uppercase, tracking-wide |
| Code snippets | JetBrains Mono | 400 | 12px (text-xs) | none |

### CJK Fallbacks (for i18n)
```
Noto Sans JP, Noto Sans KR, Noto Sans SC
```

---

## Spacing & Layout

| Token | Value |
|---|---|
| `--max-width` | `1280px` (max-w-7xl) |
| `--px-page` | `24px` (px-6) |
| `--gap-cards` | `24px` (gap-6) |
| `--section-py` | `96px` (py-24) |
| `--card-padding` | `32px` (p-8) |
| `--nav-height` | `80px` (h-20) |
| `--border-radius-card` | `0px` (homepage uses sharp edges) |
| `--border-radius-button` | `0px` (homepage buttons are rectangular) |

> **Note**: The homepage uses primarily **sharp/square** corners (no border radius). Other Stitch pages used rounded-xl/2xl/3xl — we'll follow the homepage's angular/industrial aesthetic.

---

## Components

### Navigation Bar
- **Position**: Fixed top, full width, z-50
- **Background**: `--color-midnight` with 90% opacity + backdrop-blur
- **Border**: 2px bottom, `rgba(255,255,255,0.1)`
- **Left**: Orange square "DM" logo + "DOMAINMESH" wordmark (Archivo Black)
- **Right**: Nav links (uppercase, 700 weight) → Language selector (globe icon + "EN" + chevron) → Hamburger (mobile)
- **Active link**: White text. Inactive: `--color-text-secondary`
- **Hover**: Orange underline slide-in (3px, animates width 0→100%)

### Hero Section
- **Background**: Midnight blue with orange grid overlay (`40px×40px`, `rgba(255,107,0,0.1)`)
- **Decorative lines**: Orange bars at corners (absolute positioned)
- **Layout**: 2-column on desktop — text left, graphic right
- **Left column**:
  - Section label: Orange dot → Orange line → "KNOWLEDGE GRAPHS" (uppercase, tracking-widest)
  - H1: "MODEL THE WORLD." (Archivo Black, text-8xl, `line-height: 0.9`)
  - "THE" uses transparent fill with orange stroke (`-webkit-text-stroke: 2px`)
  - Body text with orange left border (4px)
  - Two buttons: Primary (filled orange) + Secondary (outlined white)
- **Right column**: Node-graph illustration with code snippet overlay

### Feature Card
- **Background**: `--color-midnight` (darker than section surface)
- **Border**: 2px `rgba(255,255,255,0.1)`, sharp corners (no radius)
- **Padding**: 32px
- **Icon container**: 56×56px, `--color-surface` bg, 2px border `rgba(255,255,255,0.1)`
- **Title**: Archivo Black, uppercase, tracking-wide, white
- **Description**: Roboto Flex, text-sm, `--color-text-secondary`
- **Hover effects**:
  - Border color → orange
  - `translateY(-4px)`
  - Orange left bar reveal (4px, `scaleY(0→1)`)
  - Orange glow shadow: `0 10px 30px rgba(255,107,0,0.1)`
  - "EXPLORE →" text fades in + slides right
  - Icon border → orange, icon color → orange

### Buttons
- **Primary**: Filled orange bg, white text, Archivo Black, uppercase, 2px orange border
  - Hover: Transparent bg, orange text (inverts)
  - Padding: `1rem 2rem`
- **Secondary**: Transparent bg, white text, Archivo Black, uppercase, 2px white border
  - Hover: Border → orange, text → orange
  - Padding: `1rem 2rem`

### Footer
- Simple: text-center, copyright + links
- Border-top: `rgba(255,255,255,0.1)`

---

## Interaction & Motion

| Element | Effect | CSS |
|---|---|---|
| Nav link hover | Orange underline slides in | `width: 0→100%`, `transition: 0.3s ease` |
| Feature card hover | Lift + orange border + left bar | `translateY(-4px)`, `scaleY(0→1)`, `0.3s ease` |
| Icon on card hover | Color shifts to orange | `transition-colors` |
| Primary button hover | Fill inverts (orange→transparent) | `transition: all 0.2s` |
| Secondary button hover | Border + text → orange | `transition: all 0.2s` |
| "EXPLORE" text | Fades in + slides right on card hover | `opacity 0→1`, `translateX(-10px→0)`, `0.3s` |
| Section label dot/line | Static (no animation) | — |

---

## Grid Pattern (Hero Background)

```css
.graphic-grid {
    background-image: 
        linear-gradient(to right, rgba(255,107,0,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,107,0,0.1) 1px, transparent 1px);
    background-size: 40px 40px;
}
```

---

## Icons

Using **Material Symbols Outlined** (Google Fonts). Key icons from the homepage:

| Feature | Icon Name |
|---|---|
| Schema Design | `schema` |
| Strict Validation | `rule` |
| Version Control | `history` |
| Go Native | `code_blocks` |
| Neo4j Integration | `database` |
| API Generation | `hub` |
| Language selector | `language` |
| Menu (mobile) | `menu` |
| Arrow (CTA) | `arrow_forward` |
| Expand (dropdown) | `expand_more` |
