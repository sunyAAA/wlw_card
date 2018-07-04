<template>
    <div class="table-view">
    <el-table
    :data="filterData"
    v-loading='loading'
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, .6)"
    style="width: 100%"
    :default-sort = "{prop: 'deviceId', order: 'descending'}"
     @row-click='go'
    >
    <el-table-column
      prop="deviceId"
      label="设备编号"
      sortable
      width="180"
      >
    </el-table-column>
    <el-table-column
      prop="cardNumber"
      label="号码"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="serveTime"
      label="签约开始日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="失效日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="usageMonth"
      label="本月流量（M）"
      align="center"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="usageYesterday"
      label="昨日流量（M）"
      sortable
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cardStatus"
      label="状态"
      width="100"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.cardStatus === 0? 'success' : 'Danger'"
          close-transition>{{formartStatus(scope.row.cardStatus)}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="onlineStatus"
      label="状态"
      width="100"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.onlineStatus === 1? 'primary' : 'info'"
          close-transition>{{scope.row.onlineStatus === 1 ? '在线':'离线'}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      class="pagination"
    layout="prev, pager, next"
    :total="total"
    :page-size='pageSize'
    @current-change='pagenoChange'
    >
  </el-pagination>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    filter: {
      type: Number
    },
    loading: {
      type: Boolean
    },
    pageSize: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      pageno: 1
    };
  },
  computed: {
    start() {
      return this.pageno == 1 ? 0 : this.pagesize * (this.pageno - 1);
    },
    end() {
      return this.pagesize * this.pageno;
    },
    DataTotal() {
      return this.total;
    },
    pageS() {
      return this.pagesize;
    },
    filterData() {
      if (this.filter) {
        return this.data.filter(item => {
          return item.deviceId == this.filter;
        });
      }else{
        return this.data
      }
    }
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    showLoading() {
      this.loading = !this.loading;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    pagenoChange(val) {
      this.$emit("pageNoChange", val);
    },
    go(row) {
      this.$router.push("/deviceDetail?id=" + row.deviceId);
    },
    formartStatus(status) {
      switch (status) {
        case 0:
          return "正常";
          break;
        case 1:
          return "单向停机";
          break;
        case 2:
          return "停机";
          break;
        case 3:
          return "预销号";
          break;
        case 4:
          return "销号";
          break;
        case 5:
          return "过户";
          break;
        case 6:
          return "休眠";
          break;
        case 7:
          return "待激活";
          break;
        case 99:
          return "号码不存在";
          break;
        default:
          return "异常";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.table-view {
  padding: 20px 40px;

  .pagination {
    text-align: center;
    padding-top: 20px;
  }
}
</style>

