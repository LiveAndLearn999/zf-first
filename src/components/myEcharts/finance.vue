<<<<<<< HEAD
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
                xData: ['可用学币', '冻结学币'],
                series: [
                    {
                        name: '学币',
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
        height: 300px;
    }
=======
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
                xData: ['可用学币', '冻结学币', '可用金额', '冻结金额', '赠送金额', '积分', '经验值'],
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
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
</style>