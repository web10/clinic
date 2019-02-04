<template>
  <v-container>
    <h1> Welcome to eClinic!</h1>
  </v-container>
  <!--
  <v-stepper v-model="e1" light>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Welcome!</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Total Control</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Transparency</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 4" step="4">Less Waiting</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 5" step="5">Lower Cost</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="cardstyle" height="200px">
          <H1> Welcome to eClinic</h1>
          <h4> "Your Healthcare, Reimagined" </h4>
        </v-card>
        <v-btn color="blue" light @click="e1 = 2" >  Continue </v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card  class="cardstyle"  height="200px"  >

        </v-card>
        <v-btn  color="blue" light  @click="e1 = 3"  >  Continue </v-btn>
        <v-btn flat> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="cardstyle" height="200px">

        </v-card>
        <v-btn color="blue" light @click="e1 = 4"  >  Continue  </v-btn>
        <v-btn flat> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card class="cardstyle" height="200px" >

        </v-card>
        <v-btn color="blue" light @click="e1 = 5"> Continue </v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card class="cardstyle" height="200px">

        </v-card>
        <v-btn buttonstyle light @click="e1 = 1"> Continue </v-btn>

      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
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

  .h1 {
  color: red;
  }
</style>
