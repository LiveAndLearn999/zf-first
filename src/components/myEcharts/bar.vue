<!--
 * @Author: your name
 * @Date: 2020-09-24 15:24:22
 * @LastEditTime: 2020-09-25 09:37:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/myEcharts/bar.vue
-->
<template>
    <div>
        <div id="charts"></div>
    </div>
</template>

<script>
export default {
    name: "Bar",
    props: {
        dtlist: { type: Array, default: () => [] }
    },
    mounted() {
        this.$chart.bar('charts',
            {
                // title: ' 数据统计',
                xData: ['运输中数量', '待运输数量', '审批通过数量', '审核驳回数量', '派发数量', '总完成数量'],
                series: [
                    {
                        name: '数量',
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
    #charts {
        width: 100%;
        height: 400px;
    }
</style>