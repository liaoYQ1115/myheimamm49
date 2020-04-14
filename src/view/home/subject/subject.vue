<template>
  <div class="subject">
    <!-- 顶部部分 -->
    <el-card>
      <el-form :model="form" label-width="90px" :inline="true" ref='form'>
        <el-form-item label="学科编号" prop="rid">
          <el-input class="setWidth" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部列表 -->
    <el-card class="setmargin">
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <!-- 自定义列模板的使用 -->
          <template slot-scope="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid"></el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <!-- 状态的操作不能直接prop -->
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1 ? '启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" prop="rid" width="270px">
          <template slot-scope="scope">
           <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="setStatus(scope.row.id)">{{scope.row.status==1 ? '禁用':'启用'}}</el-button>
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
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 新增的对话框 -->
    <addSubject ref="addSubject" :mode="mode"   @xdd="xxdd"></addSubject>
                              <!--props父组件给子组件传值 -->
  </div>
</template>

<script>
import { getSubjectData,setSubjectStatus,delSubjectData } from '@/api/subject.js'
import addSubject from './addSubject.vue'
export default {
  components:{
      addSubject,
  },
  data() {
    return {
      mode:'add',//对话框的属性值
      selectValue: "",
      form:{
        // 顶部表单的
        rid:'',//学科编号
        name:'',//学科名称
        username:'',//创建者
        status:'',//状态
      },
      tableData:[],//列表数据
      pagination:{ //分页数据
        pageSize:3, //当前每页多少条
        currentPage:1, //当前页
        total:40, //总页数
      }
    };
  },
  created() {
    //调用请求列表方法
      this.getData()
  },
  methods: {
    xxdd(){
      alert('恭喜发财');
    },
    //新增学科按钮
    add(){
      this.mode="add";//改变对话框
      this.$refs.addSubject.form={ //清空子组件的内容(编辑功能可能造成有内容)
        rid: "", //学科编号
        name:'', //学科名称
        short_name:'', //学科简称
        intro:'',//学科简介
        remark:'',//学科备注
      },
     this.$refs.addSubject.dialogFormVisible=true;
    },
    //编辑学科按钮
    edit(row){
        // console.log(row);
        this.mode="edit";
        //↓这里的表单和row的数据地址引用都是列表数据,所以要改变存储空间,把row对象改为字符串,再改回对象;
        this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
        this.$refs.addSubject.dialogFormVisible=true; //显示对话框
    },
    //删除按钮
    del(id){
        //对话框确认
        this.$confirm('确认删除该数据?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSubjectData({id:id}); //调用删除接口
          this.$message.success('删除成功')
          this.search();//更新列表
        })
    },
    //点击状态按钮
    setStatus(id){
        setSubjectStatus({id:id}).then(()=>{
          this.$message.success('修改状态成功');
          this.search();//刷新
        })
    },
    //清空搜索框
    reset(){
        this.$refs.form.resetFields();//重置表单
        //调用搜索
        this.search()
    },
      //搜索按钮
      search(){
        this.pagination.currentPage=1;//先回到第一页
        this.getData();//调用接口
      },

      //请求列表数据的方法封装
      getData(){
          let _params= {
          page:this.pagination.currentPage, //页码
          limit:this.pagination.pageSize,//页尺寸(每页多少条)

          ...this.form,
        }

        getSubjectData(_params).then(res=>{
          console.log(res);
          this.tableData=res.data.items; //列表数据保存
          this.pagination.total = res.data.pagination.total; //响应的总页数赋值给分页数据总页数
        })
      },

    //方法：size-change 修改页容量时的回调函数 ，该调函数有一个参数是当前值是每页多少条的值
    handleSizeChange(size){
        this.pagination.pageSize=size; //修改后的条数要给到pagination数据内进行更新
        this.pagination.currentPage=1; //优化,当用户选择的页容量当前没有那么多页的时候,自动去第一页
        this.getData()
    },
     //current-change：改变页码时的回调函数  ，该函数有一个参数是当前在多少页
     handleCurrentChange(page){
        this.pagination.currentPage = page;//改变了当前页码,也要把页码给到pagination的数据内
        this.getData()
     }
  },
};
</script>

<style lang="less">
.subject {
  .setWidth {
    width: 90px;
  }
  .setmargin {
    margin-top: 20px;
  }
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>