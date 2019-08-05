import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/home/Index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home'},
    {
      path: '/',
    
      component: Index,
      children:[
        {
          path: 'home',name: '首页',component: () => import('@/views/home/home')
        },
        {
          path: 'fitte',name: '拟合',component: () => import('@/views/home/fitte')
        },
        {
          path: 'imgtrain',name: '图片训练',component: () => import('@/views/home/imgtrain')
        },
        {
          path: 'crawler',name: '爬虫',component: () => import('@/views/home/crawler')
        },
        {
          path: 'labyrinth',name: '闯迷宫',component: () => import('@/views/home/labyrinth')
        },
        {
          path: 'test', name: '测试',component: () => import('@/views/home/test.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
   
  ],
})
