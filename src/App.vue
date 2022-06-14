<template>
  <el-container>
    <el-aside width="auto">
      <Navbar :menuToggle="menuToggle" />
    </el-aside>
    <el-container>
      <el-header>
        <Header v-model:menuToggle="menuToggle" />
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Header,
    Navbar
  },

  setup() {
    let menuToggle = ref(false);
    return {
      menuToggle
    };
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0px;
}
</style>
