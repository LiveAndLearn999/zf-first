<<<<<<< HEAD
<!--
 * @Author:  xk
 * @Date: 2020-09-15 15:56:01
 * @LastEditTime: 2020-09-27 18:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Vehequipment.vue
-->
<template>
    <div>
        <div>
            <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right;font-size: 14px ">
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

        <div style="border-top: solid 1px #f2f1f4;" v-if="!show_map">
            <el-table 
                :data="rows"
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
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
                    <el-table-column width="80px" type="index" label="序号"></el-table-column>
                    <el-table-column prop="plate_number" align="left" label="车牌号"></el-table-column>
                    <el-table-column prop="trailer_plate_number" label="挂车牌照号"></el-table-column>
                    <el-table-column prop="plate_color" label="车辆颜色">
                        <template slot-scope="scope">
                            <span v-if="scope.row.plate_color == 1">蓝色</span>
                            <span v-else-if="scope.row.plate_color == 2">黄色</span>
                            <span v-else-if="scope.row.plate_color == 3">黑色</span>
                            <span v-else-if="scope.row.plate_color == 4">白色</span>
                            <span v-else-if="scope.row.plate_color == 5">绿色</span>
                            <span v-else-if="scope.row.plate_color == 9">其他</span>
                            <span v-else-if="scope.row.plate_color == 91">农黄色</span>
                            <span v-else-if="scope.row.plate_color == 92">农绿色</span>
                            <span v-else-if="scope.row.plate_color == 93">黄绿色</span>
                            <span v-else>渐变绿</span>
                            <!-- {{scope.row.type == 1 ? '企业派送 ' : '员工提交'}} -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="brand" label="品牌"></el-table-column>
                    <el-table-column prop="model" label="型号"></el-table-column>
                    <el-table-column prop="tank_value" label="罐体编号 "></el-table-column>
                    <el-table-column prop="tank_no" label="罐体容积"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                 <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="SearchFormData.page_num"
                    :page-size="SearchFormData.page_len"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div> 
            <!-- <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange" @handleAdd="handleAdd" @handleEdit="handleEdit" @handleDel="handleDel" @handleLookPath="handleLookPath" @handleDetail="handleDetail" @handleBindDevice="handleBindDevice"/> -->

        <!-- 添加 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="AddFormData" label-width="160px" label-position="left">
                    <el-form-item label="车牌号:" :required="true">
                        <el-input v-model="AddFormData.plate_number" />
                    </el-form-item>
                    <el-form-item label="车牌颜色:" :required="true">
                        <el-select
                            style="width: 100%"
                            v-model="color_value"
                            @change="choseColor"
                            placeholder="请选择车辆">
                                <el-option
                                    v-for="item in colorAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="挂车牌照号:">
                        <el-input v-model="AddFormData.trailer_plate_number" />
                    </el-form-item>
                    <el-form-item label="品牌:">
                        <el-input v-model="AddFormData.brand" />
                    </el-form-item>
                    <el-form-item label="罐体编号:">
                        <el-input v-model="AddFormData.tank_value" />
                    </el-form-item>
                    <el-form-item label="罐体容积:">
                        <el-input v-model="AddFormData.tank_no" />
                    </el-form-item>
                    <el-form-item label="道路运输证有效期:">
                        <el-input v-model="AddFormData.road_transport_certificate_number" />
                    </el-form-item>
                    <el-form-item label="挂车车辆型号:">
                        <el-input v-model="AddFormData.trailer_model" />
                    </el-form-item>
                    <el-form-item label="挂车核定吨位:">
                        <el-input v-model="AddFormData.trailer_tonnage" />
                    </el-form-item>
                    <el-form-item label="挂车车辆道路运输证:">
                        <el-input v-model="AddFormData.trailer_road_transport_certificate_number" />
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            
        </el-dialog> -->

        <!-- 编辑 -->
         <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
        <!-- <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="500px"> -->
           <el-form :model="EditFormData" label-width="160px" label-position="left">
                    <el-form-item label="车牌号:">
                        <el-input v-model="EditFormData.plate_number" />
                    </el-form-item>
                    <el-form-item label="车牌颜色:">
                        <el-select
                            style="width: 100%"
                            v-model="color_value"
                            @change="choseColor"
                            placeholder="请选择车辆">
                                <el-option
                                    v-for="item in colorAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="挂车牌照号:">
                        <el-input v-model="EditFormData.trailer_plate_number" />
                    </el-form-item>
                    <el-form-item label="品牌:">
                        <el-input v-model="EditFormData.brand" />
                    </el-form-item>
                    <el-form-item label="罐体编号:">
                        <el-input v-model="EditFormData.tank_value" />
                    </el-form-item>
                    <el-form-item label="罐体容积:">
                        <el-input v-model="EditFormData.tank_no" />
                    </el-form-item>
                    <el-form-item label="道路运输证有效期:">
                        <el-input v-model="EditFormData.road_transport_certificate_number" />
                    </el-form-item>
                    <el-form-item label="挂车车辆型号:">
                        <el-input v-model="EditFormData.trailer_model" />
                    </el-form-item>
                    <el-form-item label="挂车核定吨位:">
                        <el-input v-model="EditFormData.trailer_tonnage" />
                    </el-form-item>
                    <el-form-item label="挂车车辆道路运输证:">
                        <el-input v-model="EditFormData.trailer_road_transport_certificate_number" />
                    </el-form-item>
                </el-form>
            
            <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="edit_show = false">取消</el-button>
                    <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>
        </div>
        </el-drawer>
        <!-- </el-dialog> -->

        <!-- 详细 -->
         <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                    
                <el-form :model="DetailFormData" label-width="180px" label-position="left">
                    <el-form-item label="品牌:">{{DetailFormData.brand || '---'}}</el-form-item>
                    <el-form-item label="型号:">{{DetailFormData.model || '---'}}</el-form-item>
                    <el-form-item label="车辆颜色:">
                        <span v-if="DetailFormData.plate_color == 1">蓝色</span>
                        <span v-else-if="DetailFormData.plate_color == 2">黄色</span>
                        <span v-else-if="DetailFormData.plate_color == 3">黑色</span>
                        <span v-else-if="DetailFormData.plate_color == 4">白色</span>
                        <span v-else-if="DetailFormData.plate_color == 5">绿色</span>
                        <span v-else-if="DetailFormData.plate_color == 9">其他</span>
                        <span v-else>无</span>
                        <!-- {{DetailFormData.plate_color || '---'}} -->
                    </el-form-item>
                    <el-form-item label="车牌号:">{{DetailFormData.plate_number  || '---'}}</el-form-item>
                    <el-form-item label="车辆道路运输证:">{{DetailFormData.road_transport_certificate_number  || '---'}}</el-form-item>
                    <el-form-item label="罐体容积:">{{DetailFormData.tank_no || '---'}}</el-form-item>
                    <el-form-item label="车辆类型:">{{DetailFormData.vehicle_type || '---'}}</el-form-item>
                    <el-form-item label="罐体编号:">{{DetailFormData.tank_value || '---'}}</el-form-item>
                    <el-form-item label="罐体吨位:">{{DetailFormData.tonnage || '---'}}</el-form-item>
                    <el-form-item label="挂车车辆型号:">{{DetailFormData.trailer_model || '---'}}</el-form-item>
                    <el-form-item label="挂车牌照号 :">{{DetailFormData.trailer_plate_number || '---'}}</el-form-item>
                    <el-form-item label="挂车车辆道路运输证:">{{DetailFormData.trailer_road_transport_certificate_number  || '---'}}</el-form-item>
                    <el-form-item label="挂车核定吨位:">{{DetailFormData.trailer_tonnage  || '---'}}</el-form-item>
                    <!-- <el-form-item label="入网类型:">{{DetailFormData.inline_type == 0 ? '新增' : '转网' || '---'}}</el-form-item> -->
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                        <el-button @click="detail_show = false" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 绑定设备 -->
         <el-dialog  
            title="绑定设备"
            :visible.sync="device_show"
            width="400px">
            <el-form :model="DeviceFormData" label-width="160px" label-position="left">
                    <el-form-item label="设备:" required>
                        <el-select
                            v-model="device_value"
                            @change="choseDevice"
                            placeholder="请选择设备">
                                <el-option
                                    v-for="item in deviceAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Sim卡:" >
                        <el-select
                            v-model="sim_value"
                            @change="choseSim"
                            placeholder="请选择Sim卡">
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
                <el-button @click="device_show = false">取消</el-button>
                <el-button @click="onDeviceSubmit" type="primary">确定</el-button>
            </span>
         </el-dialog>

         <div v-if="show_map">
            <MyMap />
        </div>
        
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopVehExtendList, ShopVehExtendAdd, ShopVehExtendDel, ShopVehExtendEdit, ShopVehExtendDetail, ShopVehExtendBind, ShopVehExtendUnbind} from "@/api/request"
    // import TableBase from "@/components/myTables/myTable.vue"
    import MyMap from "@/components/myBmap/myMap.vue"

    if (!store.state.ShopVehExtendData) {
        Vue.set(store.state, 'ShopVehExtendData', {
            show_map: false,
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
            //绑定设备
            device_show: false,
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
            direction: 'rtl',

            vehicle_value: '',
            vehicleAry: [],
            owner_value: '',
            ownerAry: [],
            market_value: '',
            type_value: '',
        
            typeAry: [
                {value: 10, label: '客车'},
                {value: 11, label: '大型客车'},
                {value: 12, label: '中型客车'},
                {value: 13, label: '小型客车'},
                {value: 14, label: '轿车'},
                {value: 15, label: '大型卧铺客车'},
                {value: 16, label: '中型卧铺客车'},
                {value: 20, label: '普通货车'},
                {value: 21, label: '大型普通货车'},
                {value: 22, label: '中型普通货车'},
                {value: 23, label: '小型普通货车'},
                {value: 30, label: '专用运输车'},
                {value: 31, label: '集装箱车'},
                {value: 32, label: '大件运输车'},
                {value: 33, label: '保温冷藏车'},
                {value: 34, label: '商品车运输专用车辆'},
                {value: 35, label: '罐车'},
                {value: 36, label: '牵引车'},
                {value: 37, label: '挂车'},
                {value: 38, label: '平板车'},
                {value: 39, label: '其他专用车'},
                {value: 40, label: '危险品运输车'},
                {value: 50, label: '农用车'},
                {value: 60, label: '拖拉机'},
                {value: 61, label: '轮式拖拉机'},
                {value: 62, label: '手扶拖拉机'},
                {value: 63, label: '履带拖拉机'},
                {value: 64, label: '特种拖拉机'},
                {value: 1001, label: '环卫车'},
                {value: 1002, label: '警车'},
                {value: 1003, label: '救护车'},
                {value: 1004, label: '校车'},
                {value: 90, label: '其他车辆'}
            ],

            business_value: '',
            businessAry: [
                {label: '道路旅客运输',value: '010' },{label: '班车客运',value: '011' },
                {label: '包车客运',value: '014' },{label: '道路货物运输',value: '020' },
                {label: '非定线旅游',value: '010' },{label: '道路普通货物运输',value: '021' },
                {label: '货物专用运输',value: '022' },{label: '大型物件运输',value: '023' },
                {label: '道路危险货物运输',value: '030' },{label: '营运性危险货物运输',value: '031' },
                {label: '非经营性危险货物运输',value: '032' },{label: '机动车维修',value: '040' },
                {label: '汽车维修',value: '041' },{label: '危险货物运输车辆维修',value: '042' },
                {label: '摩托车维修',value: '043' },{label: '其它机动车维修',value: '044' },
                {label: '机动车驾驶员培训',value: '050' },{label: '普通机动车驾驶员培训',value: '051' },
                {label: '道路运输驾驶员从业资格培训',value: '052' },{label: '机动车驾驶员培训教练场',value: '053' },               
                {label: '站场服务',value: '060' },{label: '道路旅客运输站',value: '061' },
                {label: '道路货运站(场)',value: '062' },{label: '国际道路运输',value: '070' },
                {label: '国际道路旅客运输',value: '071' },{label: '国际道路货物运输',value: '072' },
                {label: '公交运输',value: '080' },{label: '出租运输',value: '090' },
                {label: '客运出租运输',value: '091' },{label: '货运出租运输',value: '092' },
                {label: '汽车租赁',value: '100' },{label: '客运汽车租赁',value: '101' },
                {label: '货运汽车租赁',value: '102' },
            ],

            device_value: '',
            deviceAry: [],
            DeviceFormData: {},
            sim_value: '',
            simAry: [],

            color_value: '',
            colorAry: [
                {label: '蓝色',value: '1'},
                {label: '黄色',value: '2'},
                {label: '黑色',value: '3'},
                {label: '白色',value: '4'},
                {label: '绿色',value: '5'},
                {label: '其他',value: '9'},
                {label: '农黄色',value: '91'},
                {label: '农绿色',value: '92'},
                {label: '黄绿色',value: '93'},
                {label: '渐变绿',value: '94'}
            ]
        
        });
    }

    export default {
        components: {
            // TableBase,
            MyMap
        },
        data() {
            return store.state.ShopVehExtendData
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
            this.show_map = false
        },
        mounted() {
            lime.req('ShopStaffList',{
                login_token: lime.cookie_get('login_token')
            }).then(res => {
                this.ownerAry = res.data.rows.map(v => {
                    return {value: v.uuid, label: v.name, ...v}
                });
            })
            lime.req('EbShopVehicleList',{
                login_token: lime.cookie_get('login_token')
            }).then(dt => {
                this.vehicleAry = dt.data.rows.map(v => {
                    return {value: v.uuid, label: v.plate_number, ...v}
                });
            })
            lime.req('ShopDeviceList',{
                login_token: lime.cookie_get('login_token')
            }).then(dt => {
                // console.log(dt)
                this.deviceAry = dt.data.rows.map(v => {
                    if(v.bind_status != 1) {
                        return {value: v.uuid, label: v.device_code, ...v}
                    }
                });
            })
            lime.req('ShopSimList',{
                login_token: lime.cookie_get('login_token')
            }).then(dt => {
                // console.log(dt)
                this.simAry = dt.data.rows.map(v => {
                    return {value: v.uuid, label: v.sim , ...v}
                });
            })
            // DeviceAry


        },
        methods: {
            choseColor(uuid) {
                this.AddFormData.plate_color = uuid
                this.EditFormData.plate_color = uuid
                console.log(uuid)
                // this.AddFormData.vehicle_uuid = uuid
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            choseVehicle(uuid) {
                // console.log(uuid)
                this.AddFormData.vehicle_uuid = uuid
            },
            choseOwner(uuid) {
                this.AddFormData.owner_uuid = uuid
                // console.log(uuid)
            },
            choseMarket(uuid) {
                this.AddFormData.market_uuid = uuid
                // console.log(uuid)
            },
            choseType(uuid) {
                this.AddFormData.vehicle_type = uuid - 0
                // console.log(uuid)
            },
            choseBusiness(uuid) {
                this.AddFormData.business_type = uuid - 0
                // console.log(uuid)
            },
            choseDevice(uuid) {
                console.log(uuid)
            },
            choseSim(uuid) {
                console.log(uuid)
            },
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.SearchFormData.page_len + '',
                    page_num: this.SearchFormData.page_num + ''
                }
                lime.req('EbShopVehicleList',pam).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
                // ShopVehExtendList(pam, res => {
                //     this.loading = false;
                //     this.rows = res.data.rows;
                //     this.total = res.data.total;
                //     // this.list = res.data;
                // }).catch(err => {
                //     this.loading = false;
                //     this.$message.error(err.msg);
                // })
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //添加
            handleAdd(){
                this.add_show = true
                console.log(99999)
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                lime.req('EbShopVehicleAdd',this.AddFormData).then( res => {
                    this.init()
                }).catch( err => {
                   this.$$message.error(err)
               })
               this.add_show = false
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
                    lime.req('EbShopVehicleDel',pam).then(res => {
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
                lime.req('EbShopVehicleDetail', {
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                   this.EditFormData = res.data
                }).catch(err => {
                        this.$message.error(err.msg);
                })
                this.edit_show = true

            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                let pam = this.EditFormData
                lime.req('EbShopVehicleEdit',pam).then( res => {
                     this.init();
                   this.edit_show = false;
                }).catch(err => {
                        this.$message.error(err.msg);
                })
                // ShopVehExtendEdit(pam, res => {
                //    this.init();
                //    this.edit_show = false;
                // }).catch(err => {
                //         this.$message.error(err.msg);
                // })
            },
            
            // 详细
            handleDetail() {
               if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                lime.req('EbShopVehicleDetail', {
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                    this.DetailFormData = res.data
                this.detail_show = true
                })
            },
            
            //绑定设备
            handleBindDevice() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.device_show = true
            },
            
            // 绑定设备
            onDeviceSubmit() {
                console.log(99999)
            },
            
            //查看轨迹
            handleLookPath() {
                this.show_map = !this.show_map
                console.log(111111)
            }
        }
        
    }
</script>
<style scoped>
    @import '../../assets/styles/common.css';
=======
<!--
 * @Author:  xk
 * @Date: 2020-09-15 15:56:01
 * @LastEditTime: 2020-09-27 18:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Vehequipment.vue
-->
<template>
    <div>
        <div>
            <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right;font-size: 14px ">
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

        <div style="border-top: solid 1px #f2f1f4;" v-if="!show_map">
            <el-table 
                :data="rows"
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
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
                    <el-table-column width="80px" type="index" label="序号"></el-table-column>
                    <el-table-column prop="plate_number" align="left" label="车牌号"></el-table-column>
                    <el-table-column prop="trailer_plate_number" label="挂车牌照号"></el-table-column>
                    <el-table-column prop="plate_color" label="车辆颜色">
                        <template slot-scope="scope">
                            <span v-if="scope.row.plate_color == 1">蓝色</span>
                            <span v-else-if="scope.row.plate_color == 2">黄色</span>
                            <span v-else-if="scope.row.plate_color == 3">黑色</span>
                            <span v-else-if="scope.row.plate_color == 4">白色</span>
                            <span v-else-if="scope.row.plate_color == 5">绿色</span>
                            <span v-else-if="scope.row.plate_color == 9">其他</span>
                            <span v-else-if="scope.row.plate_color == 91">农黄色</span>
                            <span v-else-if="scope.row.plate_color == 92">农绿色</span>
                            <span v-else-if="scope.row.plate_color == 93">黄绿色</span>
                            <span v-else>渐变绿</span>
                            <!-- {{scope.row.type == 1 ? '企业派送 ' : '员工提交'}} -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="brand" label="品牌"></el-table-column>
                    <el-table-column prop="model" label="型号"></el-table-column>
                    <el-table-column prop="tank_value" label="罐体编号 "></el-table-column>
                    <el-table-column prop="tank_no" label="罐体容积"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                 <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="SearchFormData.page_num"
                    :page-size="SearchFormData.page_len"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div> 
            <!-- <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange" @handleAdd="handleAdd" @handleEdit="handleEdit" @handleDel="handleDel" @handleLookPath="handleLookPath" @handleDetail="handleDetail" @handleBindDevice="handleBindDevice"/> -->

        <!-- 添加 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="AddFormData" label-width="160px" label-position="left">
                    <el-form-item label="车牌号:" :required="true">
                        <el-input v-model="AddFormData.plate_number" />
                    </el-form-item>
                    <el-form-item label="车牌颜色:" :required="true">
                        <el-select
                            style="width: 100%"
                            v-model="color_value"
                            @change="choseColor"
                            placeholder="请选择车辆">
                                <el-option
                                    v-for="item in colorAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="挂车牌照号:">
                        <el-input v-model="AddFormData.trailer_plate_number" />
                    </el-form-item>
                    <el-form-item label="品牌:">
                        <el-input v-model="AddFormData.brand" />
                    </el-form-item>
                    <el-form-item label="罐体编号:">
                        <el-input v-model="AddFormData.tank_value" />
                    </el-form-item>
                    <el-form-item label="罐体容积:">
                        <el-input v-model="AddFormData.tank_no" />
                    </el-form-item>
                    <el-form-item label="道路运输证有效期:">
                        <el-input v-model="AddFormData.road_transport_certificate_number" />
                    </el-form-item>
                    <el-form-item label="挂车车辆型号:">
                        <el-input v-model="AddFormData.trailer_model" />
                    </el-form-item>
                    <el-form-item label="挂车核定吨位:">
                        <el-input v-model="AddFormData.trailer_tonnage" />
                    </el-form-item>
                    <el-form-item label="挂车车辆道路运输证:">
                        <el-input v-model="AddFormData.trailer_road_transport_certificate_number" />
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            
        </el-dialog> -->

        <!-- 编辑 -->
         <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
        <!-- <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="500px"> -->
           <el-form :model="EditFormData" label-width="160px" label-position="left">
                    <el-form-item label="车牌号:">
                        <el-input v-model="EditFormData.plate_number" />
                    </el-form-item>
                    <el-form-item label="车牌颜色:">
                        <el-select
                            style="width: 100%"
                            v-model="color_value"
                            @change="choseColor"
                            placeholder="请选择车辆">
                                <el-option
                                    v-for="item in colorAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="挂车牌照号:">
                        <el-input v-model="EditFormData.trailer_plate_number" />
                    </el-form-item>
                    <el-form-item label="品牌:">
                        <el-input v-model="EditFormData.brand" />
                    </el-form-item>
                    <el-form-item label="罐体编号:">
                        <el-input v-model="EditFormData.tank_value" />
                    </el-form-item>
                    <el-form-item label="罐体容积:">
                        <el-input v-model="EditFormData.tank_no" />
                    </el-form-item>
                    <el-form-item label="道路运输证有效期:">
                        <el-input v-model="EditFormData.road_transport_certificate_number" />
                    </el-form-item>
                    <el-form-item label="挂车车辆型号:">
                        <el-input v-model="EditFormData.trailer_model" />
                    </el-form-item>
                    <el-form-item label="挂车核定吨位:">
                        <el-input v-model="EditFormData.trailer_tonnage" />
                    </el-form-item>
                    <el-form-item label="挂车车辆道路运输证:">
                        <el-input v-model="EditFormData.trailer_road_transport_certificate_number" />
                    </el-form-item>
                </el-form>
            
            <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="edit_show = false">取消</el-button>
                    <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>
        </div>
        </el-drawer>
        <!-- </el-dialog> -->

        <!-- 详细 -->
         <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                    
                <el-form :model="DetailFormData" label-width="180px" label-position="left">
                    <el-form-item label="品牌:">{{DetailFormData.brand || '---'}}</el-form-item>
                    <el-form-item label="型号:">{{DetailFormData.model || '---'}}</el-form-item>
                    <el-form-item label="车辆颜色:">
                        <span v-if="DetailFormData.plate_color == 1">蓝色</span>
                        <span v-else-if="DetailFormData.plate_color == 2">黄色</span>
                        <span v-else-if="DetailFormData.plate_color == 3">黑色</span>
                        <span v-else-if="DetailFormData.plate_color == 4">白色</span>
                        <span v-else-if="DetailFormData.plate_color == 5">绿色</span>
                        <span v-else-if="DetailFormData.plate_color == 9">其他</span>
                        <span v-else>无</span>
                        <!-- {{DetailFormData.plate_color || '---'}} -->
                    </el-form-item>
                    <el-form-item label="车牌号:">{{DetailFormData.plate_number  || '---'}}</el-form-item>
                    <el-form-item label="车辆道路运输证:">{{DetailFormData.road_transport_certificate_number  || '---'}}</el-form-item>
                    <el-form-item label="罐体容积:">{{DetailFormData.tank_no || '---'}}</el-form-item>
                    <el-form-item label="车辆类型:">{{DetailFormData.vehicle_type || '---'}}</el-form-item>
                    <el-form-item label="罐体编号:">{{DetailFormData.tank_value || '---'}}</el-form-item>
                    <el-form-item label="罐体吨位:">{{DetailFormData.tonnage || '---'}}</el-form-item>
                    <el-form-item label="挂车车辆型号:">{{DetailFormData.trailer_model || '---'}}</el-form-item>
                    <el-form-item label="挂车牌照号 :">{{DetailFormData.trailer_plate_number || '---'}}</el-form-item>
                    <el-form-item label="挂车车辆道路运输证:">{{DetailFormData.trailer_road_transport_certificate_number  || '---'}}</el-form-item>
                    <el-form-item label="挂车核定吨位:">{{DetailFormData.trailer_tonnage  || '---'}}</el-form-item>
                    <!-- <el-form-item label="入网类型:">{{DetailFormData.inline_type == 0 ? '新增' : '转网' || '---'}}</el-form-item> -->
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                        <el-button @click="detail_show = false" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 绑定设备 -->
         <el-dialog  
            title="绑定设备"
            :visible.sync="device_show"
            width="400px">
            <el-form :model="DeviceFormData" label-width="160px" label-position="left">
                    <el-form-item label="设备:" required>
                        <el-select
                            v-model="device_value"
                            @change="choseDevice"
                            placeholder="请选择设备">
                                <el-option
                                    v-for="item in deviceAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Sim卡:" >
                        <el-select
                            v-model="sim_value"
                            @change="choseSim"
                            placeholder="请选择Sim卡">
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
                <el-button @click="device_show = false">取消</el-button>
                <el-button @click="onDeviceSubmit" type="primary">确定</el-button>
            </span>
         </el-dialog>

         <div v-if="show_map">
            <MyMap />
        </div>
        
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopVehExtendList, ShopVehExtendAdd, ShopVehExtendDel, ShopVehExtendEdit, ShopVehExtendDetail, ShopVehExtendBind, ShopVehExtendUnbind} from "@/api/request"
    // import TableBase from "@/components/myTables/myTable.vue"
    import MyMap from "@/components/myBmap/myMap.vue"

    if (!store.state.ShopVehExtendData) {
        Vue.set(store.state, 'ShopVehExtendData', {
            show_map: false,
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
            //绑定设备
            device_show: false,
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
            direction: 'rtl',

            vehicle_value: '',
            vehicleAry: [],
            owner_value: '',
            ownerAry: [],
            market_value: '',
            type_value: '',
        
            typeAry: [
                {value: 10, label: '客车'},
                {value: 11, label: '大型客车'},
                {value: 12, label: '中型客车'},
                {value: 13, label: '小型客车'},
                {value: 14, label: '轿车'},
                {value: 15, label: '大型卧铺客车'},
                {value: 16, label: '中型卧铺客车'},
                {value: 20, label: '普通货车'},
                {value: 21, label: '大型普通货车'},
                {value: 22, label: '中型普通货车'},
                {value: 23, label: '小型普通货车'},
                {value: 30, label: '专用运输车'},
                {value: 31, label: '集装箱车'},
                {value: 32, label: '大件运输车'},
                {value: 33, label: '保温冷藏车'},
                {value: 34, label: '商品车运输专用车辆'},
                {value: 35, label: '罐车'},
                {value: 36, label: '牵引车'},
                {value: 37, label: '挂车'},
                {value: 38, label: '平板车'},
                {value: 39, label: '其他专用车'},
                {value: 40, label: '危险品运输车'},
                {value: 50, label: '农用车'},
                {value: 60, label: '拖拉机'},
                {value: 61, label: '轮式拖拉机'},
                {value: 62, label: '手扶拖拉机'},
                {value: 63, label: '履带拖拉机'},
                {value: 64, label: '特种拖拉机'},
                {value: 1001, label: '环卫车'},
                {value: 1002, label: '警车'},
                {value: 1003, label: '救护车'},
                {value: 1004, label: '校车'},
                {value: 90, label: '其他车辆'}
            ],

            business_value: '',
            businessAry: [
                {label: '道路旅客运输',value: '010' },{label: '班车客运',value: '011' },
                {label: '包车客运',value: '014' },{label: '道路货物运输',value: '020' },
                {label: '非定线旅游',value: '010' },{label: '道路普通货物运输',value: '021' },
                {label: '货物专用运输',value: '022' },{label: '大型物件运输',value: '023' },
                {label: '道路危险货物运输',value: '030' },{label: '营运性危险货物运输',value: '031' },
                {label: '非经营性危险货物运输',value: '032' },{label: '机动车维修',value: '040' },
                {label: '汽车维修',value: '041' },{label: '危险货物运输车辆维修',value: '042' },
                {label: '摩托车维修',value: '043' },{label: '其它机动车维修',value: '044' },
                {label: '机动车驾驶员培训',value: '050' },{label: '普通机动车驾驶员培训',value: '051' },
                {label: '道路运输驾驶员从业资格培训',value: '052' },{label: '机动车驾驶员培训教练场',value: '053' },               
                {label: '站场服务',value: '060' },{label: '道路旅客运输站',value: '061' },
                {label: '道路货运站(场)',value: '062' },{label: '国际道路运输',value: '070' },
                {label: '国际道路旅客运输',value: '071' },{label: '国际道路货物运输',value: '072' },
                {label: '公交运输',value: '080' },{label: '出租运输',value: '090' },
                {label: '客运出租运输',value: '091' },{label: '货运出租运输',value: '092' },
                {label: '汽车租赁',value: '100' },{label: '客运汽车租赁',value: '101' },
                {label: '货运汽车租赁',value: '102' },
            ],

            device_value: '',
            deviceAry: [],
            DeviceFormData: {},
            sim_value: '',
            simAry: [],

            color_value: '',
            colorAry: [
                {label: '蓝色',value: '1'},
                {label: '黄色',value: '2'},
                {label: '黑色',value: '3'},
                {label: '白色',value: '4'},
                {label: '绿色',value: '5'},
                {label: '其他',value: '9'},
                {label: '农黄色',value: '91'},
                {label: '农绿色',value: '92'},
                {label: '黄绿色',value: '93'},
                {label: '渐变绿',value: '94'}
            ]
        
        });
    }

    export default {
        components: {
            // TableBase,
            MyMap
        },
        data() {
            return store.state.ShopVehExtendData
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
            this.show_map = false
        },
        mounted() {
            lime.req('ShopStaffList',{
                login_token: lime.cookie_get('login_token')
            }).then(res => {
                this.ownerAry = res.data.rows.map(v => {
                    return {value: v.uuid, label: v.name, ...v}
                });
            })
            lime.req('EbShopVehicleList',{
                login_token: lime.cookie_get('login_token')
            }).then(dt => {
                this.vehicleAry = dt.data.rows.map(v => {
                    return {value: v.uuid, label: v.plate_number, ...v}
                });
            })
            lime.req('ShopDeviceList',{
                login_token: lime.cookie_get('login_token')
            }).then(dt => {
                // console.log(dt)
                this.deviceAry = dt.data.rows.map(v => {
                    if(v.bind_status != 1) {
                        return {value: v.uuid, label: v.device_code, ...v}
                    }
                });
            })
            lime.req('ShopSimList',{
                login_token: lime.cookie_get('login_token')
            }).then(dt => {
                // console.log(dt)
                this.simAry = dt.data.rows.map(v => {
                    return {value: v.uuid, label: v.sim , ...v}
                });
            })
            // DeviceAry


        },
        methods: {
            choseColor(uuid) {
                this.AddFormData.plate_color = uuid
                this.EditFormData.plate_color = uuid
                console.log(uuid)
                // this.AddFormData.vehicle_uuid = uuid
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            choseVehicle(uuid) {
                // console.log(uuid)
                this.AddFormData.vehicle_uuid = uuid
            },
            choseOwner(uuid) {
                this.AddFormData.owner_uuid = uuid
                // console.log(uuid)
            },
            choseMarket(uuid) {
                this.AddFormData.market_uuid = uuid
                // console.log(uuid)
            },
            choseType(uuid) {
                this.AddFormData.vehicle_type = uuid - 0
                // console.log(uuid)
            },
            choseBusiness(uuid) {
                this.AddFormData.business_type = uuid - 0
                // console.log(uuid)
            },
            choseDevice(uuid) {
                console.log(uuid)
            },
            choseSim(uuid) {
                console.log(uuid)
            },
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.SearchFormData.page_len + '',
                    page_num: this.SearchFormData.page_num + ''
                }
                lime.req('EbShopVehicleList',pam).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
                // ShopVehExtendList(pam, res => {
                //     this.loading = false;
                //     this.rows = res.data.rows;
                //     this.total = res.data.total;
                //     // this.list = res.data;
                // }).catch(err => {
                //     this.loading = false;
                //     this.$message.error(err.msg);
                // })
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //添加
            handleAdd(){
                this.add_show = true
                console.log(99999)
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                lime.req('EbShopVehicleAdd',this.AddFormData).then( res => {
                    this.init()
                }).catch( err => {
                   this.$$message.error(err)
               })
               this.add_show = false
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
                    lime.req('EbShopVehicleDel',pam).then(res => {
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
                lime.req('EbShopVehicleDetail', {
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                   this.EditFormData = res.data
                }).catch(err => {
                        this.$message.error(err.msg);
                })
                this.edit_show = true

            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                let pam = this.EditFormData
                lime.req('EbShopVehicleEdit',pam).then( res => {
                     this.init();
                   this.edit_show = false;
                }).catch(err => {
                        this.$message.error(err.msg);
                })
                // ShopVehExtendEdit(pam, res => {
                //    this.init();
                //    this.edit_show = false;
                // }).catch(err => {
                //         this.$message.error(err.msg);
                // })
            },
            
            // 详细
            handleDetail() {
               if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                lime.req('EbShopVehicleDetail', {
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                    this.DetailFormData = res.data
                this.detail_show = true
                })
            },
            
            //绑定设备
            handleBindDevice() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.device_show = true
            },
            
            // 绑定设备
            onDeviceSubmit() {
                console.log(99999)
            },
            
            //查看轨迹
            handleLookPath() {
                this.show_map = !this.show_map
                console.log(111111)
            }
        }
        
    }
</script>
<style scoped>
    @import '../../assets/styles/common.css';
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
</style>