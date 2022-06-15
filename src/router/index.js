import { createRouter, createWebHashHistory } from 'vue-router';
import Stated from '@/views/Stated';
import Shape from '@/views/Shape';

export const routes = [
  {
    path: '/stated',
    name: 'stated',
    component: Stated,
    meta: {
      label: '起步'
    }
  },
  {
    path: '/shape',
    name: 'shape',
    component: Shape,
    meta: {
      label: '形状'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes.concat({ path: '/', redirect: '/stated' })
});

export default router;
