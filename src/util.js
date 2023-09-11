export const ONE_SECOND = 1000
export const ONE_MINUTE = ONE_SECOND * 60;
export const isObject = a => typeof a === 'object' && a !== null;
export const isFunction = (a) => {
  if (!a) { return false };
  const t = {}.toString.call(a);
  return t === '[object Function]' || t === '[object AsyncFunction]';
};
export const objectHasKey = (a, k) => isObject(a) && Object.prototype.hasOwnProperty.call(a, k);
export const isString = (a) => Object.prototype.toString.call(a) === '[object String]';
export const isNumeric = (a) => Object.prototype.toString.call(a) === '[object Number]' && !isNaN(a) && isFinite(1);
export const isArray = (a) => Array.isArray(a);
export const randomFromArray = items => items[Math.floor(Math.random() * items.length)];
export const randomInt = (min = 0, max = 100) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomFloat = (min, max, dec = 2) => (Math.random() * (min - max) + max).toFixed(dec)
export const popupWindowCenter = ({ url, title, w = 480, h = 640 }) => {
  const left = (window.screen.width - w) / 2;
  const top = (window.screen.height - h) / 2;
  const newWindow = window.open(url, title, `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`);
  if (window.focus) newWindow.focus()
  return newWindow;
};
export const makeId = (function () {
  let i = 0;
  return () => (i++).toString(36) + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
})();
export const createUrlSearchParams = (query) => {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return searchParams;
}
export const isEmpty = (mixedValue) => {
  const emptyValues = [undefined, null, false, 0, "", "0"];
  for (let i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedValue === emptyValues[i]) {
      return true;
    }
  }

  if (isObject(mixedValue)) {
    for (let key in mixedValue) {
      if (objectHasKey(mixedValue, key)) {
        return false;
      }
    }
    return true;
  }

  return false;
};
export const elapsedSeconds = (time) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time - mins * 60);
  const pad = a => a < 10 ? `0${a}` : a;
  return `${pad(Math.trunc(mins))}:${pad(Math.trunc(secs))}`
}