import {instance} from '@/utils/request.js'

function getChartDate(data){ //题库列表
    return instance({
        url:'/data/title',
        method:'post',
        data,
    })
}

function getStatisticsDate(data){ //题库列表
    return instance({
        url:'/data/statistics',
        method:'post',
        data,
    })
}

export {getChartDate,getStatisticsDate}