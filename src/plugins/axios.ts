import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(undefined, function(err) {
  return new Promise((resolve, reject) => {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      store.dispatch('AUTH_LOGOUT')
    }
    throw err
  })
})

export default instance