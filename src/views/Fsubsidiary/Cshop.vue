<!--
 * @Author: your name
 * @Date: 2020-09-10 17:44:01
 * @LastEditTime: 2020-09-21 10:02:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Fsubsidiary/Cshop.vue
-->

<template>
    <div>
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
        <!-- <h6>{{cpname}}</h6> -->
        <TableBase :loading="loading" :rows="rows" :columns="columns" />

        <!-- 详细 -->
        <el-dialog 
            title=""
            width="450px"
            :visible.sync="detail_show">
            <el-form :model="DetailFormData" label-width="120px">
                <el-form-item label="商户门面:">{{DetailFormData.face_img || '----'}}</el-form-item>
                <el-form-item label="商铺描述:">{{DetailFormData.remark || '----'}}</el-form-item>
                <el-form-item label="门店详细描述:">{{DetailFormData.detail || '----'}}</el-form-item>
                <el-form-item label="地址:">{{DetailFormData.addr || '----'}}</el-form-item>
                <el-form-item label="联系人:">{{DetailFormData.contact_cname || '----'}}</el-form-item>
                <el-form-item label="联系电话:">{{DetailFormData.contact_tel || '----'}}</el-form-item>
                <el-form-item label="企业类型:">{{DetailFormData.shop_type || '----'}}</el-form-item>
                <el-form-item label="添加时间:">{{DetailFormData.add_time || '----'}}</el-form-item>
                <el-form-item label="修改时间:">{{DetailFormData.last_time || '----'}}</el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopChildList } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue";

    if (!store.state.CshopData) {
        Vue.set(store.state, 'CshopData', {
            total:0,
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
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'face_img', label: '商户门面'},
                {prop: 'remark', label: '商铺描述'},
                {prop: 'detail', label: '门店详细描述'} ,
                {prop: 'addr', label: '地址'},
                {prop: 'contact_cname', label: '联系人'},
                {prop: 'contact_tel', label: '联系电话'} ,
                {prop: 'shop_type', label: '企业类型'} ,
                {prop: 'add_time', label: '添加时间'} ,
                {prop: 'last_time', label: '修改时间'}   
            ],
            // cpname: '企业列表',
            

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.CshopData;
        },
        created() {
            this.init()
        },
        methods: {
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
                this.loading = true;
                let pam = {
                    login_token: lime.cookie_get('login_token')
                }
                ShopChildList(pam, res => {
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
            },
            onRefresh() {
                this.init()
            },
            handleDetail() {
                this.detail_show = true
            }
        }
        
    }
</script>

<style scoped>
   @import '../../assets/styles/common.css'; 
   .el-dialog-div{
    height: 60vh;
     overflow: auto;
    }

</style>