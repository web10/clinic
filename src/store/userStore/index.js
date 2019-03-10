// first line imports only base functionality from firebase
// second - an auth package
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/config/firebaseInit'
import medHistory from '../staticData/medHistory'
import surgHistory from '../staticData/surgHistory'

export default {
  state: {
    user: null,

  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.role = payload.role
    },
    'UNSET_USER' (state) {
      state.user = null
    },
    'UPDATE_USER' (state, payload) {
      state.user = payload
    },
    'SAVE_MEDICAL_HISTORY' (state, payload) {
      state.user.medicalHistory = payload
    },
    'SAVE_SURGICAL_HISTORY' (state, payload) {
      state.user.surgicalHistory = payload
    }
  },
  actions: {
    signIn ({commit}, payload) {
      commit('setLoadin', true)
      commit('SET_ERROR', false)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
        commit('setLoadin', false)
      })
      .catch(error => {
        commit('setLoadin', false)
        commit('SET_ERROR', error)
      })
    },
    async signUp ({commit}, payload) {
      let user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      var userId = firebase.auth().currentUser.uid
      db.collection('users').add({
        id: userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        mail: payload.email,
        'role': 0,
        phoneNumber: '',
        location: '',
        medicalHistory: medHistory,
        surgicalHistory: surgHistory,
        picture: '',
        gender: ''
      }).then(snapshot => {
        return user
      })
    },
    setUser ({commit}, payload) {
      const userId = payload.uid
      db.collection('users').where('id', '==', userId).get()
      .then(querySnapshot => {
        const user = {
          id: payload.uid,
          email: payload.email
        }

        querySnapshot.forEach(doc => {
          const data = doc.data()
          user.firstName = data.firstName
          user.lastName = data.lastName
          user.picture = data.picture
          user.phoneNumber = data.phoneNumber
          user.location = data.location
          user.gender = data.gender
          user.role = data.role
          user.medicalHistory = data.medicalHistory
          user.surgicalHistory = data.surgicalHistory
          commit('setUser', user)
        })
      })
    },
    updateUser ({commit, getters}, payload) {
      const user = getters.getUser;

      const updatedUser =  {
        ...user,
        gender: payload.gender,
        phoneNumber: payload.phoneNumber,
        location: payload.location
      }

      // you can write db.collection('users').doc(user.id).update({...}) but
      // for this you need to save a user's document id same as firebase.user.uid
      // for now it's different and we can access it as I do it below
      db.collection('users').where('id', '==', user.id).get()
        .then((snap) => {
          snap.forEach((doc) => {
            doc.ref.update({
              gender: payload.gender,
              phoneNumber: payload.phoneNumber,
              location: payload.location
            })
          })
        })
        .then(() => {
          Vue.notify({
            type: 'success',
            text: 'User was successfully updated!'
          })

          commit('UPDATE_USER', updatedUser)
          // you can also add some global message property and add here message on success
          // and show it on UI after profile update
        })
        .catch((error) => commit('SET_ERROR', error))
    },
    // just updating users 'picture' property by passing image object from uploader
    setUserImage ({commit}, payload) {
      const userId = firebase.auth().currentUser.uid
      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              picture: payload
            })
          })
        })
        .then(() => {
          Vue.notify({
            type: 'success',
            text: 'Image was successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })
    },
    saveSurgicalHistory ({commit}, payload) {
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              surgicalHistory: payload
            })
          })
        })
        .then(() => {
          Vue.notify({
            type: 'success',
            text: 'Changes was successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('SAVE_SURGICAL_HISTORY', payload)
    },
    saveMedicalHistory ({commit}, payload) {
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              medicalHistory: payload
            })
          })
        })
        .then(() => {
          Vue.notify({
            type: 'success',
            text: 'Changes was successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('SAVE_MEDICAL_HISTORY', payload)
    },

    signOut ({commit}) {
      firebase.auth().signOut()
      commit('UNSET_USER')
      firebase.database().goOffline()
    }
  },
  getters: {
    getUser: (state) => state.user
  }
}
