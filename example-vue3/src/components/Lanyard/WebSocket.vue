<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'

const $lanyard = inject('lanyard')
const lanyard = ref({})
const lanyardSocket = ref(null)

const userId = '162969778699501569'

const getUsername = computed(() => lanyard.value?.discord_user?.username || "FETCHING")

/**
 * Disconnect from the socket, stop listening for new events.
 */
const disconnect = () => {
  lanyardSocket.value?.close()
}

onMounted(async () => {
  lanyardSocket.value = await $lanyard({
    userId: userId,
    // Enable socket option
    socket: true,
  })

  lanyardSocket.value.addEventListener("message", ({ data }) => {
    // Parse and destructure data object and assing t to type, d to status
    const { d: status } = JSON.parse(data)
    lanyard.value = status
  })
})

onBeforeUnmount(() => {
  // Don't forget to remove the socket on route/page change
  lanyardSocket.value?.close()
})
</script>

<template>
  <div id="app">
    <button @click="disconnect">Close Socket</button>

    <h1>Vue Plugin for Lanyard API!</h1>

    <h3>Username: {{ getUsername }}</h3>
    <div class="result-object">
      {{ JSON.stringify(lanyard, null, 4) }}
    </div>
  </div>
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
