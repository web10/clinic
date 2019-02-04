// first line imports only base functionality from firebase
// second - an suth package
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/config/firebaseInit'
// import router from '../../router'

export default {
  state: {
    user: null,
    admin: null,
    role: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.role = payload.role
    },
    setAdmin (state, payload) {
      state.admin = 'superadmin'
    },
    'UNSET_USER' (state) {
      state.user = null
    },
    'UPDATE_USER' (state, payload) {
      state.user = payload
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
        picture: '',
        gender: ''
      }).then(snapshot => {
        return user
      })
    },
    /* old signup to real-time database
    async signUp ({commit}, payload) {
      let user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      var userId = firebase.auth().currentUser.uid
      firebase.database().ref('/user_details/' + userId).set({
        firstName: payload.firstName,
        lastName: payload.lastName,
        mail: payload.email,
        'role': 0,
        phoneNumber: '',
        location: '',
        picture: '',
        gender: ''
      }).then(snapshot => {
        return user
      })
    },  */
    setUser ({commit}, payload) {
      const userId = payload.uid
      db.collection('users').where('id', '==', userId).get()
      .then(querySnapshot => {
        const user = {
          id: payload.uid,
          email: payload.email,

          // !!!
          // you call this action from main.js file and pass a firebase user object as a payload
          // so you can't access something like - "location: payload.location" because it's not there
          // !!!

          /* set all users as admin for now */
          // role: 1,
          /*
          role: payload.email === 'admin@gmail.com' ? 1 : 0,
          */
          // phoneNumber: payload.phoneNumber,
          // location: payload.location,
          // gender: payload.gender
        }

        querySnapshot.forEach(doc => {
          const data = doc.data()
          user.firstName = data.firstName
          user.lastName = data.lastName
          user.picture = data.picture
          user.phoneNumber = data.phoneNumber
          user.location = data.location
          user.gender = data.gender
          commit('setUser', user)
        })
      })

      // return new Promise((resolve, reject) => {
      //   if (payload) {
      //     let user = {
      //       email: payload.email
      //     }
      //     var userId = firebase.auth().currentUser.uid
      //     db.collection('users').doc(userId).get('value').then(snapshot => {
      //       let data = snapshot.val()
      //     //  user.role = payload.email === 'admin@gmail.com' ? 1 : data.role
      //       user.role = payload.email === 'admin@gmail.com' ? 1 : 0
      //       user.firstName = data.firstName
      //       user.lastName = data.lastName
      //       resolve('done')
      //       commit('setUser', user)
      //     })
      //   }
      // })
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
        .catch(error => {
          commit('SET_ERROR', error)
        })
    },
    /* old setUser to real time database
    setUser ({commit}, payload) {
      return new Promise((resolve, reject) => {
        if (payload) {
          let user = {
            email: payload.email
          }
          var userId = firebase.auth().currentUser.uid
          firebase.database().ref('/user_details/' + userId).once('value').then(snapshot => {
            let data = snapshot.val()
          //  user.role = payload.email === 'admin@gmail.com' ? 1 : data.role
            user.role = payload.email === 'admin@gmail.com' ? 1 : 0
            user.firstName = data.firstName
            user.lastName = data.lastName
            resolve('done')
            commit('setUser', user)
          })
        }
      })
    },
    */
    getAllUse ({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection('users').get('value').then(snapshot => {
          let userList = []
          let value = snapshot.val()
          var user = firebase.auth().currentUser
          for (let key in value) {
            if (user.email !== value[key].email) {
              userList.push({id: key, ...value[key]})
            }
          }
          resolve(userList)
        })
      })
    },
    /* old getAllUse to real-time database
    getAllUse ({commit}, payload) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('/user_details').once('value').then(snapshot => {
          let userList = []
          let value = snapshot.val()
          var user = firebase.auth().currentUser
          for (let key in value) {
            if (user.email !== value[key].email) {
              userList.push({id: key, ...value[key]})
            }
          }
          resolve(userList)
        })
      })
    },
    */
    makeAdmin ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let role = payload.role === 1 ? 0 : 1
        db.collection('users').doc(payload.id).set({...payload, role: role}).then(error => {
          if (error) {
            reject(error)
          } else {
            resolve(payload)
          }
        })
      })
    },
    /* old makeAdmin to read-time database
    makeAdmin ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let role = payload.role === 1 ? 0 : 1
        firebase.database().ref('/user_details/' + payload.id).set({...payload, role: role}).then(error => {
          if (error) {
            reject(error)
          } else {
            resolve(payload)
          }
        })
      })
    },
    */
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
