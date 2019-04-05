<template>
  <v-container >
    <v-layout>
      <v-flex xs12>
        <div class="text-xs-center">
          <h1 > My Family's History </h1>
          <p class="center">Some diseases can run in the family. Let us know what other family members have so we can help you screen potential problems for you.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout style="margin-top: 20px;">
      <v-flex xs12 m4>

         <v-data-table
      :headers="headers"
      :items="familyHistory"
      class="elevation-1"
      hide-actions
    >
      <template v-slot:items="props">
        <td>{{ props.item.diagnosis }}</td>
        <td ><v-checkbox v-model="props.item.grandparents"></v-checkbox></td>
        <td ><v-checkbox v-model="props.item.mom"></v-checkbox></td>
        <td ><v-checkbox v-model="props.item.dad"></v-checkbox></td>
        <td ><v-checkbox v-model="props.item.siblings"></v-checkbox></td>
        <td ><v-checkbox v-model="props.item.children"></v-checkbox></td>
        <td ><v-checkbox v-model="props.item.auntuncle"></v-checkbox></td>
      </template>
    </v-data-table>
          <div class="text-xs-center">
            <v-btn color="success" @click="saveFamilyHistory">Save</v-btn>
          </div>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import familyHx from '@/store/staticData/familyHistory.js'
import { mapState } from 'vuex'
  export default {
    name: 'FamilyHx',
    data () {
      return {
         headers: [
        {
          text: 'Diagnosis',
          align: 'left',
          sortable: false,
          value: 'diagnosis'
        },
        { text: 'Grandparents', sortable: false, value: 'grandparents' },
        { text: 'Mom', sortable: false, value: 'mom' },
        { text: 'Dad', sortable: false, value: 'dad' },
        { text: 'Siblings', sortable: false, value: 'siblings' },
        { text: 'Children', sortable: false, value: 'children' },
        { text: 'Aunts/Uncles', sortable: false, value: 'auntuncle' },
      ],
      familyHistory: familyHx
      }
    },
    computed: {
      ...mapState({
        user: state => state.userStore.user,
      })
    },
    watch: {

      user (val) {
        if(val) {
          if(this.user.familyHistory){
            console.log("watcher: ", this.user.familyHistory)
          this.familyHistory = this.user.familyHistory
          }
          else {
            console.log("watcher:")
            this.familyHistory = familyHx;
          }

        }
      }
    },
created() {
  if (this.user){
    console.log("in user exist: ",  this.user)
      if(this.user.familyHistory) {
        console.log("in userfamilyHistory exist: ",  this.user)
        this.familyHistory = this.user.familyHistory
      }
      //else if the db already existed before adding the familyHistory in users state
      else {
        console.log("no family yill now: ", this.familyHistory)
        this.familyHistory = familyHx;
        console.log("familyHistory.js file: ", familyHx)
      }
  }

    },
    methods: {
      saveFamilyHistory() {
        this.$store.dispatch('saveFamilyHistory', this.familyHistory)
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
