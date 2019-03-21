<template>
  <v-container>
    <v-layout mb-4>
      <v-flex class="text-xs-right">
        <router-link to="/staff" tag="div">
          <v-btn
            outline
            color="blue">
            <v-icon>arrow_back_ios</v-icon>
            Back</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex lg6>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Title: {{ticket.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- redirect ticket btn -->
          <v-menu bottom left v-if="hasPermision">
            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>reply</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, i) in avaliableInboxes"
                :key="i"
                @click="redirectTicket(item)"
              >
                <v-list-tile-title>{{ item }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <!-- close ticket btn-->
          <v-btn dark icon @click="closeTicket" v-if="hasPermision">
            <v-icon :color="ticket.resolved ? 'green' : 'white'">check_circle</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="messenger">
          <div class="messenger__container" ref="messengerWindow">
            <div v-for="(message, index) in ticket.messages" :key="index" class="message">
              <div class="message__info">
                <span class="message__sender">{{ message.senderName }}</span>
                <span class="message__time">{{ message.createdAt.seconds | moment("MMMM Do,h:mm:ss a") }}</span>
              </div>
              <p class="message__body">{{ message.message }}</p>
            </div>
          </div>

          <form>
            <div class="messenger__input text-xs-right">
              <v-text-field
                label="Write a message..."
                outline
                v-model="message"
              ></v-text-field>
              <v-btn @click="sendMessage(ticket.id)" color="success" :disabled="ticket.resolved">Send</v-btn>
            </div>
          </form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
// import db from '@/config/firebaseInit'
import { mapState } from 'vuex'
import { setTimeout } from 'timers';

export default {
  name: 'ticket-show',
  data() {
    return {
      inboxes: [
        'Help',
        'Consultation'
      ],
      message: ''
    }
  },
  computed: {
    ...mapState({
      ticket: state => state.chatModule.ticket,
    }),
    user() {
      // TODO load USER on page load
      return this.$store.getters.getUser
    },
    hasPermision() {
      // only staff and admin can redirect message
      if(this.user) {
        return !!this.user.role
      }
    },
    avaliableInboxes() {
      // return all inboxes exept current
      return this.inboxes.filter(inbox => inbox != this.ticket.inbox)
    }
  },
  watch: {
    ticket(val) {
      if(val) {
        // wait for loading tickets and then scroll down after DOM update
        this.$nextTick(() => this.scrollToEnd() )
      }
    }
  },
  created() {
    this.$store.dispatch('getTickets')
    // load a ticket by id
    const ticketId = this.$route.params.id
    this.$store.dispatch('getTicket', ticketId)
  },
  methods: {
    redirectTicket(inbox) {
      this.$store.dispatch('updateTicket', {ticket: this.ticket, fieldName: 'inbox', value: inbox})
    },
    closeTicket() {
      if(this.ticket.resolved) {
        this.$notify('Ticket already resolved');
        return
      }
      this.$store.dispatch('updateTicket', {ticket: this.ticket, fieldName: 'resolved', value: true})
    },
    sendMessage(ticketId) {
      if(!this.message) { return }

      this.$store.dispatch('sendMessage', {message: this.message, ticketId})
        .then(() => {
          this.message = ''
          this.scrollToEnd()
        })
    },
    scrollToEnd() {
      const messengerWindow = this.$refs.messengerWindow
      messengerWindow.scrollTop = messengerWindow.scrollHeight
    },
  }
}
</script>

<style lang="scss" scoped>
.messenger {
  background-color: #fff;
  padding: 1rem;
  border-radius: .5rem;

  &__container {
    max-height: 400px;
    overflow-y: auto;
  }
}

.message {

  &__info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  &__sender {
    font-weight: bold;
    color: #2196f3;
  }

  &__time {
    font-size: .8rem;
    color: gray;
  }
}

.resolved {
  color: green;
}
</style>
