<template>
  <v-container>
    <v-layout>
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
        <h1 class="mb-3">{{ticket.title}}</h1>
        <div class="messenger">
          <div class="messenger__container">
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
              <v-btn @click="sendMessage(ticket.id)" color="success">Send</v-btn>
            </div>  
          </form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '@/config/firebaseInit'
import { mapState } from 'vuex'

export default {
  name: 'ticket-show',
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState({
      ticket: state => state.chatModule.ticket,
    }),
    user() {
      return this.$store.getters.getUser
    }
  },
  created() {
    // load a ticket from by id
    const ticketId = this.$route.params.id
    this.$store.dispatch('getTicket', ticketId)
  },
  methods: {
    sendMessage(ticketId) {
      const currentMessage = {
        senderId: this.user.id,
        message: this.message,
        createdAt: new Date(),
        senderName: this.user.firstName,
      }

      this.$store.dispatch('sendMessage', {currentMessage, ticketId})
    }
  }
}
</script>

<style lang="scss" scoped>
.messenger {
  background-color: #fff;
  padding: 1rem;
  border-radius: .5rem;

  &__container {
  }
}

.message {
  // display: flex;
  // background-color: lightblue;
  // padding: .5rem;
  // border-radius: .5rem;
  
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
</style>
