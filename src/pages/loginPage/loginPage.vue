<template>
    <div class="login-page" :style="bg">
        <login-box></login-box>
    </div>
</template>

<script>
import loginBox from '../../components/loginBox/loginBox'
export default {
    data(){
        return {
            bg:{
                position:'fixed',
                top:0,
                left:0,
                right:0,
                bottom:0,
                background:"url("+require('../../assets/img/bg/bg3.jpg')+") no-repeat",
                backgroundSize:'100% 100%'
            }
        }
    },
    components:{
        loginBox
    }
}
</script>

<style lang="stylus" scoped>
    
</style>


