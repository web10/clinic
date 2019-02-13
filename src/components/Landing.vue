<template>
<div class="landingpage">
    <v-layout row wrap >
          <v-flex xs6 sm8 md9>
            <v-container text-xs-center class="pa-1">
              <h1> eClinic App</h1>
              <h4> by SHC Partner </h4>
              <H2>"Your Health Re-imagined"</H2>
            <!--
              <v-list>
                <v-list-tile v-for="item in benefitsList" :key="item.title">
                  </v-list-tile-action>
                    <v-icon v-if="item.icon" color="pink">star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            -->
          </v-container>
          <v-container class="px-1 mx-5 benefits" text-md-left>
              <ul v-for="item in benefitsList" :key="item.title">
                <li>
                  {{item.title}}
                </li>
              </ul>
          </v-container>
          </v-flex>
          <v-flex xs6 sm4 md3 round>
            <v-card class="ma-2">
              <v-tabs grow>
                <v-tab>Sign In</v-tab>
                <v-tab>Register</v-tab>
                <v-tab-item>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                      <v-form>
                        <v-alert :value="error.msg" type="error">
                          {{error.msg}}
                        </v-alert>
                        <v-text-field  prepend-icon="person" v-model="email" label="Email" type="text" :rules="emailRule"></v-text-field>
                        <v-text-field  prepend-icon="lock" v-model="password" label="Password" type="password" :counter="6" :rules="passwordRule"></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="blue" light @click="signIn()" :disabled="!valid" left>Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-tab-item>
                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <sign-up/>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
  </div>
</template>
<script>
import SignUp from './Signup'

export default {
  name: 'LandingPage',
  components: {
    'sign-up': SignUp
  },
  data () {
    return {
      benefitsList: [
        {"title": 'Take back control of your care'},
        {"title": 'Text your team any time'},
        {"title": 'Save money'},
        {"title": 'Less waiting'}

      ],
      valid: true,
      error: { msg: '' },
      email: '',
      emailRule: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRule: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ]
    }
  },
  computed: {
    getUser () {
      return !!this.$store.getters.getUser
    }
  },
  watch: {
    getUser (val) {
      if (val === true) {
        // watch if user value changed to true then redirect
        this.$router.push('/intro')
      }
    }
  },
  methods: {
    signIn () {
      if (this.valid) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signIn', user)
      }
    }
  }
}
</script>

<style>
  h1 {
    font-size: 4em;
  }
  h2 {
    font-size: 3em;
  }
  .landingpage {
    background-color: white;
    background-size: cover;
    background-image: url("../assets/bg.jpg");
    height: 100%;
    min-height: 600px;
    border: #1A237E solid 3px;
    padding: 5px;
    border-radius: 10px;
    color: #1A237E;
  }
  .round {
    border-radius: 10px;
  }
  .benefits {
    font-size: 2em;
    /* not working yet
    font-family: 'Fahkwang', sans-serif; */
    }
  .redborder {
    border-style: red 3px solid;
  }
</style>
