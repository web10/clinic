/* eslint-disable */
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/config/firebaseInit'
import medHistory from '../staticData/medHistory'
import surgHistory from '../staticData/surgHistory'
import familyHistory from '../staticData/familyHistory'
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
    },
    'SAVE_FAMILY_HISTORY' (state, payload) {
      state.user.familyHistory = payload
    },
    'SAVE_MEDICATION' (state, payload) {
       //{medicine: selectedMedDetails[0], userInput: this.$refs.mediRefName.searchInput}
      if(!state.user.medications){
         console.log("adding first medicine ")
         //state.user.medications.push(payload)
         state.user.medications = [payload]
         console.log("state.user.medications:: ", state.user.medications )
       }
       else {
         state.user.medications.push(payload)
         console.log("state.user.medications: ", state.user.medications )
       }
    },
    'DEL_MEDICATION' (state, payload) {
      state.user.medications.splice(payload.index, 1);
    },
    'SAVE_ALLERGY' (state, payload) {
      //payload: { allergyDrug: { 'generic': 'ibuprofen', 'brandNames': [ 'Motrin', 'Advil']}, drugReaction: this.reaction, userAllergyInput: ''}
      if(!state.user.allergies){
        //state.user.allergies.push(payload)
       state.user.allergies = [payload]
        console.log("state.user.allergies: ", state.user.allergies )
      }
      else{
        state.user.allergies.push(payload)
      }
   },
   'DEL_ALLERGY' (state, payload) {
    state.user.allergies.splice(payload.index, 1);
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
        familyHistory: familyHistory,
        medications: [],
        allergies: [],
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
          user.surgicalHistory = data.surgicalHistory,
          user.familyHistory = data.familyHistory,
          user.medications = data.medications
          user.allergies = data.allergies
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
            group: 'base',
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
            group: 'base',
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
            group: 'base',
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
      console.log("payload: ", payload)
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
           console.log("doc:", doc)
            doc.ref.update({
              medicalHistory: payload
            })
          })
        })
        .then(() => {
          Vue.notify({
            group: 'base',
            type: 'success',
            text: 'Changes was successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('SAVE_MEDICAL_HISTORY', payload)
    },
    saveFamilyHistory ({commit}, payload) {
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              familyHistory: payload
            })
          })
        })
        .then(() => {
          Vue.notify({
            group: 'base',
            type: 'success',
            text: 'Changes were successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('SAVE_FAMILY_HISTORY', payload)
    },
    saveMedication ({commit}, payload) {
      //{medicine: selectedMedDetails[0], userInput: this.$refs.mediRefName.searchInput}
      console.log("commit: ", payload)
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              medications: firebase.firestore.FieldValue.arrayUnion(payload)
            })
          })
        })
        .then(() => {
          Vue.notify({
            group: 'base',
            type: 'success',
            text: 'Changes was successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('SAVE_MEDICATION', payload)
    },
    delMedication ({commit}, payload) {
      //{brand: "", geners: ""}
      console.log("commit del: ", payload.index)
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              medications: firebase.firestore.FieldValue.arrayRemove(payload.deleteMedication)
            })
          })
        })
        .then(() => {
          Vue.notify({
            group: 'base',
            type: 'success',
            text: 'Changes were successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('DEL_MEDICATION', payload)
    },
    saveAllergy ({commit}, payload) {
      //{ medicine: { 'generic': 'ibuprofen', 'brandNames': [ 'Motrin', 'Advil']}, reaction: this.reaction, userAllergyInput: ''}
      console.log("commit allergy: ", payload)
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              allergies: firebase.firestore.FieldValue.arrayUnion(payload)
            })
          })
        })
        .then(() => {
          Vue.notify({
            group: 'base',
            type: 'success',
            text: 'Changes was successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('SAVE_ALLERGY', payload)
    },
    delAllergyMedication ({commit}, payload) {
      //{ deleteAllergyMedication, index }
      console.log("commit del: ", payload.index)
      const userId = firebase.auth().currentUser.uid

      commit('SET_ERROR', null)
      db.collection('users').where('id', '==', userId).get()
       .then((snap) => {
         snap.forEach((doc) => {
            doc.ref.update({
              allergies: firebase.firestore.FieldValue.arrayRemove(payload.deleteAllergyMedication)
            })
          })
        })
        .then(() => {
          Vue.notify({
            group: 'base',
            type: 'success',
            text: 'Changes were successfully saved!'
          })
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })

      commit('DEL_ALLERGY', payload)
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
