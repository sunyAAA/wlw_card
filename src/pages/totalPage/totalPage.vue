 <template>
 <div class="total-page">
    <div class="total">
        <p class="title">统计</p>
        <el-row class="row1">
            <el-col :span="12">
                <icon-banner color='#e53935' :data='bannerData'></icon-banner>
            </el-col>
            <el-col :span="12">
                <icon-banner color='green' icon="sort"></icon-banner>
            </el-col>
        </el-row>
        <el-row class="row2">
            <el-col :span="12">
                <icon-banner color='blue' icon='bell'></icon-banner>
            </el-col>
            <el-col :span="12">
                <icon-banner color='#e53935' icon="view"></icon-banner>
            </el-col>
        </el-row>
    </div>
    <div class="chart-box">
        <div class="chart-icon-box">
            <i class="el-icon-news"></i>
        </div>
        <div class="picker-box">
            <date-picker 
                @pick='pickChange'
            ></date-picker>
        </div>
        <p>  总流量 （MB）</p>
        <chart></chart>
    </div>
    <div class="blank"></div>
    <div class="table-box">
        <div class="chart-icon-box">
            <i class="el-icon-menu"></i>
        </div>
        <!-- <div class="picker-box">
            <date-picker 
                @pick='pickChange'
            ></date-picker>
        </div> -->
        <search-box @search='search'></search-box>
        <p>设备列表</p>
        <table-view :data='deviceList' :filter='filter'
            :total='deviceListTotal' :loading="deviceListLoading"
        ></table-view>
    </div>
 </div>

</template>

<script>
import IconBanner from '../../components/iconBanner/iconBanner'
import Chart from '../../components/chart/chart'
import DatePicker from '../../components/datePicker/datePicker'
import TableView from '../../components/tableView/tableView'
import SearchBox from '../../components/searchBox/searchBox'
import {getTotalPage,getPoolList} from '../../api/apiData.js'
import {formData} from '../../api/dataUtil.js'
export default {
    components:{IconBanner,Chart,DatePicker,TableView,SearchBox},
    data(){
        return{
            bannerData:[    
            ],
            deviceList:[],
            deviceListTotal:0,
            deviceListLoading:true,
            filter:null,
        }
    },
    created(){
        getTotalPage().then(res=>{
            
           this.deviceList = formData(res.body.data);
           this.deviceListTotal = res.body.totalCount
           this.deviceListLoading = false
        })
        // getPoolList().then(res=>{
        //     console.log(res.body)
        // })
    },
    methods:{

        pickChange(arr){
            console.log(arr)
        },
        search(v){
            console.log(v)
            this.filter = Number(v)
        }
    }
}
</script>

<style lang="stylus" scoped>
.total
    font-size 12px
    background #ccc
    padding-bottom 40px
    .title
        text-align left 
        font-size 24px
        font-weight 400
        padding-top 10px
        padding-left 10px
    .row1 
        padding-top 25px
    .row2
        padding-top 40px
.chart-box
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
        background #26c6da
        color #fff
.picker-box
    margin-top 20px
    margin-right 50px
    float right
.blank
    height 40px
    background #cccccc
    width 100%
.table-box
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
        background #f87979
        color #fff
</style>

