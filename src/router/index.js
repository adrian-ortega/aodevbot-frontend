import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ChatView from '../views/ChatView.vue';
import DebugView from '../views/DebugView.vue';
import ConfigView from '../views/ConfigView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
      meta: {
        containerClasses: ['is-page']
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/debug',
      name: 'debug',
      component: DebugView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
