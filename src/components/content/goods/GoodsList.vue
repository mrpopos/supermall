<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.link" :goods-item="item" class="goods-item"/>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name: 'GoodsList',
  components:{
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
  
<style scoped>
  .goods {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    /* align-items: center; */
  }
  .goods-item {
    width: 45%;
  }
</style>