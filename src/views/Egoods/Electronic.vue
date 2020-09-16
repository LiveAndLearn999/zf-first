<!--
 * @Author: your name
 * @Date: 2020-09-10 17:35:35
 * @LastEditTime: 2020-09-16 17:05:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Egoods/Electronic.vue
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

        <TableBase :loading="loading" :rows="rows" :columns="columns"/>

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
                <div class="from-box">
                    <el-form :model="AddFormData" label-width="160px">
                        <el-form-item label="托运人名称:" required>
                            <el-input v-model="AddFormData.consignor" />
                        </el-form-item>
                        <el-form-item label="托运人联系电话:" required>
                            <el-input v-model="AddFormData.consignor_phone" />
                        </el-form-item>
                        <el-form-item label="装货人名称:" required>
                            <el-input v-model="AddFormData.loader" />
                        </el-form-item>
                        <el-form-item label="装货人联系:" required>
                            <!-- <el-input type="textarea" v-model="AddFormData.loader_phone"></el-input> -->
                            <el-input v-model="AddFormData.loader_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人名称:" required>
                            <el-input v-model="AddFormData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人联系电话:" required>
                            <el-input v-model="AddFormData.consignee_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="起运日期:" required>
                            <el-input v-model="AddFormData.s_time"></el-input>
                        </el-form-item>
                        <el-form-item label="具体地址:" required>
                            <el-input v-model="AddFormData.s_address"></el-input>
                        </el-form-item>
                        <el-form-item label="地址区域uuid:" required>
                            <el-cascader 
                                clearable 
                                :options="add_rows"
                                :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                                placeholder="不选择则为顶级"
                                v-model="AddFormData.s_area_uuid">
                            </el-cascader>
                            <!-- <el-input v-model="AddFormData.s_area_uuid"></el-input> -->
                        </el-form-item>
                        <el-form-item label="目的地具体地址:" required>
                            <el-input v-model="AddFormData.e_address"></el-input>
                        </el-form-item>
                        <el-form-item label="目地地地址区域uuid:" required>
                            <el-cascader 
                                clearable 
                                :options="add_rowss"
                                :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                                placeholder="不选择则为顶级"
                                v-model="AddFormData.e_area_uuid">
                            </el-cascader>
                            <!-- <el-input v-model="AddFormData.e_area_uuid"></el-input> -->
                        </el-form-item>
                        <el-form-item label="调度人:">
                            <el-input v-model="AddFormData.dispatcher"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="AddFormData.remark"></el-input>
                        </el-form-item>
                        <el-form-item label="登录信息:" required>
                            <el-input v-model="AddFormData.login_token"></el-input>
                        </el-form-item>
                        <el-form-item label="调度时间:">
                            <el-input v-model="AddFormData.dispatch_time"></el-input>
                        </el-form-item>
                        <el-form-item label="承运人uuid:" required>
                            <el-input v-model="AddFormData.carrier_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="参与人(参与派送):" required>
                            <el-input v-model="AddFormData.participation_staff_uuids"></el-input>
                        </el-form-item>
                        <el-form-item label="主要参与人:" required>
                            <el-input v-model="AddFormData.main_staff_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="审核人:" required>
                            <el-input v-model="AddFormData.examine_staff_ids"></el-input>
                        </el-form-item>
                        <el-form-item label="企业归属车辆uuid:">
                            <el-input v-model="AddFormData.shop_vehicle_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="签名证书图片URL:">
                            <el-input v-model="AddFormData.sign_url"></el-input>
                        </el-form-item>
                        <el-form-item label="货品集合信息:">
                            <el-input v-model="AddFormData.goods_json"></el-input>
                        </el-form-item>
                        <el-form-item label="起至地址是否同城:">
                            <el-input v-model="AddFormData.is_city_wide"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <el-drawer
            size="800px"
            :append-to-body="true"
            :visible.sync="detail_show">
             <div slot="title">详细</div>
             <div style="width: 100%;height: 52%;overflow: auto;">
                    <el-form label-width="160px">
                        <el-form-item label="托运人名称:">
                            {{DetailFormData.consignor}}
                        </el-form-item>
                        <el-form-item label="托运人联系电话:">
                            {{DetailFormData.consignor_phone}}
                        </el-form-item>
                        <el-form-item label="装货人名称:">
                            {{DetailFormData.loader}}
                        </el-form-item>
                        <el-form-item label="装货人联系:">
                            {{DetailFormData.loader_phone}}
                        </el-form-item>
                        <el-form-item label="收货人名称:">
                            {{DetailFormData.consignee}}
                        </el-form-item>
                        <el-form-item label="收货人联系电话:">
                            {{DetailFormData.consignee_phone}}
                        </el-form-item>
                        <el-form-item label="起运日期:">
                            {{DetailFormData.s_time}}
                        </el-form-item>
                        <el-form-item label="具体地址:">
                            {{DetailFormData.s_address}}
                        </el-form-item>
                        <el-form-item label="地址区域uuid:">
                            {{DetailFormData.s_area_uuid}}
                        </el-form-item>
                        <el-form-item label="目的地具体地址:">
                            {{DetailFormData.e_address}}
                        </el-form-item>
                        <el-form-item label="目地地地址区域uuid:">
                            {{DetailFormData.e_area_uuid}}
                        </el-form-item>
                        <el-form-item label="调度人:">
                            {{DetailFormData.dispatcher}}
                        </el-form-item>
                        <el-form-item label="备注:">
                            {{DetailFormData.remark}}
                        </el-form-item>
                        <el-form-item label="登录信息:">
                            {{DetailFormData.login_token}}
                        </el-form-item>
                        <el-form-item label="调度时间:">
                            {{DetailFormData.dispatch_time}}
                        </el-form-item>
                        <el-form-item label="承运人uuid:">
                            {{DetailFormData.carrier_uuid}}
                        </el-form-item>
                        <el-form-item label="参与人(参与派送):">
                            {{DetailFormData.participation_staff_uuids}}
                        </el-form-item>
                        <el-form-item label="主要参与人:">
                            {{DetailFormData.main_staff_uuid}}
                        </el-form-item>
                        <el-form-item label="审核人:">
                            {{DetailFormData.examine_staff_ids}}
                        </el-form-item>
                        <el-form-item label="企业归属车辆uuid:">
                            {{DetailFormData.shop_vehicle_uuid}}
                        </el-form-item>
                        <el-form-item label="签名证书图片URL:">
                            {{DetailFormData.sign_url}}
                        </el-form-item>
                        <el-form-item label="货品集合信息:">
                            {{DetailFormData.goods_json}}
                        </el-form-item>
                        <el-form-item label="起至地址是否同城:">
                            {{DetailFormData.is_city_wide}}
                        </el-form-item>
                    </el-form>
                </div>
                
        </el-drawer>

    </div>
</template>
<script>
import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { EbShopList, EbShopAdd , GetArea } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.EbShopData) {
        Vue.set(store.state, 'EbShopData', {
            list: [],
            rows:[],
            add_rows: [],
            add_rowss: [],
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
                {prop: 'add_time', label: '运单单号'},
                {prop: 'consignee', label: '收货人名称'},
                {prop: 'consignee_phone', label: '收货人联系电话'},
                {prop: 'consignor', label: '托运人名称'},
                {prop: 'consignor_phone', label: '托运人联系电话'} ,
                {prop: 'creator_staff', label: '承运人'},
                {prop: 'dispatcher', label: '调度人'}
            ],
            cpname: '电子运单--api 平台未找到相关接口',

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.EbShopData;
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
                    login_token:lime.cookie_get('login_token')
                }
                EbShopList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.list = res.data;
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
            //添加
            handleAdd() {
                GetArea({}, res => {
                    this.list = res.data;  
                    let _rows = [];
                    this.add_rows = [];
                    this.list.forEach(item => {
                        _rows.push({
                            name:item.name,
                            parent_uuid:item.parent_uuid,
                            uuid:item.uuid
                        })
                    });
                    this.add_rows = util.toTree(_rows);
                    this.add_show = true 
                })
                GetArea({grade: 1}, res => { 
                    let _rows = [];
                    this.add_rowss = [];
                    res.data.forEach(item => {
                        _rows.push({
                            name:item.name,
                            parent_uuid:item.parent_uuid,
                            uuid:item.uuid
                        })
                    });
                    this.add_rowss = util.toTree(_rows); 
                })
            },
            onAddSubmit() {

            },
            //详细
            handleDetail() {
                this.detail_show = true
            }
        }

        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
    .from-box {
        width: 100%;
        height: 400px;;
        overflow: auto;
    }
</style>