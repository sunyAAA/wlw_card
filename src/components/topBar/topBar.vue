<template>
    <div class="top-bar">
        <div>
            <span>欢迎您，{{nickName}}</span>

            <div class="avatar-box">
                <img class="avatar" :src="avatar" alt="">

            </div>
        </div>
    </div>
</template>
<script>
import storage from 'good-storage'
export default {
    data(){
        return {
            nickName:'',
            avatar:'http://i2.w.yun.hjfile.cn/doc/201402/8a6654146af74cfd80f00db0254238ab.jpg'
        }
    },
    mounted(){
        this.nickName = storage.get('u').name;
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
</style>
