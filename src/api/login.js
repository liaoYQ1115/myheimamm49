import {instance} from '@/utils/request.js'

function toLogin(data){ //登录请求
    return instance({
        url:process.env.VUE_APP_URL+'/login',
        method:'post',
        data,
    })
}

export {toLogin}