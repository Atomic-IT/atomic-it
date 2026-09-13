<script setup lang="ts">
const localePath = useLocalePath()
const { consent, hydrate, acceptAll, acceptNecessary } = useCookieConsent()
const bannerRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

onMounted(() => hydrate())

const visible = computed(() => !consent.value.decided)

function clearOffset() {
  if (!import.meta.client) return
  document.documentElement.style.setProperty('--cookie-offset', '0px')
  document.documentElement.classList.remove('has-cookie-banner')
}

function syncOffset() {
  if (!import.meta.client) return
  if (!visible.value || !bannerRef.value) {
    clearOffset()
    return
  }

  const height = Math.ceil(bannerRef.value.getBoundingClientRect().height)
  document.documentElement.style.setProperty('--cookie-offset', `${height}px`)
  document.documentElement.classList.add('has-cookie-banner')
}

watch(visible, async (isVisible) => {
  if (!isVisible) {
    resizeObserver?.disconnect()
    clearOffset()
    return
  }

  await nextTick()
  syncOffset()
  if (bannerRef.value && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => syncOffset())
    resizeObserver.observe(bannerRef.value)
  }
})

onMounted(() => {
  if (visible.value) {
    nextTick(() => syncOffset())
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  clearOffset()
})
</script>

<template>
  <div
    v-if="visible"
    ref="bannerRef"
    class="cookie-banner"
    role="dialog"
    aria-live="polite"
    :aria-label="$t('cookies.banner.aria')"
  >
    <div class="container cookie-banner-inner">
      <div class="cookie-banner-copy">
        <p class="cookie-banner-title">{{ $t('cookies.banner.title') }}</p>
        <p class="cookie-banner-text">
          {{ $t('cookies.banner.text') }}
          <NuxtLink :to="localePath('/cookies')">
            {{ $t('cookies.banner.policy') }}
          </NuxtLink>
        </p>
      </div>

      <div class="cookie-banner-actions">
        <MagneticButton compact variant="ghost" @click="acceptNecessary">
          {{ $t('cookies.banner.necessary') }}
        </MagneticButton>
        <MagneticButton compact variant="primary" @click="acceptAll">
          {{ $t('cookies.banner.accept') }}
        </MagneticButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cookie-banner {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 140;
  padding: 0.65rem 0.75rem calc(0.65rem + env(safe-area-inset-bottom));
  pointer-events: none;

  &-inner {
    display: grid;
    gap: 0.75rem;
    width: 100%;
    margin: 0;
    padding: 0.85rem 1rem;
    border: 1px solid $color-border;
    border-radius: 1.05rem;
    background: rgb(255 255 255 / 96%);
    box-shadow: 0 18px 40px rgb(7 11 20 / 16%);
    backdrop-filter: blur(12px);
    pointer-events: auto;

    @include breakpoint(md) {
      max-width: 52rem;
      margin-inline: auto;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1.25rem;
      padding: 1.15rem 1.3rem;
    }
  }

  &-title {
    display: none;
    margin: 0 0 0.35rem;
    color: $color-secondary;
    font-size: 1.02rem;
    font-weight: 800;
    letter-spacing: -0.02em;

    @include breakpoint(md) {
      display: block;
    }
  }

  &-text {
    margin: 0;
    color: $color-fg-muted;
    font-size: 0.84rem;
    font-weight: 600;
    line-height: 1.4;

    @include breakpoint(md) {
      font-size: 0.92rem;
      line-height: 1.45;
    }

    a {
      color: $color-primary;
      font-weight: 700;
      text-decoration: underline;
      text-underline-offset: 0.15em;
    }
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }
}
</style>
