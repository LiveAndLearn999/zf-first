<!--
 * @Author: your name
 * @Date: 2020-09-10 17:21:12
 * @LastEditTime: 2020-09-10 17:21:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Plain.vue
-->
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
                <el-table-column prop="cname" label="计划名称"></el-table-column>
                <el-table-column prop="shop_id" label="企业ID"></el-table-column>
                <!-- <el-table-column prop="org_id" label="org_id"></el-table-column>
                <el-table-column prop="app_id" label="app_id"></el-table-column> -->
                <el-table-column prop="img" label="图片"></el-table-column>
                <el-table-column prop="add_staff_id" label="安全员ID"></el-table-column>
                <el-table-column prop="add_time" label="添加时间" :sortable=true>
                     <template slot-scope="scope">
                        {{formatDate(scope.row.add_time * 1000)}}
                    </template>
                </el-table-column>
                <el-table-column prop="last_time" label="最近登录时间" align="center" :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.last_time == 0 ? '还未登陆' : formatDate(scope.row.last_time * 1000)}}
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

        <!-- 添加模板 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="80px">
                <el-form-item label="上级id:" prop="parent_uuid" :required='true'>
                    <el-input v-model="AddFormData.parent_uuid"/>
                </el-form-item>

                <el-form-item label="计划组名称" label-width="100px" :required='true'>
                    <el-input v-model="AddFormData.name"/>
                </el-form-item>

                <el-form-item label="img:" :required='true'>
                    <el-input v-model="AddFormData.img"/>
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
            <el-form :model="EditFormData" label-width="80px">
                <el-form-item label="上级id:" prop="uuid" :required='true'>
                    <el-input v-model="EditFormData.uuid" @input="change($event)"/>
                </el-form-item>

                <el-form-item label="计划组名称" label-width="100px" :required='true'>
                    <el-input v-model="EditFormData.name" @input="change($event)"/>
                </el-form-item>

                <el-form-item label="img:" :required='true'>
                    <el-input v-model="EditFormData.img" @input="change($event)"/>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.ShopPlanGroupData) {
        Vue.set(store.state, 'ShopPlanGroupData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            // 添加
            add_show:false,
            AddFormData:{
                login_token:'',
                parent_uuid: '',
                name:'',
                img:'',
            },

            // 编辑
            edit_show:false,
            EditFormData:{
                login_token:'',
                uuid: '',
                name:'',
                img:'',
            },

        });
    }

    export default {
        data() {
            return store.state.ShopPlanGroupData;
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

                lime.req('ShopPlanGroupList', {
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
                    // console.log(this.rows)
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

            // 添加展示
            handleAdd(r) {
                this.add_show = true;
                this.AddFormData.parent_uuid = r.uuid;
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                lime.req('ShopPlanGroupAdd', this.AddFormData).then(res => {
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
                
                this.edit_show = true;

                this.EditFormData.uuid = this.curr_row.uuid;
                this.EditFormData.name = this.curr_row.cname;
                this.EditFormData.img = this.curr_row.img;
            },
            // 解决编辑模板输入问题
            change(e){
                this.$forceUpdate()
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
               
                lime.req('ShopPlanGroupEdit', this.EditFormData).then(res => {
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
                    lime.req('ShopPlanGroupDel', {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }).then(res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
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
