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
        <p class="tips">数量为"0"可能是运营商数据没有及时更新导致</p>
        <chart :data='allPoolData' color='#26c6da'></chart>
    </div>
    <div class="blank"></div>
    <div class="table-box">
        <div class="chart-icon-box">
            <i class="el-icon-menu"></i>
        </div>
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
  getAllPoolDate,
  getDeviceInfo
} from "../../api/apiData.js";
import { formData, format } from "../../api/dataUtil.js";
export default {
  components: { IconBanner, Chart, DatePicker, TableView, SearchBox },
  data() {
    return {
      deviceWorkStatus: [
        { name: "正常台数", count: 0, unit: "台", type: 0 },
        { name: "异常台数", count: 0, unit: "台", type: 1 }
      ],
      deviceOnlineStatus: [
        { name: "在线台数", count: 0, unit: "台", status: 0 },
        { name: "离线台数", count: 0, unit: "台", status: 1 }
      ],
      userNum: [
        { name: "昨日用量", count: 0, unit: "M" },
        { name: "本月用量", count: 0, unit: "M" }
      ],
      money: [],
      deviceList: [],
      deviceListTotal: 0,
      deviceListLoading: true,
      filter: 0,
      pageSize: 5,
      pageNo: 1,
      begin: "",
      end: "",
      allPoolData: {
        columns: ["日期", "总用量M"],
        rows: []
      }
      //       chartData: {
      //   columns: ['日期', '访问用户'],
      //   rows: [
      //     { '日期': '1/1', '访问用户': 1393},
      //     { '日期': '1/2', '访问用户': 3530},
      //     { '日期': '1/3', '访问用户': 2923},
      //     { '日期': '1/4', '访问用户': 1723},
      //     { '日期': '1/5', '访问用户': 3792 },
      //     { '日期': '1/6', '访问用户': 4593}
      //   ]
      // }
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
    });
    this.getAllPool()
    getDeviceInfo().then(res => {
      if (res.body.code == 1) {
        var d = res.body.data;
        this.deviceWorkStatus[0].count = d.total;
        this.deviceWorkStatus[1].count = d.totalErro;
        this.deviceOnlineStatus[0].count = d.onStatus;
        this.deviceOnlineStatus[1].count = d.offStatus;
        this.userNum[0].count = d.yesterdayFlow;
        this.userNum[1].count = d.totalFlow;
      }
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
    pickChange(val) {
      this.end = format(new Date(val[1]).getTime(), "Y-m-d H:i:s");
      this.begin = format(new Date(val[0]).getTime(), "Y-m-d H:i:s");
      this.getAllPool();
    },
    search(v) {
      this.filter = Number(v);
    },
    pageChange(v) {
      this.pageNo = v;
      this.getDeviceList();
    },
    getAllPool() {
      getAllPoolDate(this.begin, this.end).then(res => {
        if (res.body.code == 1) {
          var d = res.body.data;
          this.allPoolData.rows=[];
          for (var i = 0; i < d.length; i++) {
            this.allPoolData.rows.push({
              "日期": format(d[i].insertDate, "m-d"),
              "总用量M": parseInt(d[i].yesterdayUse / 1024)
            });
          }
          console.log(this.allPoolData);
        }
      });
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

.tips {
    font-size: 12px;
    color: #e4393c;
}
</style>

