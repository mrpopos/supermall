<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h2 slot="center">购物街</h2>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend :recommends="recommends"/>
    <home-feature/>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @controlClick="controlClick"/>
    <goods-list :goods="goodsData"/>

    <ul>
      <li>测试数据1</li>
      <li>测试数据2</li>
      <li>测试数据3</li>
      <li>测试数据4</li>
      <li>测试数据5</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import HomeRecommend from 'views/home/childComps/HomeRecommend'
import HomeFeature from 'views/home/childComps/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoodsdata } from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop'
    }
  },
  created() {
    // 请求swiper、navbar、recommend数据
    this.getHomeMultidata()
    // 请求流行、新款、热卖商品数据
    this.getHomeGoodsdata('pop')
    this.getHomeGoodsdata('new')
    this.getHomeGoodsdata('sell')
  },
  computed: {
    goodsData() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoodsdata(type) {
      const page = this.goods[type].page + 1
      getHomeGoodsdata(type, page).then(res => {
        console.log(res)
        // 保存数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    /**
     * 事件监听相关方法
     */
    controlClick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #ffffff;
    z-index: 9;
  }
</style>
