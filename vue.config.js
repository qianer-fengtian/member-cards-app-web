module.exports = {
  publicPath: './',

  devServer: {
    port: 80,
  },

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