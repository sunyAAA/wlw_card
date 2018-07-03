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
      prop="enable"
      label="状态"
      width="100"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.enable === 1? 'success' : 'Danger'"
          close-transition>{{scope.row.enable === 1 ? '正常':'异常'}}</el-tag>
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
    :page-size='pagesize'
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
      default:function(){
        return []
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
    }
  },
  data() {
    return {
      pageno: 1,
      pagesize: 5
    };
  },
  computed: {
    filterData() {
      if (this.filter) {
        const result = this.data.filter(item => item.deviceId == this.filter);
        this.Datatotal = result.length;
        return result.slice(this.start, this.end);
      } else {
        return this.data.slice(this.start, this.end);
      }
    },
    start() {
      return this.pageno == 1 ? 0 : this.pagesize * (this.pageno - 1);
    },
    end() {
      return this.pagesize * this.pageno;
    },
    DataTotal(){
      return this.total
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
    pagenoChange(val){
      this.pageno = val;
    },
    go(row){
     this.$router.push('/deviceDetail?id='+row.deviceId)
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

