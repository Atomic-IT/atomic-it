<script setup lang="ts">
const { t, locale } = useI18n()

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

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Atomic IT Sp. z o.o.',
        alternateName: 'Atomic IT',
        url: siteUrl,
        email: 'info@atomic-it.site',
        telephone: '+48-798-733-368',
        image: ogImage,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Gospodarcza 24 lok. 25',
          addressLocality: 'Lublin',
          postalCode: '20-213',
          addressCountry: 'PL',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Poland',
        },
        priceRange: '$$',
        description: t('meta.description'),
      }),
    },
  ],
}))
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
