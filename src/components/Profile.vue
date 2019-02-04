<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media height="200px">
          <v-layout column fill-height>
            <v-card-title>
              <H2> {{user.firstName}} {{user.lastName}} </H2>
            </v-card-title>
            <span class="ma-5, text-xs-center" >
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
                Located at:
                <input v-model="user.location" placeholder="my location">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Gender:
                <!-- I think here better add radio buttons -->
                <input v-model="user.gender" placeholder="my gender">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <!-- you need a button to trigger updateProfile action or 
        if you don't want to use buttons - then you can trigger this action on input change event 
        but be carefull it can cause prefomance issue if you won't use debounce
        the simplest is to use a button -->
        <v-btn color="success" @click="updateProfile">Save</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
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
  created () {
    // on component create - load users data from DB
    this.user = this.$store.getters.getUser
  }
}
</script>

<style scoped>

  .card__media img {
    object-fit: contain;
  }

</style>
