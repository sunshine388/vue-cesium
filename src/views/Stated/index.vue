<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    const initMap = () => {
      const viewer = new Cesium.Viewer('map', {
        geocoder: false, // 查找位置工具
        homeButton: false, // 视角返回初始位置
        sceneModePicker: false, // 选择视角的模式。2d,3d,哥伦布视图(CV)
        baseLayerPicker: false, // 图层选择器，选择要显示的地图服务和地形服务
        navigationHelpButton: false, // 导航帮助按钮
        animation: false, // 动画器件，控制动画播放速度
        timeline: false, //时间线，指当前时间，并允许用户跳到指定时间
        fullscreenButton: false, // 全屏按钮
        vrButton: false // 用于切换vr模式的单按钮小部件
      });
    };

    onMounted(() => {
      initMap();
    });
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
// 隐藏版本信息
:deep(.cesium-viewer-bottom) {
  display: none;
}
</style>
