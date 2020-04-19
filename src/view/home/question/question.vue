<template>
  <div class="question">
    <!-- 顶部部分 -->
    <el-card>
      <el-form :model="form" label-width="80px" ref="form">
        <el-row>
          <!-- 第一行 -->
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select placeholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(item, index) in subjectData"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select placeholder="请选择阶段" v-model="form.step">
                <el-option :label="value" :value="key" v-for="(value,key,index) in stepObj" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item, index) in businessData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
                <el-option label="简答" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 第二行 -->
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择学科" v-model="form.difficulty">
                <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select placeholder="请选择状态" v-model="form.status">
                <el-option value="1" label="启用"></el-option>
                <el-option value="0" label="禁用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 第三行 -->
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 底部部分 -->
    <el-card class="list">
      <!-- 列表 -->
      <el-table :data="tableData" :border="true">
        <el-table-column label="序号">
          <template slot-scope="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status==0?'禁用':'启用'}}</template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <!-- 编辑编辑的是整行数据 -->
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status==1?'info':'success'" @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- 分页 -->
        <div class="pagination">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
    </div>
    </el-card>
    <addQuestion ref="addQuestion" 
    :stepObj="stepObj"
    :typeObj="typeObj" 
    :subjectData="subjectData" 
    :businessData="businessData"
    :difficultyObj="difficultyObj"
    :mode="mode"
    ></addQuestion>
  </div>
</template>

<script>
import { getSubjectData } from "@/api/subject.js";
import { getBusinessDate } from "@/api/business.js";
import { getQuestionDate,setQuestionStatus,delQuestionDate } from "@/api/question.js";
import addQuestion from './addQuestion.vue'
export default {
  components:{
    addQuestion,
  },
  data() {
    return {
      mode:'add',
      form: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        type: "", //题型
        difficulty: "", //难度
        username: "", //作者
        status: "", //状态
        create_date: "", //日期
        title: "" //标题
        
      },
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段 字符串
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj:{ 1: "简单", 2: "一般", 3: "困难" },//难度
      subjectData: [], //学科列表数据
      businessData: [], //企业列表
      tableData: [],//题目列表
      pagination:{ //分页
          currentPage:1,//当前页
          pageSize:3,//页容量
          total:10,//总条数

      }
    };
  },
  created() {
    //获取题库列表
    this.getData();
    //获取学科列表
    getSubjectData({ limit: 1000 }).then(res => {
      console.log("学科列表啦", res);
      this.subjectData = res.data.items;
    });
    //获取企业列表
    getBusinessDate({ limit: 1000 }).then(res => {
      console.log("企业列表啦", res);
      this.businessData = res.data.items;
    });
  },
  methods: {
    //删除
    del(id){
        delQuestionDate({id:id}).then(()=>{
          this.$message.success('删除成功');
          this.search();
          // console.log(res);
        })
    },
     //修改状态
    setStatus(id){
        setQuestionStatus({id:id}).then(()=>{
          this.$message.success('修改成功');
          this.getData();
        })
    },
    //删除功能
    edit(row){
      console.log('整行数据',row);
      this.mode='edit';
      this.$refs.addQuestion.form=JSON.parse(JSON.stringify(row));
      this.$refs.addQuestion.dialogVisible=true;
    },
    //新增弹框
    add(){
      this.mode='add';
      //清空表单
      this.$refs.addQuestion.form={
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
      this.$refs.addQuestion.dialogVisible=true;
    },
     //清除功能
     reset(){
        this.$refs.form.resetFields();
        this.search();
     },
    //获取题库列表
     getData() {
        let _query = {
          page:this.pagination.currentPage,//页码
          limit:this.pagination.pageSize,//页容量
          ...this.form,
        }

      getQuestionDate(_query).then(res => {
        console.log("题目列表", res);
        this.tableData = res.data.items;
        this.pagination.total=res.data.pagination.total;
        this.tableData.forEach(item=>{
          item.city=item.city.split(','); //级联渲染需要的是数组 字符串转数组
          item.multiple_select_answer=item.multiple_select_answer.split(',');
        })

      });
    },
    //搜索按钮
    search() {
      this.pagination.currentPage=1;
       this.getData(); 
    },
    handleSizeChange(size) { // 页容量改变
        console.log(`每页 ${size} 条`);
        this.pagination.pageSize=size;
      },
      handleCurrentChange(page) { //当前页改变
        console.log(`当前页: ${page}`);
        this.pagination.currentPage=page;


      },
  }
};
</script>

<style lang="less">
.question {
  .list {
    margin-top: 18px;
  }
   .pagination{
    margin-top:10px;
    text-align: center;
  }
}
</style>