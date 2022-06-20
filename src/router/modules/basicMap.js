import { h, resolveComponent } from 'vue';
import gaodeMap from '@/views/BasicMap/GaodeMap';
import MapBox from '@/views/BasicMap/MapBox';
import tdtMap from '@/views/BasicMap/TdtMap';
import arcgis from '@/views/BasicMap/Arcgis';

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
        label: '高德地图'
      }
    },
    {
      path: 'MapBox',
      name: 'MapBox',
      component: MapBox,
      meta: {
        label: 'MapBox'
      }
    },
    {
      path: 'tdtMap',
      name: 'tdtMap',
      component: tdtMap,
      meta: {
        label: '天地图'
      }
    },
    {
      path: 'arcgis',
      name: 'arcgis',
      component: arcgis,
      meta: {
        label: 'Arcgis'
      }
    }
  ]
};
