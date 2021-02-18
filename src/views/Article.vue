<template>
  <el-table
    :data="articleList"
    :fit=true
    :border=true
    :cell-style="{background:'#fff'}"
    v-loading="loading"
  >
    <template slot="empty">
      <p>{{ loadingText }}</p>
    </template>
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
      <template v-slot:default="slotProps">
        <el-button type="text" size="small" @click="edit(slotProps)"
                   v-if="userPermissionList.includes('article:update')">编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Layout from '../components/Layout'
import {api} from '../utils/ajax'

export default {
  components: {Layout},
  data() {
    return {
      articleList: [],
      editRes: {
        id: '',
        content: ''
      },
      userPermissionList: [],
      loadingText: '',
      loading: true
    }
  },

  created() {
    this.getArticleList()
    this.userPermissionList = this.$store.getters.userPermissionList
  },
  methods: {
    getArticleList() {
      this.$store.dispatch('getArticleList').then(() => {
        this.articleList = this.$store.getters.articleList
        if (!this.articleList) {
          this.loadingText = '暂无数据'
        }
        this.loading = false
      })
    },
    edit(slotProps) {
      this.$prompt('请修改标题', '提示', {
        inputValue: slotProps.row.content,
        confirmButtonText: '修改',
        cancelButtonText: '取消',
      }).then(({value}) => {
        this.editRes.content = value
        this.editRes.id = slotProps.row.id
        this.updateArticle()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    updateArticle() {
      api('POST', '/article/updateArticle', this.editRes)
        .then(data => {
          if (data.code === '100') {
            this.getArticleList()
          } else {
            throw new Error(data.msg)
          }
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: err
          })
        })
    }
  }
}
</script>
