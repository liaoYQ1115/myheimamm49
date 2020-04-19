<template>
  <div class="chart">
      <el-card>
        <ul class="list">
          <li class="item">
            <div class="itemContent color1">{{info.increment_users}}</div>
            <p>今日新增用户</p>
          </li>
           <li class="item">
            <div class="itemContent color1">{{info.total_users}}</div>
            <p>总用户量</p>
          </li>
           <li class="item">
            <div class="itemContent color2">{{info.increment_questions}}</div>
            <p>新增试题</p>
          </li>
           <li class="item">
            <div class="itemContent color2">{{info.total_questions}}</div>
            <p>总试题量</p>
          </li>
           <li class="item">
            <div class="itemContent color3">{{info.total_done_questions}}</div>
            <p>总刷题量</p>
          </li>
           <li class="item">
            <div class="itemContent color3">{{info.personal_questions}}</div>
            <p>人均刷题量</p>
          </li>
        </ul>
      </el-card>
      <el-card class="setmargin">
          <div class="echarts" ref="echarts"></div>
      </el-card>
  </div>
</template>

<script>
import {getChartDate,getStatisticsDate} from '@/api/chart.js'
import echarts from 'echarts'
export default {
  data() {
    return {
      info:'',
    }
  },
    created() {
      //获取顶部数据
      getChartDate().then(res=>{
        // console.log(res);
        this.info=res.data;
      })
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.echarts);

       //获取饼图数据
      getStatisticsDate().then(res=>{
        console.log('饼图数据',res);
        //侧标题只要拿到元素
        let legendData =res.data.map((ele)=>{
          return ele.name;
        })

        let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
      legend: {
        orient: 'vertical',
        right: 10,
        data: legendData,
      },
      color:['#409eff','#f76137','#f9b358'],
      series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: res.data,
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}) 
  
},
}
</script>

<style lang="less">
.chart{
  .list{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  .color1{
    border:3px solid #0086FA;
    color:#0086FA;
  }
   .color2{
    border:3px solid #F76238;
    color:#F76238;
  }
   .color3{
    border:3px solid #55CD78;
    color:#55CD78;
  }
  .itemContent{
    border-radius: 50%;
    width: 99px;
    height: 99px;
    line-height: 99px;
  }
  }
  .setmargin{
    margin-top: 15px;
  }
  .echarts{
    width: 100%;
    height: 571px;
  }
}
</style>