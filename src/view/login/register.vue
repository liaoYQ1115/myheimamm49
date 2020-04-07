<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    class="register"
    width="600px"
    :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <!-- 表单 -->
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <!-- 将头像加入验证  name=请求参数-->
      <el-form-item label="头像" prop="avatar"> 
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- 上传成功后做的事情 保存图片地址↑      上传之前做的事情 判断↑ -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      
      <el-form-item  label="昵称" prop="username">
          <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item  label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item  label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
          <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
          <el-row>
              <el-col :span="16">
                   <el-input v-model="form.code"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                  <img src="@/assets/img/key.jpg" alt class="code"/>
              </el-col>
          </el-row>
      </el-form-item>
    </el-form>

       <div solt="footer" class="footer">
           <el-button>取消</el-button>
           <el-button type="primary" @click="submitClick">确定</el-button>
           </div> 
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "", //头像图片
       //   表单数据
      form: {
        avatar:'', //头像地址
        username:'', //用户名
        email:'',//邮箱
        phone:'', //手机
        password:'',//密码
        code:'',//图形码
      },
      rules:{ //表单验证规则绑定
        avatar:[{required:true,message:'请上传头像',trigger:'change'}],
        username:[{required:true,message:'请输入昵称',trigger:'change'}],
        email:[
            {required:true,message:'请输入邮箱地址',trigger:'change'},
            {   //validator 自定义校验
                validator:(rule,value,callback)=>{
                    let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    if(_reg.test(value)){
                        callback();
                    }else{
                        callback('请正确输入邮箱地址');
                    }
                }
            }
        ],
        phone:[
            {required:true,message:'请输入手机号',trigger:'change'},
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
            {required:true,message:'请输入密码',trigger:'change'},
            {min:6,max:12,message:'请输入6-12位的密码',trigger:'change'}
        ],
        code:[
            {required:true,message:'请输入图形码',trigger:'change'},
            {min:4,max:4,message:'请输入4位数图形码',trigger:'change'}
        ],
      }
    };
  },
  methods: {
    //上传文件之前 
    beforeAvatarUpload(file) { 
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片格式有误!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //上传成功后
    handleAvatarSuccess(res) {
        // console.log(res); //接口返回值
    //   this.imageUrl = URL.createObjectURL(file.raw); //保存图片地址 方法一
    this.imageUrl=this.baseUrl+'/'+res.data.file_path; //保存图片地址 方法二/常用
    this.form.avatar=res.data.file_path; //上传成功后须在form表单数据里面保存一下该图像avatar值

    // validateField :局部验证/Array/string(依次验证)

    this.$refs.form.validateField('avatar');  //头像文件局部验证
    },
    // 确认按钮点击事件
    submitClick(){
        this.$refs.form.validate((valid) => { //全局验证
            console.log(valid);
        })
    }
  }
};
</script>

<style lang='less'>
.register {
  .title {
    color: #fff;
    height: 53px;
    font-size: 18px;
    background: linear-gradient(to right, #01c5fb, #1394fc);
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader{
      width: 178px;
      margin-left:95px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .footer{
      text-align: center;
  }
  .code{
      height: 40px;
      width: 100%;
      border:1px dashed #ccc;
  }
}
</style>