<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="btn-container">
      <el-radio-group v-model="radio" @change="changeMap">
        <el-radio label="1" size="large">卫星底图</el-radio>
        <el-radio label="2" size="large">电子街道</el-radio>
        <el-radio label="3" size="large">蓝色底图</el-radio>
        <el-radio label="4" size="large">灰色底图</el-radio>
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
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url:
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        })
      });
    };

    const changeMap = (mapIndex) => {
      viewer.imageryLayers.removeAll(true); //删除所有底图
      let imageryProvider;
      switch (mapIndex) {
        case '1':
          imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
            url:
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
          });
          break;
        case '2':
          imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
            url:
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
          });
          break;
        case '3':
          imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
            url:
              'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
          });
          break;
        case '4':
          imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
            url:
              'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer'
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
