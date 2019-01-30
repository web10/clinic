// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase'
import router from './router'
import store from './store'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VForm,
  VCard,
  VGrid,
  VTabs,
  VToolbar,
  VTextField,
  VTooltip,
  VCarousel,
  VDialog,
  transitions,
  VAlert,
  VDataTable,
  VStepper,
  VProgressCircular,
  VDivider,
  VCheckbox
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import { ImageUploader } from 'vue-image-upload-resize'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VForm,
    VCard,
    VBtn,
    VIcon,
    VGrid,
    VTabs,
    VToolbar,
    VTextField,
    VTooltip,
    VCarousel,
    VDialog,
    transitions,
    VAlert,
    VDataTable,
    VStepper,
    VProgressCircular,
    VDivider,
    ImageUploader,
    VCheckbox
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
  created () {
    /* Danh's Veutify-template Firebase real-time db setting
    let config = {
      apiKey: 'AIzaSyA6q3Cx9io25_OSYKgOZtAs1YrvugRG2bA',
      authDomain: 'vuetify-template-c69fb.firebaseapp.com',
      databaseURL: 'https://vuetify-template-c69fb.firebaseio.com',
      projectId: 'vuetify-template-c69fb',
      storageBucket: 'vuetify-template-c69fb.appspot.com',
      messagingSenderId: '361467220892'
    }
    firebase.initializeApp(config)
    this.$store.dispatch('setLoadin', true)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setUser', user).then(done => {
          this.$router.replace('/intro')
          this.$store.dispatch('setLoadin', false)
        })
      } else {
        this.$store.dispatch('setLoadin', false)
        this.$router.replace('/')
      }
    })
    /*  Danh's Veutify-template Firebase real-time db setting end */
    /* clinic app cloud firestore setting and firebaseinitiation has
    been moved to firebaseInit.js so that I can export it
    independently from main.js file */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('setUser', user).then(done => {
          this.$router.replace('/intro')
          this.$store.dispatch('setLoadin', false)
        })
      } else {
        this.$store.dispatch('setLoadin', false)
        this.$router.replace('/')
      }
    })
  },
  data () {
    return {
      dialog: false
    }
  }
})
