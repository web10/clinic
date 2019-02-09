<template>
  <v-container>
    <v-layout pb-4>
      <v-flex xs12>
        <div class="text-xs-center">
          <h1> My Medical History </h1>
          <p class="center">Enter any medical problems you have had so that your doctor can help you manage them.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-tabs
          v-model="active"
          color="blue"
          dark
          slider-color="white"
          show-arrows=""
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="(tab, key, index) in medicalHistory"
            :key="index"
            ripple
          >
            {{ key }}
          </v-tab>
          <v-tab-item
            v-for="(tab, index) in medicalHistory"
            :key="index"
            class="items-list"
          >
            <form @submit.prevent="saveMedicalHistory" id="medicalForm">
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3 v-for="(item, index) in tab"  :key="index">
                          <v-checkbox :label="item.diagnosis" v-model="tab[index].checked"></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </form>
          </v-tab-item>
        </v-tabs>
        <div class="text-xs-center mt-3">
          <v-btn color="success" form="medicalForm" type="submit">Save</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import medHistory from '@/store/staticData/medHistory.js'

  export default {
    name: 'MedicalHx',
    data () {
      return {
        active: 0,
        medicalHistory: medHistory
      }
    },
    computed: {
      userMedicalHistory () {
        return this.$store.getters.getUser.medicalHistory
      },
      // orderedMedicalList: function () {
      //   return _.sortBy(this.medicalHxCheckList, 'name')
      // }
    },
    watch: {
      userMedicalHistory (val) {
        if(val) {
          this.medicalHistory = this.userMedicalHistory
        }
      }
    },
    created() {
      if(this.userMedicalHistory) {
        this.medicalHistory = this.userMedicalHistory
      }
    },
    methods: {
      saveMedicalHistory() {
        this.$store.dispatch('saveMedicalHistory', this.medicalHistory)
      }
    }
  }
</script>