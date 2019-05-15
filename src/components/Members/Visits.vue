<template>
  <v-container fluid>
    <v-layout >
      <v-flex xs12>
        <h1 class="text-xs-center">
          My Visit Log
        </h1>
        <h3 v-show="!userEvents" class="text-xs-center red--text">
          You do not have any visits yet.
        </h3><br/>
      </v-flex>
    </v-layout>

      <v-layout row wrap>
        <v-flex xs12 >
          <v-expansion-panel popout>
            <v-expansion-panel-content
              v-for="(value,name) in userEvents"
              :key="name"
            >

              <template v-slot:header>
                <h4>Date: {{value.schedule.month[0]}}/{{value.schedule.dayOfMonth[0]}}/{{value.schedule.year[0]}} <v-spacer></v-spacer>
                Time: <span>{{checkTimeofAppt(value.schedule.times[0])}} </span>

                </h4> <v-spacer></v-spacer>
                <h4 v-if="value.visitStatus === 'Scheduled'">{{value.visitStatus}}</h4>
                <h4 style="color: red" v-else-if="value.visitStatus === 'Cancelled'">{{value.visitStatus}} <v-spacer></v-spacer>Reason: {{value.reason}}</h4>
              </template>
              <v-card>
                <v-card-text>
                    <div><em>Visit Type:</em> <span style="text-transform: capitalize;">{{value.data.busy}}</span></div>
                    <div><em>Reason for Visit:</em> {{value.data.description}}</div>
                    <div><em>Duration:</em> {{value.schedule.duration}} {{value.schedule.durationUnit}}</div>
                    <div><em>Booking time stamp:</em> {{getBookingDate(value.bookingTimeStamp)}}</div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
  </v-container>

</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userEvents: null
    }
  },
  computed: {
      ...mapState({
        user: state => state.userStore.user,
      })
    },
    watch: {
      // user is async and we can't access medicalHistory instantly
      user (val) {
        if(val) {
          this.userEvents = this.user.userEvents
        }
      }
    },
    created() {
      if(this.user) {
        this.userEvents = this.user.userEvents
      }
    },
    methods: {
      getBookingDate(bookedDate) {
var time = bookedDate;
    var date = new Date(bookedDate.seconds*1000);
    return(date.toString());

      },
      checkTimeofAppt(apptTime) {
        /* if ":" => 01:30am else 13:30pm
    str.slice from : and check sliced str >= or < 12
    if str >= 12 => pm else am

    else no ':' found
    check str>=12 => pm and add :
    then
    */
   if(apptTime.includes(":")) {
     const index = apptTime.indexOf(":");
     const slicedTime = apptTime.slice(0, index);
     if(slicedTime >= 12) {
       return `${apptTime} pm`;
     }
     else {
       return `${apptTime} am`;
     }
   }
   else {
     if (apptTime >= 12) {
        return `${apptTime}:00 pm`;
     }
     else {
       return `${apptTime}:00 am`;
     }
   }
      }
    }
}
</script>
