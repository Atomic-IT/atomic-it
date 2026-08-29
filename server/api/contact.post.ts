const SITE_TYPES = ['company', 'landing', 'refresh', 'help'] as const

type SiteType = (typeof SITE_TYPES)[number]

const TYPE_LABELS: Record<SiteType, string> = {
  company: 'Strona firmowa',
  landing: 'Prosta wizytówka',
  refresh: 'Odświeżenie istniejącej',
  help: 'Nie wiem / potrzebuję pomocy',
}

function isSiteType(value: string): value is SiteType {
  return (SITE_TYPES as readonly string[]).includes(value)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<{ email?: string; siteType?: string }>(event)

  const email = String(body?.email ?? '')
    .trim()
    .toLowerCase()
  const siteType = String(body?.siteType ?? '').trim()

  if (!isValidEmail(email) || !isSiteType(siteType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form data',
    })
  }

  const apiKey = config.resendApiKey
  const to = config.public.contactEmail as string

  if (!apiKey || !to) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service not configured',
    })
  }

  const typeLabel = TYPE_LABELS[siteType]
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Atomic IT <${to}>`,
      to: [to],
      reply_to: email,
      subject: `Wycena — ${typeLabel}`,
      text: [
        'Nowe zapytanie ze strony atomic-it.site',
        '',
        `E-mail: ${email}`,
        `Typ strony: ${typeLabel}`,
      ].join('\n'),
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    console.error('Resend error', response.status, detail)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to send email',
    })
  }

  return { ok: true }
})
