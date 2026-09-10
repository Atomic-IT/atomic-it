<script setup lang="ts">
const localePath = useLocalePath()
const { consent, hydrate, acceptAll, acceptNecessary } = useCookieConsent()

onMounted(() => hydrate())

const visible = computed(() => !consent.value.decided)
</script>

<template>
  <div
    v-if="visible"
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
  padding: 1rem;
  pointer-events: none;

  &-inner {
    display: grid;
    gap: 1rem;
    width: 100%;
    margin: 0;
    padding: 1.15rem 1.25rem;
    border: 1px solid $color-border;
    border-radius: 1.2rem;
    background: rgb(255 255 255 / 96%);
    box-shadow: 0 24px 56px rgb(7 11 20 / 18%);
    backdrop-filter: blur(12px);
    pointer-events: auto;

    @include breakpoint(md) {
      max-width: 52rem;
      margin-inline: auto;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1.25rem;
      padding: 1.25rem 1.4rem;
    }
  }

  &-title {
    margin: 0 0 0.35rem;
    color: $color-secondary;
    font-size: 1.02rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  &-text {
    margin: 0;
    color: $color-fg-muted;
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.45;

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
    gap: 0.55rem;
  }
}
</style>
