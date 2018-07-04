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
            <p>  单卡限量为 {{pool.name}}</p>
            <chart color='#43a047' :data='poolData' :bottomList='poolData.bottomList'></chart>
        </div>
        <transition 
              name="bounce"
  enter-active-class="bounceInLeft"
  leave-active-class="bounceOutRight"
        >
            <div class="table-box" v-if='showTable1'>
                <search-box @search='search'></search-box>
                <table-view @pageNoChange='pageChange' :data="tableData" :filter='filter' :total='totalCount'
                    :loading='tableLoading'
                ></table-view>
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
import {format,formartPoolData,formData} from '../../api/dataUtil.js'
import {getPoolById,getDeviceByPoolId} from '../../api/apiData.js'
export default {
    components:{Chart,DatePicker,TableView,SearchBox},
    props:{
        pool:{
            type:Object,
        }
    },
    data(){
        return {
            showTable1:false,
            showTable2:false,
            begin:'',
            end:'',
            poolData:{},
            pageSize:5,
            pageNo:1,
            tableData:[],
            filter:0,
            totalCount:0,
            tableLoading:true
        }
    },
    mounted(){
        var now = new Date().getTime()
        this.end = format(now,'Y-m-d H:i:s');
        this.begin = format(now-7*24*3600*1000,'Y-m-d H:i:s');
        this.getPoolData()
        this.getTableData()
    },
    methods:{
        pickChange(val){
            this.end = format(new Date(val[1]).getTime(),'Y-m-d H:i:s');
            this.begin = format(new Date(val[0]).getTime(),'Y-m-d H:i:s');
        },
        showTable(i){
            this['showTable'+i] = !this['showTable'+i]
        },
        getPoolData(){
            getPoolById(this.pool.poolId,this.begin,this.end).then(res=>{
                if(res.body.code == 1){
                    var d = res.body.data;
                    this.poolData = formartPoolData(d);
                }
            })
        },
        getTableData(){
            this.tableLoading = true
            getDeviceByPoolId(this.pool.poolId,this.pageSize,this.pageNo).then(res=>{
                if(res.body.code == 1){
                   this.tableData = formData(res.body.data);
                   this.totalCount = res.body.totalCount
                }
                this.tableLoading = false
            })
        },
        search(v){
            this.filter = Number(v)
        },
        pageChange(v){
            this.pageNo = v;
            this.getTableData();
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
