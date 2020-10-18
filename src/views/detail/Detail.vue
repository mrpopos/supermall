<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" :detailTittle="['商品', '参数', '评论', '推荐']"/>
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 商品基础信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情信息 -->
      <detail-goods-info :detail-info="detailImage" @infoImageLoad="infoImageLoad"/>
      <!-- 商品属性信息 -->
      <detail-param-info :param-info="paramInfo"/>
      <!-- 用户评论信息 -->
      <detail-comment-info :comment-info="commentInfo"/>
      <!-- 商品推荐信息 -->
      <detail-recommend-info :recommend-list="recommendList"/>
    </scroll>
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

import Scroll from 'components/common/scroll/Scroll'

import { getDetailInfo, Goods, Shop, GoodsParam, getRecommendInfo } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
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
      recommendList: []
    }
  },
  methods: {
    infoImageLoad() {
      // console.log('-----------')
      this.$refs.scroll.refresh()
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
      console.log(res)
      this.recommendList = res.data.list
    })
  }
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
    height: calc(100% - 44px);
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