// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
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
})
