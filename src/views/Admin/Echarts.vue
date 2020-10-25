<!--
 * @Author: xk
 * @Date: 2020-09-09 16:46:53
 * @LastEditTime: 2020-09-10 14:14:14
 * @LastEditors: Please set LastEditors
 * @Description: component of the echarts
 * @FilePath: /shop/src/views/Admin/Echarts.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        <el-row> 
            <el-col :span="12" >
                <div class="box" :style="{width: width + 'px', height: height +'px'}">
                    <div class="charts" id="charts1"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="box" :style="{width: width + 'px', height: height +'px'}" >
                    <div class="charts" id="charts2"></div>
                </div>
            </el-col>
        </el-row>
        <el-row> 
            <el-col :span="12">
                <div class="box" :style="{width: width + 'px', height: height + 'px'}">
                   <div class="charts" id="charts3"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="box" :style="{width:width + 'px', height: height + 'px'}">
                   <div class="charts" id="charts4"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";

    if (!store.state.ConsoleData) {
        Vue.set(store.state, 'ConsoleData', {
            title:'控制台',
        })
    }

    export default {
        data() {
            return store.state.ConsoleData
        },
        computed:{
            width:() => {
                return (store.state.AppData.width -250) / 2;
            },
            height:() => {
                return (store.state.AppData.height - 144)/ 2;
            }
        },
        mounted() {
            this.$chart.line('charts1',
            {
                title: '折线图',
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true}
                ]
            })
            this.$chart.bar('charts2',
            {
                title: ' 柱状图',
                xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                series: [
                    {
                        name: '完成人数',
                        type: 'bar',
                        barWidth: '40%',
                        data: [10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330]
                    },
                    {
                        name: '报名人数',
                        type: 'bar',
                        barWidth: '40%',
                        data: [10, 52, 200, 334, 390, 330, 220,199,69,129,56,489]
                    }
                ]
            })
            this.$chart.cross('charts4',
            {
                title: '堆叠区域图',
                legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
                xData:  ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {},
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            })
            this.$chart.pie('charts3',
            {
                title: ' 柱状图',
                legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                series:  [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ]
            })
                
        }
        
    }
</script>

<style scoped>
    /* .box {
        border: 1px solid red;
    } */

    .charts {
        width: 96%;
        height: 90%;
        margin-left: 2%;
        margin-top: 2%;
        border: 1px solid lightgray;
        border-radius: 6px;
        text-align: center;
    }
</style>