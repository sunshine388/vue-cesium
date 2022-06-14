<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="menuToggle"
    :default-active="currentPath"
  >
    <el-menu-item v-for="item in routes" :index="item.path" :key="item.path">
      <el-icon><setting /></el-icon>
      <template #title>{{ item.meta.label }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { toRefs, computed } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '@/router';

export default {
  props: {
    menuToggle: Boolean
  },
  emits: ['update:menuToggle'],
  setup(props, { emit }) {
    const { menuToggle } = toRefs(props);
    const route = useRoute();
    let currentPath = computed(() => {
      return route.path;
    });
    function menuToggleAction() {
      emit('update:menuToggle', !menuToggle.value);
    }
    return { routes, currentPath, menuToggleAction };
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
