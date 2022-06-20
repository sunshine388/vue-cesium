<template>
  <el-menu
    class="el-menu-vertical-demo"
    router
    :collapse="menuToggle"
    :default-active="currentPath"
  >
    <template v-for="item in routesList" :key="item.path">
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.label }}</span>
        </template>
        <el-menu-item
          v-for="subItem in item.children"
          :key="subItem.path"
          :index="subItem.path"
        >
          <!-- <el-icon><component :is="subItem.meta.icon"></component></el-icon> -->
          <template #title>{{ subItem.meta.label }}</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>{{ item.meta.label }}</template>
      </el-menu-item>
    </template>
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

    const routesList = computed(() => {
      return filtterRoutes(routes);
    });

    const filtterRoutes = (routes, path = '') => {
      let result = [];
      routes.forEach((item, index) => {
        item.path = path + item.path;
        if (item.children && item.children.length > 0) {
          const children = filtterRoutes(item.children, item.path + '/');
          const currentRoutes = { ...item };
          currentRoutes.children = children;
          result.push(currentRoutes);
        } else {
          result.push(item);
        }
      });
      return result;
    };

    function menuToggleAction() {
      emit('update:menuToggle', !menuToggle.value);
    }
    return { routesList, currentPath, menuToggleAction };
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
