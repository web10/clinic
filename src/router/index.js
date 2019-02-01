import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Members/Intro'
import MedicalHx from '@/components/Members/MedicalHx'
import SurgicalHx from '@/components/Members/SurgicalHx'
import Medications from '@/components/Members/Medications'
import FamilyHx from '@/components/Members/FamilyHx'
import Consultation from '@/components/Members/Consultation'
import Visits from '@/components/Members/Visits'
import Labs from '@/components/Members/Labs'
import Profile from '@/components/Profile'
import Alerts from '@/components/Alerts'
import Settings from '@/components/Settings'
import Messages from '@/components/Messages'
import Help from '@/components/Help'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Landing from '@/components/Landing'
import Admin from '@/components/Admin'
import Staff from '@/components/Staff'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: Landing,
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/medicalhx',
      name: 'MedicalHx',
      component: MedicalHx,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/surgicalhx',
      name: 'SurgicalHx',
      component: SurgicalHx,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/medications',
      name: 'Medications',
      component: Medications,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/familyhx',
      name: 'FamilyHx',
      component: FamilyHx,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/consultation',
      name: 'Consultation',
      component: Consultation,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/visits',
      name: 'Visits',
      component: Visits,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/labs',
      name: 'Labs',
      component: Labs,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: Alerts,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requireGuest: true
      }
    }
  ]
})

// const ifAuthenticated = (to, from, next) => {
//   next()
  // console.log('dd')
  // if(store.getters.getUser) {
  //   console.log('router, user is Auth')
  //   next()
  // } else {
  //   console.log('router, user is NOT Auth')
  //   next('/')
  // }
  // if (store.state.userStore.user) {
  //   if (to.meta.adminRole) {
  //     if (store.state.userStore.user.role || store.state.userStore.user.email === 'admin@gmail.com') {
  //       next()
  //     } else {
  //       next(from.path)
  //     }
  //   } else {
  //     next()
  //   }
  // } else {
  //   next('/')
  // }
// }

// runs for each route and checkes the condition
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(!store.getters.getUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireGuest)) {
    if(!!store.getters.getUser) {
      next({
        // maybe you want to change this behaviour, now it's will redirect to home page
        path: '/intro',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireAdmin)) {
    // check this condition
    if(store.state.user.role || store.state.user.email === 'admin@gmail.com') {
      next({
        // redirect where you want
        path: '/admin',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    //handle all others routes
    next()
  } 
})

export default router