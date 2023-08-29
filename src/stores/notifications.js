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
export const NOTIFICATION_PROGRESS = 4;
export const NOTIFICATION_LABEL_PROGRESS = 'progress'

export const useNotificationsStore = defineStore('notifications', () => {
  const state = reactive({
    items: []
  });

  const types = {
    [NOTIFICATION_LABEL_INFO]: NOTIFICATION_INFO,
    [NOTIFICATION_LABEL_SUCCESS]: NOTIFICATION_SUCCESS,
    [NOTIFICATION_LABEL_WARNING]: NOTIFICATION_WARNING,
    [NOTIFICATION_LABEL_ERROR]: NOTIFICATION_ERROR,
    [NOTIFICATION_LABEL_PROGRESS]: NOTIFICATION_PROGRESS,
  }

  const getIndex = (id) => state.items.findIndex((a) => a.id === id);

  const append = (
    text,
    type = NOTIFICATION_INFO,
    timeToShow = ONE_SECOND * 15
  ) => {
    const id = makeId();

    if (isString(type)) {
      type = objectHasKey(types, type) ? types[type] : types[NOTIFICATION_LABEL_INFO];
    }

    state.items.push({ id, type, text });
    setTimeout(() => dismiss(id), timeToShow);
    return id;
  };

  const dismiss = (id) => {
    const i = getIndex(id);
    if (i > -1) state.items.splice(i, 1);
  };

  const progress = (title, percentage) => {
    const id = makeId();
    state.items.push({
      id,
      type: types[NOTIFICATION_LABEL_PROGRESS],
      title,
      text: '',
      percentage
    })
    return id;
  }

  const updateProgress = (id, percentage, text) => {
    const i = getIndex(id);
    if (i > -1) {
      state.items[i].percentage = parseInt(percentage)
      if (text) {
        state.items[i].text = text;
      }
    }
  }

  return {
    items: computed(() => state.items),
    hasItems: computed(() => state.items.length > 0),
    append,
    progress,
    updateProgress,
    dismiss,
    types
  };
});