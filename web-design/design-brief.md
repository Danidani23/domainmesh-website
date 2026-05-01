# DomainMesh — Design Brief for Google Stitch

> Design a fresh, modern website for **DomainMesh** — a platform for building and managing knowledge graphs.
>
> The existing site ([domainmesh.io](https://domainmesh.io/)) is **reference only** for page structure and content flow. The visual identity — logo, colors, typography — should be designed from scratch. Content text is placeholder; the product is being rewritten and copy will be finalized separately.
>
> Screenshots of the existing site are in [analysis/screenshots/](analysis/screenshots/) for structural reference.

---

## Product Context

### What is DomainMesh?
A platform that lets teams design, build, and maintain **knowledge graphs** — structured, connected data models that represent how the real world works. It combines:

1. **DomainMesh Engine** — describes how the world looks (schema design, graph structure, validation, versioning)
2. **Workflow Engine** — describes how the world changes (processes, automations, human tasks, orchestration)

### Target Audience
Engineering leaders, data architects, and product teams building complex, data-driven systems.

### Technology (for the Technology page)
- **Go** for performance, concurrency, and portability
- **Neo4j** (graph database) at its core
- **Cloud Native** — Docker, Kubernetes, modern infrastructure
- **NATS** for async messaging
- **YAML-based** declarative configuration

### Company
**Daniel Molnár**, Zug, Switzerland.

---

## Design Direction

### Mood & Personality
- **Professional** but not corporate — modern tech company, not enterprise consulting
- **Technical credibility** — this is a developer/architect tool, the design should signal engineering depth
- **Clean and confident** — let the product speak, don't over-design
- **Approachable** — not intimidating, not playful

### Visual Inspiration
Feel free to explore these directions — not prescriptive, just starting points:

- **Dark themes** work well for developer tools (think Vercel, Linear, Raycast)
- **Graph/network motifs** could be a natural fit — nodes, edges, connections
- **Subtle animations** — the site should feel alive without being distracting
- **Open to light themes or mixed** — if a light or dual-tone approach feels stronger, go for it

### What to Avoid
- Generic SaaS blue/white/green — it should feel distinctive
- Overly illustrated or cartoonish — keep it grounded
- Busy backgrounds that compete with content
- Stock photos of people at laptops

---

## Logo

Design a new logo for "domainmesh" (one word, all lowercase). Considerations:

- Should work on both dark and light backgrounds
- Should be simple enough for a favicon
- Graph/network/connection concepts are relevant but not required
- The current logo is a triangle icon (△) — feel free to depart from this entirely

---

## Typography

Choose a modern type pairing:
- **Headings**: A bold, distinctive sans-serif with character
- **Body**: A clean, highly readable sans-serif
- Google Fonts preferred for self-hosting
- **CJK support**: Must include fallback fonts for Japanese, Korean, and Chinese (e.g., Noto Sans JP/KR/SC)

---

## Internationalization (i18n)

The site will be translated into **10 languages**:

| Code | Language | Script |
|---|---|---|
| `en` | English | Latin (default) |
| `de` | German | Latin |
| `fr` | French | Latin |
| `it` | Italian | Latin |
| `es` | Spanish | Latin |
| `pt` | Portuguese | Latin |
| `hu` | Hungarian | Latin |
| `ja` | Japanese | CJK |
| `ko` | Korean | CJK |
| `zh` | Chinese | CJK |

### Design Implications
- **Language selector**: Dropdown in the nav bar (right side, before hamburger on mobile). Should show the current language code or flag, and expand to show all 10 options.
- **Text expansion**: German and French text can be 20–30% longer than English. Layouts must not break with longer strings.
- **CJK layouts**: Japanese, Korean, and Chinese text has different line-height and spacing needs. Ensure the typography scale accommodates this.
- **RTL**: Not required (none of the target languages are RTL).

---

## Site Structure (6 Pages)

### Navigation (Global)
- Fixed top bar: logo left, links right
- Links: Home, Product, Technology, Use Cases, About
- **Language selector**: Dropdown on the right (after nav links, before hamburger on mobile)
- Mobile: hamburger menu (includes language selector)
- Contact accessible from footer CTA (not in main nav)

### Footer (Global)
- CTA: "Questions? Reach out anytime" + Contact button
- Copyright + logo repeat

---

### Page 1: Homepage (`/`)

| Section | Purpose | Notes |
|---|---|---|
| **Hero** | First impression, headline + CTA | Bold statement about knowledge graphs. Include a clear CTA button. |
| **What are Knowledge Graphs?** | Educate the visitor | Short explanation + concrete example (doctor visit scenario). See [content-inventory.md](analysis/content-inventory.md) for draft text. |
| **Why Knowledge Graphs?** | Value proposition | Context, consistency, flexibility, collaboration, AI-readiness |
| **DomainMesh Features** | Feature grid (≈12 items) | Cards with icon + title + short description. 3-column grid on desktop. |
| **Workflow Engine Features** | Feature grid (≈9 items) | Same card style. Separate section with its own header. |
| **Footer** | CTA + copyright | |

> **Key design challenge**: The homepage has a LOT of feature cards (21 total across two grids). They need to be scannable without feeling overwhelming. Consider visual grouping, alternating section backgrounds, or a tabbed/accordion approach.

---

### Page 2: Product (`/product`)

| Section | Purpose |
|---|---|
| **Hero** | Headline about modeling + workflows |
| **Two Engines** | Visual showing how DomainMesh + Workflow Engine connect |
| **Details** | Screenshots or diagrams of the product in action |

---

### Page 3: Technology (`/technology`)

| Section | Purpose |
|---|---|
| **Hero** | Headline about the tech stack |
| **Tech Cards** | Cards for: Go, Neo4j, Cloud Native, NATS, Compiled Validators |

> **Note**: The current site mentions MongoDB — this is changing to **Neo4j**. The technology page should highlight graph-native storage as a core differentiator.

---

### Page 4: Use Cases (`/use-cases`)

| Section | Purpose |
|---|---|
| **Hero** | Headline about building with confidence |
| **Use Case Cards** | SaaS Products, Data Warehousing (may expand later) |

---

### Page 5: About (`/about`)

| Section | Purpose |
|---|---|
| **Hero** | "Our Story" |
| **Content** | Company narrative, mission, founding context |

---

### Page 6: Contact (`/contact`)

| Section | Purpose |
|---|---|
| **Header** | "Contact us" + invitation text |
| **Content** | Contact form (Name, Email, Message) + company address |

---

## Responsive Design

| Breakpoint | Behavior |
|---|---|
| **Desktop** (≥1024px) | Full layout. 3-column feature grids. |
| **Tablet** (768–1023px) | 2-column feature grids. Nav stays horizontal. |
| **Mobile** (<768px) | 1-column stacking. Hamburger nav. Full-width cards. |

---

## Interaction & Motion

| Element | Effect |
|---|---|
| **Feature cards** | Hover: subtle scale + glow or border highlight |
| **Nav links** | Hover: underline slide-in or color shift |
| **CTA buttons** | Hover: color inversion or fill animation |
| **Sections** | Scroll: fade-in as sections enter viewport |
| **Mobile menu** | Slide-down with ease-in-out |

---

## Stitch Workflow — Phased Approach

Work through these phases in order. Do not generate all pages upfront — start with a design concept for review.

### Phase 1: Design Concept (2–3 Variations)

Generate **2–3 visual directions** for the homepage hero + one feature section. Each variation should explore a different:
- Color palette
- Typography pairing
- Visual mood (e.g., dark & technical vs. light & airy vs. bold & graphic)
- Hero treatment (background style, layout, imagery approach)

**Deliverables:**
- 2–3 homepage hero mockups (desktop)
- For each: a brief note on the design rationale

> I will review the concepts and select a direction before proceeding.

---

### Phase 2: Design System / Token Library

Once a direction is selected, create a **design system** that defines:

#### Color Tokens
| Token | Purpose |
|---|---|
| `primary` | Main brand color |
| `primary-dark` / `primary-light` | Variants |
| `secondary` | Accent color |
| `background` | Page background |
| `surface` | Card / elevated element background |
| `text-primary` | Main text color |
| `text-secondary` | Muted / secondary text |
| `border` | Borders, dividers |

#### Typography Scale
| Element | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | ? | Bold | 56–72px |
| H2 | ? | Bold | 36–48px |
| H3 | ? | Semi-bold | 24–28px |
| Body | ? | Regular | 16–18px |
| Small / Caption | ? | Regular | 13–14px |

#### Component Library
Design each of these as a reusable component:

1. **Navigation bar** — logo + links (desktop) + hamburger (mobile)
2. **Hero section** — background + headline + subtitle + optional CTA
3. **Feature card** — icon + title + description
4. **CTA button** — primary and secondary variants
5. **Section wrapper** — full-width with background color/gradient
6. **Footer** — CTA row + copyright + logo

#### Spacing & Layout
- Grid system (max-width, gutters, column counts per breakpoint)
- Spacing scale (4px base, or 8px base)
- Border radius tokens

**Deliverables:**
- A design system page showing all tokens, components, and variants
- The logo in both dark-on-light and light-on-dark versions
- Favicon version of the logo

---

### Phase 3: Full Page Designs

Using the approved design system, generate all pages:

1. **Homepage** — all sections (hero, knowledge graphs, features ×2, footer)
2. **Product page** — hero + two engines + visuals
3. **Technology page** — hero + tech cards (Go, Neo4j, Cloud Native, NATS)
4. **Use Cases page** — hero + use case cards
5. **About page** — hero + company story
6. **Contact page** — form + address info
7. **Homepage mobile view** — hamburger nav + stacked cards

**Deliverables:**
- Full-page designs for all 7 items above
- Exported HTML/CSS for each (if available) — this will be converted to Astro components

> The code implementation will be done separately using **Astro** (static site generator). Stitch should focus on visual design and, if possible, export clean HTML/CSS that can be adapted.

---

## Content Notes

⚠️ **All text content in this brief and in [content-inventory.md](analysis/content-inventory.md) is from the current site and should be treated as placeholder.** The product is being rewritten, and final copy will be provided separately. Design around the *structure and intent* of each section, not the specific words.

Key content changes from the current site:
- **Technology**: Neo4j replaces MongoDB as the core database
- **Features**: The feature list may be refined (some added, some removed)
- **Company info**: May be updated

---

## Reference

- [Content Inventory](analysis/content-inventory.md) — all current text (placeholder)
- [Design Review](analysis/design-review.md) — analysis of current site's strengths and weaknesses
- [Screenshots](analysis/screenshots/) — 10 PNGs of the live site (structural reference only)

