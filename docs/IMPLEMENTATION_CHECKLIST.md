# HKBK Lost & Found Portal — Implementation Checklist

Track progress phase by phase. Check items off as they are completed.

---

## PHASE 1 — Foundation ✅

- [x] Vite + React + TypeScript project scaffolded
- [x] tsconfig.json with path aliases (`@/`)
- [x] .env.example with configurable API URL and image storage
- [x] .gitignore
- [x] TypeScript types: auth, item, claim, key, api
- [x] Constants: statuses, categories, locations, camera constraints
- [x] Utility functions: formatters, validators (Zod schemas)
- [x] Axios client with Bearer token injection + 401/refresh handling
- [x] API modules: auth, items, claims, keys, aiMatch
- [x] Zustand stores: auth, item, claim, key, ui
- [x] Custom hooks: useAuth, useCamera, useItems, useClaims
- [x] Route guards: ProtectedRoute (role-based)
- [x] Route structure: StudentRoutes, AdminRoutes
- [x] Placeholder pages (no visual design)
- [x] Dev fixtures (clearly separated, not in production paths)
- [x] Backend contracts document
- [x] Implementation checklist

**Blocked:** Figma design references not yet received.

---

## PHASE 2 — UI Shell (PENDING Figma)

Requires: Figma design screenshots + design tokens

- [ ] Install Tailwind CSS
- [ ] Configure design tokens (colours, typography, spacing from Figma)
- [ ] App layout shell (Navbar, Sidebar, Footer)
- [ ] Login page — exact Figma design
- [ ] Register page — exact Figma design
- [ ] Student dashboard shell
- [ ] Admin dashboard shell
- [ ] Responsive breakpoints

---

## PHASE 3 — Custom Camera Module (PENDING Figma)

Requires: Figma camera modal design

- [ ] CameraModal component — Figma-exact design
- [ ] CameraFeed component — live video element
- [ ] Image capture → canvas → Blob
- [ ] Retake / Confirm flow
- [ ] Camera error states: permission denied, not available
- [ ] Gallery upload fallback
- [ ] Mobile + desktop layout
- [ ] Camera tracks stopped on modal close

---

## PHASE 4 — Profile & Keys (PENDING Figma)

Requires: Figma profile + keys screen design

- [ ] ProfileCard component
- [ ] KeysSection component
- [ ] Add key form (HOD/admin)
- [ ] Revoke key action (HOD/admin)
- [ ] Keys table / list view
- [ ] Loading, success, error states
- [ ] Connect keysApi + keyStore

---

## PHASE 5 — Item Management & Claims (PENDING Figma)

Requires: Figma item cards, detail pages, claim modal

- [ ] ItemCard component — Figma-exact
- [ ] StatusBadge component — 4 status colours from Figma
- [ ] ItemCarousel for AI matches
- [ ] ReportLostForm — connected to itemStore.reportLost
- [ ] ReportFoundForm — connected to itemStore.reportFound
- [ ] ItemDetailPage — connected to itemStore.fetchItemById
- [ ] Claim button — hidden when reporter || status ≠ Available
- [ ] ClaimForm modal — connected to claimStore.submitClaim
- [ ] Duplicate claim prevention
- [ ] Admin status update controls
- [ ] Search + category filter

---

## PHASE 6 — AI Matches (PENDING backend + Figma)

Requires: Figma carousel/grid design + backend AI endpoint

- [ ] AiMatchesSection component
- [ ] Connect aiMatchApi.getMatches
- [ ] Loading skeleton
- [ ] Empty state ("No matches found")
- [ ] Error state ("AI matching unavailable")
- [ ] Match cards link to ItemDetailPage

---

## PHASE 7 — Backend Integration (PENDING backend)

Requires: Running backend server

- [ ] Connect auth (login, register, logout, refresh)
- [ ] Connect items (CRUD, status updates)
- [ ] Connect claims (submit, review, withdraw)
- [ ] Connect keys (add, revoke)
- [ ] Connect AI matches
- [ ] Validate all request/response shapes against contracts
- [ ] Error handling for all API calls
- [ ] Remove all dev fixtures

---

## PHASE 8 — Testing & Validation (PENDING all phases)

- [ ] Student complete workflow test
- [ ] HOD complete workflow test
- [ ] Admin complete workflow test
- [ ] Form validation edge cases
- [ ] Camera permission grant + deny
- [ ] Gallery upload
- [ ] Claim business rules (own item, non-available, duplicate)
- [ ] Responsive: mobile 375px, tablet 768px, desktop 1280px
- [ ] Zero console errors
- [ ] Every screen compared against Figma at 100%

---

## Blocked Items (requires external input)

| Item | Blocked By | Action Required |
|---|---|---|
| All UI pages | Figma design not received | Share Figma screenshots or public link |
| Backend API calls | Backend not ready | Backend team to implement per BACKEND_CONTRACTS.md |
| AI Matches integration | AI endpoint not implemented | Backend to confirm AI endpoint shape |
| Image upload | Storage provider not decided | Backend to confirm provider + presigned URL strategy |

---

*Last updated: Phase 1 completion.*
