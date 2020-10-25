<template>
    <div v-wechat-title="$route.meta.title">
        <div style="height: 46px; line-height: 46px;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
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
                @current-change="onSelectCurrRow"
                :data="rows" 
                style="width: 100%" 
                :highlight-current-row="true"
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="contact_name" label="联系人"></el-table-column>
                <el-table-column prop="contact_tel" label="联系电话"></el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="注册时间"></el-table-column>
            </el-table>
        </div>



        <el-dialog title="创建商户超管" :visible.sync="sup_show" width="400px">
            <el-form :model="SupFormData" label-width="80px">
                <el-form-item label="登录手机:" >
                    <el-input v-model="SupFormData.mobile" autocomplete="off"></el-input>
                </el-form-item>
    
                <el-form-item label="登录密码:" >
                    <el-input show-password v-model="SupFormData.pwd" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="超管姓名:" >
                    <el-input v-model="SupFormData.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sup_show = false">取 消</el-button>
                <el-button type="primary" @click="onAddSupSubmit">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.ShopData) {
        Vue.set(store.state, 'ShopData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null, // 当前选中行

            SearchFormData:{
                name:'',

                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            search_show:false,


            // 添加
            add_show:false,
            AddFormData:{},


            // 编辑
            edit_show:false,
            EditFormData:{},

            // 创建超管
            sup_show: false,
            SupFormData:{
                mobile:'',
                pwd:'',
                name:''
            },
            
        });
    }

    export default {
        data() {
            return store.state.ShopData;
        },
        created(){
            this.init();
        },
        methods:{
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化 列表
            init() {
                lime.req('ManageShopList', {
                    login_token:lime.cookie_get('login_token'),
                    name:this.SearchFormData.name,

                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                })
            },
            stateFormat(state) {
                if (state == 0) {
                    return '待审';
                } else if (state == 1) {
                    return '已审';
                } else {
                    return '作废';
                }
            },
            // 刷新
            onRefresh() {
                this.init();
            },
            // 搜索弹框
            onSearch() {
                this.search_show = true;
            },
            // 点击单选
            onSelectCurrRow(row) {
                this.curr_row = row;
            },




            // 添加,
            handleAdd() {

            },
            onAddSubmit() {

            },


            // 编辑
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }

                this.edit_show = true;
            },
            onEditSubmit() {
                lime.req('ManageShopEdit', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    name:this.EditFormData.name,
                }).then(res => {
                    this.edit_show = false;
                    this.init();
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

            // 审核
            handleExamine(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择数据');
                    return false;
                }

                lime.req('ManageShopCheck', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }).then(res =>{
                    this.$message.success('操作成功');
                    this.init();
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            
            // 创建超管
            handleAddSup(menu) {
                if (util.empty(this.curr_row)){
                    this.$message.error('请选择数据');
                    return false;
                }
                this.sup_show = true;
            },
            onAddSupSubmit() {
                lime.req('ManageCreateShopAdmin', {
                    login_token:lime.cookie_get('login_token'),
                    shop_uuid:this.curr_row.uuid,
                    mobile:this.SupFormData.mobile,
                    pwd:this.SupFormData.pwd,
                    name:this.SupFormData.name
                }).then(res => {
                    this.$message.success('设置超管成功');
                    this.curr_row = null;
                    this.sup_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            }
        }
    }
</script>

<style scoped>
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }
</style>