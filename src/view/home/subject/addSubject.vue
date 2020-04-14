<template>
  <el-dialog :visible.sync="dialogFormVisible" width="600px" class="addSubject">
    <div slot="title" class="title">{{mode=="add" ? '新增学科' : '编辑学科'}}</div>
    <!--表单  -->
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [
          { required: true, message: "请输入学科学科名称", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    dialogFormVisible(newV) {
      if (newV == false) {
        //对话框关闭的时候
        this.$refs.form.resetFields(); //清空表单
      }
    }
  },
  methods: {
    //点击确定按钮
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              //  console.log(res);
              this.$message.success("新增成功"); //提示成功
              this.dialogFormVisible = false; //关闭对话框
              this.$parent.search(); //调用父组件的刷新方法重新渲染
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功"); //提示成功
              this.dialogFormVisible = false; //关闭对话框
              this.$parent.search(); //调用父组件的刷新方法重新渲染
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addSubject {
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
    text-align: center;
  }
}
</style>