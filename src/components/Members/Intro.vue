<template>
  <v-container>
    <h3> Welcome to SHC Direct Care - brought to you by SHC Parters</h3>
    <hr>
    <h3>Your Benefits</h3>
    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Primary Care</h3>
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
            <h3>Work and School physicals</h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Sports Physicals</li>
              <li>Employment Related Physicals</li>
              <li>DOT Physicals</li>
              <li>TB Screening</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Urgent Care</h3>
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
            <h3>Skin Care</h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Skin Tag Removals</li>
              <li>Acne Care</li>
              <li>Skin Biopsies</li>
              <li>Discounts on Laser Treatment</li>
              <li>Discounts on Skin Rejuvenation Procedures</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Weight Management</h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Periodic labs</li>
              <li>Personal coaching/training</li>
              <li>Dietary counseling</li>
              <li>Dietary meal options</li>
              <li>Phentermine management</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg4 >
        <v-card class="ma-1" height="100%">
          <v-card-title primary-title class="lighten-4 light-blue">
            <h3>Personal Fitness</h3>
          </v-card-title>
          <v-card-content class="pa-1">
            <ul class="px-5">
              <li>Initial assessment and consultation</li>
              <li>Personal coaching and guidance</li>
              <li>Health surveillence parellel to training</li>
            </ul>
          </v-card-content>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
  </v-container>
</template>

<script>
export default {
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

</style>
