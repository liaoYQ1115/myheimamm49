<template>
  <el-dialog class="addQuestion" :visible.sync="dialogVisible" :fullscreen="true">
    <dir slot="title" class="title">新增题库测试</dir>
    <el-form :model="form" class="form" :rules="rules" ref="form">
      <el-form-item label="学科" prop="subject">
        <el-select placeholder="请选择学科" v-model="form.subject" class="selwidth">
          <el-option
            v-for="(item, index) in subjectData"
            :key="index"
            :value="item.id"
            :label="item.name"
            v-show="item.status==1"
            width="100%"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select placeholder="请选择阶段" v-model="form.step" class="selwidth">
          <el-option :label="value" :value="+key" v-for="(value,key,index) in stepObj" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select placeholder="请选择企业" v-model="form.enterprise" class="selwidth">
          <el-option
            v-for="(item, index) in businessData"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
          <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(value,key, index) in typeObj" :key="index" :label="+key">{{value}}</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio v-for="(value,key, index) in difficultyObj" :key="index" :label="+key">{{value}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr>
      <el-form-item label="试题标题" prop="title" class="setMargin">
        <quillEditor v-model="form.title" :options="{placeholder:'请在这里输入...'}" @change="editorChange('title')"></quillEditor>
      </el-form-item>
      <el-form-item :label="typeObj[form.type]" :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]">
        <!-- 试题抽离到子组件 单选/多选/简答-->
        <allSelect :form="form" @change="allSelectChange"></allSelect>
      </el-form-item>
      <hr>
      <!-- 视频区域 -->
      <el-form-item label="解析视频" prop="video">
        <uploadFile v-model="form.video" type="video"></uploadFile>
      </el-form-item>
      <hr>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze" class="setMargin">
        <quillEditor v-model="form.answer_analyze" :options="{placeholder:'请在这里输入...'}" @change="editorChange('answer_analyze')"></quillEditor>
      </el-form-item>
      <!-- 试题备注 -->
       <hr>
      <el-form-item label="试题备注" prop="remark" >
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <dir slot="footer" class="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </dir>
  </el-dialog>
</template>

<script>

  import { regionData } from 'element-china-area-data'
  //导入富文本编辑器插件
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import allSelect from './allSelect.vue'
import uploadFile from './uploadFile.vue'
import {addQuestionDate,editQuestionDate} from '@/api/question.js'
export default {
  components:{
    quillEditor,//富文本
    allSelect,//试题区
    uploadFile,//上传视频
  },
  props: ["subjectData", "stepObj", "businessData",'typeObj','difficultyObj','mode'],
  data() {
    return {
      dialogVisible: false,
      options:regionData,//传值:城市数据
      rules:{
        subject:[{required:true,message:'请选择学科',trigger:'change'}],//学科
          step:[{required:true,message:'请选择阶段',trigger:'change'}],//阶段
          enterprise:[{required:true,message:'请选择企业',trigger:'change'}],//企业
          city:[{required:true,message:'请选择城市',trigger:'change'}],//城市
          type:[{required:true,message:'请选择题型',trigger:'change'}],//题型
          difficulty:[{required:true,message:'请选择难度',trigger:'change'}],//难度
          title:[{required:true,message:'请输入标题',trigger:'change'}],//题目
          single_select_answer:[{required:true,message:'请选择单选题答案',trigger:'change'}],//单选题答案
          multiple_select_answer:[{required:true,message:'请选择多选答案',trigger:'change'}],//复选框
          short_answer:[{required:true,message:'请输入简答题',trigger:'change'}],//简答题
          answer_analyze:[{required:true,message:'请输入答案解析',trigger:'change'}],//答案解析
          remark:[{required:true,message:'请输入试题备注',trigger:'change'}],//试题备注
      },
      form: {
          subject:'',//学科
          step:'',//阶段
          enterprise:'',//企业
          city:[],//城市
          type:1,//题型
          difficulty:1,//难度
          title:'',//题目
          single_select_answer:'',//单选题答案
          multiple_select_answer:[],//复选框
          short_answer:'',//简答题
          video:'',//视频
          answer_analyze:'',//答案解析
          remark:'',//试题备注
          select_options: [
        {
            "label": "A",
            "text": "狗不理",
            "image": ""
        },
        {
            "label": "B",
            "text": "猫不理",
             "image": ""
        },
        {
            "label": "C",
            "text": "麻花",
            "image": ""
        },
        {
            "label": "D",
            "text": "炸酱面",
            "image": ""
        }
   ]
    },
      
    };
  },
  watch:{
    'dialogVisible'(newV){
      if(newV==true){
        this.$nextTick(()=>{
          //清空表单
          this.$refs.form.clearValidate();
        })
      }
    }
  },
  methods: {
    //单选,多选,简答组件验证
    allSelectChange(){
      this.$refs.form.validateField([ //局部校验也可传数组
        'single_select_answer',
        'multiple_select_answer',
        'short_answer',
      ])
    },
    //富文本局部验证
    editorChange(str){
        this.$refs.form.validateField(str);
    },
    //点击确认提交
    submit(){
      // console.log(this.form.video); 一个一个项做出来打印一下
      this.$refs.form.validate(result=>{
        if(result){
          if(this.mode=='add'){
            addQuestionDate(this.form).then(()=>{
            this.$message.success('添加成功');
            //关闭弹窗
            this.dialogVisible=false;
            //刷新父组件数据
            this.$parent.search();
          })
          }else{
            //编辑接口需要的城市是字符串,所以也要转数组
            let _query = JSON.parse(JSON.stringify(this.form));
            _query.city = _query.city.join(',');

            editQuestionDate(_query).then((res)=>{
                console.log('提交编辑的数据',res);
              this.$message.success('编辑成功');
            //关闭弹窗
            this.dialogVisible=false;
            //刷新父组件数据
            this.$parent.search();
            })
          }
         
        }
      })
    }
  },
};
</script>

<style lang="less">
.addQuestion {
  .title {
    background-color: #119afa;
    color: #fff;
    height: 54px;
    line-height: 54px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .footer {
    text-align: center;
  }
  .form {
    width: 832px;
    margin: 0 auto;

    .setMargin{
    .el-form-item__content{
      margin-top:45px;
    }
  }
  }
  .selwidth{
      width: 364px;
  }
 
  
}
</style>