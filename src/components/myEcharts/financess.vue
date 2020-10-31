<!--
 * @Author: your name
 * @Date: 2020-09-25 17:41:37
 * @LastEditTime: 2020-09-25 17:55:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/myEcharts/finance.vue
-->
<template>
    <div>
        <div id="chartsss"></div>
    </div>
</template>

<script>
export default {
    name: "Bar",
    props: {
        dtlist: { type: Array, default: () => [] }
    },
    mounted() {
        this.$chart.bar('chartsss',
            {
                // title: ' 数据统计',
                xData: ['积分', '经验值'],
                series: [
                    {
                        name: '数值',
                        type: 'bar',
                        barWidth: '40%',
                        // data: [10, 52, 200, 334, 390, 330],
                        data: this.dtlist,
                        itemStyle: {
                            normal: {
                                color: '#409EFF'
                            }
                        }
                    },
                    // {
                    //     name: '报名人数',
                    //     type: 'bar',
                    //     barWidth: '40%',
                    //     data: [10, 52, 200, 334, 390, 330, 220,199,69,129,56,489]
                    // }
                ]
            })
    }
}
</script>

<style  scoped>
    #chartsss {
        width: 100%;
        height: 300px;
    }
</style>