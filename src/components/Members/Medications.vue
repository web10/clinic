<template>
  <v-container fluid >
    <v-layout>
      <v-flex xs12>
        <h1 class="text-xs-center">  My Medications </h1>
        <v-container fluid class="container">
          <v-layout>
            <v-flex xs12 sm6>
              <v-card class="pa-1 ma-1">
                <h2 class="text-xs-center"> Current Medications </h2>
                <v-card-text>
                  <v-list>
                    <v-list-tile
                      v-for="med in medList">
                      <v-list-tile-content>
                        <v-list-tile-title v-text="med"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon color="red">delete</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
                <v-container class="pa-2">
                <hr>
                  <h3 class="ma-2 "> Add New Medication: </h3>
                  <v-text-field
                    outline="true"
                    single-line="true"
                    v-model="newMed"
                    label="medication name"
                    class="mx-3"
                    counter="20">
                  </v-text-field>
                  <v-btn color="blue">Add New Medicine</v-btn>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6>
              <v-card class="pa-1 ma-1">
                <h2 class="text-xs-center"> Drug Allergies </h2>
                <v-checkbox
                  label="No Known Drug Allergy"
                  v-model="nkda"
                  >
                </v-checkbox>

                <v-card-text>
                  <v-list>
                    <v-list-tile
                      v-for="allergy in allergiesList">
                      <v-list-tile-content>
                        <v-list-tile-title v-text="allergy"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon color="red">delete</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
                <v-container class="pa-2">
                <hr>
                  <h3 class="ma-2 "> Add New Allergy: </h3>
                  <v-text-field
                    outline="true"
                    single-line="true"
                    v-model="newMed"
                    label="allergic to what?"
                    class="mx-3"
                    counter="20">
                  </v-text-field>
                  <v-btn color="blue">Add Allergy</v-btn>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container fluid>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'medicationList',
    newMed: '',
    nkda: '',
    data () {
      return {
        medList: [
          'atenolol',
          'metformin',
          'lisinopril',
          'aspirin',
          'lipitor'
        ],
        allergiesList: ['penicillin', 'sulfur']
      }
    }
  }
</script>

  <style>
    .container {
      border-style: 1px blue;
      bg-color: lightblue;
    }
    .bglightblue {
      background-color: lightblue;
    }
    .redborder {
      border: red 2px solid;
    }


</style>
