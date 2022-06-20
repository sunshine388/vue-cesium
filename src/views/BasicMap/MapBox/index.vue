<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="btn-container">
      <el-radio-group v-model="radio" @change="changeMap">
        <el-radio label="1" size="large">影像地图</el-radio>
        <el-radio label="2" size="large">街道地图</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const radio = ref('1');
    let viewer = null;

    const initMap = () => {
      viewer = new Cesium.Viewer('map', {
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url:
            'https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A'
        })
      });
    };

    const changeMap = (mapIndex) => {
      viewer.imageryLayers.removeAll(true); //删除所有底图
      let imageryProvider;
      switch (mapIndex) {
        case '1':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A'
          });
          break;
        case '2':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://api.mapbox.com/styles/v1/marsgis/cki0a0ire3jvh19r92vwfau1e/tiles/512/{z}/{x}/{y}@2x?access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A'
          });
          break;
      }
      viewer.imageryLayers.addImageryProvider(imageryProvider);
    };

    onMounted(() => {
      initMap();
    });
    return { radio, viewer, changeMap };
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
#map {
  width: 100%;
  height: 100%;
}
// 隐藏版本信息
:deep(.cesium-viewer-bottom) {
  display: none;
}
.btn-container {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
