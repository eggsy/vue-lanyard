<script setup>
import Lanyard from './components/Lanyard/Default.vue'
// import LanyardW from './components/Lanyard/WebSocket.vue'
</script>

<template>
  <h4>
    Note: This example uses REST method, see
    <code>components/Lanyard/WebSocket.vue</code> for WebSocket example.
  </h4>

  <Lanyard />
  <!-- <LanyardW /> -->
</template>

<style scoped>
/* Add styles to result object element */

.result-object {
  padding: 1em;
  border-radius: 0.5em;
  background-color: rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
}
</style>
