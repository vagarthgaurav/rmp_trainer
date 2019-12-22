<template>
  <v-app>
    <NavBar />

    <Sidebar />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

export default {
  name: "App",

  components: {
    NavBar,
    Sidebar
  },

  data: () => ({
    //
  })
};
</script>
