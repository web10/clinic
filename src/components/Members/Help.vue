<template>
  <v-container>
    <h4 class="text-sm-left text-md-center">
      Help Page
    </h4>
    <p>Let us know if you're having any problems with this app.
    <form>
      <v-text-field
        v-model="title"
        label="Problem"
        required
      ></v-text-field>
      <v-text-field
        v-model="body"
        label="Please give details ... "
        required
      ></v-text-field>
      <v-btn @click="createTicket">submit</v-btn>
  </form>
  <h4 class="text-sm-left text-md-center">
    Replies will be sent to your Inbox and a copy forwarded to your email address.
  </h4>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: ''
    }
  },
  methods: {
    createTicket() {
      this.$store.dispatch('createTicket', {title: this.title, body: this.body})
    }
  }
}
</script>
