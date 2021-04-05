<template>
  <div class="landingpage">
    <v-layout  class="darkblue--text" row wrap>
      <v-flex xs12 md6 lg8 >
        <v-container>
          <h1 class="display-2 font-weight-thin mb-3 text-xs-center">Sendas Direct Care</h1>
          <h2 class="subheading text-xs-center">"Your Healthcare Simplified"</h2>
        </v-container>
      </v-flex>
      <v-flex xs12 md6 lg4>
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
                  <v-btn color="red--text" light @click="" :disabled="!valid" left>Forgot Password</v-btn>
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
  </v-parallax>

    <v-layout row wrap >
          <v-flex xs12>
            <!-- <v-container text-xs-center class="pa-1">
              <h2> SHC Direct Care</h2>
              <h3> by SHC Partners</h3>
          </v-container>
           <v-container class="px-1 mx-5 benefits" text-md-left>
              <ul v-for="item in benefitsList" :key="item.title">
                <li>
                  {{item.title}}
                </li>
              </ul>
          </v-container> -->

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
        {'title': 'Take back control of your care'},
        {'title': 'Text your team any time'},
        {'title': 'Save money'},
        {'title': 'Less waiting'}

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
  .landingpage {
    background-color: white;
    background-size: cover;
    background-image: url("../assets/bg.jpg");
    height: 100%;
    min-height: 600px;
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
  .card {
    background-color: 0, 30, 1, 0.5;
    border-radius: 10px;
    border-style: red 3px solid;
  }
  .redborder {
    border-style: red 3px solid;
  }
  .card-title {
    background-color: light-blue;
  }
</style>
