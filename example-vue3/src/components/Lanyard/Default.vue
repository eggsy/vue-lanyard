<script setup>
import { computed, inject, onMounted, ref } from 'vue'

const $lanyard = inject('lanyard')
const lanyard = ref({})

const userId = '162969778699501569'

const getUsername = computed(() => lanyard.value?.data?.discord_user?.username || "FETCHING")

onMounted(async () => {
  // Use lanyard plugin to fetch single user.
  lanyard.value = await $lanyard({ userId: userId })
})
</script>

<template>
  <div id="app">
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
