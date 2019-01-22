<template>
  <v-stepper v-model="e1" light>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Welcome!</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Enhance</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3">Correct</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 4" step="4">Rejuvenate</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 5" step="5">Partners</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="cardstyle" height="200px">
          <H1> Welcome to the Allure Family</h1>
          <h4> Are are bringing you the latest tools you need to bring out your natural beauty! </h4>
        </v-card>
        <v-btn color="yellow" light @click="e1 = 2" >  Continue </v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card  class="cardstyle"  height="200px"  >
          <H1> Enhance What You Already Have</h1>
          <h4> Hair Removal via waxing or laser </h4>
          <h4> Improve your skin complexion with acne treatments, facials, microderm abrasion, chemical peels, microneedling, and photofacials </h4>
          <h4> Microblading to enhance your eyebrows </h4>
          <h4> Enhance your nose contours with fillers </h4>
        </v-card>
        <v-btn  color="yellow" light  @click="e1 = 3"  >  Continue </v-btn>
        <v-btn flat> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="cardstyle" height="200px">
          <H1> Correct Your Slight Imperfections</h1>
          <h4>Scar revision </h4>
          <h4>Acne scar reduction with photofacials and microneedling</h4>
          <h4>Psoriasis Treatment </h4>
          <h4>Wart Removal</h4>
          <h4>Mole Removal </h4>
        </v-card>
        <v-btn color="yellow" light @click="e1 = 4"  >  Continue  </v-btn>
        <v-btn flat> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card class="cardstyle" height="200px" >
          <H1> Rejuvenate </h1>
          <h4> Minimize wrinkles with Botox and fillers </h4>
          <h4> Erase sun spots with lasers </h4>
          <h4> Raise sagging chin lines with Kybella </h4>
        </v-card>
        <v-btn color="yellow" light @click="e1 = 5"> Continue </v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card class="cardstyle" height="200px">
          <H1> Partner with Us!</h1>
          <p> If you like what you see, and you have access to customers who would also love our offering, then sign up to be our partner. </p>
          <p> You will be able to hand out coupons of our offerings to your clients and receive a 10% referral commission for every coupon that has been redeemed.</p>
          <p> You will be able to track all your earnings here. </p>
        </v-card>
        <v-btn buttonstyle light @click="e1 = 1"> Continue </v-btn>
        <v-btn flat>Cancel</v-btn>
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
