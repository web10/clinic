<template>
  <v-container class="text-sm-left text-md-center">
    <template>
      <h3> Calendar 1 </h3>
      <v-layout wrap>
        <v-flex sm4 xs12 class="text-sm-left text-xs-center">
          <v-btn @click="$refs.calendar.prev()">
            <v-icon dark left> keyboard_arrow_left </v-icon>
            Prev
          </v-btn>
        </v-flex>
        <v-flex sm4 xs12 class="text-xs-center">
          <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
        </v-flex>
        <v-flex sm4 xs12 class="text-sm-right text-xs-center">
          <v-btn @click="$refs.calendar.next()">
            Next
            <v-icon right dark> keyboard_arrow_right </v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="mb-3">
          <v-sheet height="500">
            <v-calendar
              ref="calendar"
              v-model="start"
              :type="type"
              :end="end"
              color="primary"
            ></v-calendar>
          </v-sheet>
        </v-flex>
      </v-layout>
    </template>
<!--
<hr>
    <template>
      <h3> Calendar 2 </h3>
      <v-layout>
        <v-flex>
          <v-sheet height="500">
            <v-calendar
              :now="today"
              :value="today"
              color="primary"
            >
              <template v-slot:day="{ present, past, date }">
                <v-layout fill-height>
                  <template v-if="past && tracked[date]">
                    <v-sheet
                      v-for="(percent, i) in tracked[date]"
                      :key="i"
                      :title="category[i]"
                      :color="colors[i]"
                      :width="`${percent}%`"
                      height="100%"
                      tile
                    ></v-sheet>
                  </template>
                </v-layout>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>
      </v-layout>
    </template>
<hr>
<template>
  <h3>Calendar 3</h3>
<v-layout>
<v-flex>
  <v-sheet height="500">
    <v-calendar
      :now="today"
      :value="today"
      color="primary"
    >
      <template v-slot:day="{ date }">
        <template v-for="event in eventsMap[date]">
          <v-menu
            :key="event.title"
            v-model="event.open"
            full-width
            offset-x
          >
            <template v-slot:activator="{ on }">
              <div
                v-if="!event.time"
                v-ripple
                class="my-event"
                v-on="on"
                v-html="event.title"
              ></div>
            </template>
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                color="primary"
                dark
              >
                <v-btn icon>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-toolbar-title v-html="event.title"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-title primary-title>
                <span v-html="event.details"></span>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  flat
                  color="secondary"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </template>
      </template>
    </v-calendar>
  </v-sheet>
</v-flex>
</v-layout>
</template>
-->
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      // for calendar 1
      type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ],
      // for calendar 2
      today: '2019-01-10',
      tracked: {
       '2019-01-09': [23, 45, 10],
       '2019-01-08': [10],
       '2019-01-07': [0, 78, 5],
       '2019-01-06': [0, 0, 50],
       '2019-01-05': [0, 10, 23],
       '2019-01-04': [2, 90],
       '2019-01-03': [10, 32],
       '2019-01-02': [80, 10, 10],
       '2019-01-01': [20, 25, 10]
     },
     colors: ['#1867c0', '#fb8c00', '#000000'],
     category: ['Development', 'Meetings', 'Slacking'],
     events: [
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-30',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-31',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          date: '2019-01-07',
          open: false
        },
        {
          title: '30th Birthday',
          details: 'Celebrate responsibly',
          date: '2019-01-03',
          open: false
        },
        {
          title: 'New Year',
          details: 'Eat chocolate until you pass out',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Conference',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-01-21',
          open: false
        },
        {
          title: 'Hackathon',
          details: 'Code like there is no tommorrow',
          date: '2019-02-01',
          open: false
        }
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.title)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>
