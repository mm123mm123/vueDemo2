<template>
  <el-table
    :data="articleList"
    :fit=true
    :border=true
  >
    <el-table-column
      prop="id"
      label="序号"
      min-width="10%">
    </el-table-column>
    <el-table-column
      prop="content"
      label="文章"
      min-width="50%">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      min-width="30%">
    </el-table-column>
    <el-table-column
      label="管理"
      min-width="10%">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Layout from '../components/Layout'

export default {
  components: {Layout},
  methods: {
    handleClick (row) {
      console.log(row)
    },
    getArticleList () {
      this.$store.dispatch('getArticleList').then(() => {
        this.articleList = this.$store.getters.articleList
      })
    }
  },
  created () {
    this.getArticleList()
  },
  data () {
    return {
      articleList: []
    }
  },
}
</script>
