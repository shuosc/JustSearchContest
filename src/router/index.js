import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import Questions from '@/components/Questions'
import Login from '@/components/Login.vue'
import Information from '@/components/Information.vue'
import About from '@/components/About.vue'
import Center from '@/components/Center.vue'
import Rank from '@/components/Rank.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Questions',
      name: 'Questions',
      component: Questions
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }
  ]
})
