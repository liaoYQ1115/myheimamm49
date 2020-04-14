import {instance} from '@/utils/request.js'

function getSubjectData(params) { //学科列表数据
    return instance({
        url: '/subject/list',
        method: 'get',
        params, 
    })
}


function setSubjectStatus(data) { //更改状态
    return instance({
        url: '/subject/status',
        method: 'post',
        data,
    })
}

function delSubjectData(data) { //删除学科
    return instance({
        url: '/subject/remove',
        method: 'post',
        data,
    })
}

function addSubjectData(data) { //新增学科
    return instance({
        url: '/subject/add',
        method: 'post',
        data,
    })
}

function editSubjectData(data) { //编辑学科
    return instance({
        url: "/subject/edit",
        method: "post",
        data      //data: data   
    })
}
export { getSubjectData,setSubjectStatus,delSubjectData,addSubjectData,editSubjectData }