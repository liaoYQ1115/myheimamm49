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
  <el-form :model="form" :rules="rules" ref="form">

      <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
          <el-input :show-password="true" prefix-icon="el-icon-lock" v-model="form.password" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
         <el-row>
           <el-col :span='16'>
               <el-input prefix-icon="el-icon-key" v-model="form.code" placeholder="请输入验证码"></el-input>
           </el-col>
           <el-col :span="8" >
                <img :src="codeUrl"  class="key" @click="changeCodeUrl">
           </el-col>
         </el-row>
      </el-form-item>
      <el-form-item prop="isCheck">
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
import {toLogin} from '@/api/login.js' //导入api的axios方法
import {saveToken} from '@/utils/token.js' //导入保存token方法
export default {
  components:{
    register, //注册页面
  },
  data(){
    return {
      baseUrl: process.env.VUE_APP_URL,
      codeUrl:process.env.VUE_APP_URL+'/captcha?type=login', //图形码地址
      form:{
          phone:'',
          password:'',
          code:'',
          isCheck:'', //复选框空字符串会得到布尔值
      },
      rules:{
        phone:[
          {required:true, message:'请输入手机号',trigger:'change'},
          {   //validator 自定义校验
                validator:(rule,value,callback)=>{
                    let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                    if(_reg.test(value)){
                        callback();
                    }else{
                        callback('请正确输入手机号');
                    }
                }
            }
          ],
        password:[
          {required:true, message:'请输入密码',trigger:'change'},
          {min:6,max:12,message:'请输入6到12位的密码',trigger:'change'}
        ],
        code:[
          {required:true, message:'请输入验证码',trigger:'change'},
          {min:4,max:4,message:'请输入正确的验证码',trigger:'change'}
        ],
        isCheck:[
          {required:true, message:'请勾选协议',trigger:'change'},
          {   //validator 自定义校验
                validator:(rule,value,callback)=>{
                   
                  if(value===true){
                    callback();
                  }else{
                    callback('请勾选协议')
                  }
                },trigger:'change'
            }
        ]
    }
    }
  },
  methods: {
    //登录点击  进行全局校验
    clicklogin(){
        //提交表单验证  返回值(布尔值),符合规则就是true
        //这里的$refs和上面定义的ref的值要一致
        this.$refs.form.validate((valid) => {
          if (valid==true) {  //验证通过
            //发送登录请求
            toLogin(this.form).then(res=>{
              this.$message.success('恭喜你,登录成功!');
              console.log('登录信息',res);
              saveToken(res.data.token);
            })
          } 
        });
    },
    //注册点击
    registerClick(){
        this.$refs.register.dialogFormVisible=true;
    },
    //点击刷新验证码
    changeCodeUrl(){
      this.codeUrl=process.env.VUE_APP_URL+'/captcha?type=login'+Date.now();
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