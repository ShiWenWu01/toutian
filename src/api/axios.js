import axios from 'axios'
// 加入axios 默认配置
// `headers` 是即将被发送的自定义请求头
// headers: {'X-Requested-With': 'XMLHttpRequest'},
var instance = axios.create({

  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // 设置基准地址
  // 页面发请求时才会去拿token
  // 初始化时拿不到token 所以说初始化时不要拿
  // 把token拿过来放在请求头中
//   headers: {
//     // Bearer 后面有一个空格 parse 转json  固定格式 必须加Bearer空格
//     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
//   }
})
// 拦截器
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
//   config 请求配置对象
// 修改config
  const user = window.sessionStorage.getItem('toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
    }
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  //   创建promise对象的方式 new Promise() 结果可能成功可能失败
  // Promise.resolve () 创建一个一定成功的对象
  // Promise.reject() 创建一个一定失败的对象
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((response) => {
  // console.log(response)
  // 这是规定写法 不用动
  return response
}, (error) => {
  // console.log(error)
  if (error.response.status === 401) {
    // hash 是location提供获取操作 地址栏的#后的地址的属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
