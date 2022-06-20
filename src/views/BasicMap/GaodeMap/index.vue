<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="btn-container">
      <el-radio-group v-model="radio" @change="changeMap">
        <el-radio label="1" size="large">卫星底图</el-radio>
        <el-radio label="2" size="large">电子街道</el-radio>
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
            'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
        })
      });
      //标注
      let imageryProvider = new Cesium.UrlTemplateImageryProvider({
        url:
          'https://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
      });
      viewer.imageryLayers.addImageryProvider(imageryProvider);
    };

    const changeMap = (mapIndex) => {
      viewer.imageryLayers.removeAll(true); //删除所有底图
      let imageryProvider;
      switch (mapIndex) {
        case '1':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
          });
          break;
        case '2':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
          });
          break;
      }
      viewer.imageryLayers.addImageryProvider(imageryProvider);
      if (mapIndex === '1') {
        imageryProvider = new Cesium.UrlTemplateImageryProvider({
          url:
            'https://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
        });
        viewer.imageryLayers.addImageryProvider(imageryProvider);
      }
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
