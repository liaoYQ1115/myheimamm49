<template>
  <div class="userList">
    <!-- 顶部搜索栏 -->
    <el-card>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部用户列表 -->
    <el-card class="list">
      <el-table :data="tableData">
        <el-table-column label="序号" width="100px">
          <template slot-scope="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="phone" width="120px"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role" width="100px"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status==1?'info':'success'"
              @click="changeStatus(scope.row.id)"
            >{{scope.row.status==0 ?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
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
          :page-sizes="[3, 5, 8, 10]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增对话框 -->
    <addUserList ref="addUserList" @shua="getData" :mode="mode"></addUserList>
  </div>
</template>

<script>
import { getUserList, setstatus, delUserData } from "@/api/userList.js";
import addUserList from './addUserList.vue'
export default {
  components:{
    addUserList,
  },
  data() {
    return {
      mode:'add',
      form: {
        username: "",
        email: "",
        role_id: ""
      },
      tableData: [], //表格数据
      pagination: {
        //分页功能
        pageSize: 3, //页容量
        currentPage: 1, //当前页
        total: 20 //总页数
      }
    };
  },
 
  methods: {
    //编辑页面
    edit(row){
      this.mode="edit";
      // 传输该行内容
      this.$refs.addUserList.form=JSON.parse(JSON.stringify(row))
       this.$refs.addUserList.dialogFormVisible=true;
    },
    //新增页面
    add(){
        this.mode="add";
        //清空表单
        this.$refs.addUserList.form={
                username:'',
                email:'',
                phone:'',
                role_id:'',
                status:'',
                remark:'',
        }
        this.$refs.addUserList.dialogFormVisible=true;
    },
    //删除按钮
    del(id) {
      this.$confirm("确定删除该用户?", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUserData({ id }).then(() => {
          this.$message.success("删除成功!");
          this.search();
        });
      });
    },
    //修改状态
    changeStatus(id) {
      setstatus({ id }).then(() => {
        this.$message.success("状态已修改");
        this.getData(); //更新
      });
    },
    //清除按钮
    reset() {
      this.$refs.form.resetFields();
       this.search();
    },
    //搜索按钮
    search() {
      this.pagination.currentPage = 1; //回到第一页
      this.getData(); //更新
    },
    handleSizeChange(size) {
      //更改页容量
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1; //回到第一页
      this.getData(); //更新
    },
    handleCurrentChange(page) {
      //更改当前页
      this.pagination.currentPage = page;
      this.getData(); //更新
    },
    getData() {
      //更新(请求用户列表+渲染)
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserList(_params).then(res => {
        this.tableData = res.data.items;
        console.log('用户列表',res);
        this.pagination.total = res.data.pagination.total;
      });
    }
  },
  created() {
    this.getData();
  },
  
};
</script>

<style lang="less">
.userList {
  .list {
    margin-top: 15px;
    thead > tr > th {
      text-align: center;
    }
    tbody > tr > td {
      text-align: center;
    }
  }
  .pagination {
    text-align: center;
    margin-top: 15px;
  }
}
</style>