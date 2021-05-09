import Lanyard from "./functions/lanyard.js";

export default {
  /**
   * Method that will be called by Vue.use() to inject the plugin into context.
   */
  install(Vue) {
    Vue.lanyard = Lanyard;
    Vue.prototype.$lanyard = Lanyard;
  },
};
