import db from '@/config/firebaseInit'

export default {
  state: {
    tickets: [],
    ticket: {}
  },
  actions: {
    createTicket({ getters }, {title, body, inbox}) {
      const user = getters.getUser
      const ticket = {
        createdByUserId: user.id,
        creatorFullName: `${user.firstName} ${user.lastName}`, 
        avatar: user.picture.dataUrl,
        inbox: inbox,
        title: title,
        resolved: false,
        createdAt: new Date(),
        messages: [
          {
            senderId: user.id,
            senderName: user.firstName,
            message: body,
            createdAt: new Date()
          }
        ]
      }
      const ticketRef = db.collection('tickets').doc()
      ticketRef.set({ ...ticket, id: ticketRef.id})
        .then()
        .catch(err => console.log(err))

      console.log(ticket)
    },
    getTickets({ commit }) {
      const tickets = []

      db.collection('tickets').get()
        .then(snap => {
          snap.forEach(doc => {
            const data = doc.data()
            tickets.push(data)
          })
          commit('SET_TICKETS', tickets)
        })
    },
    getTicket({commit}, payload) {
      db.collection('tickets').doc(payload).get()
      .then((snap) => {
        commit('SET_TICKET', snap.data())
      })
    },
    sendMessage({commit}, payload) {
      const ticketRef = db.collection('tickets').doc(payload.ticketId)

      ticketRef.get().then((snap) => {
        const messages = snap.data().messages
        ticketRef.update({
          messages: [...messages, payload.currentMessage]
        })
      })
      commit('SEND_MESSAGE', payload.currentMessage)
    }
  },
  mutations: {
    'SET_TICKET'(state, payload) {
      state.ticket = payload
    },
    'SET_TICKETS'(state, payload) {
      state.tickets = payload
    },
    'SEND_MESSAGE'(state, payload) {
      state.ticket.messages = [...state.ticket.messages, payload]
    }
  },
  getters: {
    getTickets (state) {
      return state.tickets
    }
  }
}
