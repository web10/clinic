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
              <!-- <img src="@/assets/avatar.png" height="100px" width="100px"> -->
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
              @onUpload="startImageResize"
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
              <v-list-tile-title>Mobile Phone: {{user.phoneNumber}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Located at: {{user.location}} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Gender: {{user.gender}} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
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
      image: null
    }
  },
  computed: {
    user () {
      return this.$store.state.userStore.user
    },
    // so if image is present in user object we'll show it, otherwise - show default picture
    userImage () {
      return this.image ? this.image.dataUrl : require('../assets/avatar.png')
    }
  },
  methods: {
    setImage (file) {
      this.hasImage = true
      this.image = file
    },
    startImageResize () {
      // you can delete unused methods from image uploader
      console.log('StartImageResize method')
    },
    endImageResize () {
      this.$store.dispatch('setUserImage', this.image)
    }
  },
  created() {
    this.image = this.$store.getters.getUser.picture
  }
}
</script>

<style scoped>

  .card__media img {
    object-fit: contain;
  }

</style>
