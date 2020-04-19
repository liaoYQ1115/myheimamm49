import {instance} from '@/utils/request.js'

function getQuestionDate(params){ //题库列表
    return instance({
        url:'/question/list',
        method:'get',
        params,
    })
}

function addQuestionDate(data){ //发布题目
    return instance({
        url:'/question/add',
        method:'post',
        data,
    })
}

function setQuestionStatus(data){ //状态更改
    return instance({
        url:'/question/status',
        method:'post',
        data,
    })
}

function delQuestionDate(data){ //删除题目
    return instance({
        url:'/question/remove',
        method:'post',
        data,
    })
}

function editQuestionDate(data){ //编辑接口
    return instance({
        url:'/question/edit',
        method:'post',
        data,
    })
}

export {getQuestionDate,addQuestionDate,setQuestionStatus,delQuestionDate,editQuestionDate} 