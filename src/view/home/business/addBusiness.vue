<template>
  <el-dialog class="addBusiness" :visible.sync="dialogVisible" width="600px">
    <div slot="title" class="title">{{mode=="add"? '新增企业':'编辑企业'}}</div>

    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBusinessDate,editBusinessData } from "@/api/business.js"; //新增接口
export default {
    props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "请输入企业简介", trigger: "blur" }
        ]
      },
      
    };
  },
  methods: {
    //确认按钮
    submitClick() {
      this.$refs.form.validate(result => {
        console.log(result);
        if (result) {
          if (this.mode == "add") {
            //  发送新增请求
            addBusinessDate(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogVisible = false; //关闭对话框
              this.$parent.search(); //使用父组件的刷新方法
            });
          }else{
              //发送编辑请求
                editBusinessData(this.form).then(()=>{
                    this.$message.success('编辑成功');
                    this.dialogVisible = false; //关闭对话框
                    this.$parent.search(); //使用父组件的刷新方法
                })
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addBusiness {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: #0da5fa;
    line-height: 53px;
  }
  .footer {
    text-align: center;
  }
}
</style>