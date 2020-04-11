import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
//注册vuex
Vue.use(Vuex)

//实例化
const store = new Vuex.Store({
    state:{
        userInfo:'',
    }
})

//输出
export default store