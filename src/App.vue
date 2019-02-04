<template>
  <v-app id="inspire" light>

    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      width="200"
      v-if="auth"

      mobile-break-point="900"
    >
      <v-list dense class="removepaddings">
        <div v-for="item in menuItems" >
        <!-- remove this item heading layout? -->
      <v-layout
        v-if="item.heading"
        :key="item.heading"
        row
        align-center

      >
      </v-layout>

          <v-list-tile
            v-else
            :key="item.text"
            :to="item.link"
             class="indigo--text">
            <v-list-tile-action>
              <v-icon class="bl--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list >
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
          eClinic - main
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- dashboard buttons start -->
      <v-tooltip bottom v-for="item in adminItems" :key="item.name" v-if="user && user.role == '1'">
        <v-btn icon slot="activator" :to="item.link" v-if="auth == item.auth" >
          <v-icon class="indigo--text">{{ item.icon }}</v-icon>
        </v-btn>
        <span>{{ item.text }}</span>
      </v-tooltip>
      <v-tooltip bottom v-for="item in dashItems" :key="item.name" >
        <v-btn icon slot="activator" :to="item.link" v-if="auth == item.auth" >
          <v-icon class="indigo--text">{{ item.icon }}</v-icon>
        </v-btn>
        <span>{{ item.text }}</span>
      </v-tooltip>
      <span v-if="user">{{user.email}}</span>
      <v-btn color="red" dark v-if="auth" @click="signOut()">Logout</v-btn>
    </v-toolbar>

      <v-container fluid>
        <v-layout>
          <v-flex sm3 hidden-sm-and-down v-if="user">
          </v-flex>
          <v-flex sm12 lg11>
            <main>
              <div class="pa-4" v-if="user"></div>
              <router-view v-if="!loading"></router-view>
              <v-progress-circular indeterminate color="primary" style="margin-top: 10em;margin-left: 48em;" v-if="loading">
              </v-progress-circular>
            </main>
          </v-flex>
        </v-layout>
      </v-container>
    <v-spacer></v-spacer>

    <v-footer app class="blue pa-3 indigo--text " light v-if="user">
      <v-layout justify-center row wrap>
        <div>
          <strong>eClinic</strong> {{ new Date().getFullYear() }}
        </div>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.state.loading
    },
    user () {
      return this.$store.state.userStore.user
    },
    auth () {
      let user = this.$store.state.userStore.user
      return !!user
    }
  },
  data: () => ({
    dialog: false,
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
      { icon: 'person', text: 'Profile', name: 'profile', link: '/profile', auth: true },
      { icon: 'notifications', text: 'Alerts', name: 'alerts', link: '/alerts', auth: true },
      { icon: 'settings', text: 'Settings', name: 'settings', link: '/settings', auth: true },
      { icon: 'chat_bubble', text: 'Messages', name: 'messages', link: '/messages', auth: true },
      { icon: 'help', text: 'Help', name: 'help', link: '/help', auth: true }
    ],
    adminItems: [
      {icon: 'person_outline', text: 'Admin', name: 'admin', link: '/admin', auth: true},
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

</style>
