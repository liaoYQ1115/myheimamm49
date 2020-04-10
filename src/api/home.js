import {instance} from '@/utils/request.js'

function getUserInfo(params){ //登录请求
    return instance({
        url:process.env.VUE_APP_URL+'/info',
        method:'get',
        params,
    })
}

function exitLogin(){ //退出接口
    return instance({
        url:process.env.VUE_APP_URL+'/logout',
        method:'get',
    })
}
export {getUserInfo,exitLogin}