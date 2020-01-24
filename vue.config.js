module.exports = {
  publicPath: './',

  "transpileDependencies": [
    "axios",
    "vuetify",
  ],

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/scss/main.scss";'
      }
    }
  }
}