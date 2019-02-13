<template>

<div>
  <v-container grid-list-md text-xs-center>

    <v-tabs
      v-model="active"
      color="gray"
      dark
      slider-color="yellow"
    >
      <v-tab ripple>
        Admin Notes
      </v-tab>
      <v-tab ripple>
        Users
      </v-tab>
      <v-tab ripple>
        Trends
      </v-tab>
      <v-tab ripple>
        Projections
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <div class="pa-2">
            <h2> Admin Notes: </h2>
            <ul>
              <li>ROLES: 0 = clients, 1 = staff, 2 = doctor (me)</li>
              <li>Use the Users list to change employee users to "Staff" so they can access staff functions.</li>
              <li>User Firebase Console to change anyone to user Admin by changing "role" to 2 so they can access this page.</li>
              <li>Need to turn this into an admin_wiki</li>
            </ul>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-layout row wrap align-end>
          <v-flex xs12>
            <template>
              <p>ROLES: 0 = clients, 1 = staff, 2 = doctor (me), 3 = test_user</p>
              <v-data-table :headers="headers" :items="userList" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.firstName }}</td>
                  <td class="text-xs-left">{{ props.item.lastName }}</td>
                  <td class="text-xs-left">{{ props.item.email }}</td>
                  <td class="text-xs-left">{{ props.item.role }}</td>
                  <td class="text-xs-left">
                    <v-btn color="primary" outline small v-if="props.item.role == '0'" @click="changeAdmin(props.item)">Make Staff</v-btn>
                    <v-btn color="secondary" outline small v-if="props.item.role == '1'" @click="changeAdmin(props.item)">Remove Staff</v-btn>
                  </td>
                  <td class="text-xs-left">
                    <v-btn color="red" outline small @click="deleteUser(props.item.id)">Delete</v-btn>
                  </td>
                </template>
              </v-data-table>
            </template>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Trends
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Projections
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      active: 0,
      headers: [
        { text: 'First', value: 'firstName', sortable: true },
        { text: 'Last', value: 'lastName', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Role', value: 'role', sortable: false },
        { text: 'Action', value: 'action', sortable: false },
        { text: 'Delete', value: 'delete', sortable: false }
      ]
    }
  },
  computed: {
      ...mapState({
        userList: state => state.adminStore.users,
      }
    )
  },
  created () {
    this.$store.dispatch('getAllUse')
  },
  methods: {
    changeAdmin (user) {
      this.$store.dispatch('makeAdmin', user)
    },
    deleteUser (id) {
      // !!!here you can add some alert with confirm modal
      this.$store.dispatch('deleteUser', id)
    }
  }
}
</script>
