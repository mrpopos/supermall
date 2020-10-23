<template>
  <div class="sub-cate">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SubCate'
}
</script>

<style scoped>
  .sub-cate {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
</style>