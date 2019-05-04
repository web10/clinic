/* eslint-disable */
import firebase from 'firebase'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  // Oleg local db settings
  // apiKey: 'AIzaSyBoQXhol8RKRR5sjdjpnRHri9GsfNNcEzQ',
  // authDomain: 'upwork-health-app.firebaseapp.com',
  // databaseURL: 'https://upwork-health-app.firebaseio.com',
  // projectId: 'upwork-health-app',
  // storageBucket: 'upwork-health-app.appspot.com',
  // messagingSenderId: '266774888215'

  // Danh's local db settings

  apiKey: 'AIzaSyB9VlaclsP5nyK0HM8-WWfchx6KOwtdtYU',
  authDomain: 'clinic-f47af.firebaseapp.com',
  databaseURL: 'https://clinic-f47af.firebaseio.com',
  projectId: 'clinic-f47af',
  storageBucket: 'clinic-f47af.appspot.com',
  messagingSenderId: '363467074888'

})

const db = firebaseApp.firestore()
// adding this extra settings will remove firebase warning in console
db.settings({timestampsInSnapshots: true})
export default db

// export default firebaseApp.firestore()
