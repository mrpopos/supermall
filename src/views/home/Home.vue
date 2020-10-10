<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h2 slot="center">购物街</h2>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata } from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
  methods: {
    addition() {
      this.$store.commit('increment')
    },
    subtraction() {
      this.$store.commit('decrement')
    },
    modifyInfo() {
      this.$store.dispatch('modifyInfoCommit', {
        payload: 'auth-token'
      })
    }
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
