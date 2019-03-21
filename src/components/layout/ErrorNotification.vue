<template>
  <v-layout row v-if="error">
    <v-flex xs12>
      <v-alert
        :value="error"
        color="error"
        icon="warning"
        outline
      >
        {{ error.message  }}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint-disable */
export default {
  computed: {
    error () {
      return this.$store.state.error
    }
  }
}
</script>
