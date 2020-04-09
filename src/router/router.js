import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由
import login from '../view/login/login.vue' //导入登录页
import layout from '@/view/home/layout.vue' //导入首页

Vue.use(VueRouter); //注册路由

//实例化路由
let router = new VueRouter({
    routes:[
        {
            path:'/',
            component:login
        },
        {
            path:'/home',
            component:layout
        }
    ]
  })

//输出路由
export default router