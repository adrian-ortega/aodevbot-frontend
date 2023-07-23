import { defineStore } from "pinia";
import { ref, reactive } from "vue";

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60;

export const useWebsocketStore = defineStore('websockets', () => {
  const connected = ref(false);
  const booted = ref(false);
  const connectActions = reactive([]);
  const messageActions = reactive([]);
  let ws;

  const getConnectUrl = () => {
    // @TODO Adrian Ortega
    //       implement a way to pull this url dynamically 
    //       so it matches the environment inside the
    //       Docker container for the bot server.
    return 'ws://localhost:8080/websockets'
  }

  const connect = () => {
    ws = new WebSocket(getConnectUrl());
    ws.onopen = () => {
      connected.value = true;

      if (!booted.value) {
        // @TODO Adrian Ortega - Implement brooooooo
      }

      connectActions.forEach((action) => action(booted, connected));
    };
    ws.onmessage = ({ data }) => {
      try {
        data = JSON.parse(data);
      } catch (err) {
        // @TODO AO - Implement logging to the server?
      }

      messageActions.forEach((action) => action(data));
    };
    ws.onclose = () => {
      connected.value = false;
      setTimeout(() => {
        // @TODO AO - Implement reconnect/retries, for not just connect again
        console.log('Reconnecting');
        connect();
      }, ONE_SECOND * 5)
    };
    ws.onerror = () => {
      // @TODO
      ws.close();
    };
  };

  const onConnect = (action) => {
    connectActions.push(action);
    return connectActions.indexOf(action);
  };

  const removeConnectAction = (id) => {
    delete connectActions[id];
  }

  const onMessage = (action) => {
    messageActions.push(action);
    return messageActions.indexOf(action);
  };

  const removeMessageAction = () => {
    delete messageActions[id];
  }

  const send = (event, payload) => ws.send(JSON.stringify({
    event, payload
  }));

  connect();
  return {
    connected,
    onConnect,
    onMessage,
    send
  }
});