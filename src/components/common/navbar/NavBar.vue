<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
  }
  .left, .right {
    width: 60px;
    /* background-color: #f00; */
    text-align: center;
  }
  .center {
    flex: 1;
    /* background-color: #ff0; */
    text-align: center;
  }
</style>
