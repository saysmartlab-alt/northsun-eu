'use client'

import { useEffect } from 'react'

/**
 * On a hard reload (pull-to-refresh, F5, browser reload button) the visitor
 * expects the page to open from the top, not to be restored to whatever
 * anchor URL the last click set (e.g. `/cs#reference` after they tapped
 * "Naše projekty" in the nav). This component:
 *   - detects reload navigations via the Performance Navigation Timing API
 *   - strips the hash from the URL (so the browser can't skip to the anchor)
 *   - scrolls back to (0, 0)
 *
 * Regular navigations (first visit, shared deep-links like `/en#kontakt`)
 * are left alone so anchor URLs from other sources still work.
 */
export function ResetScrollOnReload() {
  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming | undefined
    if (navEntry?.type !== 'reload') return

    if (window.location.hash) {
      history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      )
    }
    window.scrollTo(0, 0)
  }, [])

  return null
}
