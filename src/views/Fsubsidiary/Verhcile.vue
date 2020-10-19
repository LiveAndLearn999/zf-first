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
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    export default {
        data() {
            return {
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
                this.loading = true;
                // console.log('我的学习0')
                // console.log(this.SearchFormData)
                // console.log('我的学习0')
                lime.req('EbShopVehicleChildList', {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
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
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    export default {
        data() {
            return {
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
                this.loading = true;
                // console.log('我的学习0')
                // console.log(this.SearchFormData)
                // console.log('我的学习0')
                lime.req('EbShopVehicleChildList', {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
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
    
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
</style>