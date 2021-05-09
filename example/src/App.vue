<template>
  <div>
    <!-- Call the component that uses fetch -->
    <Lanyard v-if="mode === 'default'" />

    <!-- Call the component that uses WebSocket connection -->
    <LanyardWithSocket v-else-if="mode === 'socket'" />

    <button
      @click="mode === 'default' ? (mode = 'socket') : (mode = 'default')"
    >
      Switch Mode
    </button>
  </div>
</template>

<script>
import Lanyard from "./components/Lanyard/Default";
import LanyardWithSocket from "./components/Lanyard/Default";

export default {
  components: {
    Lanyard,
    LanyardWithSocket,
  },
  data() {
    return {
      mode: "default", // or "socket"
    };
  },
};
</script>

<style scoped>
/* Add styles to result object element */

.result-object {
  padding: 1em;
  border-radius: 0.5em;
  background-color: rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
}
</style>
