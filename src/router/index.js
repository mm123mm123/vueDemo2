import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/components/Layout'
import Article from '@/views/Article'
import User from '@/views/User'
import Roles from '@/views/Roles'
import {getToken} from '../utils/auth'
import {store} from '../store'

Vue.use(Router)


const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
  }
]
const childrenRoutes = [
  {
    path: 'article',
    name: 'Article',
    component: Article
  },
  {
    path: 'user',
    name: 'User',
    component: User
  },
  {
    path: 'role',
    name: 'Role',
    component: Roles
  }
]
let router = new Router({
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (store.getters.userMenuList.length === 0) {
      store.dispatch('getInfo').then(() => {
          store.getters.userMenuList.forEach((menuItem) => {
            childrenRoutes.forEach((route) => {
                if (route.path === menuItem) {
                  router.addRoute('Layout', route)
                }
              }
            )
          })
        }
      ).then(() => {
        next({...to, replace: true})
      })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      if (from.fullPath.indexOf('layout') >= 0) {
        router.matcher=new Router({
          routes: constantRoutes
        }).matcher
        next()
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
})
export {router, childrenRoutes}
