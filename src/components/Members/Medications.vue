<template>
  <v-container>
    <v-layout>
      <span class="title-inline"><b>My Medications:</b> Enter your medications and allergies so we can avoid unwanted medical interactions or side effects. </span>
    </v-layout>
    <v-layout row wrap>
      <v-container fluid>
        
        <v-layout row wrap>
          <v-flex sm12 md6>
            <v-card class="card medication-card ma-2">
              <v-card-title>
                <h3>My Medication List</h3>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="(item, index) in getUserMedi" :key="index">
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.userInput.toUpperCase()"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn @click="delMed(index)" fab>
                        <v-icon color="red">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-layout>
                  <v-flex xs12 md8>
                    <vue-autosuggest
                      :suggestions="filteredOptions"
                      @selected="onSelected"
                      :limit="limit"
                      :input-props="inputProps"
                      ref="mediRefName"
                    ></vue-autosuggest>
                  </v-flex>
                  <v-flex xs12 md4 class="add-btn">
                    <v-btn color="green" @click="addMedication">Add</v-btn>
                  </v-flex>
                </v-layout>
                
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex sm12 md6>
            <v-card class="card">
              <v-card-title class="allergy-card">
                <h3>My Allergies</h3>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md4>
                    <label for="autosuggest__allergy">Medication</label>
                    <vue-autosuggest
                      :suggestions="filteredAllergyOptions"
                      @selected="onSelectedAllergy"
                      :limit="limit"
                      :input-props="inputPropsAllergy"
                      ref="mediAllergyName"
                    ></vue-autosuggest>
                  </v-flex>

                  <v-flex xs12 md4 class="solo-text">
                    <label for="reaction-allergy">Reaction</label>
                    <v-text-field
                      id="reaction-allergy"
                      solo
                      v-model="reaction"
                      label="rash?"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md3 class="add-btn">
                    <v-btn color="blue" @click="addAllergy">Add</v-btn>
                  </v-flex>
                </v-layout>

                <v-checkbox
                  class="allergy-checkbox"
                  label="No Known Drug Allergy"
                  v-model="noAllergy"
                ></v-checkbox>
              </v-card-text>

                <div class="text-xs-center">
                  <h3>My Drug Allergies</h3>

                </div>
                <v-list v-show="!noAllergy">
                  <v-list-group v-for="(allergy, index) in getUserAllergy" :key="index" no-action>
                    <template v-slot:activator>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>{{allergy.userAllergyInput.toUpperCase()}}: {{allergy.drugReaction}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn @click="delAllergy(index)" fab>
                            <v-icon color="red">delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </template>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <strong>Reaction Caused:</strong>
                          <span class="reaction-name">{{allergy.drugReaction}}</span>
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { VueAutosuggest } from "vue-autosuggest";
import medications from "@/store/staticData/medications.js";
export default {
  name: "Medications",
  components: {
    VueAutosuggest
  },
  data() {
    return {
      newMed: "",
      medicaList: medications,
      filteredOptions: [],
      selected: "",
      medSelected: false,
      inputProps: {
        id: "autosuggest__input",
        onInputChange: this.onInputChange,
        placeholder: "Add new medicine"
      },
      newAllergy: "",
      reaction: "",
      allergySelected: "",
      filteredAllergyOptions: [],
      inputPropsAllergy: {
        id: "autosuggest__allergy",
        onInputChange: this.onAllergyInputChange,
        placeholder: "Add new medicine"
      },
      medAllergySelected: false,
      noAllergy: false,
      limit: 90
    };
  },
  computed: {
    ...mapState({
      user: state => {
        console.log("map state: ", state.userStore.user);
        return state.userStore.user;
      }
    }),
    medicineList() {
      //console.log("medications: ", medications);
      const genericNames = medications.medications.map(item => {
        return item.generic;
      });
      const brandNames = medications.medications.map(item => {
        return item.brandNames;
      });
      return [].concat(...brandNames, genericNames);
    },
    getUserMedi() {
      if(this.user) {
       // console.log("user getters: ", this.$store.getters)
      //console.log("user: ", this.user)
      return this.$store.getters.getUser.medications;
      }

    },
    getUserAllergy() {
      if(this.user) {
      return this.$store.getters.getUser.allergies;
      }
    }
  },

  methods: {
    addMedication() {
      console.log("in add")
      const mediInputVal = this.$refs.mediRefName.searchInput;
      if (this.$refs.mediRefName.searchInput) {
        if (this.medSelected && this.filteredOptions[0].data.length) {
          console.log("this.selected in add method: ", this.selected);
          const selectedMedDetails = medications.medications.filter(item => {
            return (
              item["generic"] === this.selected ||
              item["brandNames"].includes(this.selected)
            );
          });
          console.log("selectedmedList: ", selectedMedDetails);
          const payload = {
            medicine: selectedMedDetails[0],
            userInput: this.$refs.mediRefName.searchInput
          };
          console.log("selected from medications: ", payload);
          this.$store.dispatch("saveMedication", payload);
        } else {
          console.log(
            "nothing selected from medications: ",
            this.$refs.mediRefName.searchInput
          );

          const newMed = {
            medicine: {
              generic: this.$refs.mediRefName.searchInput,
              brandNames: [""]
            },
            userInput: this.$refs.mediRefName.searchInput
          };
          console.log("newMed: ", newMed);
          this.$store.dispatch("saveMedication", newMed);
        }
        this.$refs.mediRefName.searchInput = "";
        this.medSelected = false;
      }
    },
    delMed(index) {
      const deleteMedication = this.getUserMedi[index];
      console.log("deleMed: ", deleteMedication);

      this.$store.dispatch("delMedication", { deleteMedication, index });
    },
    onInputChange(text) {
      if (text === "" || text === undefined) {
        return;
      }

      const filteredData = this.medicineList
        .filter(item => {
          return item.toLowerCase().indexOf(text.toLowerCase()) > -1;
        })
        .slice(0, this.limit);
      //console.log("filtered data: ", filteredData);
      this.filteredOptions = [
        {
          data: filteredData
        }
      ];
      console.log("filtered data: ",  this.filteredOptions[0].data);
    },
    onSelected(option) {
      this.medSelected = true;
      this.selected = option.item;
      console.log("this.selected : ", this.selected);
    },
    // onCheckboxChange(newVal, oldVal) {
    //   //console.log("arguments: ", arguments)
    //   if(newVal) {
    //     console.log("checkboxchange: ", newVal)

    //    // this.$store.dispatch("noKnownAllergy");
    //   }
    //   else {
    //     console.log("hihii")
    //   }
    // },
    onAllergyInputChange(text) {
      if (text === "" || text === undefined) {
        return;
      }
      this.noAllergy = false;
      const filteredData = this.medicineList
        .filter(item => {
          return item.toLowerCase().indexOf(text.toLowerCase()) > -1;
        })
        .slice(0, this.limit);
      console.log("filtered data: ", filteredData);
      this.filteredAllergyOptions = [
        {
          data: filteredData
        }
      ];
    },

    onSelectedAllergy(option) {
      this.medAllergySelected = true;
      this.allergySelected = option.item;
      console.log("this.selected : ", this.selected);
    },
    addAllergy() {
      if (!this.$refs.mediAllergyName.searchInput || !this.reaction) {
        // console.log("rectio: ", this.reaction);
        console.log("nothing selected");
        return;
      } else {
        if (this.medAllergySelected && this.filteredAllergyOptions[0].data.length) {
          console.log(
            "this.allergySelected in add method: ",
            this.allergySelected
          );
          const selectedAllergyMedDetails = medications.medications.filter(
            item => {
              return (
                item["generic"] === this.allergySelected ||
                item["brandNames"].includes(this.allergySelected)
              );
            }
          );
          console.log("selectedAllergyList: ", selectedAllergyMedDetails); //[{ 'generic': 'ibuprofen', 'brandNames': [ 'Motrin', 'Advil']}]

          console.log(
            "selected from allergy medications reaction: ",
            this.reaction
          );

          const payload = {
            allergyDrug: selectedAllergyMedDetails[0],
            drugReaction: this.reaction,
            userAllergyInput: this.$refs.mediAllergyName.searchInput
          };
          this.$store.dispatch("saveAllergy", payload);
        } else {
          console.log(
            "nothing selected from allergy medications: ",
            this.$refs.mediAllergyName.searchInput
          );

          const payload = {
            allergyDrug: {
              generic: this.$refs.mediAllergyName.searchInput,
              brandNames: [""]
            },
            drugReaction: this.reaction,
            userAllergyInput: this.$refs.mediAllergyName.searchInput
          };

          console.log("newMedAllergy: ", payload);
          this.$store.dispatch("saveAllergy", payload);
        }

        this.$refs.mediAllergyName.searchInput = "";
        this.reaction = "";
        this.medAllergySelected = false;
      }
    },
    delAllergy(index) {
      const deleteAllergyMedication = this.getUserAllergy[index];
      console.log("delAllergy: ", deleteAllergyMedication);
      //{ allergyDrug: { 'generic': 'ibuprofen', 'brandNames': [ 'Motrin', 'Advil']}, drugReaction: this.reaction}
      this.$store.dispatch("delAllergyMedication", {
        deleteAllergyMedication,
        index
      });
    }
  }
};
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
.title-inline {
  font-size: 1.5em;
}
#autosuggest__input,
#autosuggest__allergy {
  outline: none;
  position: relative;
  display: block;

  font-size: 14px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
#autosuggest__input,
#autosuggest__allergy,
.solo-text
  > .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border-bottom: 1px solid #1976d2;
  box-shadow: none;
}

#autosuggest__input.autosuggest__input-open,
#autosuggest__allergy.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  overflow: scroll;
  max-height: 200px;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #ddd;
}
.medication-card > .v-card__title {
  margin-bottom: 30px;
}
.allergy-card > .layout > .flex,
.medication-card .layout > .flex {
  padding: 8px !important;
}
.theme--light.v-btn {
  color: #fff;
}
.add-btn > .v-btn {
  margin-top: 32px;
}
.reaction-name {
  font-size: 14px;
}
.allergy-card
  > .v-input--selection-controls:not(.v-input--hide-details)
  .v-input__slot,
.allergy-card > .v-input__slot {
  margin-bottom: 0px;
}
.v-messages {
  min-height: 0px;
}
.solo-text > .v-text-field.v-text-field--solo .v-input__control {
  min-height: 42px;
}
.v-btn--floating {
  height: 36px;
  width: 36px;
}
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.v-btn--floating:not(.v-btn--depressed):not(.v-btn--flat) {
  box-shadow: none;
}

</style>
