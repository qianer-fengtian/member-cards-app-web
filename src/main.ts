import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/plugins/axios'
import vuetify from '@/plugins/vuetify'

require('@/assets/scss/main.scss')


Vue.use(Notifications)

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
