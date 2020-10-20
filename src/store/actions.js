import { ADD_SHOP_COUNT, ADD_SHOP_ONLY} from './mutation-types'

export default {
  addCartData({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let goodsStatu = state.cartList.find(item => item.iid === payload.iid)

      if(goodsStatu) {
        commit(ADD_SHOP_COUNT, goodsStatu)
        resolve('商品数量加1')
      }else {
        commit(ADD_SHOP_ONLY, payload)
        resolve('仅仅添加商品')
      }
    })
  }
}
