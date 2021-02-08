import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/components/Layout'
import Article from '@/views/Article'
import User from '@/views/User'
import Roles from '@/views/Roles'
import {getToken} from '../utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
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
})
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
router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export {router,childrenRoutes}
