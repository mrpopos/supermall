<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // 创建scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //默认false，不能监听div的点击
      probeType: this.probeType
    }),
    // scroll实例监听scroll事件
    this.scroll.on('scroll', position => {
      // console.log(position);
      this.$emit('scroll', position)
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>

</style>