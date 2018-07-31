
<template>
	<div id="app">
		<login-page v-if='!isLogin' @login='check'></login-page>
		<view-box v-else @out='out' @fail='fail'></view-box>
	</div>
</template>

<script>
import loginPage from "./pages/loginPage/loginPage";
import viewBox from "./pages/viewBox/viewBox";
import storage from "good-storage";
import config from "./config";

export default {
    name: "app",

    data() {
        return {
            isLogin: config.login
        };
    },
    methods: {
        check(statu) {
            config.login = statu;
            this.isLogin = config.login;
        },
        out() {
            this.isLogin = config.login = false;
        },
        fail() {
            this.isLogin = config.login = false;
        }
    },
    created() {
        this.isLogin = config.login;
        let statu = storage.get("_token");
        if (statu) {
            this.isLogin = config.login = true;
        }
    },
    components: { loginPage, viewBox }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.el-table__row {
    cursor: pointer;
}
</style>
