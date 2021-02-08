<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu :router="true">
        <el-menu-item v-if="menuList.indexOf('article')>=0" index='article' :route="{name: 'Article'}">
          文章
        </el-menu-item>
        <el-submenu index="2" v-if="menuList.includes('user') || menuList.includes('user')">
          <template slot="title">
            <i class="el-icon-menu"></i>
            用户权限
          </template>
          <el-menu-item-group>
            <el-menu-item index="user" :route="{name: 'User'}" v-if="menuList.includes('user')">
              用户列表
            </el-menu-item>
            <el-menu-item index="role" :route="{name: 'Role'}" v-if="menuList.includes('role')">
              权限管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu split-button="true">
            <el-dropdown-item @click.native="toHome($route)">Home</el-dropdown-item>
            <el-dropdown-item @click.native="logOut()">LogOut</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ userName }}</span>
      </el-header>

      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {childrenRoutes, router} from '../router'
import {api} from '../utils/ajax'
import {store} from '../store'

export default {
  data () {
    return {
      userName: '',
      userList: [],
      menuList: [],
    }
  },
  created () {
    store.dispatch('getInfo').then(() => {
        this.userName = this.$store.getters.userNickName
        this.menuList = this.$store.getters.userMenuList
        this.menuList.forEach((menuItem) => {
          childrenRoutes.forEach((route) => {
              if (route.path === menuItem) {
                router.addRoute('Layout', route)
              }
            }
          )
        })
      }
    )
  },
  methods: {
    toHome (route) {
      if (route.fullPath !== '/layout') {
        router.push('/layout')
      }
    },
    logOut () {
      api('POST', 'login/logout')
      router.push('/login')
    },
    isVisible (menuItemName) {
      console.log('v-if判断')
      const menuList = this.menuList
      if (menuList.length > 0) {
        if (menuItemName === 'permission' && menuList.indexOf('user') > 0 && menuList.indexOf('role') > 0) {
          return false
        }
        this.visible = menuList.indexOf(menuItemName) >= 0

      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-container {

  .el-aside {
    background-color: #FFF;

    .hidden {
      display: none;
    }
  }

  .el-container {
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
  }

}

</style>
