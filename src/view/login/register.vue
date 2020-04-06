<template>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
        <div slot="title" class="title">用户注册</div>

    </el-dialog>
</template>

<script>
export default {
    data(){
        return {
            dialogFormVisible : false,
        }
    }
};
</script>

<style lang='less'>
.register{
    .title{
     color:#fff;
     height:53px;
     font-size: 18px;
     background:linear-gradient(to right,#01c5fb,#1394fc);
     text-align: center;
     line-height: 53px;
}
.el-dialog__header {
    padding:0;
}
}

</style>