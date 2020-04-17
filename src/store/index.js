import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
//注册vuex
Vue.use(Vuex)

//实例化
const store = new Vuex.Store({
    state:{
        userInfo:'',
        roleObj: {  //共享的角色信息
            1:"超级管理员",
            2: "管理员",
            3: "老师",
            4: "学生"
        },
        role:'超级管理员',
    }
})

//输出
export default store