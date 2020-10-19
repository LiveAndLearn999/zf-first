<!--
 * @Author: your name
 * @Date: 2020-09-16 17:13:46
 * @LastEditTime: 2020-09-21 10:03:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Krelation/enterprise.vue
-->
<template>
    <!-- <h6>关联企业</h6> -->
    <div>
        <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange" @handleDetail="handleDetail"/>

         <!-- 详细 -->
        <el-dialog  
            title=""
            :visible.sync="detail_show"
            width="500px">
            <el-form :model="DetailFormData" label-width="130px">
                <el-form-item label="名称:">{{DetailFormData.name}}</el-form-item>
                <el-form-item label="商户门面:">{{DetailFormData.face_img}}</el-form-item>
                <el-form-item label="商铺描述:">{{DetailFormData.remark}}</el-form-item>
                <el-form-item label="门店详细描述:">{{DetailFormData.detail}}</el-form-item>
                <el-form-item label="地址:">{{DetailFormData.addr}}</el-form-item>
                <el-form-item label="联系人:">{{DetailFormData.contact_cname}}</el-form-item>
                <el-form-item label="联系电话:">{{DetailFormData.contact_tel}}</el-form-item>
                <el-form-item label="企业类型:">{{DetailFormData.shop_type}}</el-form-item>
                <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
                <el-form-item label="修改时间:">{{DetailFormData.last_time}}</el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopAgentShopList, ShopAgentShopDetail } from "@/api/request"
    import TableBase from "@/components/myTables/myTable.vue"
    

    if (!store.state.relationEntpsData) {
        Vue.set(store.state, 'relationEntpsData', {
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
                {prop: 'name', label: '名称'},
                {prop: 'face_img', label: '商户门面'},
                {prop: 'remark', label: '商铺描述'},
                {prop: 'detail', label: '门店详细描述'},
                {prop: 'addr', label: '地址'},
                {prop: 'contact_cname', label: '联系人'},
                {prop: 'contact_tel', label: '联系电话'},
                {prop: 'shop_type', label: '企业类型'},
                {prop: 'add_time', label: '添加时间'},
                {prop: 'last_time', label: '修改时间'}
            ],
            cpname: '企业列表',

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.relationEntpsData
        },
        created() {
            this.init()
        },
         methods: {
            change(e) {
                this.$forceUpdate()
            },
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.page_len,
                    page_num: this.page_num
                }
                ShopAgentShopList(pam, res => {
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
            //详细
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
</style>