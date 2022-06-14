<template>
  <header class="header">
    <el-icon @click="menuToggleAction">
      <DArrowLeft v-if="!menuToggle" /><DArrowRight v-else />
    </el-icon>
    <span class="header-title">cesium三维</span>
  </header>
</template>

<script>
import { toRefs } from 'vue';

export default {
  props: {
    menuToggle: Boolean
  },
  emits: ['update:menuToggle'],
  setup(props, { emit }) {
    const { menuToggle } = toRefs(props);
    function menuToggleAction() {
      emit('update:menuToggle', !menuToggle.value);
    }
    return {
      menuToggleAction
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  .el-icon {
    margin: 18px 10px;
    float: left;
  }
}
</style>
