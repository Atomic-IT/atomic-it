<script setup lang="ts">
const localePath = useLocalePath()
const { t, tm, rt, locale } = useI18n()
const { consent, hydrate, acceptAll, acceptNecessary } = useCookieConsent()

const sections = ['what', 'types', 'manage', 'third'] as const

function paragraphs(key: (typeof sections)[number]) {
  const value = (tm as (path: string) => unknown)(
    `cookies.sections.${key}.paragraphs`
  )
  return Array.isArray(value) ? value : []
}

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}))

useSeoMeta({
  title: () => t('cookies.metaTitle'),
  description: () => t('cookies.metaDescription'),
})

onMounted(() => hydrate())
</script>

<template>
  <div class="legal">
    <Header />
    <main class="container legal-main">
      <p class="section-eyebrow">{{ $t('cookies.eyebrow') }}</p>
      <h1 class="legal-title">{{ $t('cookies.title') }}</h1>
      <p class="legal-updated">{{ $t('cookies.updated') }}</p>
      <p class="legal-lead">{{ $t('cookies.lead') }}</p>

      <section
        v-for="key in sections"
        :id="key"
        :key="key"
        class="legal-section"
      >
        <h2>{{ $t(`cookies.sections.${key}.title`) }}</h2>
        <p v-for="(paragraph, index) in paragraphs(key)" :key="index">
          {{ rt(paragraph) }}
        </p>
      </section>

      <section class="legal-section legal-manage">
        <h2>{{ $t('cookies.manageTitle') }}</h2>
        <p>{{ $t('cookies.manageText') }}</p>
        <div class="legal-actions">
          <MagneticButton compact variant="ghost" @click="acceptNecessary">
            {{ $t('cookies.banner.necessary') }}
          </MagneticButton>
          <MagneticButton compact variant="primary" @click="acceptAll">
            {{ $t('cookies.banner.accept') }}
          </MagneticButton>
        </div>
        <p v-if="consent.decided" class="legal-status">
          {{ consent.analytics || consent.marketing
              ? $t('cookies.statusAccepted')
              : $t('cookies.statusNecessary') }}
        </p>
      </section>

      <p class="legal-related">
        {{ $t('cookies.related') }}
        <NuxtLink :to="localePath('/privacy')">
          {{ $t('nav.privacy') }}
        </NuxtLink>
      </p>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/legal-page' as *;
</style>

<style lang="scss" scoped>
.legal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.legal-status {
  margin: 0.85rem 0 0;
  color: $color-fg-muted;
  font-size: 0.92rem;
  font-weight: 600;
}
</style>
