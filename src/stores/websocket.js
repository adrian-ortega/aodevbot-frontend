import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useNotificationsStore } from './notifications'
import { ONE_SECOND, isObject } from '../util'

export const useWebsocketStore = defineStore('websockets', () => {
  const connected = ref(false)
  const booted = ref(false)
  const connectActions = reactive([])
  const messageActions = reactive([])
  let ws, errorNotificationId

  const getConnectUrl = () => `ws://${window.location.host}/websockets`

  const connect = () => {
    try {
      console.log('Connecting...', getConnectUrl())
      ws = new WebSocket(getConnectUrl())
      ws.onopen = () => {
        connected.value = true
        const ns = useNotificationsStore()
        if (errorNotificationId) {
          ns.dismiss(errorNotificationId)
        }

        if (!booted.value) {
          ns.append('Connected', ns.types.success, ONE_SECOND * 0.5)
          booted.value = true
        }

        connectActions.forEach((action) => action(booted, connected))
      }
      ws.onmessage = ({ data }) => {
        try {
          data = JSON.parse(data)
        } catch (err) {
          // @TODO AO - Implement logging to the server?
        }

        messageActions.forEach((action) => action(data))
      }
      ws.onclose = () => {
        connected.value = false
        setTimeout(() => {
          connect()
        }, ONE_SECOND * 5)
      }
      ws.onerror = (err) => {
        if (err.type === 'error') {
          const ns = useNotificationsStore()
          if (errorNotificationId) {
            ns.dismiss(errorNotificationId)
          }
          errorNotificationId = ns.append('Cannot connect', ns.types.error)
        }
        ws.close()
      }
    } catch (err) {
      const ns = useNotificationsStore()
      ns.append(err.message, ns.types.error)
    }
  }

  const onConnect = (action) => {
    connectActions.push(action)
    return connectActions.indexOf(action)
  }

  const removeConnectAction = (id) => {
    delete connectActions[id]
  }

  const onMessage = (action) => {
    messageActions.push(action)
    return messageActions.indexOf(action)
  }

  const removeMessageAction = (id) => {
    delete messageActions[id]
  }

  const send = (event, payload) => {
    if (!isObject(payload)) {
      payload = {}
    }
    if (!payload.timestamp) {
      payload.timestamp = new Date().getTime()
    }
    return ws.send(
      JSON.stringify({
        event,
        payload
      })
    )
  }

  connect()
  return {
    isReady: computed(() => ws.readyState === ws.OPEN),
    connected,
    onConnect,
    removeConnectAction,
    onMessage,
    removeMessageAction,
    send
  }
})
