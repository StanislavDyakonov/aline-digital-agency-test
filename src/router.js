import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('./views/Calculator.vue')
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: () => import('./views/Websocket.vue')
    }
  ]
})
