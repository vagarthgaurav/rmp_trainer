<template>
  <div>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarContent }}
      <v-btn text @click="snackbar = false" timeout="3000">Close</v-btn>
    </v-snackbar>
    <!-- Training center details -->
    <v-container class="mt-12">
      <v-card style="max-width: 800px; width: 95%; margin: auto; ">
        <v-card-text class="pa-0">
          <v-layout row class="profile">
            <v-flex xs4 md3>
              <v-layout column class="profileTitleBox pa-4">
                <v-flex xs class="my-2">
                  <span class="profileTitle">Name</span>
                </v-flex>
                <v-flex xs class="my-2">
                  <span class="profileTitle">gender</span>
                </v-flex>
                <v-flex xs class="my-2">
                  <span class="profileTitle">Name</span>
                </v-flex>
                <v-flex xs3 class="my-2">
                  <span class="profileTitle">Email</span>
                </v-flex>
                <v-flex xs3 class="my-2">
                  <span class="profileTitle">Phone Number</span>
                </v-flex>
                <v-flex xs3 class="my-2">
                  <span class="profileTitle">Address</span>
                </v-flex>
                <v-flex xs3 class="my-2">
                  <span class="profileTitle">Pincode</span>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs3 class="my-4">
                  <span class="profileTitle">Password</span>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs8 md9>
              <v-layout column class="pa-4">
                <v-flex xs class="my-2 mx-5">
                  <span class="profileData">{{user.firstname}} {{user.lastname}}</span>
                </v-flex>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">{{user.gender}}</span>
                </v-flex>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">{{formatDate(user.dateOfBirth)}}</span>
                </v-flex>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">{{user.email}}</span>
                </v-flex>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">{{user.phoneNumber}}</span>
                </v-flex>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">{{user.address.address}}</span>
                </v-flex>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">{{user.address.city.pinCode}}</span>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs3 class="my-2 mx-5">
                  <span class="profileData">
                    <v-btn
                      text
                      color="red"
                      class="white--text"
                      @click="passwordResetDialog=true"
                    >Reset Password</v-btn>
                  </span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>

    <v-dialog v-model="passwordResetDialog" persistent width="600">
      <v-card>
        <v-card-title class="headline primary white--text pa-2" primary-title>Reset Password</v-card-title>

        <v-card-text class="pa-4">
          <p class="font-weight-bold subtitle">Enter new password:</p>
          <v-form ref="resetForm" v-model="resetFormValid">
            <v-col cols="12">
              <v-row xs12 class="pa-4">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  label="Password"
                ></v-text-field>
              </v-row>
              <v-row xs12 class="pa-4">
                <v-text-field
                  v-model="repeatPassword"
                  :rules="passwordRules"
                  type="password"
                  label="Repeat Password"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!resetFormValid"
            color="green darken-3"
            class="white--text px-5"
            :loading="resetLoader"
            @click="resetPassword"
          >Submit</v-btn>

          <v-btn color="red darken-3" dark @click="formReset()" class="px-5">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      passwordResetDialog: false,
      resetLoader: false,
      resetFormValid: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Pincode must be 6 characters"
      ],

      password: "",
      repeatPassword: "",

      snackbar: false,
      snackbarContent: "",
      snackbarColor: ""
    };
  },
  created() {},
  methods: {
    formatDate(date) {
      console.log(moment(date).format("DD/MM/YYYY"));
      return moment(date).format("DD/MM/YYYY");
    },
    resetPassword() {
      this.resetLoader = true;
      // if (this.user.email == this.resetEmail) {
      //   this.$http
      //     .post("/reset-password-request?email=" + this.resetEmail, {})
      //     .then(() => {
      //       //console.log(res);
      //       this.snackbarContent =
      //         "We have sent a link to your email. Please click on the link to reset your password. The link is valid only for 5 minutes.";
      //       this.snackbarColor = "success";
      //       this.snackbar = true;
      //       this.resetLoader = false;

      //       this.formReset();
      //     })
      //     .catch(e => {
      //       console.log(e.response);
      //       this.snackbarContent = "Fatal error. Contact admin.";
      //       this.snackbarColor = "error";
      //       this.snackbar = true;
      //       this.resetLoader = false;
      //     });
      // } else {
      //   this.snackbarContent =
      //     "The email you entered does not match the email in our database. Check again.";
      //   this.snackbarColor = "error";
      //   this.snackbar = true;
      //   this.resetLoader = false;
      // }

      if (this.password == this.repeatPassword) {
        this.$http
          .post(
            "/reset-password?user-id=" +
              this.user.id +
              "&password=" +
              this.password
          )
          .then(() => {
            //console.log(res);

            this.snackbarContent =
              "Password changed successfully. You will be logged out now. Please login with your new password.";
            this.snackbarColor = "success";
            this.snackbar = true;
            this.resetLoader = false;
            this.formReset();
            let self = this;
            setTimeout(function() {
              self.logout();
            }, 5000);
          })
          .catch(e => {
            console.log(e.response);
            this.snackbarContent = "Error. Contact admin.";
            this.snackbarColor = "error";
            this.snackbar = true;

            this.resetLoader = false;
          });
      } else {
        this.snackbarContent = "Passwords dont match.";
        this.snackbarColor = "error";
        this.snackbar = true;

        this.resetLoader = false;
      }
    },
    formReset() {
      this.$refs.resetForm.reset();
      this.passwordResetDialog = false;
    },
    logout() {
      this.$store.commit("signout");
      window.location.href = "/login";
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style >
.contain {
  padding: 20px;
}

.profile {
  background: #88498f;
}

.profileTitleBox {
  border-right: 1px solid #222222;
}

.profileTitle {
  color: #f7f0f0;
  letter-spacing: 2pt;
  font-size: 16px;
  font-weight: 600;
}

.profileData {
  color: #f7f0f0;
  font-size: 16px;
}
</style>