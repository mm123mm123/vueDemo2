<template>
  <el-button type="text" @click="open">删除</el-button>
</template>

<script>
export default {
  name: 'deleteButton',
  props: {
    success:Function
  },
  methods: {
    open () {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.success)
        this.success()
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
