<template>
  <div class="allSelect">
      <!-- 单选框 -->
      <div v-if="form.type==1"> 
          <div v-for="(item, index) in form.select_options" :key="index" class="item">
          <!-- el-radio中,label才是它的值(其他复选框,下拉框,文本框,都是value才是值哦) -->
         <el-radio v-model="form.single_select_answer" :label="item.label" @change="selectChange">{{item.label}}</el-radio>
         <el-input v-model="item.text" class="setwidth"></el-input>

         <!-- <uploadFile :value="item.image" @input="uploadSuccess"></uploadFile> -->
         <uploadFile v-model="item.image"></uploadFile>
      </div>
      </div>
      <!-- 复选框 -->
       <div v-else-if="form.type==2"> 
          <div v-for="(item, index) in form.select_options" :key="index" class="item">
          <!-- el-radio中,label才是它的值(其他复选框,下拉框,文本框,都是value才是值哦) -->
         <el-checkbox v-model="form.multiple_select_answer" :label="item.label"  @change="selectChange">{{item.label}}</el-checkbox>
         <el-input v-model="item.text" class="setwidth"></el-input>

            <!-- <uploadFile :value="item.image" @input="uploadSuccess"></uploadFile> -->
         <uploadFile v-model="item.image"></uploadFile>
        </div>
      </div>
      <!-- 文本域 简答区-->
      <div v-else>
          <el-input type="textarea" v-model="form.short_answer" rows="10"  @change="selectChange"></el-input>
      </div>
  </div>
</template>

<script>
import uploadFile from './uploadFile.vue'
export default {
    props:['form'],
    components:{
        uploadFile,//上传的组件
    },
    methods: {
        uploadSuccess(res){
            console.log(res);
        },
        //父组件的change事件触发验证消除提醒
        selectChange(){
            this.$emit('change');
        }
    },
}
</script>

<style lang="less">
.allSelect{
    padding-top: 50px;

    .el-input__inner{
        border-color:#dcdfe6;
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .setwidth{
        width: 476px;
    }
}
</style>