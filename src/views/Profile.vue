<template>
  <div>
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
              </v-layout>
            </v-flex>

            <v-flex xs8 md9>
              <v-layout column class="pa-4">
                <v-flex xs class="my-2 mx-5">
                  <span class="profileData">{{user.firstname}} {{user.lastname}}</span>
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
                  <span class="profileData">{{user.address.pinCode}}</span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
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
  background: #88498F;
}

.profileTitleBox {
  border-right: 1px solid #222222;
}

.profileTitle {
  color: #F7F0F0;
  letter-spacing: 2pt;
  font-size: 16px;
  font-weight: 600;
}

.profileData {
  color: #F7F0F0;
  font-size: 16px;
}
</style>