import Vue from "vue";
import { VueLanyardOptions, LanyardResponse } from "./lanyard";

/* Vue types */
declare module "vue/types/vue" {
  interface Vue {
    $lanyard: (
      options: VueLanyardOptions
    ) =>
      | Promise<WebSocket>
      | Promise<LanyardResponse>
      | Promise<LanyardResponse[]>;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    options?: LanyardOptions;
  }
}

/* Nuxt types */
declare module "@nuxt/types" {
  interface Context {
    $lanyard: (
      options: LanyardOptions
    ) =>
      | Promise<WebSocket>
      | Promise<LanyardResponse>
      | Promise<LanyardResponse[]>;
  }
}

/* Declare class */
declare class VueLanyard {
  static install: PluginFunction<VueLanyardOptions>;
}

export default VueLanyard;
