<template>
  <v-container>
    <v-layout pb-4>
      <v-flex xs12>
        <span class="title-inline">
          <b> My Medical History: </b> First, let us know what medical problems you have had in the past or present. This will help us screen for problems.</p>
        </span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-tabs
          v-model="active"
          color="blue"
          dark
          slider-color="white"
          show-arrows
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
            v-for="(tab, key, index) in medicalHistory"
            :key="index"
            class="items-list"
          >
            <form @submit.prevent="saveMedicalHistory" id="medicalForm">
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3 v-for="(item, index) in tab"  :key="index">
                      <!-- loop through object and assign v-model for every specific checkbox -->
                      <v-checkbox :label="item.diagnosis" v-model="tab[index].checked"></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </form>
          </v-tab-item>
        </v-tabs>
        <div class="text-xs-center mt-3">
          <v-btn color="success" block to="/surgicalhx" form="medicalForm" type="submit">Save Medical History and Go To Surgical History</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import medHistory from '@/store/staticData/medHistory.js'
import { mapState } from 'vuex'

  export default {
    name: 'MedicalHx',
    data () {
      return {
        active: 0,
        medicalHistory: medHistory
      }
    },
    computed: {
      ...mapState({
        user: state => state.userStore.user
      })

    },
    watch: {
      // user is async and we can't access medicalHistory instantly
      user (val) {
        if (val) {
          this.medicalHistory = this.user.medicalHistory
        }
      }
    },
    created () {
      if (this.user) {
        this.medicalHistory = this.user.medicalHistory
      }
    },
    methods: {
      saveMedicalHistory () {
        this.$store.dispatch('saveMedicalHistory', this.medicalHistory)
      }
    }
  }
</script>

<style scoped>
  .title-inline {
    font-size: 1.5em;
  }
</style>
