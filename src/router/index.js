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

const ifAuthenticated = (to, from, next) => {
  console.log('dd')
  if (store.state.userStore.user) {
    if (to.meta.adminRole) {
      if (store.state.userStore.user.role || store.state.userStore.user.email === 'admin@gmail.com') {
        next()
      } else {
        next(from.path)
      }
    } else {
      next()
    }
  } else {
    next('/')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: Landing
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: ifAuthenticated,
      meta: {
        adminRole: true
      }
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff,
      beforeEnter: ifAuthenticated,
      meta: {
        adminRole: true
      }
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/medicalhx',
      name: 'MedicalHx',
      component: MedicalHx,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/surgicalhx',
      name: 'SurgicalHx',
      component: SurgicalHx,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/medications',
      name: 'Medications',
      component: Medications,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/familyhx',
      name: 'FamilyHx',
      component: FamilyHx,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/consultation',
      name: 'Consultation',
      component: Consultation,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/visits',
      name: 'Visits',
      component: Visits,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/labs',
      name: 'Labs',
      component: Labs,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: Alerts,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
