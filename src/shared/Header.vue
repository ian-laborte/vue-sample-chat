<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" sm="7" md="5" lg="3">
        <v-row justify="center">
          <router-link to="/login">Login</router-link>||<router-link
            to="/signup"
            >Signup</router-link
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Header",
};
</script>
<style scoped>
</style>