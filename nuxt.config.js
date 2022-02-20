import colors from 'vuetify/lib/util/colors'

const appName = process.env.APP_NAME || 'PFC計算機'
const baseURL = process.env.BASE_URL || 'https://pfc-calculator-back.herokuapp.com'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s' || appName,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/axios',
    'plugins/utils'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    theme: {
      themes: {
        light: {
          greenText: colors.green.accent2,
          greyText: colors.grey.darken1,
          btnPrimary: colors.lightBlue.accent2
        }
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL
  },

  i18n: {
    locales: [{ code: 'ja', iso: 'ja-JP', file: 'ja.json' }],
    defaultLocale: 'ja',
    strategy: 'no_prefix',
    langDir: '@/locales/',
    vueI18n: {
      fallbackLocale: 'ja'
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          name: 'Authorization',
          maxAge: 365 * 12 * 60 * 60
        },
        endpoints: {
          login: { url: '/api/v1/login', method: 'post' },
          user: false
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
    appName
  }
}
