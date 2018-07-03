<template>
    <div class="card">
        <span>{{val}}</span>
        <p>{{name}}</p>
    </div>
</template>

<script>
export default {
    props:{
        name:{
            type:String,
            default:'名称'
        },
        val:{
        }
    }
}
</script>

<style lang="stylus" scoped>
.card
    height 25px
    line-height 25px
    padding 10px 20px
    border-bottom  1px solid #eee
    span
        float right 
</style>
