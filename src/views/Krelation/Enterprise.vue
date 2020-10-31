<<<<<<< HEAD
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
    <div v-wechat-title="$route.meta.title">
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
                <el-input v-if="search_value == 0" v-model="SearchFormData.name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

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
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="name" show-overflow-tooltip label="名称" align="left"></el-table-column>
                <!-- <el-table-column prop="state"  label="状态" align="center">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="face_img" label="商户门面" align="center" :sortable=true></el-table-column> -->
                <el-table-column prop="addr " label="地址"></el-table-column>
                <el-table-column prop="contact_cname" label="联系人"></el-table-column>
            </el-table>
            <div class="page" :style="{width:width - 280 + 'px'}">
                <el-pagination
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


        <!-- <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange" @handleDetail="handleDetail"/> -->

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
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
    

    if (!store.state.relationEntpsData) {
        Vue.set(store.state, 'relationEntpsData', {
             search_options: [
                    {value: 0,label: '名称'}
                ],
            search_value: 0,
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
            SearchFormData:{
                page_num: 1,
                page_len: 10,
                name: ''
            },
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
            // TableBase

        },
         computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
            upload_url:() => {
                return store.state.AppData.upload_url;
            },
            img_host:() => {
                return store.state.AppData.img_host;
            }
        },
        data() {
            return store.state.relationEntpsData
        },
        created() {
            this.init()
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
            change(e) {
                this.$forceUpdate()
            },
            init() {
            //    this.loading = true;
            NProgress.start();
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.SearchFormData.page_len,
                    page_num: this.SearchFormData.page_num,
                    name: this.SearchFormData.name
                }
                ShopAgentShopList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    // this.list = res.data;
                }).catch(err => {
                    // this.loading = false;
                    NProgress.done();
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false;
                    NProgress.done();
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
            // onPageChange(page){
            //     this.page_num = page;
            //     console.log(page)
            //     this.init();
            // },
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
=======
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
    <div v-wechat-title="$route.meta.title">
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
                <el-input v-if="search_value == 0" v-model="SearchFormData.name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

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
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="name" show-overflow-tooltip label="名称" align="left"></el-table-column>
                <!-- <el-table-column prop="state"  label="状态" align="center">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="face_img" label="商户门面" align="center" :sortable=true></el-table-column> -->
                <el-table-column prop="addr " label="地址"></el-table-column>
                <el-table-column prop="contact_cname" label="联系人"></el-table-column>
            </el-table>
            <div class="page" :style="{width:width - 280 + 'px'}">
                <el-pagination
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


        <!-- <TableBase :loading="loading" :page_num="page_num" :total="total" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" @onref="onRefresh" @pageChange="onPageChange" @handleDetail="handleDetail"/> -->

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
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
    

    if (!store.state.relationEntpsData) {
        Vue.set(store.state, 'relationEntpsData', {
             search_options: [
                    {value: 0,label: '名称'}
                ],
            search_value: 0,
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
            SearchFormData:{
                page_num: 1,
                page_len: 10,
                name: ''
            },
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
            // TableBase

        },
         computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
            upload_url:() => {
                return store.state.AppData.upload_url;
            },
            img_host:() => {
                return store.state.AppData.img_host;
            }
        },
        data() {
            return store.state.relationEntpsData
        },
        created() {
            this.init()
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
            change(e) {
                this.$forceUpdate()
            },
            init() {
            //    this.loading = true;
            NProgress.start();
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.SearchFormData.page_len,
                    page_num: this.SearchFormData.page_num,
                    name: this.SearchFormData.name
                }
                ShopAgentShopList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    // this.list = res.data;
                }).catch(err => {
                    // this.loading = false;
                    NProgress.done();
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false;
                    NProgress.done();
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
            // onPageChange(page){
            //     this.page_num = page;
            //     console.log(page)
            //     this.init();
            // },
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
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>