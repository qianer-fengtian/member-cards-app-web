import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },

  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },

  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },

    AUTH_SUCCESS: (state, token) => {
      state.status = 'success'
      state.token = token
    },

    AUTH_ERROR: (state) => {
      state.status = 'error'
    },

    AUTH_LOGOUT: (state) => {
      state.token = ''
    }
  },

  actions: {
  },
  
  modules: {
  }
})
