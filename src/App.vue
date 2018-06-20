
<template>
  <div id="app">
    <login-page v-if='!isLogin'></login-page>
    <view-box v-else></view-box>
  </div>
</template>

<script>
import loginPage from './pages/loginPage/loginPage'
import viewBox from './pages/viewBox/viewBox'
export default {
  name: 'app',
  data () {
    return {
      isLogin:false
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
