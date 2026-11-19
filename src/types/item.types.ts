// ─────────────────────────────────────────────────────────────
// Lost & Found Item Types
// ─────────────────────────────────────────────────────────────

export type ItemStatus =
  | 'Available'
  | 'Claim Requested'
  | 'Under Verification'
  | 'Approved'
  | 'Returned'   // terminal state after handover

export type ItemType = 'lost' | 'found'

export type ItemCategory =
  | 'Electronics'
  | 'Books & Stationery'
  | 'ID & Documents'
  | 'Keys'
  | 'Clothing & Accessories'
  | 'Bags & Luggage'
  | 'Sports Equipment'
  | 'Jewellery & Valuables'
  | 'Other'

export type CampusLocation =
  | 'Main Block'
  | 'Library'
  | 'Canteen'
  | 'Parking Lot'
  | 'Ground Floor Corridor'
  | 'First Floor Corridor'
  | 'Lab Block'
  | 'Admin Block'
  | 'Sports Complex'
  | 'Hostel'
  | 'Other'

export interface ItemImage {
  id: string
  url: string
  thumbnailUrl: string
  isPrimary: boolean
}

export interface Item {
  id: string
  type: ItemType
  title: string
  description: string
  category: ItemCategory
  status: ItemStatus
  location: CampusLocation
  locationDetail?: string   // free-text extra detail
  date: string              // ISO date when lost/found
  images: ItemImage[]
  reportedBy: {
    id: string
    name: string
    usn: string
    yearGroup?: string
    department?: string
  }
  claimedBy?: {
    id: string
    name: string
    usn: string
  }
  handledBy?: {             // HOD or admin who managed the resolution
    id: string
    name: string
    role: string
  }
  tags?: string[]
  aiMatchScore?: number     // 0–100, populated by AI endpoint
  createdAt: string
  updatedAt: string
}

// ─── Request / Response shapes ────────────────────────────────

export interface ReportItemRequest {
  type: ItemType
  title: string
  description: string
  category: ItemCategory
  location: CampusLocation
  locationDetail?: string
  date: string
  images?: File[]           // uploaded via FormData
  tags?: string[]
}

export interface UpdateItemStatusRequest {
  status: ItemStatus
  note?: string             // admin note attached to the status change
}

export interface ItemListFilters {
  search?: string
  type?: ItemType
  category?: ItemCategory
  status?: ItemStatus
  location?: CampusLocation
  yearGroup?: string
  department?: string
  page?: number
  limit?: number
}

export interface PaginatedItemsResponse {
  items: Item[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── AI Matches ───────────────────────────────────────────────

export interface AiMatch {
  item: Item
  score: number         // 0–100 similarity score
  matchedFields: string[] // e.g. ['category', 'description', 'location']
}

export interface AiMatchesResponse {
  sourceItemId: string
  matches: AiMatch[]
  generatedAt: string
}
