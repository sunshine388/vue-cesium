import { h, resolveComponent } from 'vue';
import ChinaTerrain from '@/views/Terrain/ChinaTerrain';
import ArcgisTerrain from '@/views/Terrain/ArcgisTerrain';
import ExaggerationTerrain from '@/views/Terrain/ExaggerationTerrain';

export default {
  path: '/terrain',
  name: 'terrain',
  component: {
    render: () => h(resolveComponent('router-view'))
  },
  meta: {
    label: '地形',
    icon: 'ForkSpoon'
  },
  children: [
    {
      path: 'ChinaTerrain',
      name: 'ChinaTerrain',
      component: ChinaTerrain,
      meta: {
        label: '中国地形'
      }
    },
    {
      path: 'ArcgisTerrain',
      name: 'ArcgisTerrain',
      component: ArcgisTerrain,
      meta: {
        label: 'Arcgis地形'
      }
    },
    {
      path: 'ExaggerationTerrain',
      name: 'ExaggerationTerrain',
      component: ExaggerationTerrain,
      meta: {
        label: '夸张地形'
      }
    }
  ]
};
