import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader)
Vue.use(Vuetify)
Vue.use(Notifications)
Vue.config.productionTip = false

Vue.use(require('vue-moment'));

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
