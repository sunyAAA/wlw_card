 <template>
    <div class="view-box">
        <div class="slide-bar" :style="barStyle">
            <p class="gs-title">{{title}}</p>
            <el-menu :default-active="defaultIndex" background-color="#545c64" text-color="#fff" @select='select'>
                <el-menu-item index="0" v-waves>
                    <i class="el-icon-search"></i>
                    <span slot="title">统计</span>
                </el-menu-item>
                <el-menu-item index="1" v-waves>
                    <i class="el-icon-menu"></i>
                    <span slot="title">流量池</span>
                </el-menu-item>
                <el-menu-item index="2" v-waves>
                    <i class="el-icon-setting"></i>
                    <span slot="title">设备</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <top-bar @out='sendOut'></top-bar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TopBar from "../../components/topBar/topBar";
import storage from "good-storage";
export default {
    data() {
        return {
            routeList: ["/total", "/pool", "/device"],
            defaultIndex: "0",
            title: "物联网",
            barStyle: {
                width: "240px"
            }
        };
    },
    methods: {
        select(index) {
            if (!storage.get("u")) {
                this.$notify({
                    title: "警告",
                    message: "登录已失效，请重新登录",
                    offset: 200
                });
                this.$emit("fail");
            }
            this.$router.push({ path: this.routeList[index] });
        },
        sendOut() {
            this.$emit("out");
        }
    },
    created() {
        let i = this.routeList.indexOf(this.$route.path);
        this.defaultIndex = (i < 0 ? 0 : i).toString();
    },
    components: { TopBar }
};
</script>

<style lang="stylus" scoped>
.slide-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    background: rgb(84, 92, 100);
    border: none;

    .gs-title {
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: #00bcd4;
        color: #fff;
        font-size: 22px;
    }
}

.el-menu {
    border-right: 1px solid #545c64;
}

.content {
    padding-left: 240px;
    padding-top: 50px;
}
</style>


