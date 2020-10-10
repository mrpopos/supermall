<template>
  <div>
    <h2>首页</h2>
    <h2>{{ $store.state.token }}</h2>

    <h2>{{ $store.state.counter }}</h2>
    <h2>{{ $store.getters.powerCounter }}</h2>
    <button @click="addition">自增</button>
    <button @click="subtraction">自减</button>

    <h5>{{ $store.state.info }}</h5>
    <button @click="modifyInfo">点击修改info信息</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    addition() {
      this.$store.commit('increment')
    },
    subtraction() {
      this.$store.commit('decrement')
    },
    modifyInfo() {
      // this.$store.commit('modifyInfoCommit')
      this.$store.dispatch('modifyInfoCommit', {
        payload: 'auth-token'
      })
    }
  }
}
</script>

<style></style>
