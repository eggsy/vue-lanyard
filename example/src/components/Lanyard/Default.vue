<template>
  <div id="app">
    <h1>Vue Plugin for Lanyard API!</h1>

    <h3>Username: {{ getUsername }}</h3>
    <div class="result-object">
      {{ JSON.stringify(lanyard, null, 4) }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "162969778699501569",
      lanyard: {},
    };
  },
  computed: {
    /**
     * Returns username from lanyard response object.
     */
    getUsername() {
      return this.lanyard?.data?.discord_user?.username || "FETCHING";
    },
  },
  async mounted() {
    // Use lanyard plugin to fetch single user.
    const lanyard = await this.$lanyard({ userId: this.userId });
    this.lanyard = lanyard;
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
