<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.image" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommends {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    margin-top: 8px;
    border-bottom: 8px solid #eeeeee;
    padding-bottom: 8px;
  }
  .recommend-item img {
    width: 80px;
    height: 80px;
    padding-bottom: 8px;
  }
  .recommend-item {
    flex: 1;
  }
</style>