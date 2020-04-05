import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由
import login from '../view/login/login.vue' //导入登录页

Vue.use(VueRouter); //注册路由

//实例化路由
let router = new VueRouter({
    routes:[
        {
            path:'/',
            component:login
        }
    ]
  })

//输出路由
export default router