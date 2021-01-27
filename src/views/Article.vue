<template>
    <el-table
      :data="tableData"
      :fit=true
      :border=true
    >
      <el-table-column
        prop="date"
        label="序号"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文章"
        min-width="50%">
      </el-table-column>
      <el-table-column
        prop="province"
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
    }
  },

  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  }
}
</script>
