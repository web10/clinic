<template>
<div>
  <v-parallax
  height="300"
  src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  >
  <v-layout
  align-center
  column
  justify-center
  class="blue--text"
>
  <h1 class="display-2 font-weight-thin mb-3">SHC Direct Care</h1>
  <h4 class="subheading">Get Direct Access to All Your Health Needs</h4>
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
            <v-card class="ma-1">
              <v-card-title primary-title class="lighten-4 light-blue">
                <h2>Get Direct Access To Your Healthcare Team</h2>
              </v-card-title>
              <v-card-content class="pa-1">
                <ul class="px-5">
                  <li>Unlimited Access to your team</li>
                  <li>Personalized Physician Care</li>
                  <li>Patient Care Instructions</li>
                  <li>Common In-Office Labs <b>FREE</b></li>
                  <li>Common In-Office Procedures <b>FREE</b></li>
                  <li>Urgent Care Procedures <b>FREE</b></li>
                </ul>
              </v-card-content>
            </v-card>
            <v-card class="ma-1">
              <v-card-title primary-title class="lighten-4 light-blue">
                <h2>Services Included</h2>
              </v-card-title>
              <v-card-content class="pa-1">
                <ul class="px-5">
                  <li>Routine Medical Care for Adult, Pediatri, and Women</li>
                  <li>Physical Exam for School, Sports, Camps</li>
                  <li>Physical Exam for Pre-Emploment, DOT, Life Insurance</li>
                  <li>Management of Allergies, Asthma, Dieabetes, Hypertension, and many others</li>
                  <li>Derm Clinic</li>
                  <li>Travel Medicine</li>
                </ul>
              </v-card-content>
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
