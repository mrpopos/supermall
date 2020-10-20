<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">
        <h3>购物车({{cartShopNum}})</h3>
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list>
        <cart-list-item v-for="(item, index) in cartList" :key="'cartlistitem'+index" :cart-item="item"></cart-list-item>
      </cart-list>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from 'views/cart/childComps/CartList'
import CartListItem from 'views/cart/childComps/CartListItem'
import CartBottomBar from 'views/cart/childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    CartListItem,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartShopNum', 'cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
  .content {
    height: calc(100% - 137px);
    position: fixed;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 49px;
    overflow: hidden;
  }

</style>
