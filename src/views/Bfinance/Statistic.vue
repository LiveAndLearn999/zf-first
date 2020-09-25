<!--
 * @Author: your name
 * @Date: 2020-09-10 17:16:53
 * @LastEditTime: 2020-09-21 09:58:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Bfinance/Statistic.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
    <div>
        <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange"  />
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopTradeAccountList } from "@/api/request"
    import TableBase from "@/components/myTables/myTable.vue"

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

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.ShopTradeAccountData
        },
        created() {
            this.init()
        },
        methods: {
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.page_len + '',
                    page_num: this.page_num + ''
                }
                ShopTradeAccountList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
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