<template>
  <v-app id="inspire" light>
    <!-- !!! it's will better to keep this file simple and outsource this markup in different components -->
    <v-navigation-drawer
      clipped fixed
      v-model="drawer"
      app width="200"
      v-if="auth"
      mobile-break-point="900">

      <v-list dense class="removepaddings">
        <div v-for="(item, index) in menuItems" :key="index">
          <v-list-tile
            :key="item.text"
            :to="item.link"
            class="indigo--text">
            <v-list-tile-action>
              <v-icon class="bl--text"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
               {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="blue"
      class="indigo--text"
      light
      app
      clipped-left
      v-if="user"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon class="indigo--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon >
        <router-link to="/" style="cursor: pointer" class="hidden-sm-and-down" tag="span">
          <span class="white--text">SHC Direct Care</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>


      <!-- Admin access only to manage employees -->
      <template v-if="user && user.role == '2'">
        <v-tooltip bottom>
          <v-btn icon slot="activator" :to="'/admin'" v-if="auth == true" >
            <v-icon class="orange--text">{{ 'person_outline' }}</v-icon>
          </v-btn>
          <span>Admin</span>
        </v-tooltip>
      </template>

      <!-- Staff access buttons start -->
      <template v-if="user && user.role >= '1'">
        <v-tooltip bottom v-for="item in staffItems" :key="item.name">
          <v-btn icon slot="activator" :to="item.link" v-if="auth == item.auth" >
            <v-icon class="green--text">{{ item.icon }}</v-icon>
          </v-btn>
          <span>{{ item.text }}</span>
        </v-tooltip>
      </template>

      <v-tooltip bottom v-for="item in dashItems" :key="item.name" >
        <v-btn icon slot="activator" :to="item.link" v-if="auth == item.auth" >
          <v-icon class="indigo--text">{{ item.icon }}</v-icon>
        </v-btn>
        <span>{{ item.text }}</span>
      </v-tooltip>
      <span v-if="user">{{user.email}}, role: {{user.role}}</span>
      <v-btn color="red" dark v-if="auth" @click="signOut()">Logout</v-btn>

      <!-- no longer using button to signup page
      <router-link to="/signin" style="cursor: pointer">
        <v-btn color="green" dark v-show="!auth">Login</v-btn>
      </router-link> -->

    </v-toolbar>
    <!-- if you will add all this specific markup before router-view - then all your pages will inherit this and customization will be a really hard -->
    <v-content>
      <v-container fluid>
        <!-- global notifications -->
        <error-notification></error-notification>
        <notifications group="base"/>


        <router-view></router-view>

        <v-progress-circular
          :size="70"
          :width="7"
          class="progress-circular"
          indeterminate
          color="primary"
          v-if="loading"></v-progress-circular>

      </v-container>
    </v-content>

    <v-spacer></v-spacer>

    <v-footer app class="blue pa-3 indigo--text " light v-if="user">
      <v-layout justify-center row wrap>
        <div>
          <strong>SHC Direct Care</strong> {{ new Date().getFullYear() }}
        </div>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
/* eslint-disable */
import ErrorNotification from '@/components/layout/ErrorNotification'

export default {
  components: {
    ErrorNotification
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    user () {
      return this.$store.getters.getUser
    },
    auth () {
      return !!this.user
    }
  },
  data: () => ({
    drawer: false,
    menuItems: [
      { icon: 'home', text: 'Benefits', name: 'intro', link: '/intro' },
      { icon: 'favorite', text: 'My Health', name: 'MedicalHx', link: '/medicalhx' },
      { icon: 'work', text: 'My Surgeries', name: 'SurgicalHx', link: '/surgicalhx' },
      { icon: 'format_color_fill', text: 'My Medications', name: 'Medications', link: '/medications' },
      { icon: 'supervised_user_circle', text: 'My Family', name: 'FamilyHx', link: '/familyhx' },
      { icon: 'desktop_windows', text: 'Consultations', name: 'Consultation', link: '/consultation' },
      { icon: 'folder_shared', text: 'My Visits', name: 'Visits', link: '/visits' },
      { icon: 'list_alt', text: 'My Labs', name: 'Labs', link: '/labs' }
    ],
    dashItems: [
      { icon: 'how_to_reg', text: 'Enroll', name: 'enroll', link: '/enroll', auth: true },
      { icon: 'person', text: 'My Profile', name: 'profile', link: '/profile', auth: true },
      { icon: 'chat_bubble', text: 'My Inbox', name: 'messages', link: '/messages', auth: true },
      { icon: 'help', text: 'Help', name: 'help', link: '/help', auth: true }
    ],
    staffItems: [
      {icon: 'schedule', text: 'Schedule', name: 'schedule', link: '/schedule', auth: true},
      {icon: 'group', text: 'Staff', name: 'staff', link: '/staff', auth: true}
    ]
  }),
  props: {
    source: String
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style>
  .front {
    background-size: cover;
    background-image: url("../src/assets/bg-image.jpeg");
  }
  .redborder {
    border: 3px solid red;
  }

  .removepaddings {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .progress-circular {
    position: fixed;
    right: 50%;
    top: 50%;
    transform: translateY(-50%);
  }

  .messenger-body {
    max-height: 500px;
    overflow-y: auto;
  }

</style>
