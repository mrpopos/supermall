<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
#tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  font-size: 14px;
  background: #cccccc;
  /* line-height: 49px; */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.05);
  display: flex;
}
</style>
