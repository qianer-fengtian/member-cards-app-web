import axios from '@/plugins/axios'
import store from '@/store'
import jsSHA from 'jssha'
import { User } from '@/models/user/User'

export default {
  async login(user: User) {
    store.commit('AUTH_REQUEST')
    const shaObj = new jsSHA('SHA-256', 'TEXT')
    shaObj.update(user.password)
    const res = await axios.post('/login', Object.assign(user, {password: shaObj.getHash('HEX')}))
    const token = res.data.token
    localStorage.setItem('user-token', token)
    store.commit('AUTH_SUCCESS', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  async isAdmin() {
    const res = await axios.get('/role')
    return res.data === 'admin'
  },

  async logout() {
    localStorage.removeItem('user-token')
    store.commit('AUTH_LOGOUT')
    delete axios.defaults.headers.common['Authorization']
  }
}