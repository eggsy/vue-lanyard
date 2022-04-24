import Lanyard from "./functions/lanyard.js";

export default {
  /**
   * Method that will be called by Vue.use() to inject the plugin into context.
   */
  install(app) {
    const vueVersion = Number(app.version.split('.')[0]);
    if (vueVersion < 3) {
      app.lanyard = Lanyard
      app.prototype.$lanyard = Lanyard;
    } else {
      app.provide('lanyard', Lanyard);
      app.config.globalProperties.$lanyard = Lanyard;
    }
  },
};
