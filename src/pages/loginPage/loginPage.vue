<template>
    <div class="login-page" :style="bg">
        <transition name='fadeRight'>
            <login-box v-show='loaded' @login='send'></login-box>
        </transition>
        <transition name='fadeLeft'>
        <div class="login-msg" v-show='loaded'>
            <p>物联网后台管理系统</p>

        </div>
        </transition>
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
                background:"url("+require('../../assets/img/bg/bg1.jpg')+") no-repeat",
                backgroundSize:'100% 100%'
            },
            loaded:false
        }
    },
    components:{
        loginBox
    },
    methods:{
        send(statu){
            this.$emit('login',statu)
        }
    },
    mounted(){
        this.loaded = true;
    }
}
</script>

<style lang="stylus" scoped>
    .login-msg
        position fixed
        left 200px
        top 35%
        color #fff
        p
            font-size 40px
</style>


