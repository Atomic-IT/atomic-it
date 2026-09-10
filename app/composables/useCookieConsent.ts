export type CookieConsent = {
  analytics: boolean
  marketing: boolean
  decided: boolean
}

const STORAGE_KEY = 'atomic-it-cookie-consent'

const defaultConsent = (): CookieConsent => ({
  analytics: false,
  marketing: false,
  decided: false,
})

function readStored(): CookieConsent {
  if (!import.meta.client) return defaultConsent()

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultConsent()
    const parsed = JSON.parse(raw) as Partial<CookieConsent>
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      decided: Boolean(parsed.decided),
    }
  } catch {
    return defaultConsent()
  }
}

function writeStored(value: CookieConsent) {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

export function useCookieConsent() {
  const consent = useState<CookieConsent>('cookie-consent', defaultConsent)

  function hydrate() {
    if (!import.meta.client) return
    consent.value = readStored()
  }

  function save(next: Omit<CookieConsent, 'decided'>) {
    consent.value = { ...next, decided: true }
    writeStored(consent.value)
  }

  function acceptAll() {
    save({ analytics: true, marketing: true })
  }

  function acceptNecessary() {
    save({ analytics: false, marketing: false })
  }

  return {
    consent,
    hydrate,
    acceptAll,
    acceptNecessary,
    save,
  }
}
