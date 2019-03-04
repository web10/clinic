import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './userStore'
import AdminStore from './adminStore'
// import ChatModule from './chatModule'
Vue.use(Vuex)

export default new Vuex.Store(
  {
    modules: {
      userStore: UserStore,
      adminStore: AdminStore,
//      chatModule: ChatModule
    },
    state: {
      loading: false,
      error: null
    },
    mutations: {
      setLoadin(state, payload) {
        state.loading = payload
      },
      // Many dev's prefer to give a names for mutation in uppercase format, it's improve readability
      // Added mutation for a storing an errors globally
      'SET_ERROR'(state, payload) {
        state.error = payload
        // for autoclear errors, can delete it
        setTimeout(() => {
          state.error = null
        }, 5000)
      },
      'CLEAR_ERROR'(state) {
        state.error = null
      }
    },
    actions: {
      setLoadin({commit}, payload) {
        commit('setLoadin', payload)
      }
    },
    getters: {
    }
  }
)
