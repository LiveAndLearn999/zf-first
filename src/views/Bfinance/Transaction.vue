<<<<<<< HEAD
<!--
 * @Author:  xk
 * @Date: 2020-09-09 14:31:39
 * @LastEditTime: 2020-09-16 16:40:32
 * @LastEditors: Please set LastEditors
 * @Description: 与平台交易
 * @FilePath: /shop/src/views/Admin/Transaction.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right;font-size: 16px ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 150 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                :data="rows"
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 8"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="trade_type" label="交易类型"></el-table-column>
                <el-table-column prop="trade" label="关联交易编码"></el-table-column>
                <el-table-column prop="trade_money" label="交易金额"></el-table-column>
                <el-table-column prop="add_time" label="记录时间" :sortable=true></el-table-column>
                <el-table-column prop="add_ip" label="记录ip"></el-table-column>
                <!-- <el-table-column prop="remark" label="备注"></el-table-column> -->
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
<<<<<<< HEAD
=======
            </div>
        </div>

        <!-- 详细 -->
         <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',paddingLeft: '60px',paddingTop: '20px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
            <el-form :model="DetailFormData" label-width="120px" label-position="left">
                <el-form-item label="交易类型:">{{DetailFormData.trade_type || '----'}}</el-form-item>
                <el-form-item label="关联交易编码:">{{DetailFormData.trade || '----'}}</el-form-item>
                <el-form-item label="交易金额:">{{DetailFormData.trade_money || '----'}}</el-form-item>
                <el-form-item label="记录时间:">{{DetailFormData.add_time || '----'}}</el-form-item>
                <el-form-item label="记录ip:">{{DetailFormData.add_ip || '----'}}</el-form-item>
                <el-form-item label="备注:">{{DetailFormData.remark || '----'}}</el-form-item>
            </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </div>
        </el-drawer>

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.SpData) {
        Vue.set(store.state, 'SpData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            SearchFormData:{
                real_name:'',

                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            detail_show:false,
            DetailFormData: {}
        });
    }

    export default {
        data() {
            return store.state.SpData;
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            }
        },
        created(){
            this.init();
        },
        methods:{
             handleSizeChange(val) {console.log(`每页 ${val} 条`);},
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            // 数据初始化
            init() {
                // this.loading = true;
                NProgress.start();
                lime.req('ShopManageTradeList', {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done();
                    // this.loading = false;
                }, 10000);
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 排序处理
            onSortChange(sort) {
                console.log(sort);
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                
                this.init();
            },
            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            //详情
            handleDetail() {
                // ShopManageTradeDetail
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.DetailFormData = this.curr_row 
                this.detail_show = true
            }
        }
        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
    .drawer-footer {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999999;
    }
=======
<!--
 * @Author:  xk
 * @Date: 2020-09-09 14:31:39
 * @LastEditTime: 2020-09-16 16:40:32
 * @LastEditors: Please set LastEditors
 * @Description: 与平台交易
 * @FilePath: /shop/src/views/Admin/Transaction.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right;font-size: 16px ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 150 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                :data="rows"
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 8"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="trade_type" label="交易类型"></el-table-column>
                <el-table-column prop="trade" label="关联交易编码"></el-table-column>
                <el-table-column prop="trade_money" label="交易金额"></el-table-column>
                <el-table-column prop="add_time" label="记录时间" :sortable=true></el-table-column>
                <el-table-column prop="add_ip" label="记录ip"></el-table-column>
                <!-- <el-table-column prop="remark" label="备注"></el-table-column> -->
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
            </div>
        </div>

        <!-- 详细 -->
         <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',paddingLeft: '60px',paddingTop: '20px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
            <el-form :model="DetailFormData" label-width="120px" label-position="left">
                <el-form-item label="交易类型:">{{DetailFormData.trade_type || '----'}}</el-form-item>
                <el-form-item label="关联交易编码:">{{DetailFormData.trade || '----'}}</el-form-item>
                <el-form-item label="交易金额:">{{DetailFormData.trade_money || '----'}}</el-form-item>
                <el-form-item label="记录时间:">{{DetailFormData.add_time || '----'}}</el-form-item>
                <el-form-item label="记录ip:">{{DetailFormData.add_ip || '----'}}</el-form-item>
                <el-form-item label="备注:">{{DetailFormData.remark || '----'}}</el-form-item>
            </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </div>
        </el-drawer>

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.SpData) {
        Vue.set(store.state, 'SpData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            SearchFormData:{
                real_name:'',

                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            detail_show:false,
            DetailFormData: {}
        });
    }

    export default {
        data() {
            return store.state.SpData;
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            }
        },
        created(){
            this.init();
        },
        methods:{
             handleSizeChange(val) {console.log(`每页 ${val} 条`);},
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            // 数据初始化
            init() {
                // this.loading = true;
                NProgress.start();
                lime.req('ShopManageTradeList', {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done();
                    // this.loading = false;
                }, 10000);
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 排序处理
            onSortChange(sort) {
                console.log(sort);
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                
                this.init();
            },
            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            //详情
            handleDetail() {
                // ShopManageTradeDetail
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.DetailFormData = this.curr_row 
                this.detail_show = true
            }
        }
        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
    .drawer-footer {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999999;
    }
<<<<<<< HEAD
=======
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
</style>