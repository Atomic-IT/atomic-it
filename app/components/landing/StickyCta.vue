<script setup lang="ts">
const localePath = useLocalePath()
const { open: dialogOpen, openContactDialog } = useContactDialog()
const { open: navOpen } = useMobileNav()
const { whatsappUrl } = useWhatsApp()

const pastHero = ref(false)
const contactVisible = ref(false)

function observe(selector: string, onChange: (visible: boolean) => void) {
  const node = document.querySelector(selector)
  if (!node) return () => undefined

  const observer = new IntersectionObserver(
    ([entry]) => {
      onChange(Boolean(entry?.isIntersecting))
    },
    { threshold: 0.18 }
  )
  observer.observe(node)
  return () => observer.disconnect()
}

onMounted(() => {
  const stopHero = observe('.hero', (visible) => {
    pastHero.value = !visible
  })
  const stopContact = observe('#contact', (visible) => {
    contactVisible.value = visible
  })
  onBeforeUnmount(() => {
    stopHero()
    stopContact()
  })
})

const visible = computed(
  () =>
    pastHero.value &&
    !contactVisible.value &&
    !dialogOpen.value &&
    !navOpen.value
)
</script>

<template>
  <div
    v-if="visible"
    class="sticky-cta"
    role="navigation"
    :aria-label="$t('sticky.aria')"
  >
    <a class="sticky-cta-link" :href="`${localePath('/')}#pricing`">
      {{ $t('nav.pricing') }}
    </a>
    <MagneticButton compact :href="whatsappUrl" variant="primary" external>
      <WhatsAppIcon />
      {{ $t('sticky.whatsapp') }}
    </MagneticButton>
    <MagneticButton compact variant="dark" @click="openContactDialog">
      {{ $t('nav.quote') }}
    </MagneticButton>
  </div>
</template>

<style lang="scss" scoped>
.sticky-cta {
  position: fixed;
  right: 0.75rem;
  bottom: calc(var(--cookie-offset, 0) + 0.75rem);
  left: 0.75rem;
  z-index: 80;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.45rem;
  align-items: center;
  padding: 0.45rem;
  border: 1px solid $color-border;
  border-radius: 1.15rem;
  background: rgb(255 255 255 / 94%);
  box-shadow: 0 16px 40px rgb(7 11 20 / 16%);
  backdrop-filter: blur(12px);

  @include breakpoint(md) {
    display: none;
  }

  :deep(.whatsapp-icon) {
    margin-right: 0.3rem;
  }
}

.sticky-cta-link {
  padding: 0.55rem 0.7rem;
  color: $color-secondary;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

:deep(.m-btn-compact) {
  min-height: 2.5rem;
  padding: 0.5rem 0.85rem;
  font-size: 0.82rem;
}
</style>
