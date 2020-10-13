<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="'title' + index" class="control-item" :class="{active:index === currentIndex}"  @click="controlClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    controlClick(index) {
      console.log(index)
      this.currentIndex = index
      this.$emit('controlClick', index)
    }
  },
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control span {
    padding-bottom: 3px;
  }
  .control-item {
    flex: 1;
  }
  .active span {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
</style>