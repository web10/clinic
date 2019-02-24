<template>
  <v-card>
    <v-layout>
      <v-flex xs12>
        <div class="text-xs-center">
          <h3 > My Surgeries </h3>
          <h4> Next, let us know if you have had any surgeries.</h4>
        </div>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 m6>
        <v-card class="pa-2 ma-2">

          <form @submit.prevent="saveSurgicalHistory" id="surgicalhxform">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md4 lg3 v-for="(item, index) in surgeryHistory"  :key="index">
                    <v-checkbox :label="item.name" v-model="surgeryHistory[index].checked"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <div class="text-xs-center mt-3">
                <v-btn color="success" form="surgicalhxform" type="submit">Save</v-btn>
              </div>
            </v-card>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
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
        this.surgicalHistory = this.user.surgicalHistory
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
</style>
