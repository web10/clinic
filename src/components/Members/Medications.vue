<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <span class="headline"><b> Medications: </b> Let us know your current medications and allergies. </span>
        <v-container fluid class="container">
          <v-layout row wrap>
            <v-flex sm12 md6>
              <v-card class="card" >
                <v-card-title >

                  <v-layout>
                    <v-flex xs12 md4>
                    <h3>New Medication:</h3>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        single-line="true"
                        v-model="newMed"
                        box
                        label="medication name">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                      <v-btn color="blue">Add</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <hr>
                <v-card-text>
                  <h3 class="text-xs-center"> My Current Medications </h3>
                  <v-list>
                    <v-list-tile
                      v-for="(med, index) in medList"
                      :key="index">
                      <v-list-tile-content>
                        <v-list-tile-title v-text="med"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon color="red">delete</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex sm12 md6>
              <v-card class="card">
                <v-card-title>
                 <v-layout row wrap>
                   <v-flex xs12 md4>
                     <h3>New Allergy:</h3>
                   </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        single-line="true"
                        v-model="newAllergy"
                        box
                        label="medication name">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 md2>
                      <v-btn color="blue">Add</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <hr>
                <v-card-text>
                  <div class="text-xs-center">
                    <h3 > My Drug Allergies </h3>
                    <v-checkbox label="No Known Drug Allergy" v-model="nkda"> </v-checkbox>
                  </div>
                  <v-list>
                    <v-list-tile
                      v-for="(allergy, index) in allergiesList"
                      :key="index">
                      <v-list-tile-content>
                        <v-list-tile-title v-text="allergy"></v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon color="red">delete</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
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
    newAllergy: '',
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
    .card {
      border-radius: 10px;
      height: 100%;
      margin: 5px;
    }
    .bglightblue {
      background-color: lightblue;
    }
    .redborder {
      border: red 2px solid;
    }


</style>
