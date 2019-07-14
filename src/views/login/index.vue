<template>
  <div class="login-app">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
       <!-- this.$refs[formName] 获取dom 哪一个DOm  -->
      <el-form   ref="loginForm" status-icon  :model="loginForm" :rules="loginRules" >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- code和mobile都是后端有的要提交的数据 这边绑定可以提交 -->
          <el-input  v-model="loginForm.code" placeholder="验证码" style="width:300px"></el-input>
          <el-button style=" float : right">验证码</el-button>
        </el-form-item>
        <el-form-item>
           <el-checkbox v-model="isCheck"></el-checkbox> 我以阅读并同意
        </el-form-item>
        <el-form-item>
           <el-button @click="login()" style="width:100%;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 具体的校验逻辑
      // test方法 （value  是客服输入的电话号码）
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号格式'))
      }
    }
    return {
      isCheck: true,
      // 表单对象的对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        // 使用自定义效验必须使用一个约定好的函数  约定好：参数和返回值约定
        // 自定义效验定义在 return之前
        // 参数 rule 检验规则对象, value 值, callback 成功或失败的回电函数
        // 然后在规则中使用 validator 指定函数即可
        // callback()不传值为成功   callback(new Error（'必须年满18岁提示信息'）);为失败
        mobile: [
          // validator 自定义检验:    validatePass 自定义校验函数
          // required必填 trigger实施欧触发 blur失去焦点时触发
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, message: '请输入正确的手机号', trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码必须是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 整体表单校验
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     // 校验成功 进行登录
      //     // 里面需要传参 mobile 和 code  所以直接传loginForm
      //     this.$http.post(
      //       'authorizations',
      //       this.loginForm
      //     )
      //       .then(res => {
      //       // res 是响应对象 不是响应数据 包含响应数据 里面有数据
      //         const data = res.data // data 就是响应数据 status 响应
      //         console.log(data)
      //         // 1 登录成功后跳转到首页
      //         // 2 保持登录状态
      //         //  保存登录后返回的用户信息 包含 token
      //         //  使用 sessionStorage 储存 ：关闭浏览器会失效
      //         // 当你关闭浏览器时 会话状态会结束
      //         // 设置 必须是key  value的形式
      //         // key可以自己去约定
      //         // setItem 是sessionStorage 提供的api 专门用来存储数据的
      //         // res.data 是所有数据.data 这是用户信息
      //         // 这只是先存起来 后面才会用
      //         window.sessionStorage.setItem('toutiao', JSON.stringify(res.data.data))
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 人家ui以写好的直接复制
      //         this.$message.error('错了哦，这是一条错误消息')
      //       })
      //   }
      // })
      // js  语法  可以处理异常 try{ 代码  async await}  catch(err) { 失败}
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('错了哦，这是一条错误消息')
          }
        }
      })
    }
  }
}
</script>

<style lang='less'>
.login-app {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/ cover;
  position: absolute;
  top: 0px;
  left: 0px;
  .box-card {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 150px;
      margin: 10px auto 30px;
    }
  }
}
</style>
