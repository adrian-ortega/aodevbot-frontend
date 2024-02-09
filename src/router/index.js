import { createRouter, createWebHistory } from 'vue-router'
import BrowserSourceView from '../views/BrowserSourceView.vue'
import ChatView from '../views/ChatView.vue'
import ComponentsView from '../views/ComponentsView.vue'
import ConfigView from '../views/ConfigView.vue'
import ConfigTabAccount from '../components/config/tabs/accounts/ConfigTabAccount.vue'
import ConfigTabCommandsEdit from '../components/config/tabs/commands/ConfigTabCommandsEdit.vue'
import ConfigTabCommandsList from '../components/config/tabs/commands/ConfigTabCommandsList.vue'
import ConfigTabCommands from '../components/config/tabs/commands/ConfigTabCommands.vue'
import ConfigTabEvents from '../components/config/tabs/events/ConfigTabEvents.vue'
import ConfigTabRedeemables from '../components/config/tabs/redeemables/ConfigTabRedeemables.vue'
import ConfigTabUsers from '../components/config/tabs/users/ConfigTabUsers.vue'
import MusicView from '../views/MusicView.vue'
import DebugView from '../views/DebugView.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: {
        name: 'music'
      }
    },
    {
      path: '/music',
      name: 'music',
      component: MusicView
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsView
    },
    {
      path: '/browser-source',
      name: 'browser-source',
      component: BrowserSourceView
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
      redirect: { name: 'config.accounts' },
      meta: {
        containerClasses: ['is-page', 'v-debug']
      },
      children: [
        {
          path: 'accounts',
          component: ConfigTabAccount,
          name: 'config.accounts',
          meta: {
            label: 'Accounts'
          }
        },
        {
          path: 'commands',
          component: ConfigTabCommands,
          name: 'config.commands',
          redirect: { name: 'config.commands.list.general' },
          meta: {
            label: 'Commands'
          },
          children: [
            {
              path: 'create',
              component: ConfigTabCommandsEdit,
              name: 'config.commands.create',
              meta: {
                ignoreTab: true,
                label: 'Create'
              }
            },
            {
              path: ':id/edit',
              component: ConfigTabCommandsEdit,
              name: 'config.commands.edit',
              meta: {
                ignoreTab: true,
                label: 'Create'
              }
            },
            {
              path: 'general',
              component: ConfigTabCommandsList,
              name: 'config.commands.list.general',
              meta: {
                listType: 'general',
                label: 'General'
              }
            },
            {
              path: 'custom',
              component: ConfigTabCommandsList,
              name: 'config.commands.list.custom',
              meta: {
                listType: 'custom',
                label: 'Custom'
              }
            }
          ]
        },
        {
          path: 'events',
          component: ConfigTabEvents,
          name: 'config.events',
          meta: {
            label: 'Events'
          }
        },
        {
          path: 'redeemables',
          component: ConfigTabRedeemables,
          name: 'config.redeemables',
          meta: {
            label: 'Redeemables'
          }
        },
        {
          path: 'users',
          component: ConfigTabUsers,
          name: 'config.users',
          meta: {
            label: 'Users'
          }
        }
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: {
        containerClasses: ['is-chat']
      }
    },
    {
      path: '/debug',
      name: 'debug',
      component: DebugView,
      meta: {
        containerClasses: ['is-debug']
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
