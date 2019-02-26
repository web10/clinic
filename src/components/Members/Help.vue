<template>
  <v-container>
    <h4 class="text-sm-left text-md-center">
      Help Page

      messenger to be placed Here
      messages should attach the current logged in user, time stamped then forwarded to the Support Inbox in Staff page.
      should trigger a new support ticket that can be closed on the staff page.
      when staff replies, it should be sent to user's Inbox, not back to this "help" or "support" inbox
    </h4>
    <form>
      <v-text-field
        v-model="title"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="body"
        label="Please discribe a problem here ... "
        required
      ></v-text-field>
      <v-btn @click="createTicket">submit</v-btn>
  </form>
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