<template>
  <div>
    <el-table
      :data="userList"
      :fit=true
      :border=true
      :cell-style="{background:'#fff'}"
      v-loading="loading"
    >
      <template slot="empty">
        <p>{{ loadingText }}</p>
      </template>

      <el-table-column
        prop="roleId"
        label="序号"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="20%">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="最近修改时间"
        min-width="20%">
      </el-table-column>
      <el-table-column
        label="管理"
        min-width="10%" v-if="userPermissionList.includes('user:update') || userPermissionList.includes('user:delete')">
        <template v-slot:default="slotProps">
          <el-button type="text" @click="buttonClick($event,slotProps)"
                     v-if="userPermissionList.includes('user:update')">
            修改
          </el-button>
          <delete-button :success="()=>deleteUser(slotProps)"
                         v-if="userPermissionList.includes('user:update') && userNickName!==slotProps.row.nickname">

          </delete-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editUserInfo">
        <el-form-item label="用户名" label-width="120px" v-if="dialogStatus==='create'">
          <el-input v-model="editUserInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" v-if="dialogStatus==='create'">
          <el-input v-model="editUserInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" v-if="dialogStatus==='edit'">
          <el-input v-model="editUserInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="editUserInfo.roleId" placeholder="请选择活动区域">
            <el-option
              v-for="item in this.roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="editUserInfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;submitRequest(dialogStatus)">确 定</el-button>
      </div>
    </el-dialog>
    <div class="createButtonWrapper" v-if="userPermissionList.includes('user:add')">
      <el-button @click='buttonClick($event)' style="display: block">新增用户</el-button>
    </div>
  </div>
</template>
<script>
import Layout from '../components/Layout'
import DeleteButton from '../components/deleteButton'

export default {
  components: {DeleteButton, Layout},

  data() {
    return {
      userList: [],
      dialogTitle: '',
      dialogFormVisible: false,
      dialogStatus: 'create',
      editUserInfo: {
        nickname: '',
        password: '',
        roleId: '',
        username: '',
        userId: '',
        deleteStatus: '',
      },
      roles: [],
      userPermissionList: [],
      loading: false,
      loadingText: '',
      userNickName: ''
    }
  },
  created() {
    this.loading = true
    this.getUserList()
    this.getRoles()
    this.userPermissionList = this.$store.getters.userPermissionList
    this.userNickName = this.$store.getters.userNickName
  },
  methods: {
    getUserList() {
      this.$store.dispatch('getUserList')
        .then(() => {
          this.userList = this.$store.getters.userList
          if (!this.userList) {
            this.loadingText = '暂无数据'
          }
        })
    },
    getRoles() {
      this.$store.dispatch('getRoles')
        .then(data => this.$store.commit('setRoles', data))
        .then(() => this.roles = this.$store.getters.roles)
        .then(() => this.loading = false)
    },
    buttonClick(event, prop) {
      this.dialogFormVisible = true
      if (event.target.innerText === '新增用户') {
        this.dialogStatus = 'create'
        this.dialogTitle = '新增用户'
      } else if (event.target.innerText === '修改') {
        this.dialogStatus = 'edit'
        this.dialogTitle = '编辑信息'
        const selectedUser = JSON.parse(JSON.stringify(prop.row))
        Object.keys(selectedUser).map(key => {
          if (key in this.editUserInfo) {
            this.editUserInfo[key] = selectedUser[key]
          }
        })
      }
    },
    submitRequest(dialogStatus) {
      if (dialogStatus === 'create') {
        this.$store.dispatch('addUser',
          {
            userInfo: this.editUserInfo,
            success: this.getUserList,
            fail: (err) => this.$message({type: 'info', message: err})
          })
      } else {
        this.$store.dispatch('editUser',
          {
            editUserInfo: this.editUserInfo,
            success: this.getUserList,
            fail: (err) => this.$message({type: 'info', message: err})
          })
      }
    },
    resetUserInfo() {
      this.editUserInfo = {
        deleteStatus: '',
        nickname: '',
        password: '',
        roleId: '',
        userId: '',
        username: '',
      }
    },
    deleteUser(props) {
      this.editUserInfo = props.row
      this.editUserInfo.deleteStatus = '2'
      this.$store.dispatch('editUser',
        {
          editUserInfo: this.editUserInfo,
          success: this.getUserList,
          fail: (err) => this.$message({type: 'info', message: err})
        }
      )
    }
  },
  watch: {
    dialogFormVisible() {
      if (this.dialogFormVisible === false) {
        this.resetUserInfo()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.createButtonWrapper {
  button {
    background: #f5f5f5;
    margin: 20px auto 0
  }
}
</style>
