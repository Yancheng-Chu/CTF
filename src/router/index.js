import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/main.vue')
  },
  {
    path: '/profile',
    component: () => import('../components/profile.vue')
  },
  {
    path: '/root',
    component: () => import('../components/root.vue')
  }
];


const router = createRouter({
  history: createWebHashHistory(),  // hash路由模式
//   history: createWebHistory(),  // history路由模式
  routes
});

export default router;
