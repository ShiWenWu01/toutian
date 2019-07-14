<template>
  <div class="article-app">
    <!-- 筛选容器 俩个卡片-->
    <el-card>
      <div slot="header">
       <my-bread> 内容管理</my-bread>
      </div>
       <el-form :model="reqParams" size="small" label-width="80px">
        <!-- 多选框组 -->
        <!-- 状态 -->
        <!-- 啥 -->
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option v-for="item in chaannel" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间日期 -->
        <el-form-item label="时间：">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
            <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 、、、、、 -->
    <el-card>

    </el-card>
  </div>
  <!--老： 作用域插槽 拿数据时 那slot 绑定的名字  取出 scope.名字 -->
  <!-- 新：v-slot:插槽名字=‘scope(手机的所有自定义属性)’ 取出一样 -->
  <!-- 面包屑 导入 注册 -->
</template>
<script>
export default {
  data () {
    // ：label 绑定你所选status状态
    // 数据默认是'' 还是null的区别
    // '' 还是会传给后天的 null 字段就是不传
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdte: null,
        end_pubdate: null

      },
      chaannel: [{ name: 'java', id: 1 }],
      dataValues: []
    }
  },
  methods: {}
}
</script>

<style lang="less"  scoped>
.article-app {
  .el-card {
     margin-bottom: 30px;
  }
  width: 100%;
  height: 100%;
  background: url(../../assets/images/188.jpg) no-repeat center / cover;
}
</style>
