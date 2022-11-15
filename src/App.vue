<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1 class="text">
      Data Logger
      </h1>
      <v-spacer></v-spacer> 
    </v-app-bar>

    <v-main>
      <DataLog />
    </v-main>
  </v-app>
</template>

<script>
import DataLog from "./components/dataLog.vue"
export default {
  name: 'App',

  components: {
    DataLog,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.text{
  text-transform: uppercase;
  color: cornflowerblue;
}
</style>
