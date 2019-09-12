
import NuxtConfiguration from '@nuxt/config'
import '@nuxtjs/universal-storage'

const config: NuxtConfiguration = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  render:{
    http2:{
      push:true
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/universal-storage'
  ],
  storage:{},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   parallel: true,
    extend(config, ctx) { },
    babel: {
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        ["module-resolver", {
          "root": ["./"],
          "alias": {
            "nodemodules": "./node_modules"
          }
        }],
        [
          "import",
          {
            "libraryName": "vant",
            "libraryDirectory": "lib",
            "style": (name: string, file: Object) => {
              return `nodemodules/${name}/style`;
            }
          }
        ]
      ]
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-preset-env': {},
        'cssnano': { preset: 'default' }, // disabled in dev mode
        'postcss-px-to-viewport': {
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 667
        }
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    },
    loaders: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // router: {
  //   base: '/MinarMobileSSRFrameworkTS/'
  // }
}
if (config.router && config.router.base)
  config.generate = {
    dir: 'dist' + config.router.base
  }
export default config;
