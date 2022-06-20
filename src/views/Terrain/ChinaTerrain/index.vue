<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    let viewer = null;
    const initMap = () => {
      // Cesium.Ion.defaultAccessToken =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZTdlMTJjMy1lNmFjLTQyYjQtODhhMC03MzUxNjU3NzliMjMiLCJpZCI6OTc4ODYsImlhdCI6MTY1NTQzMDUwNn0.7uBaTnOtf-2NBaPQ28zPyvA-E6crTfgWAtSC9XKi294';
      viewer = new Cesium.Viewer('map', {
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: Cesium.IonResource.fromAssetId(1),
          requestWaterMask: true, // 是否需要请求额外的水数据
          requestVertexNormals: true // 是否需要请求额外的光数据
        })
      });
      viewer.scene.globe.depthTestAgainstTerrain = false; //默认为false
      viewer.animation.container.style.visibility = 'hidden'; // 不显示动画控件
    };
    const setView = () => {
      let flyToOpts = {
        destination: {
          x: -1244121.9426581487,
          y: 5085439.458440664,
          z: 3654926.4730463736
        },
        orientation: {
          heading: 4.788047581496534,
          pitch: -0.4322797689024851,
          roll: 6.27971882399201
        },
        duration: 1
      };
      viewer.scene.camera.flyTo(flyToOpts);
    };

    onMounted(() => {
      initMap();
      setView();
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
