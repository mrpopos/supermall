<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" :detailTittle="['商品', '参数', '评论', '推荐']" @titleItemClick="titleItemClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 商品基础信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情信息 -->
      <detail-goods-info :detail-info="detailImage" @infoImageLoad="infoImageLoad"/>
      <!-- 商品属性信息 -->
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <!-- 用户评论信息 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <!-- 商品推荐信息 -->
      <detail-recommend-info :recommend-list="recommendList" ref="recommend"/>
    </scroll>
    <!-- 返回顶部 -->
        <back-top @click.native="backTopClick" v-show="topShow"/>
      <!-- 底部工具栏 -->
      <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
import DetailRecommendInfo from 'views/detail/childComps/DetailRecommendInfo'
import detailBottomBar from 'views/detail/childComps/detailBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import { getDetailInfo, Goods, Shop, GoodsParam, getRecommendInfo } from 'network/detail'
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'

export default {
  name: 'Detail',
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    detailBottomBar,
    Scroll
  },
  data() {
    return {
      iid: null,
      originData: {},
      topImages: [],
      goods: {},
      shop: {},
      detailImage: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themePositionY: [],
      getthemePositionY: null,
      currentIndex: 0
    }
  },
  methods: {
    infoImageLoad() {
      this.$refs.scroll.refresh()
      // 设置联动效果的positionY值
      this.getthemePositionY = debounce(() => {
        this.themePositionY = []
        this.themePositionY.push(0)
        this.themePositionY.push(this.$refs.params.$el.offsetTop-44)
        this.themePositionY.push(this.$refs.comment.$el.offsetTop)
        this.themePositionY.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themePositionY)
      }, 100)

      this.getthemePositionY()
      
    },
    // 设置navbar与详情页的联动效果
    titleItemClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themePositionY[index], 500)
    },
    // 设置详情页滚动显示对应的标题
    detailScroll(position) {
      // console.log(position)
      // 获取y值
      const positionY = -position.y

      // if(positionY>=0 && positionY<this.themePositionY[1]) {
      //   this.$refs.detailNav.currentIndex = 0
      // } else if(positionY>=this.themePositionY[1] && positionY<=this.themePositionY[2]) {
      //   this.$refs.detailNav.currentIndex = 1
      // } else if(positionY>=this.themePositionY[2] && positionY<=this.themePositionY[3]) {
      //   this.$refs.detailNav.currentIndex = 2
      // } else {
      //    this.$refs.detailNav.currentIndex = 3
      // }
      for(let i in this.themePositionY) {
        if(this.currentIndex !== i && ((i<this.themePositionY.length-1 && positionY>=this.themePositionY[parseInt(i)] && positionY<=this.themePositionY[parseInt(i)+1]) || (i==this.themePositionY.length-1 && positionY>=this.themePositionY[parseInt(i)]))) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }

      // 控制BackTop是否显示
      // console.log(position)
      this.topShow = (-position.y) > 1200
    },
    // 添加商品到购物车
    addToCart() {
      // console.log('------------')
      // 获取购物车需要展示的信息
      const cartShopInfo = {}
      cartShopInfo.image = this.topImages[0]
      cartShopInfo.title = this.goods.title
      cartShopInfo.desc = this.goods.desc
      cartShopInfo.price = this.goods.lowNowPrice
      cartShopInfo.iid = this.iid
      // 将商品信息添加到vuex中
      // console.log(this.$store.state.cartList[0])
      // this.$store.state.cartList.push(cartShopInfo) 不建议直接修改state
      this.$store.dispatch('addCartData', cartShopInfo).then(res => {
        // console.log(res)
        this.$toast.show(res, 1000)
      })
    }
  },
  created() {
    //获取query中商品的iid
    // console.log(this.$route.query.id)
    this.iid = this.$route.query.iid

    // 请求商品数据
    getDetailInfo(this.iid).then(res => {
      // console.log(res.result.itemInfo)
      this.originData = res
      // 保存轮播图数据
      this.topImages = res.result.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services, res.result.detailInfo)

      // 创建店铺信息
      this.shop = new Shop(res.result.shopInfo)

      // 获取商品详情信息
      this.detailImage = res.result.detailInfo

      // 获取商品参数信息
      this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)

      // 获取用户评价信息
      // console.log(res.result.rate.list[0])
      if(res.result.rate.cRate != 0) {
        this.commentInfo = res.result.rate.list[0]
      }
      
    }),
    // 获取商品推荐数据
    getRecommendInfo().then(res => {
      // console.log(res)
      this.recommendList = res.data.list
    })
  },
  updated() {}
}
</script>

<style scoped>
  .left {
    font-size: 18px;
  }
  .center {
    display: flex;
  }
  .center div {
    flex: 1;
    justify-content: space-around;
  }
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .detail-nav {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    background-color: #fff;
  }
</style>