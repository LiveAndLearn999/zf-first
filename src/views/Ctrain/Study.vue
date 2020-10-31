<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:25:02
 * @LastEditTime: 2020-09-10 17:25:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Study.vue
-->
<!-- 我的学习 -->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
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
                    <div style="text-align: right; font-size: 16px">
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

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                 <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" size="small" style="margin-right: 10px">
                </el-date-picker>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
             <!-- stripe -->
            <el-table 
                :data="rows"
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="name" show-overflow-tooltip label="标题" align="left"></el-table-column>
                <!-- <el-table-column prop="state"  label="状态" align="center">
<<<<<<< HEAD
=======
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="start_time" label="开始时间" align="center" :sortable=true></el-table-column>
                <el-table-column prop="end_time" label="结束时间" align="center" :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.end_time == '' ? '未结束' : scope.row.end_time}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="is_online" label="类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_online == 1 ? '现场' : '线上'}}
                    </template>
                </el-table-column> -->
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
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

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="400px">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="开始时间:">
                    <el-date-picker 
                        v-model="SearchFormData.start_date"  
                        type="date" 
                        placeholder="开始日期">
                    </el-date-picker>
                    <!-- <el-input v-model="SearchFormData.start_date" /> -->
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-date-picker 
                        v-model="SearchFormData.end_date"  
                        type="date" 
                        placeholder="结束日期">
                    </el-date-picker>
                    <!-- <el-input v-model="SearchFormData.end_date" /> -->
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑模板 -->
        <el-dialog  
            title="报告编辑"
            :visible.sync="edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="80px">
                <el-form-item label="UUID:">
                    <el-input v-model="EditFormData.uuid" />
                </el-form-item>
                
                <el-form-item label="最后拍照:">
                    <el-input v-model="EditFormData.out_face" />
                </el-form-item>
                
                <el-form-item label="证书地址:">
                    <el-input v-model="EditFormData.certificate_img" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
       <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :model="DetailFormData" label-width="120px" label-position="right">
                <!-- <el-form-item label="UUID:">{{DetailFormData.uuid}}</el-form-item> -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="状态:">{{DetailFormData.state == 1 ?  '完成' : '未完成'}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="开始时间:">{{DetailFormData.start_time || '---'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="结束时间:">{{DetailFormData.end_time== '' ? '未结束' : DetailFormData.end_time}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型:">{{  DetailFormData.is_online == 1 ? '现场' : '线上'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="首次拍照:">{{DetailFormData.in_face || '---'}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最后拍照:">{{DetailFormData.out_face || '---'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证书:">
                            <img v-if="DetailFormData.certificate_img" :src="DetailFormData.certificate_img" alt="">
                            <span v-else>未上传</span>
                            <!-- {{DetailFormData.certificate_img}} -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
             <div class="drawer-footer">
                <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </div>
        </el-drawer>
    </div>
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


//    调用   [商户业务] :: 商户端学习清单计划列表

    if (!store.state.ShopStudyRecodeData) {
        Vue.set(store.state, 'ShopStudyRecodeData', {
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
            value1: ''
        });
    }

    export default {
        data() {
            return store.state.ShopStudyRecodeData;
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
            // 时间格式化
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },

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
                // ShopStudyRecodeList
                // ShopStudyPlanList
                lime.req('ShopStudyPlanList', {
                    login_token:lime.cookie_get('login_token'),
                    start_date: this.SearchFormData.start_date ? util.eleDate(this.SearchFormData.start_date) : '',
                    end_date: this.SearchFormData.end_date ? util.eleDate(this.SearchFormData.end_date): '',

                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;

                    // console.log('我的学习1')
                    // console.log(this.SearchFormData)
                    // console.log('我的学习1')
                    // this.SearchFormData.start_date='';
                    // this.SearchFormData.end_date='';
                    console.log('我的学习')
                    console.log(this.rows)
                    console.log('我的学习')
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done();
                    // this.loading = false;
                }, 10000);
            },
            // 状态格式化
            stateFormat(state) {
                // 状态：1未开始 2正在进行 3已结束
                if (state == 1) {
                    return '未开始';
                } else if (state == 2) {
                    return '正在进行';
                } else if (state == 3) {
                    return '已结束';
                } else {
                    return '';
                }
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
                this.SearchFormData.start_date = this.value1 ? this.value1[0] : ''
                this.SearchFormData.end_date = this.value1 ? this.value1[1] : ''
                this.SearchFormData.page_num = 1;
                this.init();
                // console.log(this.value1)
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

            // 编辑展示 
            handleReportEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.EditFormData = this.curr_row;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.uuid        = this.curr_row.uuid;

                lime.req('ShopStudyRecodeEdit', this.EditFormData).then(res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

            // 详细
            handleDetail(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                // ShopStudyRecodeDetail
                lime.req('ShopStudyPlanDetail', {
                    login_token:lime.cookie_get('login_token'),
                    // uuid:this.curr_row.uuid
                    plan_uuid: this.curr_row.uuid
                }).then(res => {
                    console.log(res.data)
                    this.DetailFormData = res.data
                    this.detail_show = true;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

        }
    }
</script>

<style scoped>
@import '../../assets/styles/common.css';
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }
    .drawer-footer {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
    }

    .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
        display: block;

    }

   /*  .page {
        height: 40px; 
        line-height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 40px;
        right:40px;
        overflow: hidden;
    } */
</style>
=======
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:25:02
 * @LastEditTime: 2020-09-10 17:25:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Study.vue
-->
<!-- 我的学习 -->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
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
                    <div style="text-align: right; font-size: 16px">
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

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                 <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" size="small" style="margin-right: 10px">
                </el-date-picker>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
             <!-- stripe -->
            <el-table 
                :data="rows"
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="plan_name" show-overflow-tooltip label="计划名称" align="left"></el-table-column>
                <el-table-column prop="state"  label="状态" align="center">
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="start_time" label="开始时间" align="center" :sortable=true></el-table-column>
                <el-table-column prop="end_time" label="结束时间" align="center" :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.end_time == '' ? '未结束' : scope.row.end_time}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="is_online" label="类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_online == 1 ? '现场' : '线上'}}
                    </template>
                </el-table-column> -->
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
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

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="400px">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="开始时间:">
                    <el-date-picker 
                        v-model="SearchFormData.start_date"  
                        type="date" 
                        placeholder="开始日期">
                    </el-date-picker>
                    <!-- <el-input v-model="SearchFormData.start_date" /> -->
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-date-picker 
                        v-model="SearchFormData.end_date"  
                        type="date" 
                        placeholder="结束日期">
                    </el-date-picker>
                    <!-- <el-input v-model="SearchFormData.end_date" /> -->
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑模板 -->
        <el-dialog  
            title="报告编辑"
            :visible.sync="edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="80px">
                <el-form-item label="UUID:">
                    <el-input v-model="EditFormData.uuid" />
                </el-form-item>
                
                <el-form-item label="最后拍照:">
                    <el-input v-model="EditFormData.out_face" />
                </el-form-item>
                
                <el-form-item label="证书地址:">
                    <el-input v-model="EditFormData.certificate_img" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
       <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :model="DetailFormData" label-width="120px" label-position="right">
                <!-- <el-form-item label="UUID:">{{DetailFormData.uuid}}</el-form-item> -->
                <el-row>
                    <el-col :span="12">
<<<<<<< HEAD
                        <el-form-item label="计划组名称:">
                            {{DetailFormData.plan_group_name || '---'}}
                        </el-form-item>
                    </el-col>
                    <el-col  :span="12">
                        <el-form-item label="总分:">
                            {{DetailFormData.total_score || '---'}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间:">
                            {{DetailFormData.start_time || '---'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束时间:">
                            {{DetailFormData.end_time || '---'}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="学员列表:">
                             <div v-if="re_ary[0]" style="width: 99%; border-bottom: 1px solid #f2f2f2;margin-top: 30px">
                                  <div class="re-flex" >
                                    <div class="re-flexlf">序号</div>
                                    <div class="re-flexlf">学员姓名</div>
                                    <div class="re-flexlf">手机号码</div>
                                    <div class="re-flexlf">培训进度</div>
                                    <div class="re-flexlf">考试分数</div>
                                    <div class="re-flexlf">培训状态</div>
                                    <!-- <div class="re-flexmd">{{item.state == 0 ? '未完成' : '已完成'}}</div> -->
                                </div>
                                <div class="re-flex" v-for="(item,index) in re_ary" :key="item.uuid">
                                    <div class="re-flexlf">{{index}}</div>
                                    <div class="re-flexlf">{{item.user_name}}</div>
                                    <div class="re-flexlf">{{item.mobile}}</div>
                                    <div class="re-flexlf">
                                        <el-progress styke :text-inside="true" :stroke-width="20" style="margin-top: 10px;margin-right: 10px" :percentage="item.study_time/item.duration*100"></el-progress>
                                    </div>
                                    <!-- <div class="re-flexlf">{{item.score}}</div> -->
                                    <div class="re-flexlf">{{item.score}}</div>
                                    <div class="re-flexlf">{{item.passStatus == 0 ? '未通过': item.passStatus == 1 ? '通过' : '未考试'}}</div>
                                    <!-- <div class="re-flexmd">{{item.state == 0 ? '未完成' : '已完成'}}</div> -->
                                </div>
                             </div>
                             <div v-else>暂无</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="12">
=======
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                        <el-form-item label="状态:">{{DetailFormData.state == 1 ?  '完成' : '未完成'}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="开始时间:">{{DetailFormData.start_time || '---'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="结束时间:">{{DetailFormData.end_time== '' ? '未结束' : DetailFormData.end_time}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型:">{{  DetailFormData.is_online == 1 ? '现场' : '线上'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="首次拍照:">{{DetailFormData.in_face || '---'}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最后拍照:">{{DetailFormData.out_face || '---'}}</el-form-item>
                    </el-col>
<<<<<<< HEAD
                </el-row> -->
                <!-- <el-row>
=======
                </el-row>
                <el-row>
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                    <el-col :span="12">
                        <el-form-item label="证书:">
                            <img v-if="DetailFormData.certificate_img" :src="DetailFormData.certificate_img" alt="">
                            <span v-else>未上传</span>
<<<<<<< HEAD
                            {{DetailFormData.certificate_img}}
                        </el-form-item>
                    </el-col>
                </el-row> -->
=======
                            <!-- {{DetailFormData.certificate_img}} -->
                        </el-form-item>
                    </el-col>
                </el-row>
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
            </el-form>
        </div>
             <div class="drawer-footer">
                <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </div>
        </el-drawer>
    </div>
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
<<<<<<< HEAD


//    调用   [商户业务] :: 商户端学习清单计划列表
=======
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e

    if (!store.state.ShopStudyRecodeData) {
        Vue.set(store.state, 'ShopStudyRecodeData', {
            re_ary: [],
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
            value1: ''
        });
    }

    export default {
        data() {
            return store.state.ShopStudyRecodeData;
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
            // 时间格式化
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },

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
                // ShopStudyRecodeList
                // ShopStudyPlanList
                lime.req('ShopStudyPlanList', {
                    login_token:lime.cookie_get('login_token'),
                    start_date: this.SearchFormData.start_date ? util.eleDate(this.SearchFormData.start_date) : '',
                    end_date: this.SearchFormData.end_date ? util.eleDate(this.SearchFormData.end_date): '',

                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;

                    // console.log('我的学习1')
                    // console.log(this.SearchFormData)
                    // console.log('我的学习1')
                    // this.SearchFormData.start_date='';
                    // this.SearchFormData.end_date='';
                    console.log('我的学习')
                    console.log(this.rows)
                    console.log('我的学习')
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done();
                    // this.loading = false;
                }, 10000);
            },
            // 状态格式化
            stateFormat(state) {
                // 状态：1未开始 2正在进行 3已结束
                if (state == 1) {
                    return '未开始';
                } else if (state == 2) {
                    return '正在进行';
                } else if (state == 3) {
                    return '已结束';
                } else {
                    return '';
                }
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
<<<<<<< HEAD
                this.SearchFormData.start_date = this.value1 ? this.value1[0] : ''
                this.SearchFormData.end_date = this.value1 ? this.value1[1] : ''
                this.SearchFormData.page_num = 1;
                this.init();
                // console.log(this.value1)
=======
                this.SearchFormData.start_date = this.value1[0]
                this.SearchFormData.end_date = this.value1[1]
                this.SearchFormData.page_num = 1;
                this.init();
                console.log(this.value1)
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
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

            // 编辑展示 
            handleReportEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.EditFormData = this.curr_row;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.uuid        = this.curr_row.uuid;

                lime.req('ShopStudyRecodeEdit', this.EditFormData).then(res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

            // 详细
            handleDetail(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                // ShopStudyRecodeDetail
                lime.req('ShopStudyPlanDetail', {
                    login_token:lime.cookie_get('login_token'),
                    // uuid:this.curr_row.uuid
                    plan_uuid: this.curr_row.uuid
                }).then(res => {
                    console.log(res.data)
                    this.DetailFormData = res.data
                    lime.req('ShopStudyExamList', {
                        login_token: lime.cookie_get('login_token'),
                        plan_uuid: res.data.uuid
                    }).then( res => {
                        console.log('1111')
                        console.log(res)
                        this.re_ary =  res.data.rows
                        console.log(8888)
                    })
                    this.detail_show = true;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

        }
    }
</script>

<style scoped>
@import '../../assets/styles/common.css';
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }
    .drawer-footer {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
    }

    .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
        display: block;

    }

<<<<<<< HEAD
     .re-flex {
        width: 99%;
        height: 40px;
        /* border: 1px solid #f2f2f2; */
        display: flex;
        flex-direction: row;
        /* border-bottom: 1px solid #f2f2f2; */
        border-right: 1px solid #f2f2f2;
        line-height: 40px;
        font-size: 12px;
        text-align: left;
    }
    
    .re-flexlf {
        width: 16.6%;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        overflow: hidden;
    }
    .re-flexmd {
        width: 45%;
        height: 100%;
        border-left: 1px solid #f2f2f2;
        border-top: 1px solid #f2f2f2;
        padding-left: 10px;
        box-sizing: border-box;
        overflow: hidden;
    }
    /* .re-flexrg {
        width: 8%;
        height: 100%;
        border-left: 1px solid #f2f2f2;
        border-top: 1px solid #f2f2f2;
        text-align: center;
    }
    .re-flexrg:hover {
        background: #2080F7;
        color: white;
    } */


=======
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
   /*  .page {
        height: 40px; 
        line-height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 40px;
        right:40px;
        overflow: hidden;
    } */
</style>
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
