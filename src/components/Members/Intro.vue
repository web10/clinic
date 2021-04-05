<template>
  <v-container>
    <h2 class="text-xs-center"> Welcome to Sendas Direct Care! </h2>
    <h3 class="text-xs-center"> "Your Health Simplified" </h3><br>
    <p >As a member, you have full control of your medical records and easy access to your healthcare team via text messages. </p>

    <p class="text-center"><span class="font-weight-bold">Got a problem?</span> Get your questions answered by opening a <span class="green--text">CONSULTATION</span> ticket. Many problems can be solved via text and telemedicine so you can avoid wasting time in <span class="red--text">WAITING ROOMS </span> and avoid <span class="red--text">PAYING CO-PAYS.</span> </p>

    <p ><span class="font-weight-bold">In Person Visits:</span> New problems will need to be evaluated wtih a physical exam and confirmed with tests. Your team can schedule an in person appointment for you. Members will get <span class="green--text">DISCOUNTS</span> for in-person exams and <span class="green--text">LOWER COST TESTING</span> within our network.</p>

    <p ><span class="font-weight-bold">Your Benefits:</span> You now have easy and quick access to your <span class="green--text">PRIMARY CARE</span>, <span class="green--text">URGENT CARE</span>, <span class="green--text">SKIN CARE</span>, as well as some <span class="green--text">AESTHETICS</span>...</p>

    <v-btn color="success" block to="/benefits">Next, See All Your Benefits</v-btn>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Intro',
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
