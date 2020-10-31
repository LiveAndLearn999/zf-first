import echarts from 'echarts'
const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                // let subtext = '鼠标右击更新数据';
                let subtext = '';

                return {
                    //画一条简单的线
                    line: function(id, option) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            title: {
                                text: option.title,
                                subtext:!option.subtext ? subtext : option.subtext,
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: option.legend,
                                left: "right",
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: option.xData
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: option.series
                        };

                        this.chart.setOption(optionData);
                    },
                    // 饼状图
                    pie: function(id, option) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            title: {
                                text: option.title,
                                subtext:!option.subtext ? subtext : option.subtext,
                                left: 'left'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'right',
                                data: option.legend
                            },
                            series: [{
                                name: option.title,
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: option.series,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }]
                        };

                        this.chart.setOption(optionData);
                    },
                    // 柱状图
                    bar: function(id, option) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            title: {
                                text: option.title,
                                subtext:!option.subtext ? subtext : option.subtext,
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: option.legend,
                                left:'right'
                            },

                            calculable: true,
                            xAxis: [{
                                type: 'category',
                                data: option.xData
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: option.series
                        };

                        this.chart.setOption(optionData);
                    },
                    //堆叠区域图
                    cross: function(id, option) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            title: {
                                text: option.title,
                                subtext:!option.subtext ? subtext : option.subtext,
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                            legend: {
                                data: option.legend
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                data: option.xData
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: option.series
                        };

                        this.chart.setOption(optionData);
                    },
                    // 其他echart 可以直接在这个后面追加
                }
            }
        }
    })
}

export default {
    install
}
