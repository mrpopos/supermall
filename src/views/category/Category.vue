<template>
  <div id="category">
    <!-- 导航页 -->
    <nav-bar class="nav-bar"><h3 slot="center">商品分类</h3></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

      <scroll  id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @controlClick="controlClick"></tab-control>
          <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl'

import TabMenu from 'views/category/childComps/TabMenu'
import TabContentCategory from 'views/category/childComps/TabContentCategory'
import TabContentDetail from 'views/category/childComps/TabContentDetail'

import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'

import { POP, SELL, NEW } from 'common/const'

export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    TabContentDetail
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: 'pop'
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 获取分类数据
        // console.log(res)
        this.categories = res.data.category.list
        // 初始化分类详情数据
        for(let i=0; i<this.categories.length; i++) {
          // console.log(i)
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
          this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      // 请求子分类数据
      getSubcategory(maitKey).then(res => {
        // console.log(res)
        this.categoryData[index].subCategories = res.data
        // console.log(this.categoryData)
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData)

        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    },
    // 监听TabControl的点击
    controlClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'sell'
          break;
        case 2:
          this.currentType = 'new'
          break;
      }
    }
  },
  created() {
    // 获取分类数据
    this._getCategory()
  },
  computed: {
    showSubcategory() {
		  if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subCategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
