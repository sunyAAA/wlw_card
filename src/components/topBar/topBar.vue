<template>
    <div class="top-bar">
        <div>
            <span>欢迎您，{{nickName}}</span>


            <span class="logOut" @click='out'>
                登出
            </span>
        </div>
    </div>
</template>
<script>
import storage from 'good-storage'
import config from '../../config.js'
export default {
    data(){
        return {
            nickName:'',
        }
    },
    mounted(){
        this.nickName = storage.get('u').name;
    },
    methods:{
        out(){
            storage.remove('_token');
            storage.remove('u');
            config.login = false
            this.$emit('out');
        }
    }
}
</script>

<style lang="stylus" scoped>
.top-bar
    position fixed
    top 0
    left 0
    right  0
    height 50px
    line-height 50px
    text-align right
    font-size 14px
    padding-right 60px
    background #fff
    margin-left 240px
    z-index 10
.avatar-box
    display inline-block
    width 30px
    height 30px
    border-radius 50%
    overflow hidden
    vertical-align middle
    margin-left 25px
    &>img
        object-fit cover
        width 100%
        heig 100%
.logOut
    padding-left 20px
    cursor pointer

</style>
