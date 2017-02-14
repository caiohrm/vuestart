import VueRouter from 'vue-router'

import Vue from 'vue'
import Auth from './components/auth/Auth.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [ {
    path: '/auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        component: Login,
        meta: {requiredGuest: true}
      },
      {
        path: 'register',
        component: Register,
        meta: {requiredGuest: true}
      }
    ]
  }]
})

export default router
