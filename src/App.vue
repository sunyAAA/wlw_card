
<template>
  <div id="app">
    <login-page v-if='!isLogin' @login='check'></login-page>
    <view-box v-else></view-box>
  </div>
</template>

<script>
import loginPage from './pages/loginPage/loginPage'
import viewBox from './pages/viewBox/viewBox'
import storage from 'good-storage'

export default {
  name: 'app',
  data () {
    return{
      isLogin:false
    }
  },
  computed:{

  },
  methods:{
    check(statu){
      this.isLogin = statu
    }
  },
  created(){
    let statu = storage.get('u');
    if(statu){
      this.isLogin = true
    }
  },
  components:{loginPage,viewBox}
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
i {cursor:pointer}

</style>
