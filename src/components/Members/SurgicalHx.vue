<template>
  <v-container>
    <v-layout pb-4>
      <v-flex xs12>
        <span class="title-inline">
          <b> My Surgeries: </b> Let us know which surgeries you have had in the past. This will help us know which organs may or may not be a part of your current problems.</p>
        </span>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 m6>
        <v-card class="pa-2 ma-2">
          <form @submit.prevent="saveSurgicalHistory" id="surgicalhxform">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md4 lg3 v-for="(item, index) in surgicalHistory"  :key="index">
                    <v-checkbox :label="item.name" v-model="surgicalHistory[index].checked"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <div class="text-xs-center mt-3">
                <v-btn color="success" form="surgicalhxform" block to="/medications" type="submit">Save Surgeries and Go To Medications</v-btn>
              </div>
            </v-card>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import surgeryHxCheckList from '@/store/staticData/surgHistory.js'
import { mapState } from 'vuex'

  export default {
    name: 'SurgicalHx',
    data () {
      return {
        active: 0,
        surgicalHistory: surgeryHxCheckList
      }
    },
    computed: {
      ...mapState({
        user: state => state.userStore.user,
      })
    },
    watch: {
      // user is async and we can't access medicalHistory instantly
      user (val) {
        if(val) {
          this.surgicalHistory = this.user.surgicalHistory
        }
      }
    },
    created() {
      if(this.user) {
        // if(this.user.surgicalHistory){
        console.log("this.user.surgicalHistory: ", this.user)
        this.surgicalHistory = this.user.surgicalHistory
      //}
      // else {
      //   this.surgicalHistory = surgeryHxCheckList
      // }
      }
    },
    methods: {
      saveSurgicalHistory() {
        this.$store.dispatch('saveSurgicalHistory', this.surgicalHistory)
      }
    }
  }
</script>

<style>
  .margin_right {
    margin-right: 5px;
  }

  .border {
    border-style: 1px solid blue;
    margin: 5px;
    padding: 5px;
  }

  .title-inline {
    font-size: 1.5em;
  }
</style>
