<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu :router="true" :default-active="this.$route.name.toLowerCase()" text-color="#fff">
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
import {router} from '../router'
import {api} from '../utils/ajax'
import {removeToken} from '../utils/auth'

export default {
  data() {
    return {
      userName: '',
      userList: [],
      menuList: [],
    }
  },
  created() {
    this.userName = this.$store.getters.userNickName
    this.menuList = this.$store.getters.userMenuList
  },
  methods: {
    toHome(route) {
      if (route.fullPath !== '/layout') {
        router.push('/layout')
      }
    },
    logOut() {
      api('POST', 'login/logout').then(() => {
        removeToken()
        this.$store.commit('resetUser')
        router.push('/login')
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  .el-aside { //#2d90ff
    background-color: #202d3c;

    .el-menu {
      background-color: #202d3c;

      .el-menu-item-group {
        background-color: #202d3c;

        .el-menu-item-group__title {
          display: none;
        }
      }
    }

    .el-menu-item:hover {
      background-color: #243950;
    }


    .el-menu-item.is-active {
      background-color: #243950;
    }
  }


  .el-container {
    .el-header {
      background-color: #fff;
      color: #333;
      line-height: 60px;
    }
  }

}

</style>
<style lang="scss">
.el-submenu {
  .el-submenu__title:hover {
    background-color: #243950;
  }
}

.el-menu-item-group {
  .el-menu-item-group__title {
    display: none;
  }
}
</style>
