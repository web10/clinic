<template>
  <v-card>
    <v-layout>
      <v-flex xs12>
        <div class="text-xs-center">
          <h1 > My Family's History </h1>
          <p class="center">Some diseases can run in the family. Let us know what other family members have so we can help you screen potential problems for you.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 m4>
        <v-card class="pa-2 ma-2">
          <v-div v-for="item in familyHxCheckList" :key="item.name">
            <v-checkbox :label="item.name" :key="index"></v-checkbox>
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
/* eslint-disable */
  export default {
    name: 'FamilyHx',
    data () {
      return {
        familyHxCheckList: [
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
          { 'name': 'Irritable Bowels' },
          { 'name': 'Depression' },
          { 'name': 'Anxiety' },
          { 'name': 'Bipolar' },
          { 'name': 'Schizophrenia' },
          { 'name': 'Stress' },
          { 'name': 'Insomnia' },
          { 'name': 'Cancer' }
        ]
      }
    }
  }
</script>

<style>
  .margin_right {
    margin-right: 5px;
  }
  .border {
    border-style: 1 px solid blue;
    margin: 5 px;
    padding: 5 px;
  }
</style>
