<template>

<div>
  <v-container grid-list-md text-xs-center>
    <v-layout pb-4>
      <v-flex xs12>
        <div class="text-xs-center">
          <p class="center">STAFF PAGE: This page is for functions to be done by employees</p>
        </div>
      </v-flex>
    </v-layout>
    <v-tabs
      v-model="active"
      color="gray"
      dark
      slider-color="yellow"
    >
      <!-- <v-tab ripple>
        My Notes
      </v-tab> -->
      <!-- <v-tab ripple>
        Patient List
      </v-tab> -->
      <v-tab ripple>
        Consults Inbox
      </v-tab>
      <!-- <v-tab ripple>
        MD Inbox
      </v-tab> -->
      <!-- <v-tab ripple>
        Feedback Inbox
      </v-tab> -->
      <v-tab ripple>
        Support Inbox
      </v-tab>
      <v-tab ripple>
        Referrals
      </v-tab>
      <!-- <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h2>My Notes/ To do List</h2>
            <p>need to add a user's wiki here</p>

          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <!-- <v-tab-item>
        <v-layout row wrap align-end>
          <v-flex xs12>
            <template>
              <v-data-table :headers="headers" :items="adminList" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.firstName }}</td>
                  <td class="text-xs-left">{{ props.item.lastName }}</td>
                  <td class="text-xs-left">{{ }}</td>
                  <td class="text-xs-left">{{ props.item.email }}</td>
                  <td class="text-xs-left">
                    <v-btn color="blue" outline small>Open Profile</v-btn>
                  </td>
                  <td class="text-xs-left">
                    <v-btn color="green" outline small>New Encounter</v-btn>
                  </td>

                </template>
              </v-data-table>
            </template>
          </v-flex>
        </v-layout>
      </v-tab-item> -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Medical Consults from patients come through here.  Then we can triage to see if we can take care of it or schedule for patient to come in.
            <!-- TODO move to component later -->
            <!-- <template v-for="ticket in tickets('Consultation')">
              <router-link :key="ticket.id" :to="{ path: `staff/${ticket.id}` }" tag="div">
                <v-card class="ticket mb-2 text-center">
                  <v-card-title primary-title>
                    <div>
                      <p class="mb-1">User ID : {{ticket.createdByUserId}}</p>
                      <p class="mb-1">Inbox : {{ticket.inbox}}</p>
                      <h3 class="headline mb-0">Title: {{ ticket.title }}</h3>
                      <span>Resolved: {{ ticket.resolved }}</span>
                      <div>Last message: {{ ticket.messages[ticket.messages.length - 1].message }}</div>
                    </div>
                  </v-card-title>
                </v-card>
              </router-link>
            </template> -->
            </v-card-text>

            <v-list two-line class="messenger-body">
              <tickets-list :tickets="tickets('Consultation')"></tickets-list>
            </v-list>
        </v-card>
      </v-tab-item>
      <!-- <v-tab-item>
        <v-card flat>
          <v-card-text>
            MD Consults (messages forwarded from staff for official text consult with doctors)
            We may charge for these consult messages.
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <!-- <v-tab-item>
        <v-card flat>
          <v-card-text>
            Feedback Inbox - Here is where we can collect the feedbacks from patients to see how we can improve on the app/service.
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h3>Support Tickets Here</h3>
            <ol>
              <li>Patients who need technical help with the app will send tickets here.</li>
              <li>Do your best to help them learn how to use the app.</li>
              <li>Then let us know if there are bugs we need to fix.</li>
            </ol>
          </v-card-text>
            <v-list two-line class="messenger-body">
              <tickets-list :tickets="tickets('Help')"></tickets-list>
            </v-list>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Referrals Function
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import TicketsList from './TicketsList'

export default {
  name: 'Staff',
  data () {
    return {
      active: 0,
      headers: [
        { text: 'First', value: 'firstName', sortable: true },
        { text: 'Last', value: 'lastName', sortable: true },
        { text: 'DOB', value: 'dob', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Profile', value: 'profile', sortable: false },
        { text: 'Encounters', value: 'encounters', sortable: false }
      ]
    }
  },
  components: {
    TicketsList
  },
  computed: {
      ...mapState({
        adminList: state => state.adminStore.users,
      }
    )
  },
  created () {
    this.$store.dispatch('getAllUse')
     this.$store.dispatch('getTickets')
  },
  methods: {
    tickets(inbox) {
      return this.$store.getters.getTickets.filter(ticket => ticket.inbox === inbox)
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket {
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 10px rgba(0,0,0,0.20);
  }
}
</style>
