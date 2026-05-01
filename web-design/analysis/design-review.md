# DomainMesh — Design Review

> Analysis of the existing [domainmesh.io](https://domainmesh.io/) website, captured March 2026.

---

## Site Architecture

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Hero, knowledge graphs intro, feature grids (DomainMesh + Workflow Engine), CTA |
| `/product` | Product | Hero, two-engine overview, screenshots (BPMN + code) |
| `/technology` | Technology | Hero, Go + MongoDB + cloud-native details, technology cards |
| `/use-cases` | Use Cases | Hero, SaaS Products + Data Warehousing cards |
| `/about` | About | Hero, company story and mission |
| `/contact` | Contact | Contact form, address (Daniel Molnár, Zug) |

---

## Design Language

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary Dark | `#0a0a23` | Page backgrounds, nav bar, footer |
| Gold / Mustard | `#a67c00` | Accent sections, feature card backgrounds, gradient overlays |
| White | `#ffffff` | Text on dark backgrounds, CTA buttons |
| Light Gray | `#f5f5f5` | Subtle text highlights |

### Typography

- **Headings**: Bold, large sans-serif (Montserrat or similar), `700` weight
- **Body**: Clean sans-serif (Inter or similar), `400` weight
- **Hierarchy**: Very large hero titles → section headers (h2/h3) → body copy → small captions

### Layout Patterns

1. **Full-width sections** with alternating backgrounds (dark → gold → dark)
2. **Fixed nav bar** at top — logo left, 5 text links right
3. **Hero sections** on every page — background image (star chart / constellation) + overlaid title
4. **3-column feature grids** — cards with glass/translucent effect on gradient backgrounds
5. **Minimal footer** — CTA text + "Contact us" button + copyright + logo repeat

### Visual Assets

- **Hero background**: A star chart / constellation image, tinted blue — used consistently across all pages
- **Logo**: Triangle icon + "domainmesh" wordmark (white on dark, dark on light)
- **Product screenshots**: BPMN workflow diagram + code snippet (JavaScript/Go)

---

## Screenshots

| # | Page | File |
|---|---|---|
| 01 | Homepage — Hero | [`01_homepage_hero.png`](screenshots/01_homepage_hero.png) |
| 02 | Homepage — Knowledge Graphs | [`02_homepage_knowledge_graphs.png`](screenshots/02_homepage_knowledge_graphs.png) |
| 03 | Homepage — Why Knowledge Graphs | [`03_homepage_why_knowledge_graphs.png`](screenshots/03_homepage_why_knowledge_graphs.png) |
| 04 | Homepage — DomainMesh Features | [`04_homepage_domain_modeller_features.png`](screenshots/04_homepage_domain_modeller_features.png) |
| 05 | Homepage — Workflow Engine | [`05_homepage_workflow_engine.png`](screenshots/05_homepage_workflow_engine.png) |
| 06 | Homepage — Footer | [`06_homepage_footer.png`](screenshots/06_homepage_footer.png) |
| 07 | Product Page | [`07_product_page.png`](screenshots/07_product_page.png) |
| 08 | Technology Page | [`08_technology_page.png`](screenshots/08_technology_page.png) |
| 09 | Use Cases Page | [`09_use_cases_page.png`](screenshots/09_use_cases_page.png) |
| 10 | About Page | [`10_about_page.png`](screenshots/10_about_page.png) |

---

## Strengths ✅

| Area | Notes |
|---|---|
| **Color palette** | Distinctive dark navy + gold. Professional, avoids generic SaaS blue. |
| **Typography** | Bold headings create strong hierarchy. Body text is legible. |
| **Layout** | Alternating section backgrounds create visual rhythm and break up content. |
| **Navigation** | Flat, 5-item nav — simple and scannable. |
| **Content flow** | Homepage builds a narrative: problem → concept → solution → features → CTA. |
| **Consistency** | Every page uses the same hero pattern, giving the site a cohesive feel. |

---

## Improvement Opportunities 🔧

### 1. Hero Sections — Add CTAs
Every hero has a title but no button. Adding a "Get Started", "Book a Demo", or "Learn More" button below the hero text would significantly improve conversion.

### 2. Feature Cards — Add Icons
The 3×3 grids (DomainMesh features, Workflow Engine features) are text-only. Adding an icon per card would improve scannability and visual appeal.

### 3. Feature Cards — Hover States
Cards currently have no visible hover effect. Adding a subtle scale, glow, or border change would make the page feel more interactive.

### 4. Mobile Navigation
The nav bar needs a hamburger menu for mobile. This must be a first-class concern in the rebuild.

### 5. Product Page — Tighten Layout
The two screenshots (BPMN + code) float in a large dark area with excessive surrounding space. Tighter layout with labels/annotations would help.

### 6. Technology Page — Expand Cards
"MongoDB at Its Core" and "Compiled Validators" feel sparse. A 2-column or 3-column card layout (like the homepage features) would be more effective.

### 7. Use Cases Page — Add Depth
Only two cards (SaaS Products, Data Warehousing). Even without adding more use cases, expanding each with bullet points, example scenarios, or customer quotes would enrich the page.

### 8. About Page — Add Visuals
Currently text-heavy. A founder photo, company timeline, or mission graphic would humanize it.
