<template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
           <slot></slot>
        </el-breadcrumb-item>
      </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less"  scoped>

</style>
