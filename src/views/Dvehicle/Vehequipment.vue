<!--
 * @Author:  xk
 * @Date: 2020-09-15 15:56:01
 * @LastEditTime: 2020-09-16 11:42:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Vehequipment.vue
-->
<template>
    <div>
        <div v-if="!show_map">
            <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange" @handleAdd="handleAdd" @handleEdit="handleEdit" @handleDel="handleDel" @handleLookPath="handleLookPath" />

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="140px">
                <el-form-item label="车辆uuid:" required>
                    <el-input v-model="AddFormData.vehicle_uuid" />
                </el-form-item>
                <el-form-item label="车辆厂商:" required>
                    <el-input v-model="AddFormData.vehicle_firm" />
                </el-form-item>
                <el-form-item label="车架号:" required>
                    <el-input v-model="AddFormData.vehicle_vin" />
                </el-form-item>
                <el-form-item label="车主:" required> 
                    <el-input v-model="AddFormData.vehicle_owner" />
                </el-form-item>
                <el-form-item label="车主手机:" required>
                    <el-input v-model="AddFormData.owner_tel" />
                </el-form-item>
                <el-form-item label="责任人 ：市场人员:" required>
                    <el-input v-model="AddFormData.market" />
                </el-form-item>
                <el-form-item label="车辆类型:" required>
                    <el-input v-model="AddFormData.vehicle_type" />
                </el-form-item>
                <el-form-item label="总质量（kg）:" required>
                    <el-input v-model="AddFormData.vehicle_weight" />
                </el-form-item>
                <el-form-item label="准牵引总质量（kg）:" required>
                    <el-input v-model="AddFormData.transfer_weight" />
                </el-form-item>
                <el-form-item label="外廓尺寸（mm）长:" required>
                    <el-input v-model="AddFormData.outline_long" />
                </el-form-item>
                <el-form-item label="外廓尺寸（mm）宽:" required>
                    <el-input v-model="AddFormData.outline_wide" />
                </el-form-item>
                <el-form-item label="外轮廓高:" required>
                    <el-input v-model="AddFormData.outline_high" />
                </el-form-item>
                <el-form-item label="运输类别:" required>
                    <el-input v-model="AddFormData.business_type" />
                </el-form-item>
                <el-form-item label="入网类型:" required>
                    <el-input v-model="AddFormData.inline_type" />
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
            <el-form :model="EditFormData" label-width="140px">
                <el-form-item label="车辆uuid:">
                    <el-input v-model="EditFormData.vehicle_uuid" />
                </el-form-item>
                <el-form-item label="车辆厂商:">
                    <el-input v-model="EditFormData.vehicle_firm" />
                </el-form-item>
                <el-form-item label="车架号:">
                    <el-input v-model="EditFormData.vehicle_vin" />
                </el-form-item>
                <el-form-item label="车主:"> 
                    <el-input v-model="EditFormData.vehicle_owner" />
                </el-form-item>
                <el-form-item label="车主手机:">
                    <el-input v-model="EditFormData.owner_tel" />
                </el-form-item>
                <el-form-item label="责任人 ：市场人员:">
                    <el-input v-model="EditFormData.market" />
                </el-form-item>
                <el-form-item label="车辆类型:">
                    <el-input v-model="EditFormData.vehicle_type" />
                </el-form-item>
                <el-form-item label="总质量（kg）:">
                    <el-input v-model="EditFormData.vehicle_weight" />
                </el-form-item>
                <el-form-item label="准牵引总质量（kg）:">
                    <el-input v-model="EditFormData.transfer_weight" />
                </el-form-item>
                <el-form-item label="外廓尺寸（mm）长:">
                    <el-input v-model="EditFormData.outline_long" />
                </el-form-item>
                <el-form-item label="外廓尺寸（mm）宽:">
                    <el-input v-model="AddFormData.outline_wide" />
                </el-form-item>
                <el-form-item label="外轮廓高:">
                    <el-input v-model="EditFormData.outline_high" />
                </el-form-item>
                <el-form-item label="运输类别:">
                    <el-input v-model="EditFormData.business_type" />
                </el-form-item>
                <el-form-item label="入网类型:">
                    <el-input v-model="EditFormData.inline_type" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>
        </div>
        <div v-else>
            <MyMap />
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopVehExtendList, ShopVehExtendAdd, ShopVehExtendDel, ShopVehExtendEdit, ShopVehExtendDetail, ShopVehExtendBind, ShopVehExtendUnbind} from "@/api/request"
    import TableBase from "@/components/myTables/myTable.vue"
    import MyMap from "@/components/myBmap/myMap.vue"

    if (!store.state.ShopVehExtendData) {
        Vue.set(store.state, 'ShopVehExtendData', {
            show_map: false,
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
                {prop: 'shop_name', label: '商户名称'},
                {prop: 'vehicle_firm', label: '车辆厂商'},
                {prop: 'vehicle_vin', label: '车架号'},
                {prop: 'vehicle_owner', label: '车主'},
                {prop: 'owner_tel', label: '车主手机'},
                {prop: 'market', label: '责任人'},
                {prop: 'vehicle_type', label: '车辆类型'},
                {prop: 'vehicle_weight', label: '总质量（kg）'},
                {prop: 'transfer_weight', label: '准牵引总质量（kg）'},
                {prop: 'outline_long', label: '外廓尺寸（mm）长'}
            ],
            cpname: '车辆管理',

        });
    }

    export default {
        components: {
            TableBase,
            MyMap
        },
        data() {
            return store.state.ShopVehExtendData
        },
        created() {
            this.init()
            this.show_map = false
        },
        methods: {
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.page_len,
                    page_num: this.page_num
                }
                ShopVehExtendList(pam, res => {
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
            handleAdd(){
                this.add_show = true
                console.log(99999)
            },
            onAddSubmit() {
                
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
                    ShopVehExtendDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            
            //编辑
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
               let pam = {
                    login_token:lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }
                ShopVehExtendDetail( pam, res => {
                    this.EditFormData = res.data
                }).catch(err => {
                        this.$message.error(err.msg);
                })
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                let pam = this.EditFormData
                ShopVehExtendEdit(pam, res => {
                   this.init();
                   this.edit_show = false;
                }).catch(err => {
                        this.$message.error(err.msg);
                })
            },
            //查看轨迹
            handleLookPath() {
                this.show_map = true
                console.log(111111)
            }
        }
        
    }
</script>
<style scoped>
    @import '../../assets/styles/common.css';
</style>