<template>
  <v-card>
    <v-layout class="blue lighten-3">
      <v-flex xs12>
        <div class="text-xs-center">
          <h1 > My Medical History </h1>
          <p class="center">Enter any medical problems you have had so that your doctor can help you manage them.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout class="blue lighten-3">
      <v-flex xs12 m4>
        <v-card class="pa-2 ma-2">
          <h2 class="text-xs-center">Health Problems</h2>
          <v-div v-for="item in medicalHxCheckList" class="pa-2">
            <input type="checkbox" name="item.name" :key="item.name" value="item.name" class="margin_right">{{ item.name }}
          </v-div>
          <v-spacer></v-spacer>
          <!-- <v-div v-for="item in medicalHxCheckList">
            <v-checkbox :label="item.name" :key="index"></v-checkbox>
          </v-div> -->
          <v-card-action>
            <v-btn>Save</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
      <v-flex xs12 m4>
        <v-card class="pa-2 ma-2">
          <h2 class="text-xs-center">Mental Health</h2>

          <v-div v-for="item in mentalHxCheckList" class="pa-2">
            <input type="checkbox" name="item.name" :key="item.name" value="item.name" class="margin_right">{{ item.name }}
          </v-div>
          <v-div v-for="item in mentalHxCheckList">
            <v-checkbox :label="item.name" :key="index"></v-checkbox>
          </v-div>
          <v-card-action>
            <v-btn>Save</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
      <v-flex xs12 m4>
        <v-card class="pa-2 ma-2">
          <h2 class="text-xs-center">Any Cancer?</h2>
          <v-div v-for="item in cancerHxCheckList">
            <v-checkbox :label="item.name" :key="item.name" class="ma-0 pa-0"></v-checkbox>
          </v-div>
          <v-card-action>
            <v-btn>Save</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
    </v-layout>

  </v-card>
</template>

<script>
  export default {
    name: 'MedicalHx',
    data () {
      return {
        medicalHxCheckList: [
          { 'name': 'Asthma' },
          { 'name': 'Diabetes' },
          { 'name': 'Back Pain' },
          { 'name': 'Hypertension' },
          { 'name': 'Rheumatoid Arthritis' },
          { 'name': 'Kidney Stones' },
          { 'name': 'Gallstones' },
          { 'name': 'Reflux/ Gastritis' },
          { 'name': 'Ulcers' },
          { 'name': 'Cholesterol' },
          { 'name': 'Valley Fever' },
          { 'name': 'Arthritis' },
          { 'name': 'Autoimmune' },
          { 'name': 'Lupus' },
          { 'name': 'Thyroid Problems' },
          { 'name': 'Heart Attack' },
          { 'name': 'Heart Failure' },
          { 'name': 'Heart Disease' },
          { 'name': 'Hepatitis' },
          { 'name': 'HIV/ AIDS' },
          { 'name': 'Stroke' },
          { 'name': 'Overweight' },
          { 'name': 'Inflammatory Bowels' },
          { 'name': 'Irritable Bowels' }
        ],
        mentalHxCheckList: [
          { 'name': 'Depression' },
          { 'name': 'Anxiety' },
          { 'name': 'Bipolar' },
          { 'name': 'Schizophrenia' },
          { 'name': 'Stress' },
          { 'name': 'Insomnia' }
        ],
        cancerHxCheckList: [
          { 'name': 'Breast' },
          { 'name': 'Ovary' },
          { 'name': 'Uterus' },
          { 'name': 'Colon' },
          { 'name': 'Prostate' },
          { 'name': 'Bone' },
          { 'name': 'Leukemia' },
          { 'name': 'Skin' },
          { 'name': 'Melanoma' },
          { 'name': 'Lung' }
        ],

      }
    }
    /* attempt to sort the list
    computed: {
      orderedMedicalList: function () {
        return _.sortBy(this.medicalHxCheckList, 'name')
      }
    } */
  }
</script>

<style>
  .margin_right {
    margin-right: 5px;
  },
  .border {
    border-style: 1 px solid blue;
    margin: 5 px;
    padding: 5 px;
  }
</style>
