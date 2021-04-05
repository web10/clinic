<template>
  <v-container>
    <span class="title-inline"> <b>Sendas Direct Care Benefits:</b>
    Your membership gives you access to more services than any other clinic locally... and we are continually adding new services to put right at your fingertips to give you the most convenient care locally.</span> 
    
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Primary Care - <span class="green--text">Covered</span></h3>
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
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Work and School Physicals - <span class="green--text">Covered</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Sports Physicals</li>
              <li>New Job Physicals</li>
              <li>Annual Physical Requirements</li>
              <li>DOT Physicals</li>
              <li>Work and School Excuse Notes for Illness</li>
              <li>Return to Work/School Notes</li>
              <li>TB Screening</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Urgent Care - <span class="green--text">Covered</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Infection Treatments</li>
              <li>Injury Care</li>
              <li>X-rays</li>
              <li>Splinting</li>
              <li>Antibiotics</li>
              <li>Rapid Diagnostic Tests</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Skin Care - <span class="green--text">Covered</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Skin Tag Removals</li>
              <li>Acne Care</li>
              <li>Skin Biopsies</li>
              <li>Warts and Molluscum</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Skin Esthetics - <span class="green--text">Discounts</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Facials</li>
              <li>Microderm Abrasions</li>
              <li>Microneedling</li>
              <li>Photofacials</li>
              <li>Hair Removal</li>
              <li>Laser Treatment for Blemishes</li>
              <li>Microblading - coming soon</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Weight Management - <span class="red--text">Coming Soon</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Periodic labs</li>
              <li>Personal Coaching</li>
              <li>Dietary Counseling</li>
              <li>Healthy Meal Plans</li>
              <li>Medications for Weight Management</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4 >
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Personal Fitness - <span class="red--text">Coming Soon</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Initial assessment and consultation</li>
              <li>Personal coaching and guidance</li>
              <li>Health surveillence parellel to training</li>
              <li>Massage Therapy</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4 >
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Eye Care - <span class="red--text">Coming Soon</span></h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Annual Optometry Exam</li>
              <li>Discount on eyeglasses</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>
    </v-layout><v-btn color="success" block to="/medicalhx">Ready to get started? Let's Review Your Medical History --></v-btn>
  </v-container>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Benefits',
  data () {
    return {
      e1: 0
    }
  }
}
</script>

<style>
  .cardstyle {
    color: red;
    background: grey;
    border-style: black solid 1px;
    border-radius: 5px;
    padding: 10px;
  }
  .buttonstyle {
    background-color: yellow;
  }

  .title-inline {
    font-size: 1.5em;
  }

</style>
