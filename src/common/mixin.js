import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      topShow: false
    }
  },
  methods: {
    // 点击返回顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}