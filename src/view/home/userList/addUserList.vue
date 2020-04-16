<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addUserList" width="477px">
    <div slot="title" class="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form :model="form" ref="form" label-width="68px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
       <!--  <el-select placeholder="请选择角色" v-model="form.role_id">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select> -->
        <el-select placeholder="请选择角色" v-model="form.role_id">
          <el-option :label="item" :value="+key" v-for="(item,key,index) in $store.state.roleObj" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addUserData,editUserData} from '@/api/userList.js'
export default {
    props:['mode'],
    data(){
        return {
          dialogFormVisible:false,
          form:{
                username:'',
                email:'',
                phone:'',
                role_id:'',
                status:'',
                remark:'',
          },
            rules:{
              username:[{required:true,message:'请输入用户名',trigger:'change'}],
              email:[{required:true,message:'请输入邮箱',trigger:'change'},
                    {validator:(rule,value,callback)=>{
                        let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                        if(_reg.test(value)){
                          callback();
                        }else{
                          callback('请输入正确的邮箱号')
                        }
                    }}
              ],
              phone:[{required:true,message:'请输入电话',trigger:'change'},
                      {validator:(rule,value,callback)=>{
                        let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                        if(_reg.test(value)){
                          callback();
                        }else{
                          callback('请输入正确的电话号码');
                        }
                      }}
              ],
              role_id:[{required:true,message:'请选择角色',trigger:'change'},]
            }
        }
    },
    watch: {
      'dialogFormVisible'(newV){
        if(newV==true){
          this.$nextTick(()=>{
              this.$refs.form.clearValidate();
          })
          //重置表单
          this.$refs.form.resetFields();
        }
      }
    },
    methods: {
      //确认按钮
      submitClick(){

        this.$refs.form.validate(result=>{
          if(result){
            if(this.mode=='add'){
                 //发送增加请求
              addUserData(this.form).then(()=>{
                // console.log(res);
                this.$message.success('添加成功')
                //关闭窗口
                this.dialogFormVisible=false;
                //刷新页面
                this.$emit('shua');
              })
            }else{
              editUserData(this.form).then(()=>{
                // console.log('编辑接口',res);
                  this.$message.success('编辑成功');
                  //关闭窗口
                this.dialogFormVisible=false;
                //刷新页面
                this.$emit('shua');
              })
            }
           
          }
        })
        
        
      }
    },
}
</script>

<style lang="less">
.addUserList {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9df8;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    padding-left: 200px;
  }
  
}
</style>