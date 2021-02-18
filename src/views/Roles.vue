<template>
  <div>
    <el-table
      :data="roleTable"
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
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色"
        min-width="15%">
      </el-table-column>
      <el-table-column
        label="用户"
        min-width="20%"
        align="center">
        <template v-slot:default="slotProp">
          <div v-for="user in slotProp.row.users">
            {{ user.nickname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="权限菜单"
        min-width="30%"
        align="center">
        <template v-slot:default="slotProp">
          <div v-if="slotProp.row.menus.length===0">
            <el-tag>全部</el-tag>
          </div>
          <div v-else v-for="item in slotProp.row.menus" class="tagGroupWrapper">
            <div class="tag-group">
              <span class="tag-group__title">{{ item.menuName }}</span>
              <el-tag
                v-for="permission in item.permissions"
                :key="permission.permissionId"
                color="#ecf5ff">
                {{ permission.permissionName }}
              </el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="管理"
        min-width="20%">
        <template v-slot:default="slotProp">
          <el-button type="text" @click='buttonClick($event,slotProp)'
                     v-if="userPermissionList.includes('role:update') && slotProp.row.menus.length!==0">
            编辑
          </el-button>
          <delete-button :success="()=>{deleteRole(slotProp)}"
                         v-if="userPermissionList.includes('role:delete') && slotProp.row.menus.length!==0">

          </delete-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限菜单">
          <el-checkbox-group v-model="checkedMenuItem"
                             v-for="(item,index) in allPermissionList"
                             :key="index">
            <el-checkbox-button :label="item.menuName">
              {{ item.menuName }}
            </el-checkbox-button>
            <div class="checkboxWrapper">
              <el-checkbox v-for="(right) in item.permissions" :key="right.id"
                           :label="right.id" @change="selectedRight(arguments,item.menuName)">
                {{ right.permissionName }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <span class="description">说明：列表是对应菜单内的必选项</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;submitRequest(dialogStatus)">确 定</el-button>
      </div>
    </el-dialog>
    <div class="createButtonWrapper">
      <el-button @click='buttonClick($event)' style="display: block" v-if="userPermissionList.includes('role:add')">
        新增角色
      </el-button>
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
      roleTable: [],
      roleForm: {
        roleName: '',
        roleId: '',
        permissions: '',
      },
      dialogTitle: '',
      dialogStatus: '',
      dialogFormVisible: false,
      checkedMenuItem: [],
      allPermissionList: [],
      form: {
        permissions: [],
        roleId: '',
        roleName: ''
      },
      selectedButtonName: '',
      clickNumbers: 0,
      userPermissionList: [],
      loadingText: '',
      loading: true
    }
  },
  created() {
    this.getRoleTable()
    this.getPermissionList()
    this.userPermissionList = this.$store.getters.userPermissionList
  },
  watch: {
    dialogFormVisible() {
      if (this.dialogFormVisible === false) {
        this.resetForm()
      }
    }
  },
  methods: {
    getRoleTable() {
      this.$store.dispatch('getRoleTable')
        .then(data => this.$store.commit('setRoleTable', data))
        .then(() => {
          this.roleTable = this.$store.getters.roleTable
          if (!this.roleTable) {
            this.loadingText = '暂无数据'
          }
        })
    },
    getPermissionList() {
      this.$store.dispatch('getAllPermissionList')
        .then(data => this.$store.commit('setAllPermissionList', data))
        .then(() => this.allPermissionList = this.$store.getters.allPermissionList)
        .then(() => this.loading = false)
    },
    buttonClick(event, prop) {
      if (event.target.innerText === '新增角色') {
        this.dialogFormVisible = true
        this.dialogStatus = 'create'
        this.dialogTitle = '新增角色'
      } else if (event.target.innerText === '编辑') {
        this.dialogFormVisible = true
        this.dialogStatus = 'edit'
        this.dialogTitle = '编辑'
        this.form.roleName = prop.row.roleName
        this.form.roleId = prop.row.roleId
        for (const menuItem of prop.row.menus) {
          for (const permission of menuItem.permissions) {
            this.checkedMenuItem.push(permission.permissionId)
            this.form.permissions.push(permission.permissionId)
          }
        }
        this.isMenuSelected()
      }
    },
    submitRequest(dialogStatus) {
      if (dialogStatus === 'create') {
        this.$store.dispatch('addRole',
          {
            roleInfo: this.form,
            success: () => {
              this.getRoleTable()
            },
            fail: (err) => this.$message({type: 'info', message: err})
          })
      } else {
        this.$store.dispatch('updateRole',
          {
            roleInfo: this.form,
            success: () => {
              this.getRoleTable()
            },
            fail: (err) => this.$message({type: 'info', message: err})
          })
      }
    },
    selectedRight(data, checkedMenuItemName) {
      const rightId = parseInt(data[1].target.defaultValue)
      if (data[0] === true) {
        this.form.permissions.push(rightId)
        this.checkedMenuItem.push(checkedMenuItemName)
      } else {
        const rightIndex = this.form.permissions.indexOf(rightId)
        const menuItemIndex = this.checkedMenuItem.indexOf(checkedMenuItemName)
        this.form.permissions.splice(rightIndex, 1)
        if (menuItemIndex !== -1) {
          this.checkedMenuItem.splice(menuItemIndex, 1)
        }
      }
    },
    resetForm() {
      this.checkedMenuItem = []
      this.form = {
        permissions: [],
        roleId: '',
        roleName: ''
      }
    },
    isMenuSelected() {
      const copyCheckedMenuItem = this.checkedMenuItem.map(item => Math.floor(item / 100))
      if (copyCheckedMenuItem.indexOf(1) >= 0) {
        for (const index of copyCheckedMenuItem.filter(x => x === 1)) {
          this.checkedMenuItem.push('文章管理')
        }
      }
      if (copyCheckedMenuItem.indexOf(6) >= 0) {
        for (const index of copyCheckedMenuItem.filter(x => x === 6)) {
          this.checkedMenuItem.push('用户')
        }
      }
      if (copyCheckedMenuItem.indexOf(7) >= 0) {
        for (const index of copyCheckedMenuItem.filter(x => x === 7)) {
          this.checkedMenuItem.push('角色权限')
        }
      }
    },
    deleteRole(prop) {
      this.form.roleId = prop.row.roleId
      this.$store.dispatch('deleteRole',
        {
          roleInfo: this.form,
          success: () => {
            this.getRoleTable()
          },
          fail: (err) => this.$message({type: 'info', message: err})
        })
    }
  }
}
</script>


<style lang="scss">
.el-checkbox-button:first-child .el-checkbox-button__inner {
  padding: 0;
  margin: 0;
  min-width: 60px;
  line-height: 35px;
  border: none;
  border-radius: 2px;
}
</style>

<style lang="scss" scoped>
.tagGroupWrapper {
  .tag-group {
    text-align: left;
    width: 300px;
    margin: 0 auto;

    .tag-group__title {
      display: inline-block;
      width: 60px;
    }

    .el-tag {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  }
}

.createButtonWrapper {
  button {
    background: #f5f5f5;
    margin: 20px auto 0
  }
}

.el-dialog {
  .el-checkbox-group {
    display: flex;
    align-items: center;

    .checkboxWrapper {
      display: flex;

      .el-checkbox {
        display: block;
        margin-right: 0;
        margin-left: 10px;
      }
    }
  }
}

.description {
  font-size: 12px;
  margin-left: 80px;
  color: #9a9284
}

</style>
