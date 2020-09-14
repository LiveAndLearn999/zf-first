<!--
 * @Author: your name
 * @Date: 2020-09-10 17:13:58
 * @LastEditTime: 2020-09-11 14:54:41
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
            <el-table 
                :data="rows"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="trade_type" label="交易类型"></el-table-column>
                <el-table-column prop="trade_code" label="交易编号"></el-table-column>
                <el-table-column prop="trade_state" label="交易状态"></el-table-column>
                <el-table-column prop="coins" label="学币数"></el-table-column>
                <el-table-column prop="trade_money" label="交易金额"></el-table-column>
                <el-table-column prop="remark" label="交易备注"></el-table-column>
                <el-table-column prop="add_time" label="添加时间"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 详情模板 -->
        <el-dialog  
            title="详情"
            :visible.sync="detail_show"
            width="500px">
            <h1>dddd</h1>

            <!-- <span slot="footer">
                <el-button @click="detail_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span> -->
        </el-dialog>

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
            detail_show:false
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
                this.detail_show = true
            }
        }
        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
</style>