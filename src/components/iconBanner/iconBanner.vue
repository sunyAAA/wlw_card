<template>
    <div class="icon-banner">
        <div class="icon-box" :style="bgc">
            <i :class="iclass"></i>
        </div>
        <div class="right">
            <el-row>
                <el-col :span="colSpan" v-for="(item,index) in data" :key='index'>
                    <p class="data">{{item.count}}<span class="unit">{{item.unit}}</span></p>
                    <p class="name">{{item.name}}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
/**
 * porps
 *      color: 背景色
 *      icon : 图标
 *      data: [Object,Object]   *length<=2
 *          {
 *              count:数量
 *              unit : 单位
 *              name : 信息
 *          }
 */
export default {
    props:{
        color:{
            type:String,
            default:'green'
        },
        icon:{
            type:String,
            default:'menu'
        },
        data:{
            type:Array,
            default:function(){
                return [
                    {
                        name:'账号余额',
                        count:'0.00',
                        unit:'元'
                    }
                ]
            }
        }
    },
    computed:{
        bgc(){
            return {
                background : this.color
            }
        },
        iclass(){
            return  'el-icon-'+this.icon
        },
        colSpan(){
            if(this.data.length > 2){
                this.data.splice(2)
            }
            return 24/this.data.length
        }
    }
}
</script>


<style lang="stylus" scoped>
.icon-banner 
    height 110px
    position relative
    width 90%
    margin 0 auto
    box-sizing border-box
    background #fff
    border-radius 4px
    .icon-box
        position absolute
        width 80px
        height 80px
        background green 
        left 20px
        top -15px
        line-height 80px
        font-size 24px
        color #fff
        text-align center
    .right
        text-align center    
        height 100%
        padding-left 80px
        .data 
            margin-top 25px
            font-size 24px
            color #337ab7
            cursor pointer
            .unit
                font-size 14px
        .name
            margin-top 10px
            font-size 14px
            color #999


</style>

