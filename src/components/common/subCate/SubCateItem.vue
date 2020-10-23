<template>
  <div class="sub-cate-item">
    <a :href="detailCate.link"><img :src="detailCate.image" alt=""></a>
    <p>{{detailCate.title}}</p>
  </div>
</template>

<script>
export default {
  name: 'SubCateItem',
  props: {
    detailCate: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .sub-cate-item {
    width: 33%;
    text-align: center;
    font-size: 12px;
    margin: 10px 0;
  }
  .sub-cate-item img {
    width: 70%;
  }.sub-cate-item p {
    margin-top: 10px;
  }
</style>