import { h, resolveComponent } from 'vue';
import gaodeMap from '@/views/BasicMap/GaodeMap';

export default {
  path: '/basicMap',
  name: 'basicMap',
  component: {
    render: () => h(resolveComponent('router-view'))
  },
  meta: {
    label: '基础底图',
    icon: 'ForkSpoon'
  },
  children: [
    {
      path: 'gaodeMap',
      name: 'gaodeMap',
      component: gaodeMap,
      meta: {
        label: '高德地图',
        icon: 'Promotion'
      }
    }
  ]
};
