import axios from 'axios'

import { Message } from 'element-ui';//message单独引用

//创建axios实例
var instance = axios.create({
    baseURL: 'http://127.0.0.1/heimamm/public', //设置基地址
    withCredentials: true, //跨域照样协带cookie
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // return response;
    if(response.data.code==200){
        return response.data; //拿axios里面的data
    }else{
        Message.error(response.data.message)
        return Promise.reject('error');
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


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