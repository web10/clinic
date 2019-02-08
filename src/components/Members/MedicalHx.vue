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
          <v-div v-for="item in medicalHxCheckList" :key="item.name" class="pa-2">
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

          <v-div v-for="item in mentalHxCheckList" :key="item.Diagnosis" class="pa-2">
            <input type="checkbox" name="item.Diagnosis" :key="item.Diagnosis" Dx="item.Diagnosis" class="margin_right">{{ item.Diagnosis }}
          </v-div>
          <v-div v-for="item in mentalHxCheckList" :key="item.Diagnosis">
            <v-checkbox :label="item.Diagnosis" :key="index"></v-checkbox>
          </v-div>
          <v-card-action>
            <v-btn>Save</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
      <v-flex xs12 m4>
        <v-card class="pa-2 ma-2">
          <h2 class="text-xs-center">Any Cancer?</h2>
          <v-div v-for="item in cancerHxCheckList" :key="item.Diagnosis">
            <v-checkbox :label="item.Diagnosis" :key="item.Diagnosis" class="ma-0 pa-0"></v-checkbox>
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
          { 'Diagnosis': 'Asthma', 'Dx': 'Asthma' },
          { 'Diagnosis': 'Diabetes', 'Dx': 'Diabetes' },
          { 'Diagnosis': 'Back Pain', 'Dx': 'Back Pain' },
          { 'Diagnosis': 'Hypertension', 'Dx': 'HTN' },
          { 'Diagnosis': 'Rheumatoid Arthritis', 'Dx': 'RA' },
          { 'Diagnosis': 'Kidney Stones', 'Dx': 'Kidney Stones' },
          { 'Diagnosis': 'Gallstones', 'Dx': 'Gallstones' },
          { 'Diagnosis': 'Reflux/ Gastritis', 'Dx': 'GERD' },
          { 'Diagnosis': 'Ulcers', 'Dx': 'PUD' },
          { 'Diagnosis': 'Cholesterol', 'Dx': 'Dyslipidemia' },
          { 'Diagnosis': 'Valley Fever', 'Dx': 'Coccidiomycosis' },
          { 'Diagnosis': 'Arthritis', 'Dx': 'DJD' },
          { 'Diagnosis': 'Autoimmune', 'Dx': 'Autoimmune' },
          { 'Diagnosis': 'Lupus', 'Dx': 'SLE' },
          { 'Diagnosis': 'Thyroid Problems', 'Dx': 'Thyroid' },
          { 'Diagnosis': 'Heart Attack', 'Dx': 'MI' },
          { 'Diagnosis': 'Heart Failure', 'Dx': 'CHF' },
          { 'Diagnosis': 'Heart Disease', 'Dx': 'CAD' },
          { 'Diagnosis': 'Hepatitis', 'Dx': 'Hepatitis' },
          { 'Diagnosis': 'HIV/ AIDS', 'Dx': 'HIV' },
          { 'Diagnosis': 'Stroke', 'Dx': 'CVA' },
          { 'Diagnosis': 'Overweight', 'Dx': 'Obesity' },
          { 'Diagnosis': 'Eczema', 'Dx': 'Eczema' },
          { 'Diagnosis': 'Inflammatory Bowels', 'Dx': 'IBD' },
          { 'Diagnosis': 'Irritable Bowels', 'Dx': 'IBS' }
        ],
        mentalHxCheckList: [
          { 'Diagnosis': 'Depression', 'Dx': 'Depression' },
          { 'Diagnosis': 'Anxiety', 'Dx': 'Anxiety' },
          { 'Diagnosis': 'Bipolar', 'Dx': 'Bipolar' },
          { 'Diagnosis': 'Schizophrenia', 'Dx': 'Schizophrenia' },
          { 'Diagnosis': 'Stress', 'Dx': 'Stress' },
          { 'Diagnosis': 'Insomnia', 'Dx': 'Insomnia' }
        ],
        cancerHxCheckList: [
          { 'Diagnosis': 'Breast', 'Dx': 'Breast CA' },
          { 'Diagnosis': 'Ovaries', 'Dx': 'Ovarian CA' },
          { 'Diagnosis': 'Testicles', 'Dx': 'Testicular CA' },
          { 'Diagnosis': 'Uterus', 'Dx': 'Uterine CA' },
          { 'Diagnosis': 'Colon', 'Dx': 'Colon CA' },
          { 'Diagnosis': 'Prostate', 'Dx': 'Prostate CA' },
          { 'Diagnosis': 'Bone', 'Dx': 'Bone CA' },
          { 'Diagnosis': 'Leukemia', 'Dx': 'Leukemia' },
          { 'Diagnosis': 'Skin', 'Dx': 'Skin CA' },
          { 'Diagnosis': 'Melanoma', 'Dx': 'Melanoma' },
          { 'Diagnosis': 'Lung', 'Dx': 'Lung CA' }
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
