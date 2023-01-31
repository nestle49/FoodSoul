import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'

const MainPage = () => import('./pages/MainPage.vue')

const routes = [
  { path: '/', component: MainPage },
]

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory('/test/')
      : createWebHistory('/test/'),
    routes,
  })
}
