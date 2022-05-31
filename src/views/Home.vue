<template>
  <v-app>
    <div class="home">
      <v-container>
        <router-view />
      </v-container>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
};
</script>
