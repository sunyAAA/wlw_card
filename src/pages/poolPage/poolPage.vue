<template>
    <div class="pool-page">
        <p class="title">流量池</p>
        <pool-box></pool-box>
        <div class="blank"></div>
        <pool-box></pool-box>
    </div>
</template>

<script>
import PoolBox from '../../components/poolBox/poolBox'
export default {
    components:{PoolBox}
}
</script>


<style lang="stylus" scoped>
.pool-page
    .title
        padding-bottom 50px
        background #eee
        padding-left 10px
        padding-top 10px
        font-size 24px
    .blank
        background #eeeeee
        height 50px
</style>

