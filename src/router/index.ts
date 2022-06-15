import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面 title
  if (to.meta.title) document.title = to.meta.title + ' - bsBlog'
  next()
})

export default router
