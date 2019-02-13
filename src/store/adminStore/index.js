import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/config/firebaseInit'

export default {
  state: {
    users: []
  },
  mutations: {
    'GET_USERS' (state, payload) {
      state.users = payload
    },
    'DELETE_USER' (state, payload) {
      state.users = state.users.filter((user) => user.id != payload)
    },
    'CHANGE_PERMISSION' (state, payload) {
      state.users.find(user => user.id == payload.id).role = payload.role
    }
  },
  actions: {
    getAllUse ({commit}) {
      const currentUser = firebase.auth().currentUser
      const userList = []

      db.collection('users').get()
      .then((snap) => {
        snap.forEach((doc) => {
          const data = doc.data()
          const user = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.mail,
            role: data.role
          }
          userList.push(user)
//        comment out,  will push all users to list including me
//          if(user.id !== currentUser.uid) {
//            userList.push(user)
//          }
        })
        commit('GET_USERS', userList)
      })
      .catch((error) => commit('SET_ERROR', error))
    },
    makeAdmin ({commit}, payload) {
      const user = payload
      db.collection('users').where('id', '==', payload.id).get()
      .then((snap) => {
        snap.forEach((doc) => {
          const updatedRole = payload.role === 0 ? 1 : 0
          user.role = updatedRole
          doc.ref.update({
            role: updatedRole
          })
          commit('CHANGE_PERMISSION', user)
        })
      })
      .catch((error) => commit('SET_ERROR', error))
    },
    deleteUser({commit}, payload) {
      db.collection('users').where('id', '==', payload).get()
      .then(snap => {
        snap.forEach(doc => {
          doc.ref.delete()
        })
        commit('DELETE_USER', payload)
      })
    }
  }
}
