export function useWhatsApp() {
  const config = useRuntimeConfig()
  const { t } = useI18n()

  const whatsappUrl = computed(() => {
    const base = String(config.public.whatsappUrl)
    const text = t('whatsapp.prefill')
    const sep = base.includes('?') ? '&' : '?'
    return `${base}${sep}text=${encodeURIComponent(text)}`
  })

  return { whatsappUrl }
}
