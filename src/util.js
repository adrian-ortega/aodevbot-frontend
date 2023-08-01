export const ONE_SECOND = 1000
export const ONE_MINUTE = ONE_SECOND * 60;
export const isObject = a => typeof a === 'object' && a !== null;
export const objectHasKey = (a, k) => isObject(a) && Object.prototype.hasOwnProperty.call(a, k);
export const isString = (a) => Object.prototype.toString.call(a) === '[object String]';
export const randomFromArray = items => items[Math.floor(Math.random() * items.length)];
export const popupWindowCenter = ({ url, title, w = 480, h = 640 }) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
  const width = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width)
  const height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height)
  const systemZoom = width / window.screen.availWidth
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop
  const newWindow = window.open(url, title, `scrollbars=yes,width=${w / systemZoom},height=${h / systemZoom},top=${top},left=${left}`);
  if (window.focus) newWindow.focus()
  return newWindow
};
export const makeId = (function () {
  let i = 0;
  return () => (i++).toString(36) + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
})();