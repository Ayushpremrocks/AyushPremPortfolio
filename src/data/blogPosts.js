/**
 * src/data/blogPosts.js
 *
 * ─────────────────────────────────────────────────────────────────
 *  PLACEHOLDER — To be populated by the LinkedIn scraper
 * ─────────────────────────────────────────────────────────────────
 *
 * Expected structure for each post object:
 * {
 *   id:         string  — Unique identifier (slug or LinkedIn post URN)
 *   title:      string  — Post headline / first sentence (max ~80 chars)
 *   excerpt:    string  — Short summary for card preview (max ~200 chars)
 *   date:       string  — ISO 8601 date, e.g. "2026-04-15"
 *   link:       string  — Full LinkedIn post URL
 *   thumbnail:  string | null — Image URL or null for gradient fallback
 *   tags:       string[] — e.g. ["System Design", "Learning"]
 *   engagement: {
 *     likes:    number
 *     comments: number
 *   }
 * }
 *
 * Available tags (used for filter UI):
 *   "System Design" | "Interviews" | "Projects" | "Learning"
 *
 * ─────────────────────────────────────────────────────────────────
 *  Scraper integration notes:
 *  1. Run scraper → outputs JSON array
 *  2. Assign the array to `export const blogPosts`
 *  3. HMR will pick up changes during `npm run dev`
 * ─────────────────────────────────────────────────────────────────
 */

export const blogPosts = [
  // ← Scraper will inject post objects here
];

/** Tag options for the filter UI */
export const blogTags = ["All", "System Design", "Interviews", "Projects", "Learning"];
