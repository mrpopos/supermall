<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="selectAllBtn" :is-checked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{totalNum}})</span>
  </div>
</template>

<script>
  import CheckButton from 'views/cart/childComps/CheckButton'

import { mapGetters } from 'vuex'

	export default {
		name: "CartBottomBar",
    components: {
		  CheckButton
    },
    data() {
      return {
        isSelectAll: false
      }
    },
    computed: {
      ...mapGetters(['cartShopNum', 'cartList']),
      // 总价
		  totalPrice() {
        return this.cartList.filter(item => {
          return item.isChecked
          }).reduce((prev, cur)=> {
            return prev + cur.price*cur.count
            }, 0)
      },
      // 商品总量
      totalNum() {
        return this.cartList.filter(item => {
          return item.isChecked == true
        }).reduce((prev, cur) => {
          return prev + cur.count
        }, 0)
      }
    },
    methods: {
      selectAllBtn() {
        this.cartList.map(item=>item.isChecked = !this.isSelectAll)
        this.isSelectAll = !this.isSelectAll
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
