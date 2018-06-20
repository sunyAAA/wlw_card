<template>
    <div class="login-box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.pass"></el-input>
            </el-form-item>
              <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
        </el-form>
    </div>    
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>

<style lang="stylus" scoped>
.login-box {
    position: absolute;
    right: 150px;
    top: 40%;
    width: 500px;
    background: #ffffff;
    padding-top: 60px;
    padding-right: 60px;
    border-radius: 10px;
}
</style>
