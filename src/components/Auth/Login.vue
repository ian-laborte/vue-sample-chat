<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" sm="7" md="5" lg="3">
        <v-card ref="form">
          <div style="padding-bottom: 10px"></div>
          <center>
            <h1 class="h1">CHATIFY</h1>
            <label class="subtitle-2">Sample Chat App </label>
          </center>
          <form @submit="onSubmit">
            <v-card-text>
              <v-text-field
                v-focus
                ref="email"
                v-model="email"
                name="email"
                :rules="[rules.emailRequired, rules.email]"
                label="Email"
                placeholder="somebody@domain.com"
                required
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                name="password"
                label="Password"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.passRequired]"
                :type="show3 ? 'text' : 'password'"
                class="input-group--focused"
                @click:append="show3 = !show3"
              ></v-text-field>
            </v-card-text>
            <center>
              <label class="subtitle-2 font-weight-thin"
                >not yet registered?
                <router-link to="/signup">Sign Up</router-link></label
              >
            </center>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition> </v-slide-x-reverse-transition>
              <div v-if="dispatch.loading === true">
                <v-btn color="primary" type="submit" disabled>Loading...</v-btn>
              </div>
              <div v-else>
                <v-btn color="primary" type="submit">Submit</v-btn>
              </div>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import router from "../../router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      show3: false,
      rules: {
        emailRequired: (v) => !!v || "Email is Required",
        passRequired: (v) => !!v || "Password is Required",
        min: (v) => v.length >= 6 || "Min 6 characters",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    onSubmit(event) {
      event.preventDefault();
      this.signIn({ email: this.email, password: this.password });
    },
  },
  computed: mapGetters(["dispatch"]),
  created() {
    // console.log("Mounted");
  },
  watch: {
    dispatch(values) {
      if (values.isAuthenticated) {
        router.push({ path: "Main" });
      }
    },
  },
};
</script>
<style scoped></style>
