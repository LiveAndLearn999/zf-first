<!--
 * @Author: your name
 * @Date: 2020-09-10 17:23:13
 * @LastEditTime: 2020-09-21 14:34:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Plaindo.vue
-->
<!-- 计划管理 -->
<template>
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
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="title" label="计划名称" align="center"></el-table-column>
                <el-table-column prop="start_time" label="开始时间" align="center" :sortable=true></el-table-column>
                <el-table-column prop="end_time" label="结束时间" align="center" :sortable=true></el-table-column>
            </el-table>
            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="40%">
            <el-form :model="SearchFormData" label-width="120px" label-position="left"> 
                <el-form-item label="计划名称:"><el-input v-model="SearchFormData.title" /></el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加模板 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="AddFormData" label-width="140px" label-position="left">
                    <el-form-item label="计划组名称:" required><el-input v-model="AddFormData.title"/></el-form-item>
                    <el-form-item label="计划组唯一标识:" required><el-input v-model="AddFormData.plan_group_uuid"/></el-form-item>
                    <el-form-item label="开始时间:" required>
                        <el-date-picker v-model="AddFormData.start_time"    type="datetime" placeholder="选择日期时间:"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="学员组成类型:" required>
                        <el-radio v-model="AddFormData.study_user_type" label="1">员工</el-radio>
                        <el-radio v-model="AddFormData.study_user_type" label="2">学员</el-radio>
                        <el-radio v-model="AddFormData.study_user_type" label="3">混合</el-radio>
                    </el-form-item>
                    <el-form-item label="时长:" required><el-input v-model="AddFormData.duration"/></el-form-item>
                    <el-form-item label="支付类型:" required>
                        <el-radio v-model="AddFormData.pay_type" label="1">企业付费</el-radio>
                        <el-radio v-model="AddFormData.pay_type" label="2">其它</el-radio>
                    </el-form-item>
                    <el-form-item label="学习开始是否拍照:" required>
                        <el-radio v-model="AddFormData.study_start_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="AddFormData.study_start_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="学习过程拍照:" required><el-input v-model="AddFormData.study_process_photo"/></el-form-item>
                    <el-form-item label="学习结束是否拍照:" required>
                        <el-radio v-model="AddFormData.study_end_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="AddFormData.study_end_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="学习过程学习:" required><el-input v-model="AddFormData.exam_process_photo"/></el-form-item>
                    <el-form-item label="考试结束是否拍照:" required>
                        <el-radio v-model="AddFormData.exam_end_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="AddFormData.exam_end_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="考试开始是否拍照:" required>
                        <el-radio v-model="AddFormData.exam_start_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="AddFormData.exam_start_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                </el-form>
                <div slot="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 编辑模板 -->
        <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="EditFormData" label-width="140px" label-position="left">
                    <el-form-item label="计划组名称:"><el-input v-model="EditFormData.title"/></el-form-item>
                    <el-form-item label="计划组唯一标识:"><el-input v-model="EditFormData.plan_group_uuid"/></el-form-item>
                    <el-form-item label="开始时间:">
                        <el-date-picker v-model="EditFormData.start_time"    type="datetime" placeholder="选择日期时间:"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="学员组成类型:">
                        <el-radio v-model="EditFormData.study_user_type" label="1">员工</el-radio>
                        <el-radio v-model="EditFormData.study_user_type" label="2">学员</el-radio>
                        <el-radio v-model="EditFormData.study_user_type" label="3">混合</el-radio>
                    </el-form-item>
                    <el-form-item label="时长:"><el-input v-model="EditFormData.duration"/></el-form-item>
                    <el-form-item label="支付类型:">
                        <el-radio v-model="EditFormData.pay_type" label="1">企业付费</el-radio>
                        <el-radio v-model="EditFormData.pay_type" label="2">其它</el-radio>
                    </el-form-item>
                    <el-form-item label="学习开始是否拍照:">
                        <el-radio v-model="EditFormData.study_start_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.study_start_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="学习过程拍照:"><el-input v-model="EditFormData.study_process_photo"/></el-form-item>
                    <el-form-item label="学习结束是否拍照:">
                        <el-radio v-model="EditFormData.study_end_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.study_end_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="学习过程学习:"><el-input v-model="EditFormData.exam_process_photo"/></el-form-item>
                    <el-form-item label="考试结束是否拍照:">
                        <el-radio v-model="EditFormData.exam_end_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.exam_end_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="考试开始是否拍照:">
                        <el-radio v-model="EditFormData.exam_start_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.exam_start_photo" label="1">拍照 </el-radio>
                        <!-- <el-input v-model="AddFormData.exam_start_photo"/> -->
                    </el-form-item>
                </el-form>
                <div slot="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="edit_show = false">取消</el-button>
                    <el-button @click="onEditSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="DetailFormData" label-width="140px" label-position="left">
                    <el-form-item label="计划组名称:">{{DetailFormData.title}}</el-form-item>
                    <el-form-item label="计划组唯一标识:">{{DetailFormData.plan_group_uuid}}</el-form-item>
                    <el-form-item label="开始时间:">{{DetailFormData.start_time}}</el-form-item>
                    <el-form-item label="学员组成类型:">{{DetailFormData.study_user_type}}</el-form-item>
                    <el-form-item label="时长:">{{DetailFormData.duration}}</el-form-item>
                    <el-form-item label="支付类型:">{{DetailFormData.pay_type}}</el-form-item>
                    <el-form-item label="学习开始是否拍照:">{{DetailFormData.study_start_photo}}</el-form-item>
                    <el-form-item label="学习过程拍照:">{{DetailFormData.study_process_photo}}</el-form-item>
                    <el-form-item label="学习结束是否拍照:">{{DetailFormData.study_end_photo}}</el-form-item>
                    <el-form-item label="学习过程学习:">{{DetailFormData.exam_process_photo}}</el-form-item>
                    <el-form-item label="考试结束是否拍照:">{{DetailFormData.exam_end_photo}}</el-form-item>
                    <el-form-item label="考试开始是否拍照:">{{DetailFormData.exam_start_photo}}</el-form-item>
                </el-form>
                <div slot="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="detail_show = false" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopPlanList, ShopPlanAdd, ShopPlanDel, ShopPlanEdit, ShopPlanDetail } from '@/api/request'

    if (!store.state.ShopPlanData) {
        Vue.set(store.state, 'ShopPlanData', {
            rows:[],
            total:0,
            loading:false,
            direction: 'rtl',
            curr_row:null,
            // 搜索
            search_show:false,
            SearchFormData:{
                title:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            // 添加
            add_show:false,
            AddFormData:{
                start_time: '',
                login_token:'',
                parent_uuid: '',
                name:'',
                img:'',
            },
            // 编辑
            edit_show:false,
            EditFormData:{
                login_token:'',
                parent_uuid: '',
                name:'',
                img:'',
            },
            // 详细
            detail_show:false,
            DetailFormData:[],
        });
    }

    export default {
        data() {return store.state.ShopPlanData;},
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
            onSubMenu(menu, local = false) {util.submenu(menu,this,lime.cookie_get('login_token'), local);},
            // 数据初始化
            init() {
                this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    title:this.SearchFormData.title,
                    page_num:this.SearchFormData.page_num + '',
                    page_len:this.SearchFormData.page_len + '',
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }
                ShopPlanList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.SearchFormData.title = ''
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },
            // 学员类型格式化
            studyUserTypeFormat(state) {
                // 1员工 2学员 3混合
                if (state == 1) {
                    return '员工';
                } else if (state == 2) {
                    return '学员';
                } else if (state == 3) {
                    return '混合';
                } else {
                    return '';
                }
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch() {this.search_show = true;},
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false,
                this.SearchFormData.page_num = 1;
                this.init();
            },
            // 选择单行
            onSelectRow(row){this.curr_row = row;},
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            // 排序处理
            onSortChange(sort) {
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                this.init();
            },

            // 添加
            handleAdd(r) {
                this.add_show = true;
            },
            onAddSubmit() {
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    title: 'test',
                    plan_group_uuid: '111',
                    start_time: '2020-09-21',
                    end_time: '2020-10-21',
                    question_rule: '[]',
                    study_user_type: '1',
                    duration: '45',
                    pay_type: '1',
                    study_start_photo: '0',
                    study_process_photo: '1',
                    study_end_photo: '0',
                    exam_process_photo: '1',
                    exam_end_photo: '0',
                    exam_start_photo: '0'  
                }
                ShopPlanAdd(pam, res => {
                    this.init()
                    this.add_show = false
                }).catch(err => {
                    this.add_show = false
                    this.$message.error(err.msg)
                })
            },

             // 删除
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                   let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }
                    ShopPlanDel(pam, res => {
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
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                this.EditFormData.uuid        = this.curr_row.uuid
                ShopPlanEdit(this.EditFormData, res => {
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
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }
                ShopPlanDetail(pam, res => {
                    this.DetailFormData = res.data
                    this.detail_show = true;
                }).catch( err => {
                    this.$message.error(err.msg)
                })
            },

        }
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
    .mbstyle{
        margin-bottom: 0px;
    }
</style>
