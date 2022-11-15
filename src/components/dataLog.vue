<template>
  <div>
    <!-- <v-card class="mx-auto" max-width="600" tile v-model="logs">
      <v-list-item v-for="log in logs" :key="log.date">
        <v-list-item-content>
          <v-list-item-title>
            <p>{{ log.message }}</p>
          </v-list-item-title>
          <v-list-item-subtitle
            ><v-icon class="mdi-clock"></v-icon>
            {{ new Date(log.date).toLocaleString() }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card> -->
    <div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Server</th>
              <th class="text-center">Route</th>
              <th class="text-center">Data</th>
              <th class="text-center">Type</th>
              <th class="text-center">Date</th>
              <th class="text-center">Connection</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.date">
              <td>{{ log.server }}</td>
              <td>{{ log.route }}</td>
              <td>{{ log.data }}</td>
              <td>{{ log.type }}</td>
              <td>{{ new Date(log.date).toLocaleString() }}</td>
              <td>
                <v-btn class="">
                  <v-icon>
                  </v-icon>
                </v-btn>
                {{ connected ? "connect" : "disconnect" }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataLog",
  data: function () {
    return {
      logs: [],
      connected: null,
    };
  },
  methods: {
    createConnection() {
      this.$mqtt.on("connect", () => {
        this.connected = true;
        console.log("connected!");
      });
      this.$mqtt.subscribe("logger");

      // try {
      //   this.$mqtt.on('connect',()=>{
      //     this.connected = true;
      //     console.log("connected")
      //   })
      // } catch (error) {
      //   console.log(error)
      // }
      // this.$mqtt.subscribe('logger')
      this.$mqtt.on("message", (topic, message) => {
        let resultString = message.toString();
        console.log(resultString);
        let resultObj = JSON.parse(message);
        console.log(resultObj);
        let messageObj = {
          server: resultObj.server,
          route: resultObj.route,
          data: resultObj.data,
          type: resultObj.type,
          date: new Date(),
        };
        this.logs.push(messageObj);
        
      });
      this.$mqtt.on("offline", () => {
        console.log("Offlined.");
      });

      this.$mqtt.on("close", () => {
        this.connected = false;
        console.log("Disconnected.");
      });
    },
  },
  created: function () {
    this.createConnection();
    //this.$mqtt.publish('logger','hello')
  },
};
</script>

<style>
</style>