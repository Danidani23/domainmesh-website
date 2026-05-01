# DomainMesh — Content Inventory

> Complete text content extracted from [domainmesh.io](https://domainmesh.io/), March 2026.

> ⚠️ **PLACEHOLDER CONTENT** — This text is from the current (old) site. The product is being rewritten. Key changes:
> - **Database**: MongoDB → **Neo4j** (graph-native storage)
> - **Feature list**: May be refined (some added, some removed, some reworded)
> - **Copy**: Will be rewritten — use this for *structural reference* only

---

## Navigation (All Pages)

```
Home | Product | Technology | Use cases | About
```

---

## Homepage (`/`)

### Hero
- **Title**: Knowledge Graphs Made Easy
- **Subtitle**: Design. Build. Maintain.

### What Are Knowledge Graphs?
A knowledge graph is a way to represent the world as a network of connected facts — not just data, but relationships. Instead of isolated tables or JSON objects, everything is linked, forming a map of how things interact.

### Example
Think about something simple — going to the doctor.
- You have a Person (the patient).
- The person books an Appointment.
- The appointment happens at a Clinic.
- A Doctor conducts the appointment.
- The doctor prescribes a Medication.
- The medication belongs to a Drug Category.

All of these pieces — people, places, events, and items — are connected. If the medication changes, you can instantly see which patients and doctors are affected. If a clinic updates its schedule, you can trace which appointments need to move.

That's what a knowledge graph does: It connects data so that systems and people can understand context, reason about impact, and stay consistent even as information changes.

DomainMesh helps you design and maintain this kind of structure — a living map of your world that stays accurate as it evolves.

### Why Use Knowledge Graphs?
Knowledge graphs connect data into a single, meaningful structure — showing how things relate instead of just listing them. They bring context, so systems can reason about change; consistency, so teams share one source of truth; and flexibility, so models evolve without breaking. They also make collaboration easier — business and engineering can finally speak the same language — and prepare your data for automation and AI that actually understands it.

DomainMesh gives you the tools to build and maintain that clarity at scale.

---

### Section: "Describing how the world looks like at any given time — DomainMesh"

> DomainMesh helps you describe how your world looks — as a graph.

#### Features (12 items)

| Feature | Description |
|---|---|
| Batteries Included | Pre-integrated with services like Google Maps for instant validation and enrichment. |
| Event Based | Every change is captured as an event, creating a complete record of evolution. |
| API First | Everything is accessible through the API, so your data model integrates anywhere. |
| Event Store | The system keeps every historical change, so you can replay or analyze the past. |
| Scalable | Built in Go and MongoDB, designed to handle millions of entities efficiently. |
| Calculators | Run Python-based calculations automatically on every transaction. |
| Internationalization | Model and validate data in as many languages as your domain requires. |
| Build Custom Rules Without Coding | Define validation and logic through a simple, visual or declarative interface. |
| Version Control | Every schema change is tracked, making your domain auditable and reversible. |
| Declarative (via YAML) | Describe your models and logic in clean, human-readable YAML files. |
| Time Machine | Explore how your graph looked at any point in time with full temporal traceability. |
| Rule Engine | Define complex business logic declaratively — no coding required. |

---

### Section: "Describing how the world changes — Workflow Engine"

> Our Workflow Engine controls how the domain evolves. It defines the processes, automations, and human interactions that change your data, while ensuring that every step complies with your schema.

#### Features (9 items)

| Feature | Description |
|---|---|
| API First | Trigger, monitor, and control workflows programmatically through APIs. |
| Collaborate Efficiently | Teams focus on the work while the system enforces the process. |
| Integrate AI Securely | Let AI participate in workflows safely within your schema and governance rules. |
| Integrate with Anything | Connect to any external system or service through simple HTTP calls. |
| BPMN-like | Follows BPMN-inspired types for quick learning and intuitive process design. |
| Extendable | Add custom connectors, actions, or external integrations effortlessly. |
| Compensation Routes | Handle cancellations, rollbacks, and error recovery automatically to keep workflows consistent and resilient. |
| Asynchronous Task Management | Adopted NATS to establish a resilient and highly scalable message-driven architecture. |
| Declarative (via YAML) | Describe your workflows in clean, human-readable YAML files. |

---

## Product Page (`/product`)

### Hero
- **Title**: Model your domain. Control your workflows.

### Body
DomainMesh combines two tightly integrated engines

*(Page shows two screenshots side by side: a BPMN workflow diagram and a code snippet)*

---

## Technology Page (`/technology`)

### Hero
- **Title**: Cloud Native. Built in Go.
- **Body**: DomainMesh is written primarily in Go for performance, concurrency, and portability. It's fully cloud native — deployable via Docker, Kubernetes, or any modern infrastructure.

### Technology Cards

| Card | Content |
|---|---|
| MongoDB at Its Core | We leverage MongoDB's document model and scalability, but enforce schemas and graph constraints that MongoDB itself doesn't natively provide. |
| Compiled Validators | *(visible but text partially cut off in screenshot)* |

---

## Use Cases Page (`/use-cases`)

### Hero
- **Title**: Build complex systems with confidence

### Body
DomainMesh provides a foundation for any product that needs structured data and controlled evolution. You can use it as the backbone for your SaaS platform, your internal operations system, or your data graph infrastructure.

### Use Case Cards

| Card | Description |
|---|---|
| SaaS products | Multi-tenant SaaS platforms with strict data integrity requirements. |
| Data Warehousing | Enterprise data models that need schema enforcement across services. |

---

## About Page (`/about`)

### Hero
- **Title**: Our Story

*(Company narrative — text visible in screenshot but partially readable)*

---

## Contact Page (`/contact`)

### Hero
- **Title**: Contact us
- **Body**: Feel free to contact us with any questions or concerns. You can use the form on our website or email us directly. We appreciate your interest and look forward to hearing from you.

### Contact Info
```
Daniel Molnár
Lindenhof 3
8604 Volketswil
```

### Form Fields
*(Contact form present — fields not fully enumerable from static analysis)*

---

## Footer (All Pages)

```
Questions? Reach out anytime, we're here.
[Contact us] (button)
© 2025. All rights reserved.
△ domainmesh (logo)
```

---

## SEO Metadata

| Meta | Value |
|---|---|
| Title | DomainMesh: Simplify Knowledge Graph Creation |
| OG Description | Build and manage knowledge graphs effortlessly with DomainMesh, designed to streamline your data modeling and enhance insights. |
