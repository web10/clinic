<template>
  <div>
    <template v-for="(ticket, index) in tickets">
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
      <v-divider v-if="index + 1 < tickets.length" :key="`divider-${index}`"></v-divider>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    tickets: Array
  }
}
</script>
