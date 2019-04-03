<template>
  <v-container>
    <v-layout row wrap>
      <v-container fluid>
        <v-layout>
          <v-flex class="heading-sec">
            <h1 class="medication-header">Medications</h1>
            <p>Let us know your current medications and allergies.</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm12 md6>
            <v-card class="card medication-card">
              <v-card-title>
                <v-layout>
                  <v-flex xs12 md8>

                    <label for="autosuggest__input">Medication</label>
                    <vue-autosuggest
                      :suggestions="filteredOptions"
                      @selected="onSelected"
                      :limit="limit"
                      :input-props="inputProps"
                      ref="mediRefName"
                    ></vue-autosuggest>
                  </v-flex>
                  <v-flex xs12 md4 class="add-btn">
                    <v-btn color="blue" @click="addMedication">Add</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <hr>
              <v-card-text>
                <h3 class="text-xs-center">My Current Medications</h3>
                <v-list>
                  <v-list-tile v-for="(item, index) in medList" :key="index">
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
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex sm12 md6>
            <v-card class="card">
              <v-card-title class="allergy-card">
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
              </v-card-title>
              <hr>
              <v-card-text>
                <div class="text-xs-center">
                  <h3>My Drug Allergies</h3>

                </div>
                <v-list v-show="!noAllergy">
                  <v-list-group v-for="(allergy, index) in allergiesList" :key="index" no-action>
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
      medList: [],
      filteredOptions: [],
      selected: "",
      medSelected: false,
      inputProps: {
        id: "autosuggest__input",
        onInputChange: this.onInputChange,
        placeholder: "Type your medication"
      },
      newAllergy: "",
      reaction: "",
      allergiesList: [],
      allergySelected: "",
      filteredAllergyOptions: [],
      inputPropsAllergy: {
        id: "autosuggest__allergy",
        onInputChange: this.onAllergyInputChange,
        placeholder: "Type your medication"
      },
      medAllergySelected: false,
      noAllergy: false,
      limit: 90
    };
  },
  computed: {
    ...mapState({
      user: state => {
        console.log("map satte: ", state.userStore.user);
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
    }
  },
  watch: {
    // user is async and we can't access medicalHistory instantly
    user(val) {
      if (val) {
        this.medList = this.user.medications;
        console.log("in watcher: ", this.user.medications);
        this.allergiesList = this.user.allergies;
        console.log("in watcher: ", this.user.allergies);
      }
    }
  },
  created() {
    if (this.user) {
      this.medList = this.user.medications;
      console.log("created: ", this.user.medications);
      this.allergiesList = this.user.allergies;
      console.log("created: ", this.user.allergies);
    }
  },
  methods: {
    addMedication() {
      const mediInputVal = this.$refs.mediRefName.searchInput;
      if (this.$refs.mediRefName.searchInput) {
        if (this.medSelected) {
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
      const deleteMedication = this.medList[index];
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
      console.log("filtered data: ", filteredData);
      this.filteredOptions = [
        {
          data: filteredData
        }
      ];
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
        console.log("rectio: ", this.reaction);
        console.log("nothing selected");
        return;
      } else {
        if (this.medAllergySelected) {
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
      const deleteAllergyMedication = this.allergiesList[index];
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
.redborder {
  border: red 2px solid;
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
.heading-sec {
  margin: 5px;
}
.medication-header {
  margin-bottom: 5px;
}
</style>
