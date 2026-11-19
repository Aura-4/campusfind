// ─────────────────────────────────────────────────────────────
// Application Constants
// ─────────────────────────────────────────────────────────────

import type {
  ItemCategory,
  ItemStatus,
  CampusLocation,
  Department,
  YearGroup,
  KeyCategory,
  KeyStatus,
  ClaimStatus,
} from '@/types'

// ─── Item ─────────────────────────────────────────────────────

export const ITEM_CATEGORIES: ItemCategory[] = [
  'Electronics',
  'Books & Stationery',
  'ID & Documents',
  'Keys',
  'Clothing & Accessories',
  'Bags & Luggage',
  'Sports Equipment',
  'Jewellery & Valuables',
  'Other',
]

export const ITEM_STATUSES: ItemStatus[] = [
  'Available',
  'Claim Requested',
  'Under Verification',
  'Approved',
  'Returned',
]

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  'Main Block',
  'Library',
  'Canteen',
  'Parking Lot',
  'Ground Floor Corridor',
  'First Floor Corridor',
  'Lab Block',
  'Admin Block',
  'Sports Complex',
  'Hostel',
  'Other',
]

// ─── Status display metadata (colours wired to Figma badges) ──
// NOTE: Tailwind class strings — do NOT purge these.
// Update colour values once Figma tokens are confirmed.

export const ITEM_STATUS_META: Record<
  ItemStatus,
  { label: string; colorClass: string; bgClass: string }
> = {
  Available: {
    label: 'Available',
    colorClass: 'text-green-700',
    bgClass: 'bg-green-100',
  },
  'Claim Requested': {
    label: 'Claim Requested',
    colorClass: 'text-yellow-700',
    bgClass: 'bg-yellow-100',
  },
  'Under Verification': {
    label: 'Under Verification',
    colorClass: 'text-blue-700',
    bgClass: 'bg-blue-100',
  },
  Approved: {
    label: 'Approved',
    colorClass: 'text-purple-700',
    bgClass: 'bg-purple-100',
  },
  Returned: {
    label: 'Returned',
    colorClass: 'text-gray-700',
    bgClass: 'bg-gray-100',
  },
}

export const CLAIM_STATUS_META: Record<
  ClaimStatus,
  { label: string; colorClass: string; bgClass: string }
> = {
  Pending: {
    label: 'Pending',
    colorClass: 'text-yellow-700',
    bgClass: 'bg-yellow-100',
  },
  'Under Review': {
    label: 'Under Review',
    colorClass: 'text-blue-700',
    bgClass: 'bg-blue-100',
  },
  Approved: {
    label: 'Approved',
    colorClass: 'text-green-700',
    bgClass: 'bg-green-100',
  },
  Rejected: {
    label: 'Rejected',
    colorClass: 'text-red-700',
    bgClass: 'bg-red-100',
  },
  Withdrawn: {
    label: 'Withdrawn',
    colorClass: 'text-gray-700',
    bgClass: 'bg-gray-100',
  },
}

export const KEY_STATUS_META: Record<
  KeyStatus,
  { label: string; colorClass: string; bgClass: string }
> = {
  Active: {
    label: 'Active',
    colorClass: 'text-green-700',
    bgClass: 'bg-green-100',
  },
  Revoked: {
    label: 'Revoked',
    colorClass: 'text-red-700',
    bgClass: 'bg-red-100',
  },
  Lost: {
    label: 'Lost',
    colorClass: 'text-orange-700',
    bgClass: 'bg-orange-100',
  },
  Returned: {
    label: 'Returned',
    colorClass: 'text-gray-700',
    bgClass: 'bg-gray-100',
  },
}

// ─── Institutions ──────────────────────────────────────────────

export const DEPARTMENTS: Department[] = [
  'Computer Science',
  'Information Science',
  'Electronics & Communication',
  'Mechanical',
  'Civil',
  'Electrical',
  'Other',
]

export const YEAR_GROUPS: YearGroup[] = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
]

// ─── Keys ─────────────────────────────────────────────────────

export const KEY_CATEGORIES: KeyCategory[] = [
  'Classroom',
  'Lab',
  'Staff Room',
  'Office',
  'Store Room',
  'Other',
]

// ─── Pagination defaults ──────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 12

// ─── Camera ───────────────────────────────────────────────────

export const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: 'environment', // prefer rear camera on mobile
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
  audio: false,
}

// ─── Image upload ─────────────────────────────────────────────

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGES_PER_ITEM = 4
