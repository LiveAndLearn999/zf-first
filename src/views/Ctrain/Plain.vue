<!--
 * @Author: your name
 * @Date: 2020-09-10 17:21:12
 * @LastEditTime: 2020-09-25 15:01:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Plain.vue
-->
<!-- 计划分组 -->
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
                ref="role"
                :data="rows"
                row-key="uuid"
                :height="height - 60 - 95"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
                <el-table-column prop="img" label="图片" align="center">
                    <template slot-scope="scope">
                        <img class="imgclass" v-if="scope.row.img" :src="scope.row.img" @click="showImg(scope.row.img)" alt="未上传" style="width: 40px;">
                        <span v-else style="color: red">未上传</span>
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
        <!-- <div style="border-top: solid 1px #f2f1f4;">
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
                <el-table-column prop="name" label="计划名称"></el-table-column>
               
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div> -->

        <!-- 添加模板 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="120px" label-position="left">
                <el-form-item label="所属父类:">
                    <el-cascader 
                        clearable 
                        :options="add_rows"
                        :props="{expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="请选择"
                        v-model="AddFormData.parent_uuid" style="width: 330px">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="计划组名称:">
                    <el-input v-model="AddFormData.name" style="width: 330px"/>
                </el-form-item>
                <el-form-item label="图片:">
                    <file v-if="add_show" ref="upload"/>
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
            <el-form :model="EditFormData" label-width="80px" label-position="left">
                <el-form-item label="所属父类:">
                    <el-cascader 
                        clearable 
                        :options="edit_rows"
                        :props="{expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                        placeholder="请选择"
                        v-model="EditFormData.parent_uuid" style="width: 320px">
                    </el-cascader>
                </el-form-item>

                <el-form-item label="计划名称:">
                    <el-input v-model="EditFormData.name" style="width: 320px"/>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog  
            title="查看"
            :visible.sync="img_show"
            width="500px">
            <img :src="img_url" alt="查看" style="width: 100%">
            <span slot="footer">
                <el-button @click="img_show = false" type="primary">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import file from "@/components/imgUpload/upload.vue"

    if (!store.state.ShopPlanGroupData) {
        Vue.set(store.state, 'ShopPlanGroupData', {
            list: [],
            rows:[],
            total:0,
            loading:false,

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
            add_rows: [],
            AddFormData:{
                login_token:'',
                parent_uuid: '',
                name:'',
                img:'',
            },

            // 编辑
            edit_show:false,
            edit_rows:[],
            EditFormData:{
                login_token:'',
                uuid: '',
                name:'',
                img:'',
            },
            img_show: false,
            img_url: ''

        });
    }

    export default {
        components: {
            file
        },
        data() {return store.state.ShopPlanGroupData;},
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
                    // real_name:this.SearchFormData.real_name,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    // this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.curr_row = null;
                    this.$refs.role.setCurrentRow();
                    this.list = res.data.rows;
                    this.rows = util.toTrees(res.data.rows);
                    // this.rows = this.toTree(res.data.rows);
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },
        
            // 表格数据刷新
            onRefresh() {this.init();},
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

            // 添加展示
            handleAdd(r) {
                this.AddFormData = {
                    name:'',
                    parent_uuid:'',
                }
                // 如果选择列表数据,则获取作为父类
                if (!util.empty(this.curr_row)) {
                    this.AddFormData.parent_uuid = this.curr_row.uuid;
                }
                let _rows = [];
                this.add_rows = [];
                this.list.forEach(item => {
                    _rows.push({
                        name:item.name,
                        parent_uuid:item.parent_uuid,
                        uuid:item.uuid
                    })
                });
                this.add_rows = util.toTrees(_rows);
                this.add_show = true;
            },
            // 添加向后台提交
            onAddSubmit() {
                if(!this.$refs.upload.img_url){
                     this.$confirm('确定不上传图片?', '提示').then(() => {
                        this.AddFormData.login_token = lime.cookie_get('login_token');
                        // this.AddFormData.img  = this.$refs.upload.img_url;
                        lime.req('ShopPlanGroupAdd', this.AddFormData).then(res => {
                            this.SearchFormData.page_num = 1;
                            this.init();
                            this.add_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        })
                        return;
                    }).catch( err => {
                        return;
                    })
                }
                this.AddFormData.login_token = lime.cookie_get('login_token');
                this.AddFormData.img  = this.$refs.upload.img_url;
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

                let _rows = [];
                this.edit_rows = [];
                this.list.forEach(item => {
                    if (item.uuid != this.curr_row.uuid) {
                        _rows.push({
                            name:item.name,
                            parent_uuid:item.parent_uuid,
                            uuid:item.uuid,
                        });
                    }
                });
                this.edit_rows = util.toTree(_rows);
                this.EditFormData.parent_uuid = this.curr_row.parent_uuid;
                this.EditFormData.name = this.curr_row.name;
                
                this.edit_show = true;

                // this.EditFormData.uuid = this.curr_row.uuid;
                // this.EditFormData.name = this.curr_row.cname;
                // this.EditFormData.img = this.curr_row.img;
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
            },

            showImg(imgUrl){
                console.log(imgUrl)
                this.img_show = true
                this.img_url = imgUrl
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

    .imgclass {
        cursor: pointer;
    }
</style>
