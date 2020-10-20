import { request } from './request'

export function getDetailInfo(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommendInfo() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services, detailInfo) {
    this.title = itemInfo.title
    this.desc = itemInfo.title
    this.price = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.lowNowPrice = itemInfo.lowNowPrice
    this.columns = columns
    this.services = services
    this.detailImage = detailInfo.detailImage
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
    this.services = shopInfo.services
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}