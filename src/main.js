// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './routes.js'
import VueResource from 'vue-resource'
import Auth from './plugins/Auth.js'

Vue.use(VueResource)
Vue.use(Auth)

Vue.http.interceptors.push(function (request, next) {
  if (request.url[0] === '/') {
    request.url = process.env.API + request.url
    next()
  }
})

// configure route guards
Router.beforeEach(function (to, from, next) {
  // prevent access to 'requiredGuest' routes
  if (to.matched.some(function (record) { return record.meta.requiredGuest }) && Vue.auth.loggedIn()) {
    next({
      path: '/newsfeed'
    })
  } else {
    next() // make sure to always call next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  template: '<App/>',
  components: { App }
})
