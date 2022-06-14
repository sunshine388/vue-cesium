<template>
  <div id="map"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    const initMap = () => {
      // eslint-disable-next-line
      const viewer = new Cesium.Viewer('map', {});
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
</style>
