<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="btn-container">
      <el-radio-group v-model="radio" @change="changeMap">
        <el-radio label="1" size="large">卫星地图</el-radio>
        <el-radio label="2" size="large">电子地图</el-radio>
        <el-radio label="3" size="large">地形图</el-radio>
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
            'https://t5.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
        })
      });
      //默认添加注记图层
      viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            'https://t5.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
        })
      );
    };

    const changeMap = (mapIndex) => {
      viewer.imageryLayers.removeAll(true); //删除所有底图
      let imageryProvider;
      switch (mapIndex) {
        case '1':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://t5.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
          });
          break;
        case '2':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://t5.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
          });
          break;
        case '3':
          imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url:
              'https://t5.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
          });
          break;
      }
      viewer.imageryLayers.addImageryProvider(imageryProvider);
      //默认添加注记图层
      viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:
            'https://t5.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
        })
      );
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
