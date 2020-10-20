import { ADD_SHOP_COUNT, ADD_SHOP_ONLY} from './mutation-types'

export default {
    [ADD_SHOP_COUNT](state, payload) {
      payload.count ++
    },
    [ADD_SHOP_ONLY](state, payload) {
      payload.isChecked = false
      payload.count = 1
      state.cartList.push(payload)
    }
  }