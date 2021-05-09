import Vue from "vue";

export interface LanyardOptions {
  userId: string | string[];
  socket?: boolean;
}

declare module "vue/types/vue" {
  interface Vue {
    $lanyard: LanyardOptions;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    options?: LanyardOptions;
  }
}
