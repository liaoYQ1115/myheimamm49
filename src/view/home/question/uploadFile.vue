<template>
  <div class="uploadFile">
    <el-upload
      class="avatar-uploader"
      :action='baseURL+"/question/upload"'
       name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
       <div v-if="type=='video'">
             <video v-if="value" :src="baseURL+'/'+value" class="avatar" controls></video>
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div> 
        <div v-else>
            <img v-if="value" :src="baseURL+'/'+value" class="avatar" />
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      
    </el-upload>
  </div>
</template>

<script>
export default {
  props:['value','type'],
  data() {
    return {
      baseURL:  process.env.VUE_APP_URL,  //基地址
    };
  },
  methods: {
    handleAvatarSuccess(res, file) { //上传成功后的操作
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('input',res.data.url)
      console.log('上传结果:',res);

    },
    beforeAvatarUpload(file) { //上传前的操作
        if(this.type=='video'){
            console.log(file);
            const isVideo=file.type === "video/mp4";
            const isLt2M = file.size / 1024 / 1024 < 4;

            if (!isVideo) {
          this.$message.error("上传视频只能是 mp4F 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 4MB!");
        }
      return isVideo && isLt2M;
    }else{
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
        }

      
  }
};
</script>

<style lang="less">
.uploadFile {
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
}
</style>