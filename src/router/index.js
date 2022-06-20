import { createRouter, createWebHashHistory } from 'vue-router';
import basicMap from './modules/basicMap';
import Stated from '@/views/Stated';
import Shape from '@/views/Shape';
import ThreeDTiles from '@/views/ThreeDTiles';

export const routes = [
  {
    path: '/stated',
    name: 'stated',
    component: Stated,
    meta: {
      label: '起步',
      icon: 'ForkSpoon'
    }
  },
  basicMap,
  {
    path: '/shape',
    name: 'shape',
    component: Shape,
    meta: {
      label: '形状',
      icon: 'ForkSpoon'
    }
  },
  {
    path: '/ThreeDTiles',
    name: 'threeDTiles',
    component: ThreeDTiles,
    meta: {
      label: '3D Tiles',
      icon: 'ForkSpoon'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes.concat({ path: '/', redirect: '/stated' })
});

export default router;
