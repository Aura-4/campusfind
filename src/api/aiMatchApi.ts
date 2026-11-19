// ─────────────────────────────────────────────────────────────
// AI Possible Matches API
//
// BACKEND CONTRACT REQUIRED:
//   GET  /api/ai/matches/:itemId
//     Query params:
//       limit?   number  (default 10)
//     Response:  AiMatchesResponse
//
// NOTES:
//   - Do NOT replace with client-side matching logic.
//   - The backend AI engine handles similarity scoring.
//   - If the endpoint is unavailable, surface an error state;
//     do not fall back to random items.
// ─────────────────────────────────────────────────────────────

import apiClient from './axiosClient'
import type { AiMatchesResponse } from '@/types'

export const aiMatchApi = {
  /**
   * Get AI-generated possible matches for a given item ID.
   * @param itemId  The ID of the lost or found item to match against.
   * @param limit   Maximum number of matches to return (default 10).
   */
  getMatches: (itemId: string, limit = 10) =>
    apiClient.get<AiMatchesResponse>(`/ai/matches/${itemId}`, {
      params: { limit },
    }),
}
