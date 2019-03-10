<template>
  <v-container>
    <h2 class="text-sm-left text-md-center">
      Help Page
    </h2>
    <h4 class="text-sm-left text-md-center">
      Replies will be sent to your Inbox and a copy forwarded to your email address.
    </h4>

    <v-layout justify-center mt-5>
      <v-flex xs6>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Create a ticket</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn> -->
        </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="createTicket">
            <!-- TODO Delete later -->
            <v-select
              :items="inboxes"
              v-model="inbox"
              label="Inbox"
            ></v-select>

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
            <v-btn type="submit" color="success" class="ml-0">Submit</v-btn>
          </v-form>
          </v-card-text>
        </v-card>
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
