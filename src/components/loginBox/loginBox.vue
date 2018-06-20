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
          <el-button type="success" @click="onSubmit">登录</el-button>
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
    background: #eee;
    padding-top: 40px;
    padding-right: 60px;
    border-radius: 10px;
}
.el-button
  width 100%
</style>
