import Vue from 'vue'
import router from '@/router'
import * as messengerService from '@/services/messenger.service'

export default {
  state: {
    tickets: [],
    ticket: {}
  },
  actions: {
    createTicket ({ commit }, {title, body, inbox}) {
      return messengerService.createTicket({title, body, inbox})
        .then(() => {
          Vue.notify({
            type: 'success',
            text: 'Ticket was successfully created! Wait for responce'
          })
          router.push('/messages')
        })
        .catch(error => commit('SET_ERROR', error))
    },
    getTickets ({ commit }) {
      return messengerService.getTickets()
        .then(tickets => commit('SET_TICKETS', tickets))
        .catch(error => commit('SET_ERROR', error))
    },
    getTicket ({commit}, payload) {
      return messengerService.getTicket(payload)
        .then(ticket => commit('SET_TICKET', ticket))
    },
    sendMessage ({ commit }, {message, ticketId}) {
      return messengerService.sendMessage({message, ticketId})
        .then((currentMessage) => commit('SEND_MESSAGE', currentMessage))
        .catch(error => commit('SET_ERROR', error))
    },
    updateTicket ({ commit }, {ticket, fieldName, value}) {
      return messengerService.updateTicket({ticket, fieldName, value})
        .then((tickets) => {
          // update application state with new set of tickets
          commit('SET_TICKETS', tickets)
          router.push('/staff')
        })
        .catch(error => commit('SET_ERROR', error))
    }
  },
  mutations: {
    'SET_TICKET' (state, payload) {
      state.ticket = payload
    },
    'SET_TICKETS' (state, payload) {
      state.tickets = payload
    },
    'SEND_MESSAGE' (state, payload) {
      state.ticket.messages = [...state.ticket.messages, payload]
    }
  },
  getters: {
    getTickets (state) {
      return state.tickets
    }
  }
}
