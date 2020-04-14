<template>
  <div class="business">
    <!-- 顶部部分 -->
    <el-card>
    <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="setWidth" v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="setWidth"  v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth"  v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="setWidth"  v-model="form.status">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
    </el-form>
    </el-card>
    <!-- 底部部分 -->
    <el-card class="setMargin">
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template slot-scope="scope">
            {{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="企业编号" prop="eid"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>

        <el-table-column label="状态" width="80px">
            <template slot-scope="scope">
              <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用' : '禁用'}}</div>  
            </template> 
        </el-table-column>

          <el-table-column label="操作" width="280px">
            <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)" :type="scope.row.status==1?'info':'success'">{{scope.row.status==0 ? '启用' : '禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <!-- 分页组件
        el-pagination
         current-page  当前页的默认值
         page-size   页容量的默认值
         page-sizes  页容量的选项
         layout你需要什么功能就在里面加什么
         total  总数显示
         size-change  页容量改变时的回调方法  该方法里有个size参数就是当前容量的值
         current-change 页码改变的回调函数  该方法里有个page参数就是当前页码的值
        -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[2, 3, 8, 10]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
    </div>
      

    </el-card>

    <addBusiness ref="addBusiness" :mode="farthermode"></addBusiness>
  </div>
</template>

<script>
import {getBusinessDate,delBusinessDate,setBusinessStatus} from '@/api/business.js'
import addBusiness from './addBusiness.vue' //导入对话框
export default {
  components:{
    addBusiness,
  },
    data(){
      return {
        form:{
          eid:'',//企业编号
          name:'',//企业名称
          username:'',//用户名
          status:'',//启用状态
        },
        tableData:[],//表格数据
        pagination:{
            currentPage:1,//当前页
            pageSize:2,//页容量
            total:10,//总条数
        },
        farthermode:'add',//复用框
      }
    },
    methods: {
      //编辑按钮(复用对话框)
      edit(row){
          this.farthermode='edit';
          this.$refs.addBusiness.form=JSON.parse(JSON.stringify(row)); //深克隆处理
          this.$refs.addBusiness.dialogVisible=true;//打开对话框

      },
      //更改状态
      setStatus(id){
        setBusinessStatus({id}).then(()=>{
            this.$message.success('状态修改成功');
            this.getData();
        })

      },
      //删除按钮
      del(id){
          this.$confirm('确定删除该项吗','友情提示',{
            confirmButtonText:'确定删除',
            cancelButtonText:'取消操作',
            type:'warning'
          }).then(()=>{
            delBusinessDate({id}).then(()=>{
              this.$message.success('删除成功');
              this.search();
            })
          })
      },
      //新增按钮
      add(){
        this.farthermode='add';
          this.$refs.addBusiness.form={
           eid:"",
           name:"",
           short_name:"",
           intro:"",
           remark:"",
      };
        this.$refs.addBusiness.dialogVisible=true;//打开对话框
      },
      //清空搜索框
      reset(){
        this.$refs.form.resetFields();
        this.search();
      },
      //搜索按钮
      search(){
        this.pagination.currentPage=1;//回到当前页
        this.getData();//调用请求
      },
      //请求渲染
      getData(){
        let _params = {
          page:this.pagination.currentPage,//页码
          limit:this.pagination.pageSize,//页容量
          ...this.form,
        }

         getBusinessDate(_params).then(res=>{
        this.tableData=res.data.items;//保存列表数据
        this.pagination.total=res.data.pagination.total;
        
        console.log('企业列表',res);
      })
      },
     handleSizeChange(size) { // 页容量改变
        // console.log(`每页 ${size} 条`);
        this.pagination.pageSize=size;
        this.search();//回到第一页,请求
      },
      handleCurrentChange(page) { //当前页改变
        // console.log(`当前页: ${page}`);
        this.pagination.currentPage=page;
        this.getData();//请求


      }
    },
    created() {
      this.getData();
    },
}
</script>

<style lang="less">
.business{
  .setWidth{
    width: 150px;
  }
  .setMargin{
    margin-top: 15px;
  }
  .pagination{
    margin-top:10px;
    text-align: center;
  }
  .cell{
    text-align: center;
  }
  .red{
    color:#FF3D3D;
  }
}

</style>