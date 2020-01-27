<template>
  <div>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarContent }}
      <v-btn text @click="snackbar = false" timeout="3000">Close</v-btn>
    </v-snackbar>

    <v-container style="max-width: 80%">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            absolute
            right
            @click="scheduleDialog = true"
            class="mx-5 white--text"
            color="secondary"
            v-on="on"
          >
            <v-icon>mdi-account-clock</v-icon>
          </v-btn>
        </template>
        <span>Add new dates</span>
      </v-tooltip>

      <v-row class="fill-height mt-12 elevation-3">
        <v-progress-linear v-if="calendarLoader" indeterminate color="loader" height="5"></v-progress-linear>
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
              <v-btn fab text small @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on }">
                  <v-btn outlined v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :event-margin-bottom="3"
              :now="today"
              :type="type"
              @mouseenter:event="hoveredEvent"
              @mouseleave:event="hoveredEventLeave"
              @click:event="deleteEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>

      <v-dialog v-model="scheduleDialog" width="fit-content" persistent>
        <v-card>
          <v-card-title class="headline primary white--text pa-2" primary-title>Add schedule dates</v-card-title>
          <v-card-text class="my-4">
            <v-date-picker
              v-model="schedulePicker"
              show-current
              :min="today"
              :allowed-dates="allowedDates"
              range
              :selected-items-text="selectedText"
              @input="dateSelected"
            ></v-date-picker>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!formValid"
              color="green darken-3"
              class="white--text px-5"
              :loading="addScheduleLoader"
              @click="addSchedule"
            >Submit</v-btn>

            <v-btn color="red darken-3" dark @click="reset()" class="px-5">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";

var today = new Date(Date.now()).toISOString().slice(-24, -14);

export default {
  data() {
    return {
      today: today,
      focus: today,
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      calendarLoader: false,
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      eventColor: "event",

      snackbar: false,
      snackbarContent: "",
      snackbarColor: "",

      events: [],

      scheduleDialog: false,
      formValid: false,
      addScheduleLoader: false,
      selectedText: "",
      schedulePicker: []
    };
  },
  created() {
    this.formValid = false;

    this.getEvents();
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    deleteEvent({ nativeEvent, event }) {
      let data = [];
      data.push({ id: event.id, scheduleDate: event.start });

      console.log(data);
      this.$http
        .put("/trainer/" + this.user.id + "/schedule/delete", data, {
          headers: { Authorization: "Bearer " + this.$store.state.token }
        })
        .then(res => {
          this.events = [];

          this.getEvents();

          this.snackbarContent = "Horaire supprimé";
          this.snackbarColor = "warning";
          this.snackbar = true;
        })
        .catch(function(e) {
          console.log(e.response);
        });

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    addSchedule() {
      this.addScheduleLoader = true;
      let data = [];
      data = this.getDates(this.schedulePicker[0], this.schedulePicker[1]);

      this.$http
        .post("/trainer/" + this.user.id + "/schedule/save", data, {
          headers: { Authorization: "Bearer " + this.$store.state.token }
        })
        .then(res => {
          this.scheduleDialog = false;
          this.formValid = false;

          this.addScheduleLoader = false;
          this.events = [];
          this.$http
            .get("/trainer/" + this.user.id + "/schedule/findAll", {
              headers: { Authorization: "Bearer " + this.$store.state.token }
            })
            .then(res => {
              let events = res.data;

              events.forEach((event, i) => {
                this.events.push({
                  id: event.id,
                  name: "",
                  start: event.scheduleDate,
                  end: event.scheduleDate,
                  color: "event"
                });
              });

              this.calendarLoader = false;
            })
            .catch(e => {
              console.log(e.response);
              this.calendarLoader = false;
            });

          this.schedulePicker = [];
          this.snackbarContent = "Horaire ajouté";
          this.snackbarColor = "success";
          this.snackbar = true;
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    reset() {
      this.scheduleDialog = false;
      this.formValid = false;

      this.addScheduleLoader = false;
    },
    allowedDates(val) {
      if (this.events) {
        for (let i = 0; i < this.events.length; i++) {
          if (val == this.events[i].start) {
            return null;
          }
        }
      }

      return val;
    },
    dateSelected(val) {
      if (val[1]) {
        let startDate = new Date(val[0]);

        let endDate = new Date(val[1]);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        this.selectedText = diffDays + 1 + " jours sélectionnés";

        this.formValid = true;
      }
    },
    getDates(startDate, endDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(endDate);
      while (currentDate <= stopDate) {
        dateArray.push({
          scheduleDate: moment(currentDate).format("YYYY-MM-DD")
        });
        currentDate = moment(currentDate).add(1, "days");
      }
      return dateArray;
    },
    hoveredEvent(e) {
      e.event.color = "eventHover";
    },
    hoveredEventLeave(e) {
      e.event.color = "event";
    },

    getEvents() {
      this.calendarLoader = true;
      this.$http
        .get("/trainer/" + this.user.id + "/schedule/findAll", {
          headers: { Authorization: "Bearer " + this.$store.state.token }
        })
        .then(res => {
          let events = res.data;

          events.forEach((event, i) => {
            this.events.push({
              id: event.id,
              name: "",
              start: event.scheduleDate,
              end: event.scheduleDate,
              color: "event"
            });
          });

          this.calendarLoader = false;
        })
        .catch(e => {
          console.log(e.response);
          this.calendarLoader = false;
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);

      const startYear = start.year;

      return `${startMonth} ${startYear}`;
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  }
};
</script>

<style>
</style>