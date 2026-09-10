const ADS_ID = 'AW-18392809045'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Fire Ads/GA lead event only when marketing cookies were accepted. */
export function useAnalytics() {
  const { consent } = useCookieConsent()

  function trackGenerateLead() {
    if (!import.meta.client) return
    if (!consent.value.marketing) return
    if (typeof window.gtag !== 'function') return

    window.gtag('event', 'generate_lead', {
      send_to: ADS_ID,
    })
  }

  return { trackGenerateLead }
}
