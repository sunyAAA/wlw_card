<template>
    <div class="table-view">
    <el-table
    :data="tableData"
    v-loading='loading'
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>
    <el-pagination
      class="pagination"
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    showLoading(){
        this.loading = !this.loading
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

