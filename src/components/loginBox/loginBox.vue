  <template>
    <div class="login-box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.userCode"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
              <el-form-item>
          <el-button type="success" @click="submit">登录</el-button>
  </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import storage from 'good-storage'
export default {
  data() {
    return {
      form: {
        userCode: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$http.post('api/v1/login',this.form,{emulateJSON:true}).then(res=>{
        if(res.body.code == 1){
          console.log('---')
            storage.set('u',res.body.data)
            storage.set('_token',res.body.data.token)
            this.$emit('login',true)
          
        }else{
            this.$emit('login',false)
        }
      })
      // AJAX.POST('/api/v1/login',{userCode:this.form.userCode,password:this.form.password},function(res){
      //   console.log(res)
      // })
    }
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

.el-button {
  width: 100%;
}
</style>
