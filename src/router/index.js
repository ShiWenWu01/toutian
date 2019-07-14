import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '../views/login/index.vue'

import Welcome from '../views/welcome'

import Home from '../views/home'

import Notfound from '../views/404'

import Article from '../views/article'

import Image from '../views/image'

import Publish from '../views/publish'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish }
      ] },
    // 路径能走到这个位置，证明没有任何程序去处理这个路径
    // *就是匹配不到上面路径时 就走* 这个路径
    { path: '*', name: '404', component: Notfound }
  ]
})

// 注册全局的前置导航守卫
// 去任何一个页面都会触发这个钩子
router.beforeEach((to, from, next) => {
  // 如果不去主动触发 resolve  ( next 下一步) 会一直出于等待
  // 如果是登录页就放行  参数 to 看文档
  if (to.path === '/login') return next()
  // 在这可以判断登录状态
  const user = window.sessionStorage.getItem('toutiao')
  if (user) {
    next()
  } else {
    next('/login')
  }
  // 简写
  // const user = window.sessionStorage.getItem('toutiao')
  // 不是登录页并且没有拿到用户信息  应该去 登录页
  // 否则正常跳转
  // if (to.path !== '/login' && !user) return next('/login')
  // next()
})
export default router
