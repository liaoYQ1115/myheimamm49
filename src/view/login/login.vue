<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginlogo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
  <!-- 表单 -->
           <!-- 挂载到data  单个表单验证的规则   整个表单提交的验证-->
  <el-form :model="form" :rules="rules" ref="ruleForm">

      <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" v-model="form.phone" plaseholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
          <el-input :show-password="true" prefix-icon="el-icon-lock" v-model="form.password" plaseholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
         <el-row>
           <el-col :span='16'>
               <el-input prefix-icon="el-icon-key" v-model="form.code" plaseholder="请输入验证码"></el-input>
           </el-col>
           <el-col :span='8'>
                <img src="@/assets/img/key.jpg"  class="key">
           </el-col>
         </el-row>
      </el-form-item>
      <el-form-item>
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
      </el-form-item>
      <el-form-item>
        <!-- type值决定按钮颜色 -->
        <el-button class="btn" type="primary" @click="clicklogin">登录</el-button>
        <br/>
        <el-button class="btn" type="primary" @click="registerClick">注册</el-button>
      </el-form-item>
  </el-form>

    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>

    <register ref="register"></register>
  </div>
</template>

<script>
import register from './register.vue' //导入注册弹窗
export default {
  components:{
    register, //注册页面
  },
  data(){
    return {
      form:{
          phone:'',
          password:'',
          code:'',
          isCheck:'', //复选框空字符串会得到布尔值
      },
      rules:{
        phone:[{required:true, message:'请输入手机号',trigger:'change'}],
        password:[
          {required:true, message:'请输入密码',trigger:'change'},
          {min:6,max:12,message:'请输入6到12位的密码',trigger:'change'}
        ],
        code:[
          {required:true, message:'请输入验证码',trigger:'change'},
          {min:4,max:4,message:'请输入正确的验证码',trigger:'change'}
        ]
    }
    }
  },
  methods: {
    //登录点击
    clicklogin(){
        //提交表单验证  返回值(布尔值),符合规则就是true
        //这里的$refs和上面定义的ref的值要一致
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$message.success('恭喜你,登录成功!')
          } else {
            this.$message.warning('输入错误,请重新输入')
          }
        });
        // alert(process.env.VUE_APP_zz);测试环境变量
    },
    //注册点击
    registerClick(){
        this.$refs.register.dialogFormVisible=true;
    }
  },
};
</script>

<style lang='less'>
.login {
  display: flex;
  justify-content: space-around; //主轴 盒子左右距离平分
  align-items: center; //侧轴 居中排布
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;

    .title{
    margin-bottom: 43px;

    .titleName {
      font-size: 24px;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-left: 15px;
      margin-right:15px;
    }
    .titleLine{
      color:#ccc;
      font-size: 24px;
    }
    .titleName2{
      font-size: 22px;
      margin-left:15px;
    }
  }
    
  .key{
    height: 43px;
  }

  .btn{
    width: 100%;
    margin-bottom: 26px;
  }
    
  }
}
</style>