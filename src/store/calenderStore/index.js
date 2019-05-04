/* eslint-disable */
import Vue from 'vue'
import router from '@/router'
import * as clinicCalendarService from '@/services/clinicCalendar.service'

export default {
  state: {
    calenderEvent: {},
    customEvents: null
  },
  actions: {
    saveCalenderEvents ({ commit }, payload) {
      //payload: {around: '', eventa: [], ...}

      return clinicCalendarService.createCalendar(payload)
        .then((cal) => {
          Vue.notify({
            type: 'success',
            text: 'Saved Calender events'
          })


          commit('SET_Calender_Event', cal)
        })
        .catch(error => commit('SET_ERROR', error))
    }


  },
  mutations: {

    'SET_Calender_Event' (state, payload) {

      state.calenderEvent = payload
    },
    'SET_CUSTOM_EVENTS' (state, payload) {

      state.customEvents = payload
    },
  },
  getters: {
    getCalendar (state) {

      return state.customEvents
    }
  }
}
