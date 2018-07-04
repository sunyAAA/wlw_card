<template>
    <div class="device-page">
        <p class="title">设备</p>
        <p class="page-desc"><i class="el-icon-menu"></i>{{deviceTitle}}</p>
        <table-view :data='deviceList' :filter='filter'
            :total='deviceListTotal' :loading="deviceListLoading"
            :pageSize='pageSize'
            @pageNoChange='pageChange'
        ></table-view>
    </div>
</template>

<script>
import { getTotalPage } from "../../api/apiData.js";
import { formData } from "../../api/dataUtil.js";
import TableView from "../../components/tableView/tableView";
import SearchBox from "../../components/searchBox/searchBox";
export default {
  components: { TableView, SearchBox },
  data() {
    return {
      deviceTitle: "所有设备",
      deviceList: [],
      deviceListTotal: 0,
      deviceListLoading: true,
      filter: null,
      pageSize: 10,
      pageNo: 1
    };
  },
  mounted() {
    getTotalPage(this.pageSize,this.pageNo).then(res => {
      if (res.body.code == 1) {
        this.deviceList = formData(res.body.data);
        this.deviceListTotal = res.body.totalCount;
        this.deviceListLoading = false;
      }
    });
  },
  methods: {
      getDeviceList(){
            this.deviceListLoading=true
             getTotalPage(this.pageSize,this.pageNo).then(res=>{
               if (res.body.code == 1) {
                 this.deviceList = formData(res.body.data);
               }
                 this.deviceListLoading=false
             })
        },
        pickChange(arr){
            console.log(arr)
        },
        search(v){
            this.filter = Number(v)
        },
        pageChange(v){
            this.pageNo = v
            this.getDeviceList();
        }
  }
};
</script>

<style lang="stylus" scoped>
.device-page {
  .title {
    padding: 10px 0 50px 10px;
    font-size: 24px;
    background: #eee;
  }

  .page-desc {
    height: 40px;
    line-height: 40px;
    position: relative;
    padding-left: 100px;
    font-size: 20px;

    i {
      position: absolute;
      text-align: center;
      height: 54px;
      line-height: 54px;
      width: 54px;
      top: -20px;
      left: 20px;
      background: #f87979;
      color: #fff;
    }
  }
}
</style>
