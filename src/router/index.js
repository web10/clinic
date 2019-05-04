/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Router)

const router = new Router({

  routes: [
    {
      path: '/',
      name: 'LandingPage',
      // it's for code splitting with webpack. In this case routes will be loaded asynchronously and bundle.js file will be less
      // special comments in 'import' tell webpack how to name a chunk
      component: () => import(/* webpackChunkName: "landing" */ '@/components/Landing.vue'),
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/components/Staff/Admin.vue'),
      meta: {
        requireAdmin: true
      }
    },
    {
      path: '/staff',
      name: 'Staff',
      component: () => import('@/components/Staff/Staff.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/staff/:id',
      name: 'ticket-show',
      component: () => import('@/components/Staff/TicketShow.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: () => import('@/components/Staff/Schedule.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/intro',
      name: 'Intro',
      component: () => import('@/components/Members/Intro.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/medicalhx',
      name: 'MedicalHx',
      component: () => import('@/components/Members/MedicalHx.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/surgicalhx',
      name: 'SurgicalHx',
      component: () => import('@/components/Members/SurgicalHx.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/medications',
      name: 'Medications',
      component: () => import('@/components/Members/Medications.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/familyhx',
      name: 'FamilyHx',
      component: () => import('@/components/Members/FamilyHx.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/consultation',
      name: 'Consultation',
      component: () => import('@/components/Members/Consultation.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/visits',
      name: 'Visits',
      component: () => import('@/components/Members/Visits.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/labs',
      name: 'Labs',
      component: () => import('@/components/Members/Labs.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/components/Profile.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('@/components/Alerts.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/components/Settings.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/messages',
      name: 'Messages',
      component: () => import('@/components/Messages.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/components/Members/Help.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/enroll',
      name: 'Enroll',
      component: () => import('@/components/Members/Enroll.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('@/components/Signin.vue'),
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/components/Signup.vue'),
      meta: {
        requireGuest: true
      }
    }
  ]
})

// runs for each route and checkes the condition
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requireGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/intro',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requireAdmin)) {
    // check this condition if (firebase.auth().currentUser.email !== 'danhnguyenmd@gmail.com,')
    if (firebase.auth().currentUser.email !== 'danhnguyenmd@gmail.com') {
    // if(user.role == 2) {
      next({
        path: '/intro',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    // handle all others routes
    next()
  }
})
export default router
