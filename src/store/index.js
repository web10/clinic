import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './userStore'
Vue.use(Vuex)

export default new Vuex.Store(
  {
    modules: {
      userStore: UserStore
    },
    state: {
      // loading: true,
      loading: false,
      user: {
        id: 'daadfd'
      }
    },
    mutations: {
      setLoadin (state, payload) {
        state.loading = payload
      }
    },
    actions: {
      setLoadin ({commit}, payload) {
        commit('setLoadin', payload)
      }
    },
    getters: {}
  }
)
