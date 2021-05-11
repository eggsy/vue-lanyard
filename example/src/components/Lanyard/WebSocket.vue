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

<script>
export default {
  data() {
    return {
      userId: "162969778699501569",
      lanyard: {},
      lanyardSocket: null,
    };
  },
  computed: {
    /**
     * Returns username from lanyard response object.
     */
    getUsername() {
      return this.lanyard?.discord_user?.username || "FETCHING";
    },
  },
  beforeDestroy() {
    // Don't forget to remove the socket on route/page change
    this.lanyardSocket?.close();
  },
  async mounted() {
    this.lanyardSocket = await this.$lanyard({
      userId: this.userId,
      // Enable socket option
      socket: true,
    });

    this.lanyardSocket.addEventListener("message", ({ data }) => {
      // Parse and destructure data object and assing t to type, d to status
      const { d: status } = JSON.parse(data);
      this.lanyard = status;
    });
  },
  methods: {
    /**
     * Disconnect from the socket, stop listening for new events.
     */
    disconnect() {
      this.lanyardSocket?.close();
    },
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
