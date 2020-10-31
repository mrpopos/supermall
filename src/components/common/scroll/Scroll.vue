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
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    setTimeout(this._initScroll, 20)
  },
  methods: {
    _initScroll() {
      if(!this.$refs.wrapper) return
      // 创建scroll实例
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
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
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('刷新次数')
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh, 2000)
    },
    categories() {
      setTimeout(this.refresh, 1000)
    }
  }
}
</script>

<style scoped>

</style>