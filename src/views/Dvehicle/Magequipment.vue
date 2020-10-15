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

         <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
<<<<<<< HEAD
                        <span style="padding-left:9px;font-size: 16px">
=======
                        <span style="padding-left:9px;">
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
<<<<<<< HEAD
                    <div style="text-align: right; font-size: 14px">
=======
                    <div style="text-align: right; ">
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

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

        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
<<<<<<< HEAD
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
=======
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini" >
                    <el-table-column width="80px" type="index" label="#"></el-table-column>
                    <el-table-column prop="device_code" align="left" label="设备编码"></el-table-column>
                    <el-table-column prop="access_ip"  align="center" label="设备接入系统"></el-table-column>
                    <el-table-column prop="add_time" align="left" label="添加时间"></el-table-column>
                    <el-table-column prop="device_model" align="center" label="设备型号"></el-table-column>
                    <el-table-column prop="shop_name" align="center" label="商户名称"></el-table-column>
                    <el-table-column prop="device_purchase" align="center" label="采购额"></el-table-column>
                    <el-table-column prop="device_purchase_time" align="center" label="采购时间"></el-table-column>
                    <el-table-column prop="device_firm" align="right" label="设备厂商"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                 <el-pagination
<<<<<<< HEAD
                    background
=======
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    @size-change="handleSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="SearchFormData.page_num"
                    :page-size="SearchFormData.page_len"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div> 

         <!-- <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @handleAdd="handleAdd" @handleDel="handleDel" @handleEdit="handleEdit" @handleBindSim="handleBindSim" @pageChange="onPageChange"/> -->

         <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="130px">
                <el-form-item label="设备厂商:" required>
                    <el-input v-model="AddFormData.device_firm" />
                </el-form-item>
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
                    <el-input type="number" v-model="AddFormData.device_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-date-picker
                            style="width: 100%"
                            v-model="AddFormData.sim_purchase_time"
                            type="date"
                            placeholder="选择时间">
                    </el-date-picker>
                    <!-- <el-input v-model="AddFormData.sim_purchase_time" /> -->
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
                <el-form-item label="设备厂商:" required>
                    <el-input v-model="EditFormData.device_firm" />
                </el-form-item>
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
                    <el-input type="number" v-model="EditFormData.device_purchase" />
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
            width="450px">
            <el-form :model="bindsiFormData" label-width="130px" label-position="left">
                <el-form-item label="sim卡:" :required="true">
                    <el-select
                    style="width: 100%"
                    v-model="sim_value"
                    @change="choseSim"
                    placeholder="请sim卡">
                    <el-option
                        v-for="item in simAry"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="bindsi_show = false">取消</el-button>
                <el-button @click="onBindsiSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 状态审核 -->
        <el-dialog  
            title="状态审核"
            :visible.sync="check_show"
            width="450px">
            <el-form :model="checkFormData" label-width="130px" label-position="left">
                <el-form-item label="状态:" :required="true">
                   <el-radio-group v-model="checkFormData.status">
                        <el-radio :label="0">未使用</el-radio>
                        <el-radio :label="1">已使用</el-radio>
                        <el-radio :label="2">已报废</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="check_show = false">取消</el-button>
                <el-button @click="onCheckSubmit" type="primary">确定</el-button>
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
    // import TableBase from "@/components/myTables/myTable.vue"

    if (!store.state.ShopDeviceData) {
        Vue.set(store.state, 'ShopDeviceData', {
            rows:[],
            total:0,
            charge_show: false,
            loading:false,
            curr_row:null,
            SearchFormData:{
                page_num:1,
                page_len:10,
            },
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
            direction: 'rtl',
            sim_value: '',
            simAry: [],
            check_show: false,
            checkFormData: {
                status: 0
            }

        });
    }

    export default {
        components: {
            // TableBase,
        },
        data() {
            return store.state.ShopDeviceData
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
        },
        created() {
            this.init()
            lime.req('ShopSimList',{login_token : lime.cookie_get('login_token')}).then(res => {
                this.simAry = res.data.rows.map(v => {
                    return {value: v.uuid, label: v.sim, ...v}
                });
            })
        },
        methods: {
            choseSim(uuid) {
                console.log(uuid)
            },
             // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            change(e) {
                this.$forceUpdate()
            },
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
            onSelectRow(row) {
                this.curr_row = row;
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
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
                // this.AddFormData.device_purchase  = this.AddFormData.device_purchase - 0
                this.AddFormData.sim_purchase_time = this.AddFormData.sim_purchase_time.getFullYear() + '-' + (this.AddFormData.sim_purchase_time.getMonth() + 1) + '-' + this.AddFormData.sim_purchase_time.getDate()
                // let pam = this.AddFormData
                ShopDeviceAdd(this.AddFormData, res => {
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
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
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
            },
            handleStateCheck() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.check_show = true
            },
            onCheckSubmit() {
                lime.req('ShopDeviceEditStatus',{
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid,
                    status: this.checkFormData.status
                }).then( res => {

                }).catch(err => {
                    this.$message.error(err)
                })
            }
        }
        
    }
</script>
<style scoped>
  @import '../../assets/styles/common.css';   
</style>