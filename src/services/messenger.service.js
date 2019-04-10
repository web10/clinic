/* eslint-disable standard/object-curly-even-spacing */
import store from '@/store'
import db from '@/config/firebaseInit'

/**
 ******************************
 * @api
 ******************************
 */

export function createTicket ({title, body, inbox}) {
  return new Promise((resolve, reject) => {
    const user = store.getters.getUser
    const ticket = {
      createdByUserId: user.id,
      creatorFullName: `${user.firstName} ${user.lastName}`,
      avatar: user.picture.dataUrl || '',
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
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

export function getTickets () {
  return new Promise((resolve, reject) => {
    const tickets = []
    db.collection('tickets').orderBy("createdAt", "desc").get()
      .then(snap => {
        snap.forEach(doc => {
          const data = doc.data()
          tickets.push(data)
        })
        resolve(tickets)
      })
      .catch((error) => reject(error))
  })
}

export function getTicket (payload) {
  return new Promise((resolve, reject) => {
    db.collection('tickets').doc(payload)
    // .onShapshot it's realtime listener, so ticket will be modified in both users immediately
    .onSnapshot(function(doc) {
      resolve(doc.data())
    })
  })
}

export function sendMessage ({message, ticketId}) {
  return new Promise((resolve, reject) => {
    const user = store.getters.getUser

    const currentMessage = {
      senderId: user.id,
      message: message,
      createdAt: new Date(),
      senderName: user.firstName,
    }

    const ticketRef = db.collection('tickets').doc(ticketId)
    ticketRef.get()
      .then((snap) => {
        const messages = snap.data().messages
        ticketRef.update({
          messages: [...messages, currentMessage]
        })
        resolve(currentMessage)
      })
      .catch((error) => reject(error))
  })
}

export function updateTicket ({ticket, fieldName, value}) {
  return new Promise((resolve, reject) => {
    const tickets = store.state.chatModule.tickets

    const updatedTicket = {...ticket, [fieldName]: value}
    // find an index of ticket which we should replace
    const currentTicketIndex = tickets.findIndex(t => t.id == ticket.id);
    // place updated ticket at index which we found
    const updatedTickets = [...tickets.slice(0, currentTicketIndex), updatedTicket, ...tickets.slice(currentTicketIndex + 1, tickets.length)];

    const ticketRef = db.collection('tickets').doc(ticket.id)
    ticketRef.get().then(() => {
      ticketRef.update({
        [fieldName]: value
      })
    })
    .then(() => {
      resolve(updatedTickets)
    })
    .catch(error => reject(error))
  })
}
