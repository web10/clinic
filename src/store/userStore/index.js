/* eslint-disable */
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/config/firebaseInit'
import medHistory from '../staticData/medHistory'
import surgHistory from '../staticData/surgHistory'
import familyHistory from '../staticData/familyHistory'
import * as objectEquality  from '@/services/objectEquality'
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
  },
  'SEE_USER_EVENT' (state, payload) {
   console.log("users list after event in mutation: ", payload)
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
        email: payload.email,
        'role': 0,
        phoneNumber: '',
        location: '',
        medicalHistory: medHistory,
        surgicalHistory: surgHistory,
        familyHistory: familyHistory,
        medications: [],
        allergies: [],

        userEvents: {},
        picture: '',
        gender: '',
        emergContact1: [],
        emergContact2: [],
        familyAdult: [],
        familyChild1: [],
        familyChild2: [],
        middleInitial: '',
        dob: '',
        occupation: '',
        preferredPharmacy: '',
        addressLine1: '',
        addressLine2: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        phoneHome: '',
        phoneCell: '',
        phoneWork: '',
        emergContact1FirstName: '',
        emergContact1LastName: '',
        emergContact1Relationship: '',
        emergContact1AddressLine1: '',
        emergContact1AddressLine2: '',
        emergContact1AddressCity: '',
        emergContact1AddressState: '',
        emergContact1AddressZip: '',
        emergContact1Phone: '',
        emergContact2FirstName: '',
        emergContact2LastName: '',
        emergContact2Relationship: '',
        emergContact2AddressLine1: '',
        emergContact2AddressLine2: '',
        emergContact2AddressCity: '',
        emergContact2AddressState: '',
        emergContact2AddressZip: '',
        emergContact2Phone: '',
        familyAdultFirstName: '',
        familyAdultLastName: '',
        familyAdultMI: '',
        familyAdultDob: '',
        familyAdultGender: '',
        familyAdultPhoneCell: '',
        familyAdultPhoneWork: '',
        familyAdultEmail: '',
        familyAdultOccupation: '',
        familyChild1FirstName: '',
        familyChild1LastName: '',
        familyChild1MI: '',
        familyChild1Dob: '',
        familyChild1Gender: '',
        familyChild2FirstName: '',
        familyChild2LastName: '',
        familyChild2MI: '',
        familyChild2Dob: '',
        familyChild2Gender: '',
        enrollmentCertifyTrue: '',
        enrollmentSigned: '',
        enrollmentDate: ''
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
          mail: payload.email// changed to mail from email
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
          user.familyHistory = data.familyHistory
          user.medications = data.medications
          user.allergies = data.allergies

          user.userEvents = data.userEvents
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

    enrollUser ({commit, getters}, payload) {
      const user = getters.getUser;

      const updatedUser =  {
        ...user,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        middleInitial: payload.middleInitial,
        dob: payload.dob,
        occupation: payload.occupation,
        preferredPharmacy: payload.preferredPharmacy,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        addressCity: payload.addressCity,
        addressState: payload.addressState,
        addressZip: payload.addressZip,
        phoneHome: payload.phoneHome,
        phoneCell: payload.phoneCell,
        phoneWork: payload.phoneWork,
        email: payload.email,
        /* emergContact1: {
          firstName: payload.emergContact1.firstName,
          lastName: payload.emergContact1.lastName,
          relationship: payload.emergContact1.relationship,
          addressLine1: payload.emergContact1.addressLine1,
          addressLine2: payload.emergContact1.addressLine2,
          addressCity: payload.emergContact1.addressCity,
          addressState: payload.emergContact1.addressState,
          addressZip: payload.emergContact1.addressZip,
          phone: payload.emergContact1.phone
        } */
        emergContact1FirstName: payload.emergContact1FirstName,
        emergContact1LastName: payload.emergContact1LastName,
        emergContact1Relationship: payload.emergContact1Relationship,
        emergContact1AddressLine1: payload.emergContact1AddressLine1,
        emergContact1AddressLine2: payload.emergContact1AddressLine2,
        emergContact1AddressCity: payload.emergContact1AddressCity,
        emergContact1AddressState: payload.emergContact1AddressState,
        emergContact1AddressZip: payload.emergContact1AddressZip,
        emergContact1Phone: payload.emergContact1Phone,
        emergContact2: [
          {firstName: payload.emergContact2.firstName},
          {lastName: payload.emergContact2.lastName},
          {relationship: payload.emergContact2.relationship},
          {addressLine1: payload.emergContact2.addressLine1},
          {addressLine2: payload.emergContact2.addressLine2},
          {addressCity: payload.emergContact2.addressCity},
          {addressState: payload.emergContact2.addressState},
          {addressZip: payload.emergContact2.addressZip},
          {phone: payload.emergContact2.phone}
        ]
      }
      db.collection('users').where('id', '==', user.id).get()
        .then((snap) => {
          snap.forEach((doc) => {
            doc.ref.update({
              firstName: payload.firstName,
              lastName: payload.lastName,
              gender: payload.gender,
              middleInitial: payload.middleInitial,
              dob: payload.dob,
              occupation: payload.occupation,
              preferredPharmacy: payload.preferredPharmacy,
              addressLine1: payload.addressLine1,
              addressLine2: payload.addressLine2,
              addressCity: payload.addressCity,
              addressState: payload.addressState,
              addressZip: payload.addressZip,
              phoneHome: payload.phoneHome,
              phoneCell: payload.phoneCell,
              phoneWork: payload.phoneWork,
              email: payload.email,
              /*
              emergContact1: {
                firstName: payload.emergContact1.firstName,
                lastName: payload.emergContact1.lastName,
                relationship: payload.emergContact1.relationship,
                addressLine1: payload.emergContact1.addressLine1,
                addressLine2: payload.emergContact1.addressLine2,
                addressCity: payload.emergContact1.addressCity,
                addressState: payload.emergContact1.addressState,
                addressZip: payload.emergContact1.addressZip,
                phone: payload.emergContact1.phone
              } */
              emergContact1FirstName: payload.emergContact1FirstName,
              emergContact1LastName: payload.emergContact1LastName,
              emergContact1Relationship: payload.emergContact1Relationship,
              emergContact1AddressLine1: payload.emergContact1AddressLine1,
              emergContact1AddressLine2: payload.emergContact1AddressLine2,
              emergContact1AddressCity: payload.emergContact1AddressCity,
              emergContact1AddressState: payload.emergContact1AddressState,
              emergContact1AddressZip: payload.emergContact1AddressZip,
              emergContact1Phone: payload.emergContact1Phone,
              emergContact2: [
                {firstName: payload.emergContact2.firstName},
                {lastName: payload.emergContact2.lastName},
                {relationship: payload.emergContact2.relationship},
                {addressLine1: payload.emergContact2.addressLine1},
                {addressLine2: payload.emergContact2.addressLine2},
                {addressCity: payload.emergContact2.addressCity},
                {addressState: payload.emergContact2.addressState},
                {addressZip: payload.emergContact2.addressZip},
                {phone: payload.emergContact2.phone}
              ]
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
    saveUserCalenderEvent({commit, rootGetters, state}, payload) {
      //{clinicCal: state, visitStatus: 'scheduled', bookingTimeStamp: Date.now, id:Date.now()}
      //state = {around: '', events: [], ...}

const stateId = payload.id;
       const allUsers = rootGetters.getAllUsers
       console.log("allUsers: ", allUsers)
       const selectedUser = allUsers.find(user => {
        return user.firstName + ' ' + user.lastName === payload.clinicCal.events[(payload.clinicCal.events.length)-1].data.title
      })
      //console.log("selectedUser: ", selectedUser)

       const payloaddayEvent = payload.clinicCal.events[(payload.clinicCal.events.length)-1].schedule.dayOfMonth + payload.clinicCal.events[(payload.clinicCal.events.length)-1].schedule.month + payload.clinicCal.events[(payload.clinicCal.events.length)-1].schedule.year
       const payloadtimeEvent = payload.clinicCal.events[(payload.clinicCal.events.length)-1].schedule.times[0]

    //db state stored
    const storeData = {...payload.clinicCal.events[(payload.clinicCal.events.length)-1], visitStatus: payload.visitStatus, bookingTimeStamp: payload.bookingTimeStamp}

//check if the selectedUser has already that event registered
if(selectedUser.userEvents) {

  console.log("selectedUser has events: ", selectedUser)

    db.collection('users').where('id', '==', selectedUser.id).get()
    .then((snap) => {
      snap.forEach((doc) => {
         doc.ref.set({

          userEvents: {[stateId]: {...payload.clinicCal.events[(payload.clinicCal.events.length)-1], visitStatus: payload.visitStatus, bookingTimeStamp: payload.bookingTimeStamp}
         }}, { merge: true })
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

   selectedUser.userEvents = {...selectedUser.userEvents, [stateId]: {...payload.clinicCal.events[(payload.clinicCal.events.length)-1], visitStatus: payload.visitStatus, bookingTimeStamp: payload.bookingTimeStamp}}

  }
 else {
   //console.log("selected user has no events yet")

   db.collection('users').where('id', '==', selectedUser.id).get()
   .then((snap) => {
     snap.forEach((doc) => {
        doc.ref.set({

         userEvents: {[stateId]: {...payload.clinicCal.events[(payload.clinicCal.events.length)-1], visitStatus: payload.visitStatus, bookingTimeStamp: payload.bookingTimeStamp}
        }}, { merge: true })
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



         selectedUser.userEvents = {[stateId]: {...payload.clinicCal.events[(payload.clinicCal.events.length)-1], visitStatus: payload.visitStatus, bookingTimeStamp: payload.bookingTimeStamp}}
        // console.log("selected user has no events after event: ", selectedUser)
        // console.log("getters users after adding calendar events: ", rootGetters.getAllUsers)

 }
        commit('SEE_USER_EVENT', rootGetters.getAllUsers)
    },
    removeUserEvent({commit, rootGetters}, payload) {
      //payload:{removeEvent: event, visitStatus: 'Cancelled', reason :'not interested'}
      // payload.removeEvent:{data: {title: '', busy: '', description}, schedule: fn, id: ''}
      const allUsers = rootGetters.getAllUsers
       const selectedUser = allUsers.find(user => {
        return user.firstName + ' ' + user.lastName === payload.removeEvent.data.title
      })
     // console.log("cancelled selectedUser: ", selectedUser)
       const canceledUserEvent = objectEquality.objFil(selectedUser.userEvents, event => {return objectEquality.isEquivalent(event.data, payload.removeEvent.data)})
      // console.log("delete: ", selectedUser.userEvents[Object.keys(canceledUserEvent)])
       delete selectedUser.userEvents[Object.keys(canceledUserEvent)]

       canceledUserEvent[Object.keys(canceledUserEvent)].visitStatus = "Cancelled";
       canceledUserEvent[Object.keys(canceledUserEvent)].reason = payload.reason;

     selectedUser.userEvents = {...selectedUser.userEvents, ...canceledUserEvent}
      //console.log("UPDATED cancelled selectedUser: ", selectedUser)


    db.collection('users').where('id', '==', selectedUser.id).get()
   .then((snap) => {
     snap.forEach((doc) => {
        doc.ref.set(selectedUser)
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
