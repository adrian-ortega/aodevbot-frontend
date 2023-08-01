import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useNotificationsStore } from './notifications';
import { ONE_SECOND } from "../util";

export const useWebsocketStore = defineStore('websockets', () => {
  const connected = ref(false);
  const booted = ref(false);
  const connectActions = reactive([]);
  const messageActions = reactive([]);
  let ws, errorNotificationId;

  const getConnectUrl = () => {
    // @TODO Adrian Ortega
    //       implement a way to pull this url dynamically 
    //       so it matches the environment inside the
    //       Docker container for the bot server.
    return 'ws://localhost:8080/websockets'
  }

  const connect = () => {
    try {
      ws = new WebSocket(getConnectUrl());
      ws.onopen = () => {
        connected.value = true;
        const ns = useNotificationsStore();
        if (errorNotificationId) {
          ns.dismiss(errorNotificationId);
        }

        if (!booted.value) {
          ns.append('Connected', ns.types.success, ONE_SECOND * 3);
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
          connect();
        }, ONE_SECOND * 5)
      };
      ws.onerror = (err) => {
        if (err.type === 'error') {
          const ns = useNotificationsStore();
          if (errorNotificationId) {
            ns.dismiss(errorNotificationId);
          }
          errorNotificationId = ns.append('Cannot connect', ns.types.error);
        }
        ws.close();
      };
    } catch (err) {
      const ns = useNotificationsStore();
      ns.append(err.message, ns.types.error);
    }
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