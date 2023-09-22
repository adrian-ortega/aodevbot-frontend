import { defineStore } from "pinia";

export const useLocalStore = defineStore('local', () => {
  const getItem = (key, defaultValue = {}) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (err) {
      return defaultValue;
    }
  }

  const updateItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  }

  return {
    get: getItem,
    update: updateItem,
    remove: removeItem
  }
})