(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15a24176"],{"04f7":function(t,a,e){"use strict";var s=e("dbba"),i=e.n(s);i.a},"84b2":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:t.$route.meta.title,expression:"$route.meta.title"}]},[e("el-row",[e("el-col",{attrs:{span:12}},[e("div",{staticClass:"box",style:{width:t.width+"px",height:t.height+"px"}},[e("div",{staticClass:"charts",attrs:{id:"charts1"}})])]),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"box",style:{width:t.width+"px",height:t.height+"px"}},[e("div",{staticClass:"charts",attrs:{id:"charts2"}})])])],1),e("el-row",[e("el-col",{attrs:{span:12}},[e("div",{staticClass:"box",style:{width:t.width+"px",height:t.height+"px"}},[e("div",{staticClass:"charts",attrs:{id:"charts3"}})])]),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"box",style:{width:t.width+"px",height:t.height+"px"}},[e("div",{staticClass:"charts",attrs:{id:"charts4"}})])])],1)],1)},i=[],l=e("a593"),r=(e("d568"),e("4360"));e("e0eb");r["a"].state.ConsoleData||l["default"].set(r["a"].state,"ConsoleData",{title:"控制台"});var n={data:function(){return r["a"].state.ConsoleData},computed:{width:function(){return(r["a"].state.AppData.width-250)/2},height:function(){return(r["a"].state.AppData.height-144)/2}},mounted:function(){this.$chart.line("charts1",{title:"折线图",series:[{data:[820,932,901,934,1290,1330,1320],type:"line",smooth:!0}]}),this.$chart.bar("charts2",{title:" 柱状图",xData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],series:[{name:"完成人数",type:"bar",barWidth:"40%",data:[10,52,200,334,390,330,220,52,200,334,390,330]},{name:"报名人数",type:"bar",barWidth:"40%",data:[10,52,200,334,390,330,220,199,69,129,56,489]}]}),this.$chart.cross("charts4",{title:"堆叠区域图",legend:["邮件营销","联盟广告","视频广告","直接访问","搜索引擎"],xData:["周一","周二","周三","周四","周五","周六","周日"],series:[{name:"邮件营销",type:"line",stack:"总量",areaStyle:{},data:[120,132,101,134,90,230,210]},{name:"联盟广告",type:"line",stack:"总量",areaStyle:{},data:[220,182,191,234,290,330,310]},{name:"视频广告",type:"line",stack:"总量",areaStyle:{},data:[150,232,201,154,190,330,410]},{name:"直接访问",type:"line",stack:"总量",areaStyle:{},data:[320,332,301,334,390,330,320]},{name:"搜索引擎",type:"line",stack:"总量",label:{normal:{show:!0,position:"top"}},areaStyle:{},data:[820,932,901,934,1290,1330,1320]}]}),this.$chart.pie("charts3",{title:" 柱状图",legend:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"],series:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}]})}},h=n,c=(e("04f7"),e("9ca4")),d=Object(c["a"])(h,s,i,!1,null,"f5287876",null);a["default"]=d.exports},dbba:function(t,a,e){}}]);
//# sourceMappingURL=chunk-15a24176.25eb34a7.js.map