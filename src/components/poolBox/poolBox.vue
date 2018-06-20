<template>
    <div class="pool-box">
        <div class="100M-box">
        <div class="chart-box">
            <div class="chart-icon-box">
                <i class="el-icon-news"></i>
            </div>
            <div class="picker-box">
                <date-picker 
                    @pick='pickChange'
                ></date-picker>
                <i class="el-icon-menu" @click='showTable(1)'></i>
            </div>
            <p>  单卡限量为 100.0 M</p>
            <chart color='#43a047'></chart>
        </div>
        <transition 
              name="bounce"
  enter-active-class="bounceInLeft"
  leave-active-class="bounceOutRight"
        >
            <div class="table-box" v-if='showTable1'>
                <search-box></search-box>
                <table-view></table-view>
            </div>
        </transition>
    </div>
    </div>
</template>

<script>
import Chart from '../../components/chart/chart'
import DatePicker from '../../components/datePicker/datePicker'
import TableView from '../../components/tableView/tableView'
import SearchBox from '../../components/searchBox/searchBox'
export default {
    components:{Chart,DatePicker,TableView,SearchBox},
    data(){
        return {
            showTable1:false,
            showTable2:false
        }
    },
    methods:{
        pickChange(){

        },
        showTable(i){
            this['showTable'+i] = !this['showTable'+i]
        }
    }
}
</script>

<style lang="stylus" scoped>
.pool-box
    background #ccc
    .title 
        padding 10px 0 50px 10px
        font-size 24px
    .chart-box
        background #fff
        position relative
        p
            padding 10px 25px 0px 100px
        .chart-icon-box
            position absolute
            width 54px
            height 54px
            line-height 54px
            top -20px
            left 20px
            text-align center
            font-size 20px
            background #43a047
            color #fff
    .table-box
        margin-top 50px
        background #fff
        padding 20px 0

.picker-box
    float right
    padding-right 50px
    padding-top 20px
    position relative
    .date-picker
        padding-right 60px
    &>i 
        position absolute
        width 50px
        height 40px
        top 20px
        right 60px
        line-height 40px
        text-align center
        background #f87979
        color #fff

</style>
