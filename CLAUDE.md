<!-- GSD:project-start source:PROJECT.md -->
## Project

**Rouh**

Rouh is a two-sided brand website: a marketing/creative agency offering branded services (strategy, content, social, paid media, web, influencer partnerships) and a podcast studio that clients rent — with cameras and gear — to record their own podcast episodes with their own guests. The site currently exists as a React/TypeScript SPA (Agency, Podcast, Home, Contact pages) but is largely placeholder: generic copy, a podcast pricing model that doesn't match the actual studio-rental business, and no trust-building content. This project redesigns and re-scopes the frontend to feel premium, correctly represent the podcast studio offering, and promote both services with equal weight.

**Core Value:** A visitor immediately understands Rouh does two distinct things well — brand/marketing services and podcast studio rental — and the site feels polished and trustworthy enough to convert them into a booked call.

### Constraints

- **Design**: Must keep existing brand identity locked — Gotham font family, orange (#c1622e) and gold (#d9a253) theme colors, and the 4 existing graphic elements. Redesign is about elevation/polish and structure, not a rebrand.
- **Scope**: Frontend-only. No backend, no real integrations, no auth/payments.
- **Handoff**: Output of this GSD project is planning artifacts (PROJECT.md, REQUIREMENTS.md, ROADMAP.md, phase plans) for execution in Antigravity CLI, not code written in this Claude session.
- **Tech stack**: Stay within the existing stack (React 19, TypeScript, Vite, Tailwind CSS v4, React Router, React Hook Form) — no framework changes.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 6.0.2 - Core application code, type safety across entire project
- JavaScript (JSX/TSX) - React component rendering
- HTML5 - Page structure via React components
- CSS3 - Styling via Tailwind CSS
## Runtime
- Node.js 24.18.0 - Development and build execution
- npm 11.16.0
- Lockfile: `package-lock.json` present
## Frameworks
- React 19.2.7 - Component-based UI framework
- React DOM 19.2.7 - React rendering to DOM
- React Router DOM 7.18.1 - Client-side routing and navigation
- Tailwind CSS 4.3.3 - Utility-first CSS framework
- @tailwindcss/vite 4.3.3 - Vite integration for Tailwind CSS
- React Hook Form 7.83.0 - Form state management and validation
- Vite 8.1.1 - Fast build tool and dev server with HMR
- @vitejs/plugin-react 6.0.3 - React plugin for Vite (uses Oxc)
- Oxlint 1.71.0 - Fast JavaScript/TypeScript linter
## Key Dependencies
- react: Core UI framework - application cannot run without it
- react-dom: Renders React components to the browser DOM
- react-router-dom: Enables multi-page navigation and URL-based routing
- react-hook-form: Manages form state and validation logic
- @types/react: TypeScript type definitions for React
- @types/react-dom: TypeScript type definitions for React DOM
- @types/node: TypeScript type definitions for Node.js APIs
- typescript: Type checking and compilation to JavaScript
- vite: Build tool and dev server with fast hot module replacement
- @vitejs/plugin-react: Enables React support in Vite
- @tailwindcss/vite: Provides Tailwind CSS support in Vite
## Configuration
- No `.env` files detected - configuration is static/hardcoded
- Environment variables not currently used for dynamic configuration
- Calendly links configured in `src/data/config.ts`
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application TypeScript settings (target: ES2023, module: esnext)
- `tsconfig.node.json` - Node.js TypeScript settings (for build files)
- `.oxlintrc.json` - Linting rules and plugins
- Plugins: react, typescript, oxc
- Rules enforced:
## Platform Requirements
- Node.js 24.18.0 or compatible
- npm or yarn for dependency management
- Modern browser with ES2023 support
- Static hosting (no server required)
- Deployment target: Any static file server or CDN
- Build output: `/dist` directory (Vite-generated)
- Entry point: `index.html` serves React app
## Build Process
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components: PascalCase (e.g., `Button.tsx`, `SplitHero.tsx`, `ReservationModal.tsx`)
- Data/utility modules: camelCase or descriptive lowercase (e.g., `portfolio.ts`, `episodes.ts`, `config.ts`)
- Type definition files: `index.ts` for centralized type exports (`src/types/index.ts`)
- React components: PascalCase (e.g., `export function Button()`, `export function SectionHeading()`)
- Event handlers: `handle` prefix with camelCase (e.g., `handleSubmit`, `handleClose`, `onSubmit`)
- Utility functions: camelCase
- Local state and properties: camelCase (e.g., `const [open, setOpen] = useState(false)`, `const selectedTierName`)
- Component props: camelCase (e.g., `className`, `onClick`, `aria-label`)
- Destructured props: camelCase (e.g., `{ variant, children, className }`)
- Interfaces: PascalCase with `Props` suffix for component props (e.g., `ButtonProps`, `SectionHeadingProps`, `ReservationFormProps`)
- Type unions: PascalCase (e.g., `type Variant = "primary" | "secondary" | "ghost"`, `type ReservationMode = "agency" | "podcast"`)
- Data model interfaces: PascalCase without suffix (e.g., `Service`, `PortfolioItem`, `Plan`, `Episode`, `GuestTier`)
- Module-level constants: UPPER_SNAKE_CASE (e.g., `CALENDLY_LINKS`, `EMAIL_PATTERN`)
- Style string constants: camelCase (e.g., `const inputClass = "w-full rounded-lg..."`, `const labelClass = "text-sm font-bold..."`)
## Code Style
- Indentation: 2 spaces
- Line length: No strict limit enforced, but readable wrapping observed
- Semicolons: Required at end of statements
- Arrow functions: Preferred for callbacks and handlers
- Tool: oxlint (`oxlint` v1.71.0)
- Run command: `npm run lint`
- Configuration: Minimal/default (no .eslintrc found)
- Key enforcements: TypeScript strict mode
- Target: `es2023`
- JSX: `react-jsx` (automatic JSX transform)
- Strict checks enabled:
- Module system: `esnext` with bundler module resolution
- JSX Extensions: Allowed with `allowArbitraryExtensions: true`
## Import Organization
- Explicit `type` keyword for type imports (e.g., `import type { ReactNode } from "react"`)
- Relative path imports (no path aliases configured)
- Components imported by folder name when re-exported from index (pattern not yet used, but structure supports it)
## Error Handling
- Uses `react-hook-form` for client-side validation (`src/pages/Contact.tsx`, `src/components/shared/ReservationForm.tsx`)
- Validation rules passed to `register()` with `required` and `pattern` validators
- Error state checked via `formState.errors`
- Error messages displayed conditionally below form fields
- Optional fields are handled with `?:` optional property syntax
- Conditional rendering based on state (e.g., `if (!open) return null` in `Modal`)
## Logging
- Event logging: `console.info()` for form submissions and placeholder handlers
- Used in: `src/pages/Contact.tsx`, `src/components/shared/ReservationModal.tsx`
## Comments
- TODO markers for future work (e.g., `// TODO: replace with real submission (email service / backend API)`)
- Placeholder notes for content (e.g., `// Placeholder episodes — replace with real titles...`)
- Comments reference file paths for configuration (e.g., "Calendar link is a placeholder. See CALENDLY_LINKS in src/data/config.ts")
- Minimal JSDoc usage
- No enforced JSDoc comments on functions or types
- Some inline comments explaining context but not formal documentation
## Function Design
- Small, focused functions preferred (5-20 lines typical)
- Component functions in range of 10-75 lines
- Complex components broken into smaller sub-components (e.g., `ReservationModal` splits form and confirmation into separate components)
- Props passed as single destructured object (React component pattern)
- Interfaces always defined for component props
- Type signatures required for all function parameters
- React components return JSX (type: `ReactNode` or component element)
- Custom hooks return values or tuples following React Hook conventions
- Utility functions return strongly-typed values
## Module Design
- Named exports for components and utilities (e.g., `export function Button()`, `export const services: Service[]`)
- Default export for App entry point only (`src/App.tsx`: `export default App`)
- Type exports with `export interface` and `export type`
- Not yet used but structure supports it (e.g., `src/components/ui/` could export from `index.ts`)
- Currently each component imported directly by filename
- **UI Components**: `src/components/ui/` — reusable, stateless/minimal-state components (Button, Modal, SectionHeading, GraphicAccent)
- **Page Components**: `src/pages/` — full-page route handlers (Home, Agency, Podcast, Contact)
- **Layout Components**: `src/components/layout/` — structural wrapper components (Header, Footer, Layout)
- **Feature Components**: `src/components/home/`, `src/components/agency/`, `src/components/podcast/`, `src/components/shared/` — domain-specific components
- **Data**: `src/data/` — static data and configuration (episodes, plans, services, config)
- **Types**: `src/types/` — centralized type definitions
## Tailwind CSS Patterns
- Utility-first CSS via Tailwind v4.3.3
- No component classes (no `@apply` abstractions for reuse in components)
- Inline className strings with conditional Tailwind classes
- Style constants for repeated patterns (e.g., `inputClass`, `labelClass`, `errorClass` in forms)
- Gold and orange custom colors: `--color-gold: #d9a253`, `--color-orange: #c1622e`
- Custom font: Gotham (fallback: Poppins, ui-sans-serif)
- Gradient utility: `.bg-gradient-brand` and `.text-gradient-brand`
## Accessibility
- ARIA labels for interactive elements (e.g., `aria-label="Close dialog"` on button)
- ARIA attributes for form validation (e.g., `aria-invalid`, `aria-describedby` on inputs)
- Semantic HTML (`<form>`, `<label>`, `<nav>`, `role="dialog"`)
- Focus management (modals trap focus via `tabIndex={-1}` and `ref` tracking)
- Keyboard support (Escape key closes modals; keyboard events managed in `useEffect`)
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
```
## Component Responsibilities
| Component | Responsibility | File |
|-----------|----------------|------|
| App | Route configuration & router setup | `src/App.tsx` |
| Layout | Wraps all pages with Header and Footer structure | `src/components/layout/Layout.tsx` |
| Header | Navigation and mobile menu | `src/components/layout/Header.tsx` |
| Footer | Footer content and links | `src/components/layout/Footer.tsx` |
| Home Page | Landing page with hero, about, agency/podcast teasers | `src/pages/Home.tsx` |
| Agency Page | Agency services, portfolio, pricing plans | `src/pages/Agency.tsx` |
| Podcast Page | Episodes, guest tier pricing, reservations | `src/pages/Podcast.tsx` |
| Contact Page | Contact information and inquiries | `src/pages/Contact.tsx` |
## Pattern Overview
- Component-driven UI with React functional components
- Route-based page navigation with React Router DOM
- TypeScript for type safety across the application
- Tailwind CSS with custom theme for styling
- React Hook Form for form state management
- Static data stored in separate modules
## Layers
- Purpose: Define page-level composition and layout
- Location: `src/pages/`
- Contains: Full-page components (Home, Agency, Podcast, Contact)
- Depends on: Components, data, types
- Used by: Router in App.tsx
- Purpose: Reusable UI components organized by feature/domain
- Location: `src/components/`
- Depends on: Types, data (for imports), child components
- Used by: Pages and other components
- Purpose: Centralized static data and configuration
- Location: `src/data/`
- Contains: Services, episodes, plans, guest tiers, portfolio, config (CALENDLY_LINKS)
- Depends on: Types
- Used by: Pages and components
- Purpose: Define shared TypeScript interfaces
- Location: `src/types/index.ts`
- Contains: Service, PortfolioItem, Plan, Episode, GuestTier, ReservationFormData, ReservationMode
- Purpose: Global styles and Tailwind CSS configuration
- Location: `src/styles/index.css`
- Contains: @font-face declarations, custom CSS theme variables, Tailwind imports
- Custom theme: Gotham font family, orange color (#c1622e), gold color (#d9a253)
## Data Flow
### Primary Request Path (Page Navigation)
### Reservation Modal Flow
- Page-level state via `useState` for selected plans/tiers
- Form state via `react-hook-form` useForm hook
- Route state via React Router params/navigation
- No global state library (Redux/Zustand) - all state is local to components
## Key Abstractions
- Purpose: Reusable button styles with variants (primary, secondary, ghost)
- Examples: `src/components/ui/Button.tsx`
- Pattern: Exported as `Button` and `LinkButton` with variant props; uses Tailwind CSS classes composed via JavaScript
- Purpose: Reusable modal dialog with open/close logic and backdrop
- Examples: `src/components/ui/Modal.tsx`, `src/components/shared/ReservationModal.tsx`
- Pattern: Controls visibility, focus trapping via useRef, and escape key handling
- Purpose: Display pricing tiers with features and selection
- Examples: `src/components/agency/PlanCard.tsx`, `src/components/podcast/GuestTierCard.tsx`
- Pattern: Accept data object and onClick callback; use Button component for CTA
- Purpose: Multi-step reservation flow (form → confirmation)
- Examples: `src/components/shared/ReservationForm.tsx`, `src/components/shared/ConfirmationStep.tsx`, `src/components/shared/ReservationModal.tsx`
- Pattern: Form accepts `mode` ("agency" or "podcast") to customize labels; confirmation provides link to Calendly
## Entry Points
- Location: `index.html`
- Triggers: Page load
- Responsibilities: Loads HTML shell, mounts React app to `<div id="root">`
- Location: `src/main.tsx`
- Triggers: JavaScript module load
- Responsibilities: Initializes React Root and renders App component with StrictMode
- Location: `src/App.tsx`
- Triggers: React component mount
- Responsibilities: Sets up BrowserRouter, defines all routes, wraps routes with Layout
## Architectural Constraints
- **Threading:** Single-threaded event loop (browser JavaScript)
- **Global state:** None. All state is local to components via hooks
- **Circular imports:** None detected
- **Form state:** Managed via react-hook-form; validation patterns centralized in ReservationForm
- **Styling:** Tailwind CSS with custom theme in `src/styles/index.css`; no CSS Modules or other scoped CSS approaches
- **Asset loading:** SVG logos and graphic elements imported as modules in components; fonts loaded via @font-face
- **Data immutability:** All data in `src/data/` is declared as constants and never mutated
## Anti-Patterns
### Direct SVG File Imports in Components
### Inline Tailwind Classes Everywhere
### Too Much Logic in Page Components
## Error Handling
- Form validation: react-hook-form handles validation with error messages
- No try-catch blocks or error boundaries detected
- No API error handling (static data only)
## Cross-Cutting Concerns
- Form validation: EMAIL_PATTERN regex in ReservationForm for email validation
- No schema validation library (Zod, Yup) detected
- Semantic HTML: `<header>`, `<main>`, `<footer>` used appropriately
- ARIA attributes: aria-label, aria-expanded, aria-invalid, aria-describedby used in Header and ReservationForm
- Focus management: focus-visible styles applied globally
- Mobile navigation: Header implements accessible mobile menu with aria-controls
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
