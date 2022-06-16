<template>
  <div class="map-container">
    <div id="map"></div>
    <div id="toolbar">
      <div>Height</div>
      <input
        type="range"
        min="-100.0"
        max="100.0"
        step="1"
        data-bind="value: height, valueUpdate: 'input'"
      />
      <input type="text" size="5" data-bind="value: height" />
    </div>
  </div>
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

      viewer.scene.globe.depthTestAgainstTerrain = true;

      // 声明viewModel
      const viewModel = {
        height: 0
      };

      // 监听viewModel中的属性
      // eslint-disable-next-line
      Cesium.knockout.track(viewModel);

      // 将viewModel中的对象与html进行绑定
      const toolbar = document.getElementById('toolbar');
      // eslint-disable-next-line
      Cesium.knockout.applyBindings(viewModel, toolbar);

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

      // 监听控件值得变化
      // eslint-disable-next-line
      Cesium.knockout
        .getObservable(viewModel, 'height')
        .subscribe(function(height) {
          height = Number(height);
          if (isNaN(height)) {
            return;
          }
          // 获取瓦片中心点的原始坐标和拉伸后坐标
          // 计算中心点位置
          // eslint-disable-next-line
          const cartographic = Cesium.Cartographic.fromCartesian(
            tileset.boundingSphere.center
          );
          // 计算中心点位置的地表坐标
          // eslint-disable-next-line
          const surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
          );
          // 偏移后的坐标
          // eslint-disable-next-line
          const offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            height
          );
          // 计算两个笛卡尔分量差(偏移量)
          // eslint-disable-next-line
          const translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            // eslint-disable-next-line
            new Cesium.Cartesian3()
          );
          // 建立转换矩阵, 偏移3D tiles
          // eslint-disable-next-line
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        });
    };

    onMounted(() => {
      initMap();
    });
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
#toolbar {
  color: #fff;
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
