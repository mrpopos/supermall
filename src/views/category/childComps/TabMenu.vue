<template>
  <scroll class="content">
    <div class="cate-menu">
    <div class="cate-menu-item" 
        @click="cateClick(index)"
        :class="{isActive:currentIndex === index}" 
        v-for="(item, index) in cateMenu" 
        :key="'catemenu'+index">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'TabMenu',
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    cateClick(index) {
      this.currentIndex = index
      // 获取maitKey
      // console.log(this.cateMenu[index].maitKey)
      const maitKey = this.cateMenu[index].maitKey
      // 发出一个点击事件
      this.$emit('getSubCategory', maitKey)

    }
  },
  props: {
    cateMenu: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .cate-menu {
    width: 90px;
    background-color: #eeeeee;
    text-align: center;
  }
  .cate-menu-item {
    height: 45px;
    width: 100%;
    line-height: 45px;
    color: rgba(102, 102, 102, .9);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 14px;
    border-radius: 4px;
  }
  .isActive {
    background-color: #fff;
    border-left: 4px solid var(--color-tint);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>