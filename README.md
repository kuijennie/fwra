# Farm Waste Recycling Advisor (FWRA)

A Web Application that helps Kenyan farmers log agricultural waste, receive personalized recycling recommendations, access step-by-step tutorials, and connect with buyers for processed organic products.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Internationalization](#internationalization)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)

---

## Project Overview

Kenya generates 3,000–4,000 tons of agricultural waste daily, and 80% of Nairobi's waste is organic. FWRA bridges the gap between waste and value by:

- Guiding farmers through waste classification, volume measurement, and location tagging
- Generating scored recycling method recommendations (composting, biogas, mulching, animal feed, vermicomposting)
- Providing multilingual tutorials with step-by-step instructions
- Connecting farmers to verified buyers through a product marketplace
- Scheduling task reminders for ongoing recycling processes
- Delivering activity reports and adoption analytics

**Target Users:** Smallholder farmers in Kenya, agribusiness buyers, and platform administrators.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router + Turbopack) | 16.1.1 |
| UI Library | React | 19.2.3 |
| Backend / DB | Convex | 1.31.2 |
| Auth | Clerk (`@clerk/nextjs`) | 6.37.5 |
| i18n | next-intl | 4.7.0 |
| Styling | Tailwind CSS | 4 |
| Dark Mode | next-themes | 0.4.6 |
| Data Viz | Recharts | 3.7.0 |
| Date Utilities | date-fns | 4.1.0 |
| Icons | `@phosphor-icons/react` | 2.1.7 |
| Icons (secondary) | lucide-react | 0.562.0 |
| Schema Validation | Zod | 4.3.5 |
| Markdown | react-markdown | 10.1.0 |
| Class Utilities | clsx, tailwind-merge | 2.1.1 / 3.4.0 |
| AI Chat | OpenAI API | — |

---

## Project Structure

```
fwra/
├── app/
│   ├── layout.tsx                        # Root layout (non-localized)
│   ├── globals.css                       # Global styles
│   ├── manifest.ts                       # PWA manifest
│   ├── offline/
│   │   └── page.tsx                      # Offline fallback page
│   ├── api/
│   │   └── chat/route.ts                 # AI chat API route (OpenAI)
│   └── [locale]/                         # Dynamic locale segment
│       ├── layout.tsx                    # Locale layout (Header, MobileNav, ChatWidget)
│       ├── page.tsx                      # Home page (server component)
│       ├── home-client.tsx               # Home page (client, role-aware)
│       ├── waste-input/                  # Log a waste entry
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── recommendations/              # View recycling recommendations
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── tutorials/                    # Tutorial library
│       │   ├── page.tsx
│       │   ├── client.tsx
│       │   └── [category]/
│       │       ├── page.tsx
│       │       ├── client.tsx
│       │       └── [slug]/
│       │           ├── page.tsx
│       │           └── client.tsx
│       ├── marketplace/                  # Browse buyers & listings
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── success-stories/              # Farmer success stories
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── reminders/                    # Task reminders
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── reports/                      # Activity analytics
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── profile/
│       │   └── page.tsx                  # User profile settings
│       ├── farmer/                       # Farmer dashboard (role-gated)
│       │   ├── page.tsx
│       │   ├── client.tsx
│       │   └── sell/                    # Post product listings
│       │       ├── page.tsx
│       │       └── client.tsx
│       ├── buyer/                        # Buyer dashboard (role-gated)
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── admin/                        # Admin panel (role-gated)
│       │   ├── page.tsx
│       │   └── client.tsx
│       ├── sign-in/[[...sign-in]]/
│       │   └── page.tsx                  # Clerk sign-in
│       └── sign-up/[[...sign-up]]/
│           └── page.tsx                  # Clerk sign-up
│
├── components/
│   ├── accessibility/
│   │   └── skip-link.tsx                # Skip-to-content (a11y)
│   ├── auth/
│   │   ├── role-guard.tsx               # Restrict UI by role
│   │   └── user-bootstrap.tsx           # Clerk ↔ Convex user sync
│   ├── layout/
│   │   ├── header.tsx                   # Top navigation bar
│   │   ├── mobile-nav.tsx               # Bottom navigation (mobile)
│   │   └── language-switcher.tsx        # en/sw toggle
│   ├── forms/
│   │   ├── waste-input-form.tsx         # Multi-step waste entry form
│   │   ├── waste-type-selector.tsx
│   │   ├── volume-input.tsx
│   │   ├── location-picker.tsx
│   │   ├── resource-checklist.tsx
│   │   └── season-selector.tsx
│   ├── recommendations/
│   │   ├── recommendation-card.tsx
│   │   └── recommendation-list.tsx
│   ├── reminders/
│   │   ├── ReminderForm.tsx
│   │   ├── ReminderCard.tsx
│   │   └── ReminderList.tsx
│   ├── tutorials/
│   │   ├── tutorial-card.tsx
│   │   ├── tutorial-grid.tsx
│   │   ├── category-tabs.tsx
│   │   └── step-viewer.tsx
│   ├── success-stories/
│   │   └── SuccessStoryCard.tsx
│   ├── marketplace/
│   │   ├── BuyerCard.tsx
│   │   ├── BuyerGrid.tsx
│   │   └── SearchFilters.tsx
│   ├── reports/
│   │   └── monthly-activity-chart.tsx   # Recharts visualization
│   ├── legal/
│   │   ├── LegalDocumentCard.tsx
│   │   └── LegalDocumentList.tsx
│   ├── chat/
│   │   └── chat-widget.tsx              # Floating AI assistant
│   ├── providers/
│   │   ├── convex-client-provider.tsx   # ConvexProviderWithClerk
│   │   └── theme-provider.tsx           # Dark mode provider
│   ├── pwa/
│   │   ├── pwa-provider.tsx
│   │   ├── offline-banner.tsx
│   │   └── update-prompt.tsx
│   └── ui/                              # Base design system
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── checkbox.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── skeleton.tsx
│       └── optimized-image.tsx
│
├── convex/
│   ├── schema.ts                        # Database schema (11 tables)
│   ├── auth.config.ts                   # Clerk auth configuration
│   ├── init.ts                          # Seed/init functions
│   ├── users.ts                         # User CRUD & auth bootstrap
│   ├── wasteEntries.ts                  # Waste entry queries/mutations
│   ├── wasteListings.ts                 # Farmer product listings
│   ├── recommendations.ts               # Recommendation generation
│   ├── tutorials.ts                     # Tutorial queries
│   ├── successStories.ts                # Success story queries
│   ├── buyers.ts                        # Buyer directory queries
│   ├── reminders.ts                     # Reminder CRUD
│   ├── legalDocuments.ts                # Legal document queries
│   ├── reports.ts                       # Analytics & reporting
│   ├── seedData/
│   │   ├── tutorials.ts
│   │   ├── successStories.ts
│   │   ├── buyers.ts
│   │   └── legalDocuments.ts
│   └── _generated/                      # Auto-generated Convex types
│
├── lib/
│   ├── auth/
│   │   └── roles.ts                     # AppRole type & nav items by role
│   ├── i18n/
│   │   ├── config.ts                    # Locale list & metadata
│   │   ├── request.ts                   # Server-side i18n config
│   │   ├── routing.ts                   # next-intl routing
│   │   └── navigation.ts               # Typed Link & navigation utils
│   ├── constants/
│   │   ├── waste-types.ts               # 23 waste subtypes, units, resources, seasons
│   │   ├── recycling-methods.ts         # 5 recycling methods with scoring
│   │   └── counties.ts                  # All 47 Kenyan counties
│   ├── hooks/
│   │   ├── use-session.ts               # Anonymous session ID (localStorage)
│   │   └── use-online-status.ts         # Online/offline detection
│   └── utils/
│       └── cn.ts                        # clsx + tailwind-merge helper
│
├── messages/
│   ├── en.json                          # English translations
│   ├── sw.json                          # Swahili translations
│   ├── ki.json                          # Kikuyu translations
│   ├── lu.json                          # Luhya translations
│   └── ka.json                          # Kamba translations
│
├── middleware.ts                         # Clerk + next-intl middleware
├── next.config.ts                        # Next.js configuration
├── tailwind.config.ts                    # Tailwind configuration
├── package.json
└── pnpm-lock.yaml
```

---

## Features

### Anonymous Users
- **Waste Entry Logging** (`/waste-input`) — Multi-step form: select waste type (23 subtypes across 5 categories), enter volume (kg/bags/wheelbarrows), pick county and sub-county, specify available resources and current season, add notes.
- **Recommendations** (`/recommendations`) — View scored recycling method recommendations (0–100 match score) with reasoning, difficulty rating (beginner/intermediate/advanced), estimated duration, required resources, and benefits.
- **Tutorial Library** (`/tutorials`) — Browse and filter tutorials by category (composting, biogas, mulching, animal feed). View step-by-step guides with images, tips, and optional video links.
- **Success Stories** (`/success-stories`) — Filter farmer testimonials by method or county.
- **Marketplace** (`/marketplace`) — Browse verified buyers and available product listings by county and product type.
- **Reports** (`/reports`) — View personal activity analytics (total waste logged, methods recommended/adopted, monthly breakdown chart).
- **AI Chat Assistant** — Floating chat widget for real-time recycling advice powered by OpenAI.
- **Reminders** (`/reminders`) — Schedule recurring or one-off task reminders (turn compost, check biogas, harvest, etc.).

### Farmer Role (`/farmer`)
All anonymous features, plus:
- **Farmer Dashboard** — Personalized quick-action panel.
- **Sell Listings** (`/farmer/sell`) — Post processed waste products for sale (title, waste type, quantity, price in KES, county, contact details). Manage listing status (available / sold / expired).

### Buyer Role (`/buyer`)
- **Buyer Dashboard** — Overview of available listings and counties covered.
- **Marketplace** — Browse and filter farmer listings by county and product type.
- **Tutorial Library** and **Success Stories**.

### Admin Role (`/admin`)
- **Admin Dashboard** — Platform-wide stats: user counts by role, content stats, county coverage.
- **User Management** — View all users, change roles.
- **Buyer Management** — Verify/manage buyer accounts.
- **Content Moderation** — Review all listings.

---

## Database Schema

All data is stored in [Convex](https://convex.dev). Below is a summary of each table.

### `users`
Stores both authenticated (Clerk) and anonymous users.

| Field | Type | Notes |
|---|---|---|
| `clerkId` | string? | Clerk user ID (optional for anonymous) |
| `name` | string | Display name |
| `phone` | string? | Contact phone |
| `email` | string? | Email address |
| `role` | `farmer \| buyer \| admin` | User role |
| `county` | string | One of 47 Kenyan counties |
| `subCounty` | string? | Sub-county |
| `preferredLanguage` | `en \| sw \| ki \| lu \| ka` | UI language |
| `farmSize` | number? | Farm size in acres |
| `createdAt` | number | Timestamp |
| `lastActive` | number | Timestamp |

Indexes: `by_county`, `by_language`, `by_clerk_id`, `by_role`

---

### `wasteEntries`
A logged waste submission from a farmer or anonymous session.

| Field | Type | Notes |
|---|---|---|
| `sessionId` | string | Anonymous session ID |
| `userId` | Id? | Linked Convex user (if authenticated) |
| `wasteType` | string | Primary waste category |
| `wasteSubType` | string | One of 23 subtypes (e.g., `maize_stalks`, `cow_dung`) |
| `volumeKg` | number | Volume in kg |
| `volumeUnit` | `kg \| bags \| wheelbarrows` | Unit as entered |
| `location` | object | `{ county, subCounty?, coordinates? }` |
| `availableResources` | string[] | e.g., `["water", "labor", "containers"]` |
| `currentSeason` | `dry \| wet \| transition` | Season at time of entry |
| `notes` | string? | Additional notes |
| `imageUrls` | string[]? | Uploaded images |
| `status` | `pending \| processing \| completed` | Processing status |
| `createdAt` | number | Timestamp |

Indexes: `by_session`, `by_user`, `by_waste_type`, `by_status`, `by_county`

---

### `recommendations`
Generated recycling recommendations for a waste entry.

| Field | Type | Notes |
|---|---|---|
| `wasteEntryId` | Id | Parent waste entry |
| `sessionId` | string | Session reference |
| `userId` | Id? | User reference |
| `method` | `composting \| biogas \| mulching \| animal_feed \| vermicompost` | Recommended method |
| `matchScore` | number | 0–100 suitability score |
| `reasoning` | `{ en, sw }` | Multilingual explanation |
| `estimatedDuration` | string | e.g., "6–8 weeks" |
| `estimatedYield` | string? | Expected output |
| `requiredResources` | string[] | Resources needed |
| `difficulty` | `beginner \| intermediate \| advanced` | Skill level |
| `benefits` | `{ en, sw }[]` | Multilingual benefit list |
| `relatedTutorialIds` | Id[] | Linked tutorials |
| `isSelected` | boolean | Whether farmer chose this method |
| `createdAt` | number | Timestamp |

Indexes: `by_waste_entry`, `by_session`, `by_user`, `by_method`, `by_selected`

---

### `tutorials`
Step-by-step recycling guides.

| Field | Type | Notes |
|---|---|---|
| `slug` | string | URL-friendly identifier |
| `category` | `composting \| biogas \| mulching \| animal_feed` | Category |
| `title` | `{ en, sw, ki?, lu?, ka? }` | Multilingual title |
| `description` | `{ en, sw, ki?, lu?, ka? }` | Multilingual description |
| `difficulty` | `beginner \| intermediate \| advanced` | Skill level |
| `duration` | string | Time estimate |
| `steps` | object[] | `{ stepNumber, title {en,sw}, content {en,sw}, imageUrl?, tipText? }` |
| `videoUrl` | string? | Optional video |
| `thumbnailUrl` | string? | Thumbnail image |
| `applicableWasteTypes` | string[] | Compatible waste types |
| `requiredResources` | string[] | Resources needed |
| `viewCount` | number | View counter |
| `isPublished` | boolean | Publication status |
| `createdAt` / `updatedAt` | number | Timestamps |

Indexes: `by_category`, `by_slug`, `by_difficulty`, `by_published`

---

### `successStories`
Farmer testimonials and case studies.

| Field | Type | Notes |
|---|---|---|
| `tutorialId` | Id? | Related tutorial |
| `farmerName` | string | Farmer name |
| `county` | string | County |
| `method` | string | Recycling method used |
| `story` | `{ en, sw }` | Multilingual story |
| `results` | `{ en, sw }` | Multilingual outcomes |
| `imageUrls` | string[]? | Images |
| `isApproved` | boolean | Admin approval status |
| `createdAt` | number | Timestamp |

Indexes: `by_method`, `by_county`, `by_approved`

---

### `buyers`
Verified buyers in the marketplace directory.

| Field | Type | Notes |
|---|---|---|
| `userId` | Id? | Linked Convex user |
| `businessName` | string | Business name |
| `contactPerson` | string | Contact name |
| `phone` / `email` / `whatsapp` | string | Contact details |
| `county` / `subCounty` / `address` | string | Location |
| `coordinates` | `{ lat, lng }?` | GPS coordinates |
| `productTypes` | string[] | e.g., `["compost", "biogas_equipment"]` |
| `description` | `{ en, sw }` | Multilingual description |
| `priceRange` | `{ en, sw }?` | Price range info |
| `logoUrl` | string? | Business logo |
| `isVerified` / `isActive` | boolean | Platform verification flags |
| `rating` | number? | Average rating |
| `reviewCount` | number | Number of reviews |

Indexes: `by_county`, `by_verified`, `by_active`

---

### `wasteListings`
Processed waste products posted for sale by farmers.

| Field | Type | Notes |
|---|---|---|
| `userId` | Id | Selling farmer |
| `title` | string | Listing title |
| `wasteType` | string | `compost \| biogas_slurry \| silage \| mulch \| animal_feed \| vermicompost \| bio_fertilizer \| other` |
| `processedFrom` | string? | Source waste type |
| `quantityKg` | number | Quantity available |
| `pricePerKg` | number? | Price in KES |
| `county` / `subCounty` | string | Location |
| `description` | string | Listing description |
| `contactPhone` / `contactWhatsapp` | string | Contact details |
| `status` | `available \| sold \| expired` | Listing status |
| `imageUrls` | string[]? | Product images |

Indexes: `by_user`, `by_status`, `by_county`, `by_waste_type`

---

### `reminders`
Scheduled task reminders for ongoing recycling processes.

| Field | Type | Notes |
|---|---|---|
| `sessionId` | string | Session reference |
| `userId` | Id? | User reference |
| `wasteEntryId` / `recommendationId` | Id? | Context references |
| `title` | `{ en, sw }` | Multilingual title |
| `description` | `{ en, sw }?` | Multilingual description |
| `taskType` | `turn_compost \| check_biogas \| harvest \| water \| custom` | Task category |
| `dueDate` | number | Due timestamp |
| `repeatInterval` | `daily \| weekly \| custom`? | Recurrence |
| `repeatDays` | number? | Days between repeats |
| `isCompleted` / `completedAt` | boolean / number? | Completion state |
| `notificationSent` | boolean | Notification flag |

Indexes: `by_session`, `by_user`, `by_due_date`, `by_completed`

---

### `legalDocuments`
Kenyan waste management regulations and guidelines.

| Field | Type | Notes |
|---|---|---|
| `slug` | string | URL-friendly ID |
| `title` / `content` / `summary` | `{ en, sw }` | Multilingual content |
| `category` | `waste_management_act \| sorting_guidelines \| permits` | Document type |
| `keyPoints` | `{ en, sw }[]` | Multilingual key points |
| `effectiveDate` | string? | Effective date |
| `lastUpdated` | string | Last updated date |
| `isPublished` | boolean | Publication status |

Indexes: `by_slug`, `by_category`, `by_published`

---

## Authentication

Auth is handled by **Clerk** with Convex integration via `ConvexProviderWithClerk`.

### Flow

1. **Anonymous users** are tracked by a `sessionId` generated client-side in `localStorage` (key: `fwra_session_id`, managed in `lib/hooks/use-session.ts`). All Convex queries and mutations accept `sessionId` as an argument, so data persists across visits without an account.

2. **Sign-in / Sign-up** is handled by Clerk at `/sign-in` and `/sign-up` using Clerk's hosted UI components.

3. **User Bootstrap** — `components/auth/user-bootstrap.tsx` runs silently on app load. When a Clerk session is detected, it calls `convex/users.ts:getOrCreateFromClerk` to create or link the Convex user record. It also calls `linkSessionToUser` to attach any anonymous session data to the authenticated account.

4. **Role assignment** — New users are seeded with `role: "farmer"` by default. Admins can change roles via the admin dashboard.

5. **Middleware** — `middleware.ts` wraps `clerkMiddleware()` around the next-intl middleware, applying auth and locale detection to all routes.

6. **Role-gated UI** — `components/auth/role-guard.tsx` accepts an `allowedRoles: AppRole[]` prop and shows an access-denied message (with a redirect link) if the current user's role is not permitted.

### Navigation by Role

Role-based navigation is defined in `lib/auth/roles.ts`:

| Role | Dashboard Route | Key Nav Items |
|---|---|---|
| Anonymous | `/waste-input` | Waste Input, Recommendations, Tutorials, Marketplace |
| `farmer` | `/farmer` | Farmer Dashboard, Log Waste, Sell, Recommendations, Marketplace |
| `buyer` | `/buyer` | Buyer Dashboard, Marketplace, Tutorials |
| `admin` | `/admin` | Admin Dashboard, Marketplace, Tutorials |

---

## Internationalization

FWRA uses **next-intl** for all UI text.

### Supported Locales

| Code | Language | Routing |
|---|---|---|
| `en` | English | Default (no prefix) |
| `sw` | Swahili | `/sw/...` |

Active routing locales are `en` and `sw`, configured in `lib/i18n/routing.ts` with `localePrefix: "as-needed"` (English has no prefix; Swahili is prefixed).

### Translation Structure

Translation files live in `messages/`. Each file shares the same key structure:

```
messages/
├── en.json
├── sw.json
├── ki.json
├── lu.json
└── ka.json
```

Top-level namespaces in `en.json`:

| Namespace | Purpose |
|---|---|
| `common` | Shared labels (app name, buttons, tagline) |
| `nav` | Navigation item labels |
| `home` | Home page sections |
| `wasteInput` | Waste logging form |
| `recommendations` | Recommendation display |
| `tutorials` | Tutorial library |
| `marketplace` | Marketplace tabs and filters |
| `reminders` | Reminder creation and listing |
| `legal` | Legal document display |
| `profile` | User profile settings |
| `stories` | Success stories |
| `reports` | Activity reports |
| `wasteTypes` | Waste type labels |
| `counties` | All 47 Kenyan county names |
| `admin` | Admin panel |
| `roles` | Role display names |
| `farmerDashboard` | Farmer dashboard |
| `buyerDashboard` | Buyer dashboard |
| `roleGuard` | Access-denied messages |
| `sell` | Farmer listing management |

Database content (tutorial titles, descriptions, story text, buyer descriptions) is stored as multilingual objects directly in Convex: `{ en: "...", sw: "..." }`.

### Usage in Components

Server components call `setRequestLocale(locale)` then render a client component. Client components use the `useTranslations` hook:

```typescript
const t = useTranslations('wasteInput')
// t('title') → "Log Your Waste"
```

The `LanguageSwitcher` component in the header lets users toggle between `en` and `sw` at any time.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) (this project uses pnpm — do not use npm or yarn)
- A [Convex](https://convex.dev) account
- A [Clerk](https://clerk.com) account
- An [OpenAI](https://platform.openai.com) API key (for the chat assistant)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd fwra
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file at the project root (see [Environment Variables](#environment-variables) below).

4. **Initialize Convex**

   ```bash
   pnpm dlx convex dev
   ```

   This will link your project to a Convex deployment and push the schema. Keep this process running during development.

5. **Configure Clerk in Convex**

   In your [Convex dashboard](https://dashboard.convex.dev), add the following environment variable:

   ```
   CLERK_ISSUER_URL=https://<your-clerk-frontend-api>.clerk.accounts.dev
   ```

   Then uncomment the Clerk domain configuration in `convex/auth.config.ts`.

6. **Start the development server**

   In a separate terminal:

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

7. **Seed initial data** (optional)

   The `convex/seedData/` directory contains sample tutorials, buyers, success stories, and legal documents. Run the seed functions via the Convex dashboard or CLI to populate the database.

---

## Available Scripts

All scripts are run with `pnpm <script>`.

| Script | Description |
|---|---|
| `dev` | Start the development server with Turbopack |
| `build` | Build the application for production |
| `start` | Start the production server |
| `lint` | Run ESLint across the project |

> **Note:** Run `pnpm dlx convex dev` in a separate terminal alongside `pnpm dev` to keep the Convex backend in sync during development.

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Convex
CONVEX_DEPLOYMENT=dev:<your-deployment-slug>
NEXT_PUBLIC_CONVEX_URL=https://<your-deployment-slug>.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# OpenAI (for AI chat assistant)
OPENAI_API_KEY=sk-proj-...
```

| Variable | Required | Description |
|---|---|---|
| `CONVEX_DEPLOYMENT` | Yes | Your Convex deployment identifier |
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Public URL of your Convex backend |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (safe to expose client-side) |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key (server-side only — keep private) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | Path for Clerk sign-in redirect |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Yes | Path for Clerk sign-up redirect |
| `OPENAI_API_KEY` | Yes | OpenAI API key for the recycling advice chat assistant |

> **Security:** Never commit `.env.local` to version control. Add it to `.gitignore`.
