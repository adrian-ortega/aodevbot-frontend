import { createRouter, createWebHistory } from 'vue-router'
import { isArray, objectHasKey } from '../util'
import routes from './routes'
const parseRoute = (route, parent = 0) => {
  if (!objectHasKey(route, 'meta')) {
    route.meta = {}
  }
  if (!objectHasKey(route.meta, 'parent')) {
    route.meta.parent = parent
  }
  if (!objectHasKey(route.meta, 'ignoreTab')) {
    route.meta.ignoreTab = false
  }
  if (objectHasKey(route, 'children') && isArray(route.children)) {
    route.children = route.children.map(r => parseRoute(r, route.name))
  }
  return route;
}
const parsedRoutes = routes.map(r => parseRoute(r))
const router = createRouter({
  history: createWebHistory(),
  routes: parsedRoutes
})
export default router
