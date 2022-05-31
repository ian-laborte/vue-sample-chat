<template>
  <div class="main">
    <AuthHeader />
    <router-view />
  </div>
</template>
<script>
import AuthHeader from "../shared/AuthHeader.vue";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["dispatch"]),
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  components: {
    AuthHeader,
  },
};
</script>
<style scoped></style>
