module.exports = {
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