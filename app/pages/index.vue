<script setup lang="ts">
const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}))

const siteUrl = 'https://atomic-it.site'
const ogImage = `${siteUrl}/images/og.jpg`

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  ogUrl: () => `${siteUrl}/${locale.value}`,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
})
</script>

<template>
  <div class="landing">
    <Header />
    <main>
      <Hero />
      <Trusted />
      <Problem />
      <Pricing />
      <Steps />
      <Work />
      <Fit />
      <Cta />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.landing {
  min-height: 100vh;
  overflow-x: clip;
}
</style>
