<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse=!collapse"></i>
        <img class="marginlr" src="@/assets/img/loginlogo.png" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="$store.state.userInfo.avatar" />
        <span class="name">{{$store.state.userInfo.username}},您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <!-- 侧边栏列表 -->
        <el-menu
          :router="true"
          :default-active="$route.fullPath"
          :collapse="collapse"
          class="menuTransition">
          <el-menu-item :index="'/home/'+item.path" v-for="(item,key, index) in $router.options.routes[1].children" :key="index" v-show="item.meta.rules.includes($store.state.role)">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
         <!--  <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, exitLogin } from "@/api/home.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      userInfo: "",
      collapse: false
    };
  },
  created() {
    //先判断有无token,没有跳转登录页,有才进行用户信息请求
    if (!getToken) {
      this.$router.push("/");
      return;
    }
    //请求用户信息
    getUserInfo().then(res => {
      // console.log("用户信息", res);
      this.userInfo = res.data;
      this.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
      this.$store.state.userInfo = this.userInfo; //使用vuex共享数据
      this.$store.state.role=res.data.role;//把当前用户信息的角色保存到vuex共享

      //权限处理:如果是禁用状态的用户,删除token,返回登录页
      if (res.data.status == 0) {
        this.$message("您的账号已被禁用,请联系管理员");
        removeToken();
        this.$router.push("/");
      } else {
        //角色权限处理,避免游客通过连接直接访问
        // console.log("路由配置", this.$route);
        // console.log("路由信息", this.$router);
        if (!this.$route.meta.rules.includes(res.data.role)) {
          this.$message("您无权访问该页面");
          removeToken();
          this.$router.push("/");
        }
      }
    });
  },
  methods: {
    exit() {
      this.$confirm("确定退出当前登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //调用退出接口
        exitLogin();
        //删除token (必须删除)
        removeToken();
        //跳转到登录页面
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
        padding-bottom: 9px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);

    .menuTransition:not(.el-menu--collapse) {
      // 初始宽度
      width: 160px;
    }
  }
  .main {
    background-color: #e8e9ec;
  }
}
</style>