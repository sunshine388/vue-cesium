<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    let viewer = null;
    const initMap = () => {
      viewer = new Cesium.Viewer('map', {
        terrainProvider: new Cesium.ArcGISTiledElevationTerrainProvider({
          url:
            'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
        }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url:
            'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
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
