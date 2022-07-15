<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="btn-container">
      <el-radio-group v-model="radio" @change="changeMap">
        <el-radio label="1" size="large">图片1</el-radio>
        <el-radio label="2" size="large">图片2</el-radio>
        <el-radio label="3" size="large">图片3</el-radio>
        <el-radio label="4" size="large">图片4</el-radio>
        <el-radio label="5" size="large">图片5</el-radio>
        <el-radio label="6" size="large">图片6</el-radio>
        <el-radio label="7" size="large">图片7</el-radio>
        <el-radio label="8" size="large">图片8</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import earth1 from '@/assets/images/earth1.jpg';
import earth2 from '@/assets/images/earth2.png';
import earth3 from '@/assets/images/earth3.jpg';
import earth4 from '@/assets/images/earth4.png';
import earth5 from '@/assets/images/earth5.jpg';
import earth6 from '@/assets/images/earth6.png';
import earth7 from '@/assets/images/earth7.gif';
import earth8 from '@/assets/images/earth8.png';

export default {
  setup() {
    const radio = ref('1');
    let viewer = null;

    const initMap = () => {
      viewer = new Cesium.Viewer('map', {
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: earth1
        })
      });
    };

    const changeMap = (mapIndex) => {
      viewer.imageryLayers.removeAll(true); //删除所有底图
      let url = null;
      switch (mapIndex) {
        case '1':
          url = earth1;
          break;
        case '2':
          url = earth2;
          break;
        case '3':
          url = earth3;
          break;
        case '4':
          url = earth4;
          break;
        case '5':
          url = earth5;
          break;
        case '6':
          url = earth6;
          break;
        case '7':
          url = earth7;
          break;
        case '8':
          url = earth8;
          break;
      }
      let imageryProvider = new Cesium.SingleTileImageryProvider({
        url: url
      });
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
