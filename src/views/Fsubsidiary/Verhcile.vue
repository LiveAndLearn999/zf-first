<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:52:14
 * @LastEditTime: 2020-09-10 17:52:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Fsubsidiary/Verhcile.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
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
                <el-input v-if="search_value == 0" v-model="SearchFormData.plate_number" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
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
                <el-table-column prop="shop_name" show-overflow-tooltip label="企业名称" align="left"></el-table-column>
                <!-- <el-table-column prop="state"  label="状态" align="center">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="plate_number" label="车牌号" align="center" :sortable=true></el-table-column>
                <el-table-column prop="plate_color" label="车辆颜色">
                        <template slot-scope="scope">
                            <span v-if="scope.row.plate_color == 1">蓝色</span>
                            <span v-else-if="scope.row.plate_color == 2">黄色</span>
                            <span v-else-if="scope.row.plate_color == 3">黑色</span>
                            <span v-else-if="scope.row.plate_color == 4">白色</span>
                            <span v-else-if="scope.row.plate_color == 5">绿色</span>
                            <span v-else-if="scope.row.plate_color == 9">其他</span>
                        </template>
                </el-table-column>
                <el-table-column prop="road_transport_certificate_number " label="车辆道路运输证"></el-table-column>
                <el-table-column prop="trailer_road_transport_certificate_number" label="挂车车辆道路运输证"></el-table-column>
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
    </div>
<<<<<<< HEAD
=======
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    export default {
        data() {
            return {
                search_options: [
                    {value: 0,label: '车牌号'}
                ],
            search_value: 0,
                cpname: '车辆管理',
                rows:[],
                total:0,
                loading:false,

                curr_row:null,

                // 搜索
                search_show:false,
                SearchFormData:{
                    start_date:'',
                    end_date:'',
                    plate_number: '',
                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc',
                },

                // 编辑
                edit_show:false,
                EditFormData:{
                    login_token:'',
                    uuid: '',
                    out_face:'',
                    certificate_img:'',
                },

                // 详情
                detail_show:false,
                DetailFormData:{
                    start_date:'2020-08-02',
                    end_date:'2020-08-03',

                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc',
                },
            }
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
        created(){
            this.init();
        },
         methods:{
              // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化
            init() {
                // this.loading = true;
                NProgress.start();
                // console.log('我的学习0')
                // console.log(this.SearchFormData)
                // console.log('我的学习0')
                lime.req('EbShopVehicleChildList', {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort,
                    plate_number: this.SearchFormData.plate_number
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false;
                    NProgress.done();
                }, 10000);
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch(r) {
                this.search_show = true;
            },
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false;
                this.SearchFormData.page_num = 1;
                this.init();
            },
            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
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

         }
        
    }
</script>

<style scoped>
    
=======
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:52:14
 * @LastEditTime: 2020-09-10 17:52:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Fsubsidiary/Verhcile.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
    <div v-wechat-title="$route.meta.title">
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

        <!-- 数据表格 -->
        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="shop_name" show-overflow-tooltip label="企业名称" align="left"></el-table-column>
                <!-- <el-table-column prop="state"  label="状态" align="center">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="plate_number" label="车牌号" align="center" :sortable=true></el-table-column>
                <el-table-column prop="plate_color" label="车辆颜色">
                        <template slot-scope="scope">
                            <span v-if="scope.row.plate_color == 1">蓝色</span>
                            <span v-else-if="scope.row.plate_color == 2">黄色</span>
                            <span v-else-if="scope.row.plate_color == 3">黑色</span>
                            <span v-else-if="scope.row.plate_color == 4">白色</span>
                            <span v-else-if="scope.row.plate_color == 5">绿色</span>
                            <span v-else-if="scope.row.plate_color == 9">其他</span>
                        </template>
                </el-table-column>
                <el-table-column prop="road_transport_certificate_number " label="车辆道路运输证"></el-table-column>
                <el-table-column prop="trailer_road_transport_certificate_number" label="挂车车辆道路运输证"></el-table-column>
            </el-table>
            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
<<<<<<< HEAD
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
=======
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e

    export default {
        data() {
            return {
<<<<<<< HEAD
                search_options: [
                    {value: 0,label: '车牌号'}
                ],
            search_value: 0,
=======
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                cpname: '车辆管理',
                rows:[],
                total:0,
                loading:false,

                curr_row:null,

                // 搜索
                search_show:false,
                SearchFormData:{
                    start_date:'',
                    end_date:'',
<<<<<<< HEAD
                    plate_number: '',
=======

>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc',
                },

                // 编辑
                edit_show:false,
                EditFormData:{
                    login_token:'',
                    uuid: '',
                    out_face:'',
                    certificate_img:'',
                },

                // 详情
                detail_show:false,
                DetailFormData:{
                    start_date:'2020-08-02',
                    end_date:'2020-08-03',

                    page_num:1,
                    page_len:10,
                    order_field:'add_time',
                    order_sort:'desc',
                },
            }
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
        created(){
            this.init();
        },
         methods:{
              // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化
            init() {
<<<<<<< HEAD
                // this.loading = true;
                NProgress.start();
=======
                this.loading = true;
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                // console.log('我的学习0')
                // console.log(this.SearchFormData)
                // console.log('我的学习0')
                lime.req('EbShopVehicleChildList', {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
<<<<<<< HEAD
                    order_sort:this.SearchFormData.order_sort,
                    plate_number: this.SearchFormData.plate_number
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
=======
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });
                // 超时关闭遮罩层
                setTimeout(() => {
<<<<<<< HEAD
                    // this.loading = false;
                    NProgress.done();
=======
                    this.loading = false;
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                }, 10000);
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch(r) {
                this.search_show = true;
            },
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false;
                this.SearchFormData.page_num = 1;
                this.init();
            },
            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
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

         }
        
    }
</script>

<style scoped>
    
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>