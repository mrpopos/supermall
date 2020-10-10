<template>
  <div id="app">
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/* 引入样式初始化文件 */
@import 'assets/css/base.css'
</style>
