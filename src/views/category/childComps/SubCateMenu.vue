<template>
  <div class="sub-cate">
    <sub-cate>
      <sub-cate-item v-for="(item, index) in subCate" :key="'catemenu'+index" :detail-cate="item"></sub-cate-item>
    </sub-cate>
  </div>
</template>

<script>
import SubCate from 'components/common/subCate/SubCate'
import SubCateItem from 'components/common/subCate/SubCateItem'

export default {
  name: 'SubCateMenu',
  components: {
    SubCate,
    SubCateItem
  },
  props: {
    subCate: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>