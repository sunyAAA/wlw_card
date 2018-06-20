<template>
    <div class="top-bar">
        <div>
            <i class="el-icon-message"></i>
            <img src="" alt="">
            <span>用户名</span>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        colspan(){
            this.$emit('colspan')
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
</style>
