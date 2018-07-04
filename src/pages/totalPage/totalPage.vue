 <template>
 <div class="total-page">
    <div class="total">
        <p class="title">统计</p>
        <el-row class="row1">
            <el-col :span="12">
                <icon-banner color='#e53935' :data='deviceWorkStatus'></icon-banner>
            </el-col>
            <el-col :span="12">
                <icon-banner color='green' icon="sort" :data='deviceOnlineStatus'></icon-banner>
            </el-col>
        </el-row>
        <el-row class="row2">
            <el-col :span="12">
                <icon-banner color='blue' icon='bell' :data="userNum"></icon-banner>
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
        <chart :data='allPoolData'></chart>
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
            :pageSize='pageSize'
            @pageNoChange='pageChange'
        ></table-view>
    </div>
 </div>

</template>

<script>
import IconBanner from "../../components/iconBanner/iconBanner";
import Chart from "../../components/chart/chart";
import DatePicker from "../../components/datePicker/datePicker";
import TableView from "../../components/tableView/tableView";
import SearchBox from "../../components/searchBox/searchBox";
import {
  getTotalPage,
  getPoolList,
  getAllPoolDate
} from "../../api/apiData.js";
import { formData, format } from "../../api/dataUtil.js";
export default {
  components: { IconBanner, Chart, DatePicker, TableView, SearchBox },
  data() {
    return {
      //           {
      //     name:'账号余额',
      //     count:'250',
      //     unit:'元'
      // }
      deviceWorkStatus: [
        { name: "正常台数", count: 0, unit: "台" },
        { name: "异常台数", count: 0, unit: "台" }
      ],
      deviceOnlineStatus: [
        { name: "在线台数", count: 0, unit: "台" },
        { name: "离线台数", count: 0, unit: "台" }
      ],
      userNum: [
        { name: "昨日用量", count: 0, unit: "M" },
        { name: "本月用量", count: 0, unit: "M" }
      ],
      money: [],
      deviceList: [],
      deviceListTotal: 0,
      deviceListLoading: true,
      filter: null,
      pageSize: 5,
      pageNo: 1,
      begin: "",
      end: "",
      allPoolData: {
        labels: [],
        datasets: [
          {
            label: "总用量(M)",
            data: []
          }
        ]
      }
    };
  },
  created() {
    var now = new Date().getTime();
    this.end = format(now, "Y-m-d H:i:s");
    this.begin = format(now - 7 * 24 * 3600 * 1000, "Y-m-d H:i:s");
    getTotalPage(this.pageSize, this.pageNo).then(res => {
      this.deviceList = formData(res.body.data);
      this.deviceListTotal = res.body.totalCount;
      this.deviceListLoading = false;
      var d = res.body.data;

      for (var i = 0; i < d.length; i++) {
        var card = d[i];
        if (card.cardStatus == 0) {
          this.deviceWorkStatus[0].count++;
        } else {
          this.deviceWorkStatus[1].count++;
        }
        if (card.onlineStatus == 1) {
          this.deviceOnlineStatus[0].count++;
        } else {
          this.deviceOnlineStatus[1].count++;
        }
      }
    });
    // getPoolList().then(res=>{
    //     console.log(res.body)
    // })
    getAllPoolDate(this.begin, this.end).then(res => {
      if (res.body.code == 1) {
        var d = res.body.data;
        for (var i = 0; i < d.length; i++) {
          this.allPoolData.labels.push(format(d[i].insertDate, "Y-m-d"));
          this.allPoolData.datasets[0].data.push(d[i].yesterdayUse);
        }
      }
      //           datacollection: {
      // labels: ["06-18",'06-19','06-20','06-20','06-20','06-20','06-20','06-20','06-20',"06-18",'06-20','06-20','06-20','06-20','06-20','06-20','06-20','06-20',"06-18",'06-20','06-20','06-20','06-20','06-20','06-20','06-20','06-20'],
      // datasets: [
      //   {
      //     label: "用量(M)",
      //     backgroundColor: this.color,
      //     data: [0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,1,3,0]
      //   }
      // ]
      //   },
    });
  },
  methods: {
    getDeviceList() {
      getTotalPage(this.pageSize, this.pageNo).then(res => {
        if (res.body.code == 1) {
          this.deviceList = formData(res.body.data);
        }
      });
    },
    pickChange(arr) {
      console.log(arr);
    },
    search(v) {
      this.filter = Number(v);
    },
    pageChange(v) {
      this.pageNo = v;
      this.getDeviceList();
    }
  }
};
</script>

<style lang="stylus" scoped>
.total {
    font-size: 12px;
    background: #eee;
    padding-bottom: 40px;

    .title {
        text-align: left;
        font-size: 24px;
        font-weight: 400;
        padding-top: 10px;
        padding-left: 10px;
    }

    .row1 {
        padding-top: 25px;
    }

    .row2 {
        padding-top: 40px;
    }
}

.chart-box {
    position: relative;

    p {
        padding: 10px 25px 0px 100px;
    }

    .chart-icon-box {
        position: absolute;
        width: 54px;
        height: 54px;
        line-height: 54px;
        top: -20px;
        left: 20px;
        text-align: center;
        font-size: 20px;
        background: #26c6da;
        color: #fff;
    }
}

.picker-box {
    margin-top: 20px;
    margin-right: 50px;
    float: right;
}

.blank {
    height: 40px;
    background: #cccccc;
    width: 100%;
}

.table-box {
    position: relative;

    p {
        padding: 10px 25px 0px 100px;
    }

    .chart-icon-box {
        position: absolute;
        width: 54px;
        height: 54px;
        line-height: 54px;
        top: -20px;
        left: 20px;
        text-align: center;
        font-size: 20px;
        background: #f87979;
        color: #fff;
    }
}
</style>

