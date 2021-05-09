import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Import plugin
import VueLanyard from "../../src/index";
Vue.use(VueLanyard);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
