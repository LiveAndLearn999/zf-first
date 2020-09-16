<!--
 * @Author: your name
 * @Date: 2020-09-10 17:05:37
 * @LastEditTime: 2020-09-16 16:29:47
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
        <TableBase :loading="loading" :rows="rows" :columns="columns" :page_num="page_num" :total="total" @selRow="onSelectCurrRow" @pageChange="onPageChange" :onRefresh="onRefresh"/>
        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="120px">
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

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog 
            title="编辑"
            width="450px"
            :visible.sync="edit_show">
            <el-form :model="EditFormData" label-width="120px">

                <el-form-item label="接收部门:">
                    <el-input v-model="EditFormData.to_department"/>
                </el-form-item>
                <el-form-item label="接收人:">
                    <el-input v-model="EditFormData.to_person" />
                </el-form-item>

                <el-form-item label="主题:">
                    <el-input v-model="EditFormData.title" />
                </el-form-item>
                <el-form-item label="内容:">
                    <el-input type="textarea" v-model="EditFormData.content"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button type="primary" @click="onEditSubmit">确认</el-button>
            </span>
        </el-dialog>

         <!-- 详细 -->
        <el-dialog 
            title=""
            width="450px"
            :visible.sync="detail_show">
            <el-form :model="DetailFormData" label-width="120px">
                <el-form-item label="接收部门:">{{DetailFormData.to_department || '----'}}</el-form-item>
                <el-form-item label="接收人:">{{DetailFormData.to_person || '----'}}</el-form-item>
                <el-form-item label="主题:">{{DetailFormData.title || '----'}}</el-form-item>
                <el-form-item label="内容:">{{DetailFormData.content || '----'}}</el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { workOrderList, workOrderAdd, workOrderEdit, workOrderDel } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.OrderData) {
        Vue.set(store.state, 'OrderData', {
            rows:[],
            total:0,
            page_num:1,
            page_len:10,
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
                {prop: 'add_time', label: '添加时间'},
                {prop: 'content', label: '内容'},
                {prop: 'feedback', label: '内容反馈'},
                {prop: 'last_time', label: '结束时间'},
                {prop: 'status', label: '状态'},
                {prop: 'title', label: '主题'},
                {prop: 'to_department', label: '接收部门'},
                {prop: 'to_person', label: '接收人'}    
            ],
            cpname: '工单管理--api 平台未找到相关接口',

        });
    }
    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.OrderData;
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
                this.page_num = page;
                this.init();
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
                let pam = {
                   login_token: this.EditFormData.login_token,
                   to_department: this.EditFormData.to_department,
                   to_person: this.EditFormData.to_person,
                   title: this.EditFormData.title,
                   content: this.EditFormData.content,
               }
                workOrderEdit(pam, res => {
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
            }
        }

        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
</style>