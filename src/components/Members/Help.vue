<template>
  <v-container>
    <h4 class="text-sm-left text-md-center">
      Help Page

      messenger to be placed Here
      messages should attach the current logged in user, time stamped then forwarded to the Support Inbox in Staff page.
      should trigger a new support ticket that can be closed on the staff page.
      when staff replies, it should be sent to user's Inbox, not back to this "help" or "support" inbox
    </h4>

    <v-layout justify-center mt-5>
      <v-flex xs6>
        <v-form @submit.prevent="createTicket">
          <!-- TODO Delete later -->
          <v-select
            :items="inboxes"
            v-model="inbox"
            label="Categories"
          ></v-select>

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
          <v-btn type="submit">Submit</v-btn>
        </v-form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: '',
      inbox: 'Help',
      inboxes: [
        'Help',
        'Consultation'
      ]
    }
  },
  methods: {
    createTicket() {
      this.$store.dispatch('createTicket', {title: this.title, body: this.body, inbox: this.inbox})
    }
  }
}
</script>