// 注册所有主键在vue下
// 封装成插件的形式 vue.use(插件) 执行插件的配置对象中的install函数 且传入vue对象

// 导入自己封装的组件

import MyBread from '../components/my-bread.vue'

export default {

  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}

// 别忘了在manin.js 导入 并注册成全局
