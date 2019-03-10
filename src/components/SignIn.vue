<template>
  <v-container>
    <v-layout>
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
  </v-container>
</template>

<script>
import SignUp from './Signup'

export default {
  name: 'Signin',
  components: {
    'sign-up': SignUp
  },
  data () {
    return {
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
//  computed: {
//    getUser () {
//      return !!this.$store.getters.getUser
//    }
//  },
//  watch: {
//    getUser (val) {
//      if (val === true) {
//        // watch if user value changed to true then redirect
//        this.$router.push('/intro')
//      }
//    }
//  },
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

  .round {
    border-radius: 10px;
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
