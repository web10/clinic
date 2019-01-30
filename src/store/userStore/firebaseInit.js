import firebase from 'firebase'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB9VlaclsP5nyK0HM8-WWfchx6KOwtdtYU',
  authDomain: 'clinic-f47af.firebaseapp.com',
  databaseURL: 'https://clinic-f47af.firebaseio.com',
  projectId: 'clinic-f47af',
  storageBucket: 'clinic-f47af.appspot.com',
  messagingSenderId: '363467074888'
})

export default firebaseApp.firestore()
