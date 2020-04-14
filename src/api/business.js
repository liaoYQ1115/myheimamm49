import {instance} from '@/utils/request.js'

function getBusinessDate(params){ //退出接口
    return instance({
        url:'/enterprise/list',
        method:'get',
        params,
    })
}

function addBusinessDate(data){ //新增企业
    return instance({
        url:'/enterprise/add',
        method:'post',
        data,
    })
}

function delBusinessDate(data){ //删除
    return instance({
        url:'/enterprise/remove',
        method:'post',
        data,
    })
}

function setBusinessStatus(data){ //更改状态
    return instance({
        url:'/enterprise/status',
        method:'post',
        data,
    })
}


function editBusinessData(data){ //编辑请求
    return instance({
        url:'/enterprise/edit',
        method:'post',
        data,
    })
}

export {getBusinessDate,addBusinessDate,delBusinessDate,setBusinessStatus,editBusinessData}