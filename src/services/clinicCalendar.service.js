/* eslint-disable standard/object-curly-even-spacing */
 /* eslint-disable */
import db from '@/config/firebaseInit'

/**
 ******************************
 * @api
 ******************************
 */

export function createCalendar(calendar) {
  if (calendar.events.length) {
    return new Promise((resolve, reject) => {
      db.collection("clinicCalendar").get().then(function (querySnapshot) {
        console.log('my length ', querySnapshot.docs.length)
        console.log('my length ', querySnapshot.docs.length)
        if (querySnapshot.docs.length === 0) {
          console.log('creating first doc')
          const calendarRef = db.collection('clinicCalendar').doc()
          db.collection('clinicCalendar').doc(calendarRef.id).set({
            ...calendar
          }, {
            merge: true
          })
        } else {
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, " myname=> ", doc.data());
            db.collection('clinicCalendar').doc(doc.id).set({
              ...calendar
            }, {
              merge: true
            })
          //  console.log(doc.id, " => ", doc.data());
          });
        }
      });


    })
  }
  else {
    console.log("in calendar else")
    const calendarRef = db.collection('clinicCalendar').doc()

    return db.collection('clinicCalendar').doc(calendarRef.id).get()
  }
}

export function getCalenderEvent() {
  return new Promise((resolve, reject) => {
    const clinicCalendar = []
    db.collection('clinicCalendar').get()
      .then(snap => {
        snap.forEach(doc => {
          const data = doc.data()
          clinicCalendar.push(data)
        })
        resolve(clinicCalendar)
      })
      .catch((error) => reject(error))
  })
}
