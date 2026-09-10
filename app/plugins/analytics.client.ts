const CLARITY_ID = 'y9uk4i15qy'
const ADS_ID = 'AW-18392809045'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

function loadClarity() {
  if (document.querySelector(`script[src*="clarity.ms/tag/${CLARITY_ID}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(script)
}

function loadGtag() {
  if (
    document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${ADS_ID}"]`
    )
  ) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', ADS_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`
  document.head.appendChild(script)
}

export default defineNuxtPlugin(() => {
  const { consent, hydrate } = useCookieConsent()

  hydrate()

  watch(
    consent,
    (value) => {
      if (!value.decided) return
      if (value.analytics) loadClarity()
      if (value.marketing) loadGtag()
    },
    { immediate: true, deep: true }
  )
})
