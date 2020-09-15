<!--
 * @Author: your name
 * @Date: 2020-09-15 16:10:18
 * @LastEditTime: 2020-09-15 18:34:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Magequipment.vue
-->
<template>
     <div>
         <TableBase :loading="loading" :page_num="SearchFormData.page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @handleAdd="handleAdd" @pageChange="onPageChange"/>

         <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="130px">
                <el-form-item label="车辆厂商:" required>
                    <el-input v-model="AddFormData.vehicle_firm" />
                </el-form-item>
                <el-form-item label="设备编码:" required>
                    <el-input v-model="AddFormData.device_code" />
                </el-form-item>
                <el-form-item label="设备型号:" required>
                    <el-input v-model="AddFormData.device_model" />
                </el-form-item>
                <el-form-item label="采购额:" required> 
                    <el-input v-model="AddFormData.sim_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-input v-model="AddFormData.sim_purchase_time" />
                </el-form-item>
                <el-form-item label="设备接入系统的IP:">
                    <el-input v-model="AddFormData.access_ip" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

     </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopDeviceList, ShopDeviceAdd, ShopDeviceDel, ShopDeviceEdit, ShopDeviceDetail, ShopDeviceBind, ShopDeviceUnbind, ShopDeviceEditStatus } from "@/api/request"
    import TableBase from "@/components/myTables/myTable.vue"

    if (!store.state.SimanageData) {
        Vue.set(store.state, 'SimanageData', {
            rows:[],
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

            SearchFormData:{
                page_num:1,
                page_len:10
            },
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'vehicle_firm', label: '车辆厂商'},
                {prop: 'device_code', label: '设备编码'},
                {prop: 'device_model', label: '设备型号'},
                {prop: 'sim_purchase', label: '采购额'},
                {prop: 'sim_purchase_time', label: '采购时间'},
                {prop: 'access_ip', label: '设备接入系统的IP'}
            ],
            cpname: 'Sim卡管理',

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.SimanageData
        },
        created() {
            this.init()
        },
        methods: {
            change(e) {
                this.$forceUpdate()
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            // onSubMenu(menu, local = false) {
            //     util.submenu(menu,this,lime.cookie_get('login_token'), local);
            // },
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.SearchFormData.page_len,
                    page_num: this.SearchFormData.page_num
                }
                ShopDeviceList(pam, res => {
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
                this.SearchFormData.page_num = page;
                this.init();
            },
            //添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                let pam = this.AddFormData
                ShopDeviceAdd(pam, res => {
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
        }
        
    }
</script>
<style scoped>
  @import '../../assets/styles/common.css';   
</style>