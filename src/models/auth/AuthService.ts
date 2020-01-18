import axios from '@/plugins/axios'
import store from '@/store'
import { User } from '@/models/user/User'

export default {
  async login(user: User) {
    store.commit('AUTH_REQUEST')
    const res = await axios.post('/login', user)

    const token = res.data.token
    localStorage.setItem('user-token', token)
    store.commit('AUTH_SUCCESS', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  async logout() {
    localStorage.removeItem('user-token')
    store.commit('AUTH_LOGOUT')
    delete axios.defaults.headers.common['Authorization']
  }
}