import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('../views/HomeView.vue'), meta: { title: '主页' } },
      { path: 'about', component: () => import('../views/AboutView.vue'), meta: { title: '关于' } },
      { path: 'articles', component: () => import('../views/ArticlesView.vue'), meta: { title: '文章' } },
      { path: 'settings', component: () => import('../views/SettingsView.vue'), meta: { title: '设置' } },
      
      { path: 'articles/:id', component: () => import('../views/ArticlesView.vue'), meta: { title: 'Loading' } }
    ], 
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/home',
  },
]

export default routes
