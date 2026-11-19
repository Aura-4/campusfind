# HKBK Lost & Found Portal — Backend API Contracts

This document defines the required API contracts for all backend endpoints.
Frontend code is wired to these contracts. Backend team must implement
exactly these shapes.

---

## Base URL

All endpoints are prefixed with `/api`.
Configured via `VITE_API_URL` in `.env`.s

---

## Authentication

All protected endpoints require:
```
Authorization: Bearer <accessToken>
```

The access token is short-lived (recommended: 15 min).
The refresh token is delivered as an `httpOnly` cookie.

---

## 1. Auth Endpoints

### POST /api/auth/login
**Request:**
```json
{
  "usn": "1HK21CS001",
  "password": "secret123"
}
```
**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": { ...User },
    "tokens": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ...",
      "expiresIn": 900
    }
  }
}
```

### POST /api/auth/register
**Request:**
```json
{
  "name": "Mohammed Raza",
  "usn": "1HK21CS001",
  "email": "raza@hkbk.edu.in",
  "password": "secret123",
  "department": "Computer Science",
  "yearGroup": "3rd Year",
  "phone": "9876543210"
}
```
**Response 201:** Same as login response.

### GET /api/auth/me
**Response 200:**
```json
{
  "success": true,
  "data": { ...User }
}
```

### POST /api/auth/refresh
Uses httpOnly cookie. No request body.
**Response 200:**
```json
{
  "accessToken": "eyJ...",
  "expiresIn": 900
}
```

### POST /api/auth/logout
Clears httpOnly cookie. No request body.
**Response 200:** `{ "success": true }`

---

## 2. Item Endpoints

### GET /api/items
**Query params:** `search`, `type`, `category`, `status`, `location`,
`yearGroup`, `department`, `page`, `limit`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "items": [ ...Item[] ],
    "total": 42,
    "page": 1,
    "limit": 12,
    "totalPages": 4
  }
}
```

### GET /api/items/my
Same response shape. Returns only items reported by the authenticated user.

### GET /api/items/:id
**Response 200:** `{ "success": true, "data": { ...Item } }`

### POST /api/items/lost
**Content-Type:** `multipart/form-data`
**Fields:** `title`, `description`, `category`, `location`, `date`,
`locationDetail?`, `tags[]?`, `images[]?` (max 4 files, 5 MB each)

**Response 201:** `{ "success": true, "data": { ...Item } }`

### POST /api/items/found
Same as above.

### PATCH /api/items/:id/status
**Roles:** admin, hod
**Request:**
```json
{
  "status": "Under Verification",
  "note": "Verification scheduled for Monday"
}
```
**Response 200:** `{ "success": true, "data": { ...Item } }`

### DELETE /api/items/:id
**Roles:** admin
**Response 200:** `{ "success": true }`

---

## 3. Claim Endpoints

### POST /api/claims
**Content-Type:** `multipart/form-data`
**Fields:** `itemId`, `description`, `proofImages[]?` (max 3 files)

**Business rules enforced by backend:**
- Reject if claimant is the item reporter
- Reject if item status ≠ "Available"
- Reject duplicate claims from the same user for the same item

**Response 201:** `{ "success": true, "data": { ...Claim } }`

### GET /api/claims
**Roles:** admin, hod
**Query params:** `status`, `itemId`, `claimantId`, `page`, `limit`
**Response 200:** Paginated claims list

### GET /api/claims/my
**Roles:** student
**Response 200:** Paginated claims list for authenticated user

### GET /api/claims/:id
**Response 200:** `{ "success": true, "data": { ...Claim } }`

### PATCH /api/claims/:id/review
**Roles:** admin, hod
**Request:**
```json
{
  "status": "Approved",
  "adminNote": "Student provided valid proof."
}
```
**Response 200:** `{ "success": true, "data": { ...Claim } }`

Side effect: When claim is Approved, backend MUST update item status to
"Approved" atomically.

### DELETE /api/claims/:id
Withdraw a pending claim. Only the original claimant may withdraw.
**Response 200:** `{ "success": true }`

---

## 4. Key Endpoints

### GET /api/keys
**Query params:** `status`, `category`, `issuedToId`, `page`, `limit`
**Roles:** admin, hod (full list); student (only keys issued to them)

### POST /api/keys
**Roles:** admin, hod
**Request:**
```json
{
  "keyIdentifier": "LAB-301-A",
  "label": "Computer Lab 3rd Floor",
  "category": "Lab",
  "issuedToUsn": "1HK21CS001",
  "notes": "Issued for semester project"
}
```
**Response 201:** `{ "success": true, "data": { ...KeyRecord } }`

### GET /api/keys/:id
**Response 200:** `{ "success": true, "data": { ...KeyRecord } }`

### PATCH /api/keys/:id/revoke
**Roles:** admin, hod
**Request:** `{ "note": "Returned at end of semester" }`
**Response 200:** `{ "success": true, "data": { ...KeyRecord } }`

### DELETE /api/keys/:id
**Roles:** admin
**Response 200:** `{ "success": true }`

---

## 5. AI Matches Endpoint

### GET /api/ai/matches/:itemId
**Query params:** `limit` (default 10, max 20)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "sourceItemId": "item-123",
    "matches": [
      {
        "item": { ...Item },
        "score": 87,
        "matchedFields": ["category", "description", "location"]
      }
    ],
    "generatedAt": "2024-03-15T10:30:00Z"
  }
}
```

**Notes:**
- Do NOT invent or fake this endpoint on the frontend.
- If unavailable, the UI surfaces an error/empty state.
- Score is 0–100 (higher = better match).

---

## 6. Image Storage

Backend controls the storage provider.
Frontend sends `images[]` as multipart files.
Backend returns resolved absolute URLs in item/claim responses.

Provider is configured server-side. Frontend reads `VITE_IMAGE_STORAGE_PROVIDER`
only for local development fallback display.

---

## 7. Error Response Format

All error responses must follow:
```json
{
  "success": false,
  "error": {
    "code": "ITEM_NOT_FOUND",
    "message": "No item found with the given ID.",
    "details": {}
  }
}
```

Standard error codes:
| Code | HTTP Status |
|---|---|
| `UNAUTHORIZED` | 401 |
| `FORBIDDEN` | 403 |
| `NOT_FOUND` | 404 |
| `VALIDATION_ERROR` | 422 |
| `DUPLICATE_CLAIM` | 409 |
| `CANNOT_CLAIM_OWN_ITEM` | 409 |
| `ITEM_NOT_AVAILABLE` | 409 |
| `INTERNAL_ERROR` | 500 |

---

## 8. User Model

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "usn": "string",
  "role": "student | hod | admin",
  "department": "string",
  "yearGroup": "1st Year | 2nd Year | 3rd Year | 4th Year",
  "phone": "string | null",
  "avatarUrl": "string | null",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

---

*Last updated: Phase 1 foundation — awaiting backend implementation.*
