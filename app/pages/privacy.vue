<script setup lang="ts">
const localePath = useLocalePath()
const { t, tm, rt } = useI18n()

const sections = [
  'controller',
  'data',
  'purposes',
  'cookies',
  'rights',
  'contact',
] as const

function paragraphs(key: (typeof sections)[number]) {
  const value = (tm as (path: string) => unknown)(
    `privacy.sections.${key}.paragraphs`
  )
  return Array.isArray(value) ? value : []
}

useSeoMeta({
  title: () => t('privacy.metaTitle'),
  description: () => t('privacy.metaDescription'),
})
</script>

<template>
  <div class="legal">
    <Header />
    <main class="container legal-main">
      <p class="section-eyebrow">{{ $t('privacy.eyebrow') }}</p>
      <h1 class="legal-title">{{ $t('privacy.title') }}</h1>
      <p class="legal-updated">{{ $t('privacy.updated') }}</p>
      <p class="legal-lead">{{ $t('privacy.lead') }}</p>

      <section
        v-for="key in sections"
        :id="key"
        :key="key"
        class="legal-section"
      >
        <h2>{{ $t(`privacy.sections.${key}.title`) }}</h2>
        <p v-for="(paragraph, index) in paragraphs(key)" :key="index">
          {{ rt(paragraph) }}
        </p>
      </section>

      <p class="legal-related">
        {{ $t('privacy.related') }}
        <NuxtLink :to="localePath('/cookies')">
          {{ $t('nav.cookies') }}
        </NuxtLink>
      </p>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/legal-page' as *;
</style>
