<script setup lang="ts">
const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
}))

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="landing">
    <Header />
    <main>
      <Hero />
      <Trusted />
      <Stats />
      <Services />
      <Problem />
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
