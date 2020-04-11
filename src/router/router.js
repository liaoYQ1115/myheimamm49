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
                    },
                },
                {
                    path:'userList',
                    component:userList,
                    meta:{
                        title:'用户列表',
                    },
                },
                {
                    path:'question',
                    component:question,
                    meta:{
                        title:'题库列表',
                    },
                },
                {
                    path:'business',
                    component:business,
                    meta:{
                        title:'企业列表',
                    },
                },
                {
                    path:'subject',
                    component:subject,
                    meta:{
                        title:'学科列表',
                    },
                },
            ]
        }
    ]
  })

  //导入nprogress进度条插件
  import  Nprogress from 'nprogress'
  import 'nprogress/nprogress.css'

//路由拦截尝试
router.beforeEach((to, from, next) => {
    //路由进入前处理
    // console.log('去哪里',to);
    // console.log('哪里来的',from);
    //  if(to.fullPath=='/'){
    //      next('/home/userList')
    //  }else{
    //      next()
    //  }
    Nprogress.start()
    next()
      
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