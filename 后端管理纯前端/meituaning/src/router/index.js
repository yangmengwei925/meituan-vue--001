import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login/login'
import index from '@/page/index/index'
import home from '@/page/home/home'
import order from '@/page/order/order'
import preferen from '@/page/preferen/preferen'
import variety from '@/page/variety/variety'
import addto from '@/page/addto/addto'
import classify from '@/page/classify/classify'
import addpre from '@/page/addpre/addpre'
// 修改优选
import editpre from '@/page/editpre/editpre'
// 评价管理
import message from '@/page/message/message'
// 营销管理
import marketing from '@/page/marketing/marketing.vue'
// 数据分析
import analysis from '@/page/analysis/analysis.vue'

Vue.use(Router)

const router =   new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/index',
      name:'index',
      component:index,
      //重定向
      redirect:'/home',
      //二级路由
      children:[
          {
          path:'/home',
          name:'home',
          component:home
          },
          {
          path:'/order',
          name:'order',
          component:order
          },
          {
          path:'/preferen',
          name:'preferen',
          component:preferen
          },
          {
          path:'/variety',
          name:'variety',
          component:variety
          },
          {
          path:'/addto',
          name:'addto',
          component:addto
          },
          {
          path:'/addpre',
          name:'addpre',
          component:addpre
          },
          // 修改为你优选
          {
          path:'/editpre',
          name:'editpre',
          component:editpre
          },
          {
          path:'/classify',
          name:'classify',
          component:classify
          },
          {
          path:'/message',
          name:'message',
          component:message
          },
          {
          path:'/marketing',
          name:'marketing',
          component:marketing
          },
          {
          path:'/analysis',
          name:'analysis',
          component:analysis
          }
      ]
    },

  ]
})

// 导航守卫
// router.beforeEach((to, from, next) =>{
//   // console.log(to)
//   let openid = localStorage.getItem("openid")
//   if(openid){
//       // 如果用户信息存在则往下执行。
//       next()
//     }else{
//         //如果用户信息不存在则跳转到login页面
//         if (to.path === '/') {
//            next()
//        } else {
//            next('/')
//        }
//    }
// })


export default router
