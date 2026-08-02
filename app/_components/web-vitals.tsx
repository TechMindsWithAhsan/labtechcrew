'use client'

import { useReportWebVitals } from 'next/web-vitals'

/**
 * MODULE SCOPE, not an inline arrow.
 *
 * Next's docs are explicit: "ensure that the callback function reference does
 * not change" — a new reference on every render double-reports every metric
 * and quietly corrupts your percentiles.
 */
const report: Parameters<typeof useReportWebVitals>[0] = (metric) => {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id, // unique per page load — needed to build real p75s
    navigationType: metric.navigationType,
    path: window.location.pathname,
  })

  // `back-forward-cache` restores are near-instant and will flatter your
  // averages. Keep them tagged so you can filter them out downstream.
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals/', body)
  } else {
    void fetch('/api/vitals/', { body, method: 'POST', keepalive: true })
  }
}

export function WebVitals() {
  useReportWebVitals(report)
  return null
}
