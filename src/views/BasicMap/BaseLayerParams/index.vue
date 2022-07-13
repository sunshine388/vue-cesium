<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="btn-container">
      <span>alpha：{{ alpha }}</span>
      <el-slider
        v-model="alpha"
        :step="0.02"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
      ></el-slider>

      <span>nightAlpha：{{ nightAlpha }}</span>
      <el-slider
        v-model="nightAlpha"
        :step="0.02"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
      ></el-slider>
      <span>dayAlpha：{{ dayAlpha }}</span>
      <el-slider
        v-model="dayAlpha"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
        :step="0.02"
      ></el-slider>
      <span>brightness：{{ brightness }}</span>
      <el-slider
        v-model="brightness"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
        :step="0.02"
      ></el-slider>
      <span>contrast：{{ contrast }}</span>
      <el-slider
        v-model="contrast"
        :step="0.02"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
      ></el-slider>

      <span>hue：{{ hue }}</span>
      <el-slider
        v-model="hue"
        :step="0.02"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
      ></el-slider>

      <span>saturation：{{ saturation }}</span>
      <el-slider
        v-model="saturation"
        :step="0.02"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
      ></el-slider>

      <span>gamma：{{ gamma }}</span>
      <el-slider
        v-model="gamma"
        :step="0.02"
        :show-tooltip="true"
        @input="valueChange"
        :min="0"
        :max="1"
      ></el-slider>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    let alpha = ref(1);
    let nightAlpha = ref(1);
    let dayAlpha = ref(1);
    let brightness = ref(1);
    let contrast = ref(1);
    let hue = ref(0.1);
    let saturation = ref(1);
    let gamma = ref(0.24);

    let viewer = null;
    let baseLayer = null;

    const initMap = () => {
      viewer = new Cesium.Viewer('map', {
        infoBox: false,
        selectionIndicator: false,
        navigation: false,
        animation: true,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        shouldAnimate: true,
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url:
            'https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        })
      });
      viewer.animation.container.style.visibility = 'hidden'; // 不显示动画控件
      baseLayer = viewer.imageryLayers.get(0);
      valueChange();
    };
    const setView = () => {
      let flyToOpts = {
        destination: {
          x: -1234238.2731085536,
          y: 5017976.951284946,
          z: 3736561.3310439447
        },
        orientation: {
          heading: 0.03750236711900712,
          pitch: -1.3903850542685938,
          roll: 0.0012991953125274236
        },
        duration: 1
      };
      viewer.scene.camera.flyTo(flyToOpts);
    };
    const valueChange = () => {
      baseLayer.alpha = alpha.value;
      baseLayer.nightAlpha = nightAlpha.value;
      baseLayer.dayAlpha = dayAlpha.value;
      baseLayer.brightness = brightness.value;
      baseLayer.contrast = contrast.value;
      baseLayer.hue = hue.value;
      baseLayer.saturation = saturation.value;
      baseLayer.gamma = gamma.value;
    };
    onMounted(() => {
      initMap();
      setView();
    });
    return {
      alpha,
      nightAlpha,
      dayAlpha,
      brightness,
      contrast,
      hue,
      saturation,
      gamma,
      viewer,
      baseLayer,
      valueChange
    };
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
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid rgba(128, 128, 128, 0.5);
  color: #ffffff;
  background: rgba(0, 0, 0, 0.4);
  width: 300px;
}
</style>
