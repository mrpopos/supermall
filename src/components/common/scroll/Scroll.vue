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
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // 创建scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    // scroll实例监听scroll事件
    this.scroll.on('scroll', position => {
      // console.log(position);
      this.$emit('scroll', position)
    }),
    // 监听滚动上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('load more');
      this.$emit('pullingUp')

    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('刷新次数')
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>