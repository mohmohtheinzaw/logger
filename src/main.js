import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueMqtt from "vue-mqtt";

Vue.config.productionTip = false
Vue.use(VueMqtt,'wss://temperature.intelimyanmar.com:8083')


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
