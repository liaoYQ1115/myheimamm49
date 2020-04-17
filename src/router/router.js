import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由
import login from '../view/login/login.vue' //导入登录页
import layout from '@/view/home/layout.vue' //导入首页

// 以下导入导航列表
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'

Vue.use(VueRouter); //注册路由

//实例化路由
let router = new VueRouter({
    routes:[
        {
            path:'/',
            component:login,
            meta:{
                title:'登录',
                rules:['超级管理员','管理员','老师','学生'],
            },
        },
        {
            path:'/home',
            redirect:'/home/subject',//重定向到这里
            component:layout,
            children:[
                {
                    path:'chart',
                    component:chart,
                    meta:{
                        title:'数据概览',
                        rules:['超级管理员','管理员','老师'],
                        icon:'el-icon-pie-chart',
                    },
                },
                {
                    path:'userList',
                    component:userList,
                    meta:{
                        title:'用户列表',
                        rules:['超级管理员','管理员'],
                        icon:'el-icon-user',
                    },
                },
                {
                    path:'question',
                    component:question,
                    meta:{
                        title:'题库列表',
                        rules:['超级管理员','管理员','老师'],
                        icon:'el-icon-edit-outline',
                    },
                },
                {
                    path:'business',
                    component:business,
                    meta:{
                        title:'企业列表',
                        rules:['超级管理员','管理员','老师'],
                        icon:'el-icon-office-building',
                    },
                },
                {
                    path:'subject',
                    component:subject,
                    meta:{
                        title:'学科列表',
                        rules:['超级管理员','管理员','老师','学生'],
                        icon:'el-icon-notebook-2',
                    },
                },
            ]
        }
    ]
  })

  //导入nprogress进度条插件
  import  Nprogress from 'nprogress'
  import 'nprogress/nprogress.css'
  import store from '@/store/index.js'
  import { removeToken} from "@/utils/token.js";
  import { Message } from 'element-ui';
//路由拦截
router.beforeEach((to, from, next) => {
    
    Nprogress.start();
   
    if (to.meta.rules.includes(store.state.role)) {
        next()
    }else {
        // 弹出提示
        Message.warning("您无权访问该页面！")
        // 清除token
        removeToken()
        next("/")
    }
      
 })
 router.afterEach((to) => {
    Nprogress.done() //进度条
    document.title=to.meta.title //to就相当于当前的$route

})
  //如果next直接写死跳某地址如next("/")而没有next()它会形成了一个死循环，如从/到/它又走到了beforeEach里，又开始执行beforeEach,到了beforeEach又是从/到/形成死微循环,只有next()它就不会再跑到beforeEach里面来

  //to到哪去，需要进入的路由的基本信息   要去的路由的$route
    //from从哪来，来的那个路由的基本信息  从哪来的路由的$route
    //next() 给不给你过，给过就是next(),
    //不给过他可以把你换到另一个地方  next("可以写一个path把你甩到任意地方去，这里的next相当于一个$router.push后面控制 了）

//输出路由
export default router