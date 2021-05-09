const apiBase = "https://api.lanyard.rest/v1";

export default {
  install(Vue) {
    /**
     * Plugin that lets you interact with Lanyard API using fetch or WebSocket.
     * @param {{userId: string; socket?: boolean}} options
     * @returns {Promise<WebSocket> | Promise<object> | Promise<void>}
     */
    async function Lanyard(options) {
      // Throw error if no options are set.
      if (!options || Object.keys(options).length === 0)
        throw new Error("No options were provided.");
      // Throw error if userId is missing.
      else if (options.userId === undefined)
        throw new Error("Missing `userId` option.");
      // Use websocket if socket option is set to true.
      else if (options.socket === true) {
        const socket = new WebSocket("wss://api.lanyard.rest/socket");

        let key = "subscribe_to_id";
        if (typeof options.userId === "object") key = "subscribe_to_ids";

        socket.addEventListener("open", () => {
          // Subscribe to ID(s)
          socket.send(
            JSON.stringify({
              op: 2,
              d: {
                [key]: options.userId,
              },
            })
          );

          // Send heartbeat every 30 seconds
          setInterval(() => {
            socket.send(
              JSON.stringify({
                op: 3,
              })
            );
          }, 30000);
        });

        return socket;
      }
      // Send a single request if userId is a string
      else if (typeof options.userId === "string") {
        const data = await fetch(
          `${apiBase}/users/${options.userId}`
        ).then((res) => res.json());

        return data;
      }
      // Send multiple request if userId is a string
      else if (typeof options.userId === "object") {
        const responseArray = [];

        for (let user of options.userId) {
          const data = await fetch(`${apiBase}/users/${user}`).then((res) =>
            res.json()
          );

          responseArray.push(data);
        }

        return responseArray;
      }
    }

    Vue.lanyard = Lanyard;
    Vue.prototype.$lanyard = Lanyard;
  },
};
