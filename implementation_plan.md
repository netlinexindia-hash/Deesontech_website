# IT Company Website Development Plan

## Goal Description
Create a modern, premium web presence for an IT company that sells software products and offers IT services. The site will have a public **User side** for customers and a secure **Admin side** for managing products, services, and site content (About, Contact, Careers, etc.).

## User Review Required
> [!IMPORTANT]
> Confirm the chosen technology stack and any third‑party services (e.g., authentication provider, database hosting). Approve the overall architecture before proceeding.

## Open Questions
> [!CAUTION]
> - Do you prefer a **single‑page application (SPA)** or a traditional multi‑page site?
> - Will you host the site on a cloud provider (e.g., Vercel, Netlify, AWS) or on‑premise?
> - Do you need role‑based admin access levels (e.g., editor vs. super‑admin)?
> - Any specific UI branding guidelines (colors, fonts, logo) we should follow?

## Proposed Changes
---
### Front‑end
- **Framework**: React with Vite for rapid development and hot‑module replacement.
- **Styling**: Tailwind CSS (optional – can be replaced by vanilla CSS if you prefer).
- **UI Library**: Headless UI + Radix for accessible components.
- **Routing**: React Router for separate public and admin routes.
- **State Management**: React Query for data fetching; Context API for auth state.
- **Authentication**: JWT‑based auth using Auth0 or a simple custom Node.js auth server.

### Back‑end / API
- **Language**: Node.js with TypeScript (offers type safety and aligns with React front‑end).
- **Framework**: Express.js or Fastify for a lightweight REST API.
- **Database**: PostgreSQL (relational, good for product/service catalogs) via Prisma ORM.
- **Admin Panel**: Separate API endpoints secured by admin JWT role.
- **File Storage**: Store product images on Cloudinary or AWS S3.

### Project Structure
```
my-it-website/
├─ client/            # React front‑end
│   ├─ src/
│   │   ├─ pages/          # Public pages (Home, Products, Services, About, Contact, Careers)
│   │   ├─ admin/          # Admin UI (Dashboard, ProductForm, ServiceForm, ContentEditor)
│   │   ├─ components/      # Reusable UI components
│   │   └─ App.tsx
│   └─ vite.config.ts
├─ server/            # Node/Express API
│   ├─ src/           
│   │   ├─ routes/        # /api/products, /api/services, /api/admin/*
│   │   ├─ controllers/
│   │   ├─ prisma/         # Prisma schema & migrations
│   │   └─ server.ts
│   └─ tsconfig.json
├─ .env                # Environment variables (DB URL, JWT secret, etc.)
└─ docker-compose.yml  # Optional containers for dev (Postgres, Redis)
```

### Key Features
- **Public Site**: Home, Product catalog (grid with filters), Service list, About, Contact form, Careers page (list of open positions).
- **Admin Dashboard**: Secure login, CRUD for products and services, upload images, edit static pages (About, Careers), view contact form submissions.
- **Responsive Design**: Mobile‑first layout with smooth animations and micro‑interactions (hover effects, card flips).
- **SEO**: Proper meta tags, Open Graph, sitemap generation, accessible HTML semantics.
- **Performance**: Code splitting, lazy‑load images, server‑side rendering (optional via Vite SSR if SEO is critical).

## Verification Plan
### Automated Tests
- **Front‑end**: Jest + React Testing Library for component rendering, form validation, auth flow.
- **Back‑end**: Jest + Supertest for API endpoints (CRUD, auth protection).
- **E2E**: Cypress tests covering user purchase flow and admin product creation.

### Manual Checks
- Deploy to a staging URL and verify visual design on desktop & mobile.
- Test admin login, create a product, ensure it appears on the public catalog.
- Submit the contact form and verify email receipt.

---
**Next Steps**
1. Confirm the technology choices and any preferred alternatives.
2. Provide branding assets (logo, color palette) if you have them.
3. Once approved, I will scaffold the repo and set up the initial project skeleton.
