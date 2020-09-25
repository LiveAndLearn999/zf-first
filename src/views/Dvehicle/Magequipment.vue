<!--
 * @Author: your name
 * @Date: 2020-09-15 16:10:18
 * @LastEditTime: 2020-09-23 16:14:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Magequipment.vue
-->
<template>
     <div>
         <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @handleAdd="handleAdd" @handleDel="handleDel" @handleEdit="handleEdit" @handleBindSim="handleBindSim" @pageChange="onPageChange"/>

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

        <!-- 编辑 -->
        <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="130px">
                <el-form-item label="车辆厂商:" required>
                    <el-input v-model="EditFormData.vehicle_firm" />
                </el-form-item>
                <el-form-item label="设备编码:">
                    <el-input v-model="EditFormData.device_code" />
                </el-form-item>
                <el-form-item label="设备型号:">
                    <el-input v-model="EditFormData.device_model" />
                </el-form-item>
                <el-form-item label="采购额:">
                    <el-input v-model="EditFormData.sim_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-input v-model="EditFormData.sim_purchase_time" />
                </el-form-item>
                <el-form-item label="设备接入系统的IP:">
                    <el-input v-model="EditFormData.access_ip" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 绑定 -->
        <el-dialog  
            title="绑定Sim卡"
            :visible.sync="bindsi_show"
            width="500px">
            <el-form :model="bindsiFormData" label-width="130px">
                <el-form-item label="车辆厂商:" required>
                    <el-input v-model="bindsiFormData.vehicle_firm" />
                </el-form-item>
                <el-form-item label="设备编码:" required>
                    <el-input v-model="bindsiFormData.device_code" />
                </el-form-item>
                <el-form-item label="设备型号:" required>
                    <el-input v-model="bindsiFormData.device_model" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="bindsi_show = false">取消</el-button>
                <el-button @click="onBindsiSubmit" type="primary">确定</el-button>
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

    if (!store.state.ShopDeviceData) {
        Vue.set(store.state, 'ShopDeviceData', {
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
            page_num:1,
            page_len:10,
            bindsi_show: false,
            bindsiFormData: {},
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
            cpname: '设备管理',
            direction: 'rtl'

        });
    }

    export default {
        components: {
            TableBase,
        },
        data() {
            return store.state.ShopDeviceData
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
                this.page_num = page;
                console.log(page)
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
            //删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid: this.curr_row.uuid
                    }
                    ShopDeviceDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            // 编辑
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }
                ShopDeviceDetail(pam, res => {
                    this.EditFormData = res.data
                }).catch(err => {
                        this.$message.error(err.msg);
                })
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                let pam = this.EditFormData
                ShopDeviceEdit(pam, res => {
                   this.init();
                   this.edit_show = false;
                }).catch(err => {
                        this.$message.error(err.msg);
                })
            },
            // 绑定
            handleBindSim() {
                this.bindsi_show = true
            },
            onBindsiSubmit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.bindsiFormData.login_token = lime.cookie_get('login_token')
                ShopDeviceBind(this.bindsiFormData, res => {
                   this.init();
                   this.bindsi_show = false;
                }).catch(err => {
                        this.$message.error(err.msg);
                })
            }
        }
        
    }
</script>
<style scoped>
  @import '../../assets/styles/common.css';   
</style>