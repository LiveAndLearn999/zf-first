(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7507fcfb"],{"341f":function(t,e,a){},8990:function(t,e,a){"use strict";var i=a("341f"),o=a.n(i);o.a},"9e55":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{height:"46px","line-height":"46px",overflow:"hidden","border-bottom":"1px solid #F2F2F2"}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("div",{staticStyle:{"padding-left":"16px"}},[a("i",{staticClass:"el-icon-s-unfold"}),a("span",{staticStyle:{"padding-left":"9px"}},[t._v(" "+t._s(t.$store.state.AdminData.active_title)+" ")])])]),a("el-col",{attrs:{span:18}},[a("div",{staticStyle:{"text-align":"right"}},[a("el-link",{staticClass:"menu",on:{click:function(e){return t.onSubMenu("onRefresh",!0)}}},[t._v("刷新")]),t._l(t.$store.state.AdminData.right_menus,(function(e,i){return a("el-link",{key:i,staticClass:"menu",on:{click:function(a){return t.onSubMenu(e)}}},[t._v(" "+t._s(e.name)+" ")])}))],2)])],1)],1),a("div",{staticStyle:{width:"100%",height:"45px","margin-top":"15px","font-size":"14px","padding-left":"20px","box-sizing":"border-box"}},[a("el-select",{staticStyle:{width:"100px","margin-right":"10px"},attrs:{placeholder:"请选择",size:"small"},model:{value:t.search_value,callback:function(e){t.search_value=e},expression:"search_value"}},t._l(t.search_options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),0==t.search_value?a("el-input",{staticStyle:{width:"240px","margin-right":"20px",height:"36px"},attrs:{size:"small"},model:{value:t.SearchFormData.sim,callback:function(e){t.$set(t.SearchFormData,"sim",e)},expression:"SearchFormData.sim"}}):t._e(),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSearchSubmit}},[t._v("搜索")])],1),a("div",{style:{height:t.height-190-20+"px",background:"white"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%","margin-top":"5px"},attrs:{data:t.rows,"row-style":{height:"48px",fontSize:"14px",color:"#3F434C",background:"white",fontWeight:"300"},"header-cell-style":{height:"48px",background:"#f4f8fe",color:"#2a2f3b",fontSize:"16px",fontWeight:"200"},height:t.height-195-68,"default-expand-all":!0,"highlight-current-row":!0,size:"mini"},on:{"current-change":t.onSelectCurrRow}},[a("el-table-column",{attrs:{type:"index",width:"80px",label:"序号"}}),a("el-table-column",{attrs:{prop:"sim","show-overflow-tooltip":"",label:"sim卡号"}}),a("el-table-column",{attrs:{align:"left","show-overflow-tooltip":"",prop:"netflow",label:"总流量"}}),a("el-table-column",{attrs:{prop:"able_flow",label:"剩余流量"}}),a("el-table-column",{attrs:{prop:"sim_purchase",label:"采购金额"}}),a("el-table-column",{attrs:{prop:"add_time","show-overflow-tooltip":"",label:"添加时间"}}),a("el-table-column",{attrs:{prop:"last_time","show-overflow-tooltip":"",label:"结束时间"}}),a("el-table-column",{attrs:{prop:"use_status",label:"使用状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.use_status?a("span",{staticStyle:{color:"green"}},[t._v("已使用")]):0==e.row.use_status?a("span",{staticStyle:{color:"gray"}},[t._v("未使用")]):a("span",{staticStyle:{color:"red"}},[t._v("已报废")])]}}])})],1),a("div",{staticClass:"page",style:{width:t.width-280+"px"}},[a("el-pagination",{attrs:{background:"","current-page":t.SearchFormData.page_num,"page-size":t.SearchFormData.page_len,"page-sizes":[10],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.onPageChange,"update:currentPage":function(e){return t.$set(t.SearchFormData,"page_num",e)},"update:current-page":function(e){return t.$set(t.SearchFormData,"page_num",e)}}})],1)],1),a("el-dialog",{attrs:{title:"添加",visible:t.add_show,width:"450px"},on:{"update:visible":function(e){t.add_show=e}}},[a("el-form",{ref:"addform",attrs:{model:t.AddFormData,"label-width":"80px","label-position":"right",rules:t.rules}},[a("el-form-item",{attrs:{label:"sim卡号:",prop:"sim"}},[a("el-input",{model:{value:t.AddFormData.sim,callback:function(e){t.$set(t.AddFormData,"sim",e)},expression:"AddFormData.sim"}})],1),a("el-form-item",{attrs:{label:"总流量:"}},[a("el-input",{model:{value:t.AddFormData.netflow,callback:function(e){t.$set(t.AddFormData,"netflow",e)},expression:"AddFormData.netflow"}})],1),a("el-form-item",{attrs:{label:"采购额:"}},[a("el-input",{model:{value:t.AddFormData.sim_purchase,callback:function(e){t.$set(t.AddFormData,"sim_purchase",e)},expression:"AddFormData.sim_purchase"}})],1),a("el-form-item",{attrs:{label:"采购时间:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.add_time,callback:function(e){t.add_time=e},expression:"add_time"}})],1),a("el-form-item",{attrs:{label:"剩余流量:"}},[a("el-input",{model:{value:t.AddFormData.able_flow,callback:function(e){t.$set(t.AddFormData,"able_flow",e)},expression:"AddFormData.able_flow"}})],1),a("el-form-item",{attrs:{label:"使用状态:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.status_value,callback:function(e){t.status_value=e},expression:"status_value"}},t._l(t.status_options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.add_show=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.onAddSubmit}},[t._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.edit_show,width:"450px"},on:{"update:visible":function(e){t.edit_show=e}}},[a("el-form",{ref:"editform",attrs:{model:t.EditFormData,"label-width":"80px",rules:t.rules}},[a("el-form-item",{attrs:{label:"sim卡号:",prop:"sim"}},[a("el-input",{model:{value:t.EditFormData.sim,callback:function(e){t.$set(t.EditFormData,"sim",e)},expression:"EditFormData.sim"}})],1),a("el-form-item",{attrs:{label:"总流量:"}},[a("el-input",{model:{value:t.EditFormData.netflow,callback:function(e){t.$set(t.EditFormData,"netflow",e)},expression:"EditFormData.netflow"}})],1),a("el-form-item",{attrs:{label:"采购额:"}},[a("el-input",{model:{value:t.EditFormData.sim_purchase,callback:function(e){t.$set(t.EditFormData,"sim_purchase",e)},expression:"EditFormData.sim_purchase"}})],1),a("el-form-item",{attrs:{label:"采购时间:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.edit_time,callback:function(e){t.edit_time=e},expression:"edit_time"}})],1),a("el-form-item",{attrs:{label:"剩余流量:"}},[a("el-input",{model:{value:t.EditFormData.able_flow,callback:function(e){t.$set(t.EditFormData,"able_flow",e)},expression:"EditFormData.able_flow"}})],1),a("el-form-item",{attrs:{label:"使用状态:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.edit_status_value,callback:function(e){t.edit_status_value=e},expression:"edit_status_value"}},t._l(t.status_options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.edit_show=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.onEditSubmit}},[t._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"充值",visible:t.charge_show,width:"500px"},on:{"update:visible":function(e){t.charge_show=e}}},[a("div",{staticStyle:{width:"100%",height:"300px",background:"lightgray"}})])],1)},o=[],l=a("a593"),s=a("4360"),r=a("d568"),n=a("e0eb"),u=a("0c6d"),c=(a("db81"),a("38bc")),d=a.n(c);a("70e7");d.a.configure({easing:"ease",speed:500,showSpinner:!1,trickleSpeed:200,minimum:.3}),s["a"].state.SimanageData||l["default"].set(s["a"].state,"SimanageData",{search_options:[{value:0,label:"sim卡号"}],search_value:0,status_options:[{value:0,label:"未使用"},{value:1,label:"已使用"},{value:2,label:"已报废"}],status_value:0,edit_status_value:0,rules:{sim:[{required:!0,message:"SIM卡号必填",trigger:"blur"}]},total:0,charge_show:!1,loading:!1,curr_row:null,add_show:!1,AddFormData:{},add_time:new Date,edit_time:new Date,detail_show:!1,DetailFormData:{},del_show:!1,edit_show:!1,EditFormData:{},SearchFormData:{page_num:1,page_len:10,sim:""},rows:[],columns:[{prop:"able_flow",label:"剩余流量"},{prop:"add_time",label:"添加时间"},{prop:"last_time",label:"结束时间"},{prop:"netflow",label:"总流量"},{prop:"sim",label:"sim卡号"},{prop:"sim_purchase",label:"采购金额"},{prop:"use_status",label:"使用状态"},{prop:"netflow",label:"总流量"}],cpname:"Sim卡管理"});var m={components:{},computed:{width:function(){return s["a"].state.AppData.width},height:function(){return s["a"].state.AppData.height}},data:function(){return s["a"].state.SimanageData},created:function(){this.init()},methods:{onSearchSubmit:function(){this.init()},handleSizeChange:function(t){console.log("每页 ".concat(t," 条"))},onPageChange:function(t){this.SearchFormData.page_num=t,this.init()},change:function(t){this.$forceUpdate()},onSubMenu:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n["a"].submenu(t,this,r["a"].cookie_get("login_token"),e)},init:function(){var t=this;d.a.start();var e={login_token:r["a"].cookie_get("login_token"),page_len:this.SearchFormData.page_len,page_num:this.SearchFormData.page_num,sim:this.SearchFormData.sim};r["a"].req("ShopSimList",e).then((function(e){d.a.done(),t.rows=e.data.rows,t.total=e.data.total})),setTimeout((function(){d.a.done()}),1e4)},onRefresh:function(){this.init()},onSelectCurrRow:function(t){this.curr_row=t},handleAdd:function(){this.add_show=!0},onAddSubmit:function(){var t=this;this.AddFormData.login_token=r["a"].cookie_get("login_token");var e=this.AddFormData;this.AddFormData.sim_purchase_time=n["a"].eleDate(this.add_time),this.AddFormData.use_status=this.status_value+"",this.$refs["addform"].validate((function(a){a?Object(u["J"])(e,(function(e){t.init(),t.add_show=!1})).catch((function(e){t.$message.error(e.msg)})):console.log("submit err!")}))},handleEdit:function(){if(n["a"].empty(this.curr_row))return this.$message.error("请选择一条数据"),!1;this.EditFormData=this.curr_row,this.edit_time=1e3*this.curr_row.sim_purchase_time,this.edit_status_value=this.curr_row.use_status,this.edit_show=!0},handleDel:function(){var t=this;n["a"].empty(this.curr_row)?this.$message.error("请选择一条数据"):this.$confirm("确认删除?","提示").then((function(){var e={login_token:r["a"].cookie_get("login_token"),uuid:t.curr_row.uuid};Object(u["K"])(e,(function(e){t.init(),t.$message.success("操作成功")})).catch((function(e){t.$message.error(e.msg)}))}))},onEditSubmit:function(){var t=this;this.EditFormData.login_token=r["a"].cookie_get("login_token");var e=this.EditFormData;this.EditFormData.netflow=this.EditFormData.netflow+"",this.EditFormData.sim_purchase=this.EditFormData.sim_purchase+"",this.EditFormData.ableflow=this.EditFormData.ableflow+"",this.EditFormData.sim_purchase_time=n["a"].eleDate(this.edit_time),this.EditFormData.use_status=this.edit_status_value+"",this.$refs["editform"].validate((function(a){a?Object(u["L"])(e,(function(e){t.init(),t.edit_show=!1})).catch((function(e){t.$message.error(e.msg)})):console.log("submit err!")}))},handleStreamRecharge:function(){this.charge_show=!0}}},h=m,p=(a("8990"),a("9ca4")),_=Object(p["a"])(h,i,o,!1,null,"3f5117f4",null);e["default"]=_.exports}}]);
//# sourceMappingURL=chunk-7507fcfb.63b4924e.js.map