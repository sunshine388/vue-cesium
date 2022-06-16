<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    const initMap = () => {
      // 文档 https://www.vvpstk.com/public/Cesium/Documentation/Cesium3DTileset.html
      // eslint-disable-next-line
      const viewer = new Cesium.Viewer('map');

      // eslint-disable-next-line
      const tileset = new Cesium.Cesium3DTileset({
        url: '/Cesium/3DTiles/tileset.json'
      });

      viewer.scene.primitives.add(tileset);

      // 获取将在加载tileset的根瓦片并准备渲染tileset时解析的约定，此约定在帧的末尾解析，然后在第一个帧中渲染tileset。
      tileset.readyPromise
        .then(function(tileset) {
          viewer.zoomTo(
            tileset, //通过 new Cesium3DTileset 创建的图像，使相机聚焦图像位置
            // eslint-disable-next-line
            new Cesium.HeadingPitchRange( //旋转缩放配置，默认为0不做旋转缩放
              0.0,
              -0.5, //Z轴旋转角度
              tileset.boundingSphere.radius * 2.0 //设置显示距离
            )
          );
        })
        .catch(function(error) {
          console.log(error);
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
