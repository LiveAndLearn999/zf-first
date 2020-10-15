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
                    <div style="text-align: right; font-size: 16px">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link>
                        
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
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                :data="rows"
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="plan_name" show-overflow-tooltip label="计划名称" align="left"></el-table-column>
                <el-table-column prop="state"  label="状态" align="center">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column prop="start_time" label="开始时间" align="center" :sortable=true></el-table-column>
                <el-table-column prop="end_time" label="结束时间" align="center" :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.end_time == '' ? '未结束' : scope.row.end_time}}
                    </template>
                </el-table-column>
                <el-table-column prop="is_online" label="类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_online == 1 ? '现场' : '线上'}}
                    </template>
                </el-table-column>
                <el-table-column prop="in_face" label="首次拍照" align="center"></el-table-column>
                <el-table-column prop="out_face" label="最后拍照" align="center"></el-table-column>
                <el-table-column prop="certificate_img" label="证书" align="center"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
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
                layout="prev, pager, next, jumper"
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
        <el-dialog title="详细" :visible.sync="detail_show" width="450px">
            <el-form :model="DetailFormData" label-width="120px" label-position="left">
                <!-- <el-form-item label="UUID:">{{DetailFormData.uuid}}</el-form-item> -->
                <el-form-item label="状态:">{{DetailFormData.state == 1 ?  '完成' : '未完成'}}</el-form-item>
                <el-form-item label="开始时间:">{{DetailFormData.start_time || '---'}}</el-form-item>
                <el-form-item label="结束时间:">{{DetailFormData.end_time== '' ? '未结束' : DetailFormData.end_time}}</el-form-item>
                <el-form-item label="类型:">{{  DetailFormData.is_online == 1 ? '现场' : '线上'}}</el-form-item>
                <el-form-item label="首次拍照:">{{DetailFormData.in_face || '---'}}</el-form-item>
                <el-form-item label="最后拍照:">{{DetailFormData.out_face || '---'}}</el-form-item>
                <el-form-item label="证书:">
                    <img v-if="DetailFormData.certificate_img" :src="DetailFormData.certificate_img" alt="">
                    <span v-else>未上传</span>
                    <!-- {{DetailFormData.certificate_img}} -->
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="detail_show = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

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
                this.loading = true;
                // console.log('我的学习0')
                // console.log(this.SearchFormData)
                // console.log('我的学习0')
                lime.req('ShopStudyRecodeList', {
                    login_token:lime.cookie_get('login_token'),
                    start_date: this.SearchFormData.start_date ? util.eleDate(this.SearchFormData.start_date) : '',
                    end_date: this.SearchFormData.end_date ? util.eleDate(this.SearchFormData.end_date): '',

                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
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
                    this.loading = false;
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

                lime.req('ShopStudyRecodeDetail', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
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
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }

    .page {
        height: 40px; 
        line-height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 40px;
        right:40px;
        overflow: hidden;
    }
</style>
