<<<<<<< HEAD
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
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
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
        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-select v-model="search_value" placeholder="请选择" style="width: 100px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                <el-input v-if="search_value == 0" v-model="SearchFormData.plate_number" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>
        <!-- <h6>{{cpname}}</h6> -->
        <!-- <TableBase :loading="loading" :rows="rows" :columns="columns" /> -->

        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
            <!-- element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" -->
            <el-table 
                :data="rows"
                 :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68"
                v-loading="loading"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                 style="width: 100%;margin-top: 5px" 
                size="mini" >
                    <el-table-column width="80px" type="index" label="序号"></el-table-column>
                    <el-table-column prop="shop_name" align="left" label="企业名称"></el-table-column>
                    <el-table-column prop="plate_number" label="挂车牌照号"></el-table-column>
                    <el-table-column prop="plate_color" label="车牌颜色">
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
            <div class="page" :style="{width:width - 280 + 'px'}">
                 <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="SearchFormData.page_num"
                    :page-size="SearchFormData.page_len"
                    :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>

        </div>

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
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.CshopData) {
        Vue.set(store.state, 'CshopData', {
             search_options: [
                    {value: 0,label: '车牌号'}
                ],
            search_value: 0,
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
            SearchFormData: {
                page_num: 1,
                page_len: 10,
                plate_number: ''
            },
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
            // TableBase
        },
        data() {
            return store.state.CshopData;
        },
        created() {
            this.init()
        },
         computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
        },

        methods: {
            // 搜索提交
            onSearchSubmit(){
                // this.SearchFormData.page_num = 1;
                this.init();
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
             onPageChange(page){
                this.page_num = page;
                console.log(page)
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
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
                // this.loading = true;
                NProgress.start();
                let pam = {
                    login_token: lime.cookie_get('login_token'),
                    page_num: this.SearchFormData.page_num,
                    page_len: this.SearchFormData.page_len,
                    plate_number: this.SearchFormData.plate_number
                }
                lime.req('EbShopVehicleChildList',pam).then( res => {
                    // this.loading = false;
                    NProgress.done();
                     this.rows = res.data.rows;
                    this.total = res.data.total;
                }).catch(err => {
                    // this.loading = false;
                    NProgress.done();
                    this.$message.error(err.msg);
                })
                // ShopChildList(pam, res => {
                //     this.loading = false;
                // }).catch(err => {
                //     this.loading = false;
                //     this.$message.error(err.msg);
                // })
            },
            onRefresh() {
                this.init()
            },
            // handleDetail() {
            //     this.detail_show = true
            // }
        }
        
    }
</script>

<style scoped>
   @import '../../assets/styles/common.css'; 
   .el-dialog-div{
    height: 60vh;
     overflow: auto;
    }

=======
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

>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>