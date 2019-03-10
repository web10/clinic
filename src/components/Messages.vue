<template>
  <v-layout row mt-4>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-toolbar color="gray" dark>
          <v-toolbar-title>My Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(ticket, index) in userTickets">
            <v-list-tile :key="ticket.id" avatar ripple @click="$router.push(`staff/${ticket.id}`)">
              <v-list-tile-avatar>
                <img :src="ticket.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>From: {{ ticket.creatorFullName }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ ticket.title }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ ticket.messages[ticket.messages.length - 1].message }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ ticket.createdAt.seconds | moment("from", "now") }}</v-list-tile-action-text>
                <v-icon color="green lighten-1" v-if="ticket.resolved">done</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < userTickets.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
      userTickets() {
        return this.$store.state.chatModule.tickets.filter(ticket => ticket.createdByUserId == this.user.id)
      }
    },
    created() {
      this.$store.dispatch('getTickets')
    }
  }
</script>
