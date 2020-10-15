<!--
 * @Author: your name
 * @Date: 2020-09-10 17:16:53
 * @LastEditTime: 2020-09-27 14:11:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Bfinance/Statistic.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
    <div v-wechat-title="$route.meta.title">
        <div style="height: 46px; line-height: 46px;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
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
        <!-- <TableBase  :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange"  /> -->
        <Finance v-if="show_chart" :dtlist="dtlist" style="margin-top: 2px"/>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopAccountList } from "@/api/request"
    // import TableBase from "@/components/myTables/myTable.vue"
    import Finance from "@/components/myEcharts/finance.vue"

    if (!store.state.ShopTradeAccountData) {
        Vue.set(store.state, 'ShopTradeAccountData', {
            show_map: false,
            total:0,
            charge_show: false,
            loading:false,
            curr_row:null,
             // 添加
            add_show:false,
            AddFormData:{},
            //详细
            detail_show: false,
            DetailFormData:{},
            //删除
            del_show: false,
            //编辑
            edit_show:false,
            EditFormData:{},
            page_num:1,
            page_len:10,
            bindsi_show: false,
            bindsiFormData: {},
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'trade_type', label: '交易类型'},
                {prop: 'trade_code', label: '交易编号'},
                {prop: 'trade_state', label: '交易状态'},
                {prop: 'coins', label: '学币数'},
                {prop: 'trade_money ', label: '交易金额'},
                {prop: 'remark', label: '交易备注'},
                {prop: 'add_time', label: '添加时间'}
            ],
            cpname: '财务统计',
            dtlist: [],
            show_chart: false

        });
    }

    export default {
        components: {
            // TableBase,
            Finance
        },
        data() {
            return store.state.ShopTradeAccountData
        },
        mounted() {
            this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                }
                ShopAccountList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.dtlist = [
                        res.data.enable_coins || 0,res.data.freeze_coins || 0,
                        res.data.enable_money - 0,res.data.freeze_money - 0,
                        res.data.enable_give_money || 0,res.data.integral || 0,
                        res.data.empirical_val || 0 ]
                    this.show_chart = true
                    // this.list = res.data;
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
        },
        methods: {
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
               this.loading = true;
               setTimeout(() => {
                    this.loading = false;
                }, 2000);
            },
            // 刷新
            onRefresh() {
                this.init();
            },
            // 点击单选
            onSelectCurrRow(row) {
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.page_num = page;
                console.log(page)
                this.init();
            },
        }
        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
</style>