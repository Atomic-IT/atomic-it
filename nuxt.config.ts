// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
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
    public: {
      calendlyUrl: 'https://calendly.com/',
      contactEmail: 'hello@atomic-it.pl',
      whatsappUrl: 'https://wa.me/',
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
    },
  },
})
