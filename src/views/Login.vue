<template>
  <v-app id="login">
    <v-snackbar v-model="snackbar" color="error">
      {{ snackbarContent }}
      <v-btn text @click="snackbar = false" timeout="3000">Close</v-btn>
    </v-snackbar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center mb-5">
            <img src="../assets/logo.png" width="200px" />
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                  />

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn width="100%" color="secondary" @click="login" :loading="loginLoader">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],

      snackbar: false,
      snackbarContent: "",

      loginLoader: false
    };
  },
  methods: {
    //   -------------------------------------------- Login Function ------------------------------------------------------
    login: function() {
      this.loginLoader = true;
      this.$http
        .post("/trainer/authenticate", {
          username: this.email,
          password: this.password
        })
        .then(res => {
          let user = res.data.user;
          let token = res.data.token;
          this.$cookies.set("trainer_user_token", token, 60 * 60 * 1);

          this.$store.commit("saveUser", { user });

          window.location.href = "/";
        })
        .catch(e => {
          console.log(e.response);
          var err = e.response.status;
          if (err == 401) {
            this.snackbar = true;
            this.snackbarContent = "Email/Password is incorrect.";
            this.loginLoader = false;
          } else {
            this.snackbar = true;
            this.snackbarContent = "Unknown error. Contact admin";
            this.loginLoader = false;
          }
        });
    }
    // -------------------------------------------- Login function end -----------------------------------------------------
  }
};
</script>