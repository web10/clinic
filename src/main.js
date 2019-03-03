// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
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
  VCheckbox,
  VParallax
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import ImageUploader from 'vue-image-upload-resize'

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
    VCheckbox,
    VParallax
  }
})
Vue.use(Notifications)
Vue.config.productionTip = false

// I found this implementation of wrapping a Vue instanse in firebase callback usefull
// when I place it in created hook, strange bugs sometimes happends
var vue = null
firebase.auth().onAuthStateChanged(user => {
  // auto login user on authState change
  if (user) {
    store.dispatch('setUser', user)
  } else {
    router.push('/')
  }

  if (!vue) {
    vue = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
