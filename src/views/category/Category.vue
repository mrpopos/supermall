<template>
  <div id="category">
    <nav-bar class="cate-nav">
      <h3 slot="center">商品分类</h3>
    </nav-bar>
    <div class="cate-body">
      <tab-menu :cate-menu="cateMenu" @getSubCategory="getSubCategory"></tab-menu>

      <scroll class="cate-sub">
        <sub-cate-menu :sub-cate="subCate"></sub-cate-menu>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabMenu from 'views/category/childComps/TabMenu'
import SubCateMenu from 'views/category/childComps/SubCateMenu'

import { getCategoryData, getSubCategoryData } from 'network/category'

export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
    SubCateMenu,
    Scroll
  },
  data() {
    return {
      category: {},
      cateMenu: [],
      subCate: [],
      defaultMaitKey: null
    }
  },
  methods: {
    // 获取子分类数据
    getSubCategory(maitKey) {
      // console.log(maitKey)
      getSubCategoryData(maitKey).then(res => {
        // console.log(res.data.list)
        this.subCate = res.data.list
      })
    }
  },
  created() {
    // 获取分类菜单数据
    getCategoryData().then(res => {
      // console.log(res)
      this.category = res
      this.cateMenu = res.data.category.list
      const defaultMaitKey = res.data.category.list[0].maitKey
      // console.log(defaultMaitKey)
      getSubCategoryData(defaultMaitKey).then(res => {
        // console.log(res.data.list)
        this.subCate = res.data.list
      })
    })
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .cate-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .cate-body {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .cate-sub {
    position: absolute;
    left: 90px;
    right: 0;
    top: 0;
    overflow: hidden;
    height: calc(100vh - 93px);
  }
</style>
