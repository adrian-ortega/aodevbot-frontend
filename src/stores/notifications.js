import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { ONE_SECOND, isString, makeId, objectHasKey } from "../util";

export const NOTIFICATION_INFO = 0;
export const NOTIFICATION_LABEL_INFO = 'info';
export const NOTIFICATION_SUCCESS = 1;
export const NOTIFICATION_LABEL_SUCCESS = 'success';
export const NOTIFICATION_WARNING = 2;
export const NOTIFICATION_LABEL_WARNING = 'warning';
export const NOTIFICATION_ERROR = 3;
export const NOTIFICATION_LABEL_ERROR = 'error';

export const useNotificationsStore = defineStore('notifications', () => {
  const state = reactive({
    items: []
  });

  const types = {
    [NOTIFICATION_LABEL_INFO]: NOTIFICATION_INFO,
    [NOTIFICATION_LABEL_SUCCESS]: NOTIFICATION_SUCCESS,
    [NOTIFICATION_LABEL_WARNING]: NOTIFICATION_WARNING,
    [NOTIFICATION_LABEL_ERROR]: NOTIFICATION_ERROR,
  }

  const append = (
    text,
    type = NOTIFICATION_INFO,
    timeToShow = ONE_SECOND * 15
  ) => {
    const id = makeId();

    if (isString(type)) {
      type = objectHasKey(types, type) ? types[type] : types[NOTIFICATION_INFO];
    }

    state.items.push({ id, type, text });
    setTimeout(() => dismiss(id), timeToShow);
    return id;
  };

  const dismiss = (id) => {
    const i = state.items.findIndex((a) => a.id === id);
    if (i > -1) state.items.splice(i, 1);
  };

  return {
    items: computed(() => state.items),
    hasItems: computed(() => state.items.length > 0),
    append,
    dismiss,
    types
  };
});