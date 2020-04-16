import {instance} from '@/utils/request.js'

function getUserList(params) { //用户列表数据
    return instance({
        url: '/user/list',
        method: 'get',
        params, 
    })
}


function setstatus(data) { //用户状态修改
    return instance({
        url: '/user/status',
        method: 'post',
        data, 
    })
}

function delUserData(data) { //删除用户
    return instance({
        url: '/user/remove',
        method: 'post',
        data, 
    })
}

function addUserData(data) { //新增用户
    return instance({
        url: '/user/add',
        method: 'post',
        data, 
    })
}

function editUserData(data) { //编辑用户
    return instance({
        url: '/user/edit',
        method: 'post',
        data, 
    })
}

export {getUserList,setstatus,delUserData,addUserData,editUserData}