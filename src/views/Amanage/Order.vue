<!--
 * @Author: your name
 * @Date: 2020-09-10 17:05:37
 * @LastEditTime: 2020-09-24 18:31:00
 * @LastEditors: Please set LastEditors
 * @Description: 工单管理
 * @FilePath: /shop/src/views/Amanage/Order.vue
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
        <!-- <h6>{{cpname}}</h6> -->
        <!-- <TableBase  :loading="loading" :rows="rows" :columns="columns" :page_num="page_num" :total="total" @stateFmt="stateFormat" @selRow="onSelectCurrRow" @pageChange="onPageChange" :onRefresh="onRefresh"/> -->
        <!-- <TableBase :loading="loading"  :rows="rows" :columns="columns" :page_num="page_num" :total="total" @selRow="onSelectCurrRow" @pageChange="onPageChange" :onRefresh="onRefresh"/> -->
        <!-- 表格 -->
        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                @current-change="onSelectCurrRow"
                :data="rows" 
                :height="height - 60 - 50"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :highlight-current-row="true" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column align="center" prop="title" label="主题"></el-table-column>
                <el-table-column align="center" prop="add_time" label="添加时间"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="content" label="内容"></el-table-column>
                <el-table-column align="center" prop="feedback" label="内容反馈"></el-table-column>
                <el-table-column align="center" prop="last_time" label="结束时间"></el-table-column>
                <el-table-column align="center" prop="status" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="to_department" label="接收部门"></el-table-column>
                <el-table-column align="center" prop="to_person" label="接收人"></el-table-column>
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



        <!-- 添加 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="AddFormData" label-width="120px" label-position="left">
                    <el-form-item label="接收部门:" required>
                        <el-input v-model="AddFormData.to_department" />
                    </el-form-item>

                    <el-form-item label="接收人:" required>
                        <el-input v-model="AddFormData.to_person" />
                    </el-form-item>

                    <el-form-item label="主题:" required>
                        <el-input v-model="AddFormData.title" />
                    </el-form-item>
                    <el-form-item label="内容:" required>
                        <el-input type="textarea" v-model="AddFormData.content"></el-input>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        
        <!-- 编辑 -->
        <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="EditFormData" label-width="120px" label-position="left">
                    <el-form-item label="接收部门:" required>
                        <el-input v-model="EditFormData.to_department" />
                    </el-form-item>

                    <el-form-item label="接收人:" required>
                        <el-input v-model="EditFormData.to_person" />
                    </el-form-item>

                    <el-form-item label="主题:" required>
                        <el-input v-model="EditFormData.title" />
                    </el-form-item>
                    <el-form-item label="内容:" required>
                        <el-input type="textarea" v-model="EditFormData.content"></el-input>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
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
                <el-form :model="DetailFormData" label-width="120px" label-position="left">
                    <el-form-item label="接收部门:">{{DetailFormData.to_department || '----'}}</el-form-item>
                    <el-form-item label="接收人:">{{DetailFormData.to_person || '----'}}</el-form-item>
                    <el-form-item label="主题:">{{DetailFormData.title || '----'}}</el-form-item>
                    <el-form-item label="内容:">
                        <div style="width: 100%;height: auto;word-wrap:break-word;">
                            {{DetailFormData.content}}
                        </div>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="detail_show = false" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>
        <!-- <el-dialog 
            title=""
            width="450px"
            :visible.sync="detail_show">
            <el-form :model="DetailFormData" label-width="120px">
                <el-form-item label="接收部门:">{{DetailFormData.to_department || '----'}}</el-form-item>
                <el-form-item label="接收人:">{{DetailFormData.to_person || '----'}}</el-form-item>
                <el-form-item label="主题:">{{DetailFormData.title || '----'}}</el-form-item>
                <el-form-item label="内容:">{{DetailFormData.content || '----'}}</el-form-item>
            </el-form>
        </el-dialog> -->

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { workOrderList, workOrderAdd, workOrderEdit, workOrderDel } from "@/api/request"
    // import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.OrderData) {
        Vue.set(store.state, 'OrderData', {
            total:0,
            // page_num:1,
            // page_len:10,
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
            SearchFormData:{
                // name:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            //表格数据
            rows: [],
            cpname: '工单管理--api 平台未找到相关接口',
            direction: 'rtl',

        });
    }
    export default {
        // components: {
        //     TableBase
        // },
        data() {
            return store.state.OrderData;
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
        },
        methods: {
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
           init() {
                this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }
                workOrderList(pam, res => {
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
            // 点击单选
            onSelectCurrRow(row) {
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormDatapage_num = page;
                this.init();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
               this.AddFormData.login_token = lime.cookie_get('login_token');
               let pam = {
                   login_token: this.AddFormData.login_token,
                   to_department: this.AddFormData.to_department,
                   to_person: this.AddFormData.to_person,
                   title: this.AddFormData.title,
                   content: this.AddFormData.content,
               }
               workOrderAdd(pam, res => {
                   this.init();
                   this.add_show = false;
               }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            // 删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }
                    workOrderDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            //编辑
            handleEdit() {
                // this.EditFormData.to_department = this.curr_row.to_department || '';
                // this.EditFormData.to_person = this.curr_row.to_person || '';
                // this.EditFormData.title = this.curr_row.title || '';
                // this.EditFormData.content  = this.curr_row.content || ''; 
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
               this.EditFormData.login_token = lime.cookie_get('login_token'),
               this.EditFormData.uuid = this.curr_row.uuid
                workOrderEdit(this.EditFormData, res => {
                   this.init();
                   this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            //详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.DetailFormData = this.curr_row
                this.detail_show = true
            },
            stateFormat(state) {
                if (state == 0) {
                    return '未开始';
                } else if (state == 1) {
                    return '处理中';
                } else if (state == 2){
                    return '已处理';
                }else{
                    return '已接收';
                }
            },
        }

        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
</style>