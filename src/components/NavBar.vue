<template>
  <div class="navbar">
    <v-app-bar color="primary" dark app flat>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>

      <v-toolbar-title>Training Center Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer dark v-if="isLoggedIn" app v-model="drawer" color="secondary" :mini-variant.sync="mini" >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>{{user.firstname}} {{user.lastname}}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      mini: true,
      items: [
        { title: "Profile", icon: "mdi-clipboard-account-outline", to: "/profile" },
        { title: "Courses", icon: "mdi-view-dashboard-outline", to: "/" },
        { title: "Schedule", icon: "mdi-calendar-clock", to: "/schedule" }
      ]
    };
  },
  created() {},
  methods: {
    signout() {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>