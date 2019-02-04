<template>
  <v-card>
    <v-layout>
      <v-flex xs12>
        <div class="text-xs-center">
          <h1 > My Surgeries </h1>
          <p class="center">Just what is missing/broken in your body?  Let us know so we can help you manage.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 m6>
        <v-card class="pa-2 ma-2">
          <v-div v-for="(item, index) in surgeryHxCheckList" :key="index">
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
  export default {
    name: 'SurgicalHx',
    data () {
      return {
        surgeryHxCheckList: [
          { 'name': 'back surgery' },
          { 'name': 'appendix removal' },
          { 'name': 'tonsil removal' },
          { 'name': 'gallbladder removal' },
          { 'name': 'Kidney Stones' },
          { 'name': 'uterus removal' },
          { 'name': 'ovary removal' },
          { 'name': 'prosthetic joints' },
          { 'name': 'prosthetic heart valve' },
          { 'name': 'heart bypass' },
          { 'name': 'hip replacement' },
          { 'name': 'bariatrics' }
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
    border-style: 1px solid blue;
    margin: 5px;
    padding: 5px;
  }
</style>
