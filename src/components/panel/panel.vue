<template>
    <div class="panel">
        <p><i :class="iconClass" :style='iconColor'></i>{{title}}</p>
        <slot name="tab">没有相关信息~</slot>
    </div>
</template>

<script>
export default {
    props:{
        icon:{
            type:String,
            default:'menu'
        },
        color:{
            type:String,
            default:'#f87979'
        },
        title:{
            type:String,
            default:'基本信息'
        }
    },
    computed:{
        iconClass(){
            return 'el-icon-'+this.icon
        },
        iconColor(){
            return {
                backgroundColor:this.cololr== ''? '#f87979':this.color
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .panel
        background #fff
        position relative
        padding 10px
        p
            padding-left 75px
            padding-top 10px
            i
                position absolute
                width 54px
                height 54px
                line-height 54px
                font-size 24px
                left 10px
                top -20px
                text-align center
                color #fff
</style>
