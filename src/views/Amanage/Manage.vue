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
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="mobile" label="登录手机"></el-table-column>
                <el-table-column prop="role_name" label="角色">
                    <template slot-scope="scope">
                        {{scope.row.role_name == '' ? '未设置' : scope.row.role_name}}
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" :sortable=true></el-table-column>
                <el-table-column 
                    prop="last_time" 
                    label="最近登录时间" 
                    align="center"
                    :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.last_time == 0 ? '还未登陆' : scope.row.last_time}}
                    </template>
                </el-table-column>
                <el-table-column prop="last_ip" label="最近登录IP" align="center">
                    <template slot-scope="scope">
                        {{scope.row.last_ip == 0 ? '-' : scope.row.last_ip}}
                    </template>
                </el-table-column>
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
            width="30%">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="员工姓名:">
                    <el-input v-model="SearchFormData.real_name" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 详细模板 -->
        <el-dialog  
            title=""
            :visible.sync="detail_show"
            width="500px">
            <el-form :model="DetailFormData" label-width="120px">
                <el-form-item label="登陆手机:">
                    {{DetailFormData.mobile}}
                </el-form-item>


                <el-form-item label="员工姓名:">
                    {{DetailFormData.name}}
                </el-form-item>
                <el-form-item label="状态:">
                    {{DetailFormData.state === 1 ? '启用' : '禁用'}}
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 添加模板 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="120px">
                <el-form-item label="登陆手机:" required>
                    <el-input v-model="AddFormData.mobile" />
                </el-form-item>

                <el-form-item label="登陆密码:" required>
                    <el-input show-password v-model="AddFormData.pwd" />
                </el-form-item>

                <el-form-item label="员工姓名:" required>
                    <el-input v-model="AddFormData.name" />
                </el-form-item>
                <el-form-item label="启用:" required>
                    <el-switch v-model="AddFormData.state"></el-switch>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑模板 -->
        <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="120px">
                <el-form-item label="员工姓名:">
                    <el-input v-model="EditFormData.name" />
                </el-form-item>
                <el-form-item label="启用:">
                    <el-switch v-model="EditFormData.state"></el-switch>
                    <!-- <el-input v-model="EditFormData.state" /> -->
                </el-form-item>

            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 设置角色 -->
         <el-dialog 
            title="设置角色"
            width="450px"
            :visible.sync="role_show">
            <el-form :model="RoleFormData" label-width="80px">
                <el-form-item label="拥有角色:">
                    <el-cascader 
                        clearable 
                        :options="role_rows"
                        :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="不选择,无权限"
                        v-model="RoleFormData.role_uuid">
                    </el-cascader>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="role_show = false">取消</el-button>
                <el-button type="primary" @click="onRoleSubmit">确认</el-button>
            </span>
        </el-dialog>

        <!-- 设置角色 -->
         <el-dialog 
            title="重置密码"
            width="450px"
            :visible.sync="setpwd_show">
            <el-form :model="PwdFormDate" label-width="80px">
                <el-form-item label="新密码:">
                    <el-input v-model="PwdFormDate.pwd" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="setpwd_show = false">取消</el-button>
                <el-button type="primary" @click="onPwdSubmit">确认</el-button>
            </span>
        </el-dialog>

    
    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.ManageData) {
        Vue.set(store.state, 'ManageData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            SearchFormData:{
                real_name:'',

                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            search_show:false,

            //详细
            detail_show: false,
            DetailFormData:{},
            // 添加
            add_show:false,
            AddFormData:{
                real_name:'',
                mobile:'',
                pwd:'',
            },

            //编辑
            edit_show:false,
            EditFormData:{
                real_name:''
            },

            //设置角色
            role_show:false,
            role_rows:[],
            RoleFormData:{
                manage_uuid:'',
                role_uuid:'',
            },
            setpwd_show: false,
            PwdFormDate: {}

        });
    }

    export default {
        data() {
            return store.state.ManageData;
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

                lime.req('ShopStaffList', {
                    login_token:lime.cookie_get('login_token'),
                    real_name:this.SearchFormData.real_name,

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
            // 状态格式化
            stateFormat(state) {
                if (state == 0) {
                    return '待审';
                } else if (state == 1) {
                    return '已审';
                } else {
                    return '作废';
                }
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch() {
                this.search_show = true;
            },
            // 搜索提交
            onSearchSubmit(){
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

            //详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
               this.DetailFormData.name = this.curr_row.name
               this.DetailFormData.mobile = this.curr_row.mobile
               this.DetailFormData.state = this.curr_row.state
               this.detail_show = true; 
            },
            // 添加展示
            handleAdd() {
                this.add_show = true;
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                this.AddFormData.state = this.AddFormData.state ? 1 : 0;
                lime.req('ShopStaffAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },


            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.EditFormData.name = this.curr_row.name;
                this.edit_show =true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.uuid        = this.curr_row.uuid;
                this.EditFormData.state = this.EditFormData.state ? 1 : 0;
                lime.req('ShopStaffEdit', this.EditFormData).then(res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },


            // 删除确认提交
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }


                this.$confirm('确认删除?', '提示').then(() => {
                    lime.req('ShopStaffDel', {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }).then(res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },

            // 设置角色
            handleSetRole(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                
                // 获取当前登录账号拥有的角色
                lime.req({
                    module:'ShopStaffSetRole',
                    ver:'1.0.0',
                    relation_module:'ShopRoleList',
                    relation_ver:'1.0.0'
                }, {    
                    login_token:lime.cookie_get('login_token'),
                }).then(res => {
                    this.role_rows = util.toTree(res.data);
                    this.role_show = true;
                })
            },
            // 设置角色提交
            onRoleSubmit(){
                lime.req('ShopStaffSetRole', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    role_uuid:this.RoleFormData.role_uuid
                }).then(res =>{
                    // this.init,
                    this.role_show=false
                }).catch(err => {
                    this.$message.error(err.msg)
                })
            },
            handleResetPwd() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.setpwd_show = true;

            },
            onPwdSubmit() {
              lime.req('ShopStaffResetPwd', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid,
                    pwd: this.PwdFormDate.pwd
                }).then(res =>{
                    // this.init,
                    this.setpwd_show=false
                }).catch(err => {
                    this.$message.error(err.msg)
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

    .page {
        height: 40px; 
        line-height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 0;
        right:0;
        overflow: hidden;
    }
</style>