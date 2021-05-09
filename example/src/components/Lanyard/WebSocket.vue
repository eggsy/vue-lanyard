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
    const lanyardWithWebsocket = await this.$lanyard({
      userId: this.userId,
      // Enable socket option
      socket: true,
    });

    lanyardWithWebsocket.addEventListener("message", ({ data }) => {
      // Parse and destructure data object and assing t to type, d to status
      const { t: type, d: status } = JSON.parse(data);

      // Update the local data on both INIT_STATE and PRESENCE_DATA types
      if (type === "INIT_STATE" || type === "PRESENCE_UPDATE")
        this.lanyard = status;
    });
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
