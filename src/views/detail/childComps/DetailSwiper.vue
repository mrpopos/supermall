<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="'topImage'+index">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {}
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
  //  console.log(this.itemInfo.topImages)
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 500px;
}
</style>