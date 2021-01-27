import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/components/Layout'
import Article from '@/views/Article'
import User from '@/views/User'
import Rights from '@/views/Rights'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children: [
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
          path: 'rights',
          name: 'Rights',
          component: Rights
        }
      ]
    }
  ]
})
