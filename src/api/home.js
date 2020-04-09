import {instance} from '@/utils/request.js'

function getUserInfo(params){ //登录请求
    return instance({
        url:process.env.VUE_APP_URL+'/info',
        method:'get',
        params,
    })
}

export {getUserInfo}