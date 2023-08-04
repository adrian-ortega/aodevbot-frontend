export const ONE_SECOND = 1000
export const ONE_MINUTE = ONE_SECOND * 60;
export const isObject = a => typeof a === 'object' && a !== null;
export const objectHasKey = (a, k) => isObject(a) && Object.prototype.hasOwnProperty.call(a, k);
export const isString = (a) => Object.prototype.toString.call(a) === '[object String]';
export const randomFromArray = items => items[Math.floor(Math.random() * items.length)];
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