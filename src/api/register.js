import {instance} from '@/utils/request.js'

function getPhoneCode(data) {
    return instance({
        url: process.env.VUE_APP_URL + '/sendsms',
        method: 'post',
        data: data, //传入的data
    })
}

function register(data) {
    return instance({
        url: process.env.VUE_APP_URL + '/register',
        method: 'post',
        data

    })
}

export { getPhoneCode, register }