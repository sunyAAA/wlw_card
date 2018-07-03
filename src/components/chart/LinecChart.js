import { Line } from 'vue-chartjs'
export default {
    extends: Line,
    props: ['data'],
    data() {
        return {
            options: {
                responsive: true, 
                maintainAspectRatio: false, 
                scaleOverride : true,
                scaleSteps : 10,
                scaleStepWidth : 50,
                scaleStartValue : 0 ,
                // 是否是曲线
                bezierCurve: true,

                //Boolean - Whether to show a dot for each point
                // 是否显示点
                pointDot: true,
            }
        }
    },
    mounted() {
        this.renderChart(this.data, this.options)
    }


}
