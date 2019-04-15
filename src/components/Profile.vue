<template>
  <div>
    <h2 class="text-xs-center"> My Profile </h2>
  <v-layout row class="ma-1">
    <v-flex xs12 md4 class="text-xs-center">
      <v-card class="pa-2" height="500px">
        <v-card-media height="100%" >
          <v-layout column fill-height>
            <v-card-title class="pa-2">
              <h3> {{user.firstName}} {{user.lastName}} </h3>
            </v-card-title>
            <span class="ma-5" >
              <img :src="userImage" height="100px" width="100px">
            </span>
            <image-uploader
              :debug="1"
              :maxWidth="512"
              :quality="0.7"
              :autoRotate=true
              outputFormat="verbose"
              :preview=false
              :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
              capture="environment"
              @input="setImage"
              @onComplete="endImageResize">
            </image-uploader>
          </v-layout>
        </v-card-media>
       </v-card>
    </v-flex>
    <v-flex xs12 md4>
      <v-card class="pa-2" height="100%">
        <h3> Contacts: </h3>
        <v-list>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Email: {{user.email}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>



          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Mobile Phone:
                <input v-model="user.phoneNumber" placeholder="my phone number">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Address:
                <input v-model="user.location" placeholder="my location">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>something else</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Gender:
                <!-- I think here better add radio buttons, will add later -->
                <input v-model="user.gender" placeholder="my gender">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      <v-btn color="success" @click="updateProfile">Save</v-btn>
    </v-card>
  </v-flex>

  </v-layout>

</div>
</template>
<script>

export default {
  name: 'Profile',
  data () {
    return {
      hasImage: false,
      user: {
        picture: null,
        phoneNumber: null,
        gender: null,
        location: null
      }
    }
  },
  computed: {
    userImage () {
      return this.user.picture ? this.user.picture.dataUrl : require('../assets/avatar.png')
    },
    getUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    setImage (file) {
      this.hasImage = true
      this.user.picture = file
    },
    endImageResize () {
      this.$store.dispatch('setUserImage', this.user.picture)
    },
    // call update method and pass user object with new values
    updateProfile () {
      this.$store.dispatch('updateUser', this.user)
    }
  },
  watch: {
    getUser (val) {
      if (val) {
        this.user = this.getUser
      }
    }
  },
  created () {
    // on component create - load users data from DB
    if (this.getUser) {
      this.user = this.getUser
    }
  }
}
</script>

<style scoped>

  .card__media img {
    object-fit: contain;
  }
  .height100 {
    height: 100%;
  }

</style>
