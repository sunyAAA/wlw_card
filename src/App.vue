
<template>
  <div id="app">
    <!-- <login-page></login-page> -->
    <view-box></view-box>
  </div>
</template>

<script>
import loginPage from './pages/loginPage/loginPage'
import viewBox from './pages/viewBox/viewBox'
export default {
  name: 'app',
  data () {
    return {

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
