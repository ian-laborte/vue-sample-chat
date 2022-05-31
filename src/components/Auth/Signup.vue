<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9" sm="7" md="5" lg="3">
        <v-card ref="form">
          <div style="padding-bottom: 10px"></div>
          <center>
            <h1 class="h1">SIGN UP TO CHATIFY</h1>
            <label class="subtitle-2">start chatting with Ian</label>
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
                :type="'email'"
                placeholder="somebody@domain.com"
                required
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                name="password"
                label="Password"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.passRequired, rules.min]"
                :type="show3 ? 'text' : 'password'"
                class="input-group--focused"
                @click:append="show3 = !show3"
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="confirmpassword"
                name="confirmpassword"
                label="Confirm Password"
                :rules="[rules.min]"
                :type="'password'"
                class="input-group--focused"
                @click:append="show3 = !show3"
              ></v-text-field>
            </v-card-text>
            <center>
              <label class="subtitle-2 font-weight-thin"
                >Account has already Exist?
                <router-link to="/login">Login</router-link>
              </label>
            </center>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition> </v-slide-x-reverse-transition>
              <div v-if="dispatch.loading === true">
                <v-btn color="primary" type="submit" disabled>Loading...</v-btn>
              </div>
              <div v-else>
                <v-btn color="primary" type="submit">Sign up</v-btn>
              </div>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="9" sm="7" md="5" lg="3">
        <center>
          <div v-if="dispatch.error === true">
            <label class="subtitle-2 font-weight-thin error-color"
              >Error Encountered: {{ dispatch.errorMessage }}
            </label>
          </div>
          <div v-if="dispatch.doneSignUp === true">
            <v-alert color="green" dense outlined prominent type="success"
              >Sign Up Successful Please
              <router-link to="/login">Login</router-link></v-alert
            >
          </div>
          <div v-if="localErrorMessage !== ''">
            <label class="subtitle-2 font-weight-thin error-color"
              >Error Encountered: {{ localErrorMessage }}
            </label>
          </div>
        </center>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      confirmpassword: "",
      localErrorMessage: "",
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
    ...mapActions(["signUp"]),
    onSubmit(event) {
      this.localErrorMessage = "";
      event.preventDefault();
      if (this.email && this.password && this.confirmpassword) {
        this.signUp({ email: this.email, password: this.password });
      } else {
        console.log("hello");
        this.localErrorMessage = "Some Inputs are Empty";
      }
    },
  },
  computed: mapGetters(["dispatch"]),
  created() {
    console.log("Mounted");
  },
  watch: {
    localErrorMessage() {
      console.log(this);
    },
  },
};
</script>
<style scoped>
.error-color {
  color: red;
}
</style>
