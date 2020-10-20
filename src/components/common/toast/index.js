import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // console.log('---------------')

  // 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 根据组件构造器，创建一个组件对象
  const toast = new toastConstructor()

  // 将组件对象手动挂载到某个元素
  toast.$mount(document.createElement('div'))

  // 此时toast.$el就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
