// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare_module',
  },
  modules: ['@nuxt/fonts', '@nuxtjs/i18n'],
  css: ['~/assets/styles/main.scss'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  fonts: {
    families: [
      {
        name: 'Outfit',
        provider: 'google',
        weights: [400, 500, 600, 700, 800],
      },
    ],
  },
  i18n: {
    locales: [
      { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pl',
    strategy: 'prefix',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
  },
  runtimeConfig: {
    resendApiKey: '',
    public: {
      contactEmail: 'info@atomic-it.site',
      whatsappUrl: 'https://wa.me/48798733368',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content: string, filename: string) => {
            if (filename.includes('assets/styles/_')) {
              return content
            }

            return `@use "~/assets/styles/_variables.scss" as *;\n${content}`
          },
        },
      },
    },
  },
  app: {
    head: {
      titleTemplate: '%s · Atomic IT',
      htmlAttrs: { lang: 'pl' },
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=AW-18392809045',
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18392809045');`,
        },
      ],
    },
  },
})
