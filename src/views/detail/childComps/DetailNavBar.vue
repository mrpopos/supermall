<template>
  <div class="detail">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <span 
        v-for="(item, index) in detailTittle" 
        :key="'detailTittle'+index"
        @click="titleItemClick(index)"
        :class="{ isActive: index == currentIndex}">{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  props: {
    detailTittle: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 监听title点击事件
    titleItemClick(index) {
      // 设置currentIndex
      this.currentIndex = index

      // 发送点击事件
      this.$emit('titleItemClick', index)
    },
    // 返回上一页
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .center {
    display: flex;
  }
  .center span {
    flex: 1;
  }
  .isActive {
    color: var(--color-high-text);
  }
  .left {
    height: 100%;
  }
  .left img {
    height: 50%;
    vertical-align: middle;
  }
</style>