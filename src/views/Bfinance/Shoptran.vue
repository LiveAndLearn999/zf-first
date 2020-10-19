<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:13:58
 * @LastEditTime: 2020-09-16 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Bfinance/Shoptran.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; ">
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
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400',height: '48px'}"
                :height="height - 195 - 8"
                v-loading="loading"
                element-loading-text="拼命加载中"

                element-loading-background="rgba(0, 0, 0, 0.1)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="序号"></el-table-column>
                <el-table-column prop="trade_type" label="交易类型"></el-table-column>
                <el-table-column prop="trade_code" label="交易编号"></el-table-column>
                <el-table-column prop="trade_state" label="交易状态"></el-table-column>
                <el-table-column prop="coins" label="学币数"></el-table-column>
                <el-table-column prop="trade_money" label="交易金额"></el-table-column>
                <el-table-column prop="remark" label="交易备注"></el-table-column>
                <el-table-column prop="add_time" label="添加时间"></el-table-column>
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
            </div>
        </div>

        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
           <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form  label-width="100px" label-position="right">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="交易类型:">{{DetailFormData.trade_type == 10 ? '结算' : '---'}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                           <el-form-item label="交易编号:">{{DetailFormData.trade_code || '----'}}</el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="交易状态:">{{DetailFormData.trade_state || '---'}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学币数:">{{DetailFormData.coins || '---'}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="交易金额:">{{DetailFormData.trade_money || '---'}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="交易备注:">{{DetailFormData.remark || '---'}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="添加时间:">{{DetailFormData.add_time || '---'}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
             <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
                </div>
        </el-drawer>

        <!-- 详情模板 -->
        <!-- <el-dialog  
            title=""
            :visible.sync="detail_show"
            width="500px">
            <el-form  label-width="120px">
                <el-form-item label="交易类型:">{{DetailFormData.trade_type}}</el-form-item>
                <el-form-item label="交易编号:">{{DetailFormData.trade_code}}</el-form-item>
                <el-form-item label="交易状态:">{{DetailFormData.trade_state}}</el-form-item>
                <el-form-item label="学币数:">{{DetailFormData.coins}}</el-form-item>
                <el-form-item label="交易金额:">{{DetailFormData.trade_money}}</el-form-item>
                <el-form-item label="交易备注:">{{DetailFormData.remark}}</el-form-item>
                <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
            </el-form>
        </el-dialog> -->

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.ShoptranData) {
        Vue.set(store.state, 'ShoptranData', {
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
            return store.state.ShoptranData;
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
                this.loading = true;

                lime.req('ShopTradeAccountList', {
                    login_token:lime.cookie_get('login_token'),
                    // page_num:this.SearchFormData.page_num,
                    page_num:'1',
                    // page_len:this.SearchFormData.page_len,
                    page_len:'10',
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
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
            handleDetail() {
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

 .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
        display: block;
}
=======
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:13:58
 * @LastEditTime: 2020-09-16 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Bfinance/Shoptran.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; ">
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
        <div style="border-top: solid 1px #f2f1f4;">
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                :data="rows"
                 stripe
               :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400',height: '48px'}"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"

                element-loading-background="rgba(0, 0, 0, 0.1)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" width="80px" label="序号"></el-table-column>
                <el-table-column prop="trade_type" label="交易类型"></el-table-column>
                <el-table-column prop="trade_code" label="交易编号"></el-table-column>
                <el-table-column prop="trade_state" label="交易状态"></el-table-column>
                <el-table-column prop="coins" label="学币数"></el-table-column>
                <el-table-column prop="trade_money" label="交易金额"></el-table-column>
                <el-table-column prop="remark" label="交易备注"></el-table-column>
                <el-table-column prop="add_time" label="添加时间"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 290 + 'px'}">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
            </div>
        </div>

        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
           <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',margin:'0 auto',paddingLeft: '60px',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form  label-width="80px" label-position="left">
                    <el-form-item label="交易类型:">{{DetailFormData.trade_type == 10 ? '结算' : '---'}}</el-form-item>
                    <el-form-item label="交易编号:">{{DetailFormData.trade_code}}</el-form-item>
                    <el-form-item label="交易状态:">{{DetailFormData.trade_state}}</el-form-item>
                    <el-form-item label="学币数:">{{DetailFormData.coins}}</el-form-item>
                    <el-form-item label="交易金额:">{{DetailFormData.trade_money}}</el-form-item>
                    <el-form-item label="交易备注:">{{DetailFormData.remark}}</el-form-item>
                    <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
                </el-form>
            </div>
             <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
                </div>
        </el-drawer>

        <!-- 详情模板 -->
        <!-- <el-dialog  
            title=""
            :visible.sync="detail_show"
            width="500px">
            <el-form  label-width="120px">
                <el-form-item label="交易类型:">{{DetailFormData.trade_type}}</el-form-item>
                <el-form-item label="交易编号:">{{DetailFormData.trade_code}}</el-form-item>
                <el-form-item label="交易状态:">{{DetailFormData.trade_state}}</el-form-item>
                <el-form-item label="学币数:">{{DetailFormData.coins}}</el-form-item>
                <el-form-item label="交易金额:">{{DetailFormData.trade_money}}</el-form-item>
                <el-form-item label="交易备注:">{{DetailFormData.remark}}</el-form-item>
                <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
            </el-form>
        </el-dialog> -->

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.ShoptranData) {
        Vue.set(store.state, 'ShoptranData', {
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
            return store.state.ShoptranData;
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
                this.loading = true;

                lime.req('ShopTradeAccountList', {
                    login_token:lime.cookie_get('login_token'),
                    // page_num:this.SearchFormData.page_num,
                    page_num:'1',
                    // page_len:this.SearchFormData.page_len,
                    page_len:'10',
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
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
            handleDetail() {
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
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
</style>