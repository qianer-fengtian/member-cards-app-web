import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/plugins/axios'
import vuetify from './plugins/vuetify'
import '@/assets/scss/v-data-table.scss'

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
