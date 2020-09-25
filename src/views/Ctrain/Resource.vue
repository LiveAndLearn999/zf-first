<!--
 * @Author: your name
 * @Date: 2020-09-10 11:32:21
 * @LastEditTime: 2020-09-10 11:34:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Resource.vue
-->
<!-- 学习资料 -->
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

                <!-- 前端自定义功能 -->
                <el-col :span="18">
                    <div style="text-align: right; ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link>

                        <el-link class="menu" @click="onSubMenu(item)" 
                            v-for="(item,index) in $store.state.AdminData.right_menus" :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 数据表格 -->
        <div style="border-top: solid 1px #f2f1f4;">
            <el-table :data="rows" :height="height - 60 - 46 - 48" 
                v-loading="loading" element-loading-text="拼命加载中" 
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" 
                @sort-change="onSortChange" :highlight-current-row="true" 
                @current-change="onSelectRow" style="width: 100%" size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="cont_type" label="类型" align="center" >
                     <template slot-scope="scope">
                        {{scope.row.cont_type == 1 ? '视频' : '图文'}}
                    </template>
                </el-table-column>
                <el-table-column prop="look_num" label="查看次数" align="center"></el-table-column>
                <el-table-column prop="state" label="状态">
                     <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column prop="is_pay" label="收费类型" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.is_pay == 0 ? '免费' : '收费'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="min_num" label="学币最小数"></el-table-column> -->
                <el-table-column prop="add_time" label="添加时间" align="center" :sortable=true>
                    <template slot-scope="scope">
                        {{formatDate(scope.row.add_time * 1000)}}
                    </template>
                </el-table-column>
                <el-table-column prop="last_time" label="最近登录时间" align="center" :sortable=true>
                    <template slot-scope="scope">
                        {{scope.row.last_time == 0 ? '还未登陆' : formatDate(scope.row.last_time * 1000)}}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination :current-page.sync="SearchFormData.page_no"
                    @current-change="onPageChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog title="搜索" :visible.sync="search_show" width="30%">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="资料标题:">
                    <el-input v-model="SearchFormData.title" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="add_show" width="500px" height="100px">
            <el-form :model="AddFormData" label-width="80px">
                 <el-form-item label="上级id:" prop="parent_uuid" :required='true'>
                    <el-input v-model="AddFormData.parent_uuid" />
                </el-form-item>
                <el-form-item label="标题:" prop="title" :required='true'>
                    <el-input v-model="AddFormData.title" />
                </el-form-item>
                <el-form-item label="类型:" prop="cont_type" :required='true'>
                    <el-radio-group v-model="AddFormData.cont_type">
                        <el-radio :label="1">视频</el-radio>
                        <el-radio :label="2">图文</el-radio>
                    </el-radio-group>
                </el-form-item> 
                <el-form-item label="支付:" prop="is_pay" :required='true'>
                    <el-radio-group v-model="AddFormData.is_pay">
                        <el-radio :label="0">免费</el-radio>
                        <el-radio :label="1">收费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传封面" prop="thumb" :required='true'>
                    <el-input v-model="AddFormData.thumb" />
                   <!-- <el-upload class="upload-demo" action="string" :http-request="ShopImgUploadUrl">
                        <el-button size="small" type="primary">点击上传</el-button> 
                        <div slot="tip" class="el-upload__tip">仅支持上传png,jpg,gif,jpeg文件，且不超过500kb</div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="上传icon">
                    <el-input v-model="AddFormData.icon" />
                    <!-- <el-upload class="upload-demo" action="string" :http-request="ShopImgUploadUrl">
                        <el-button size="small" type="primary">点击上传</el-button> 
                        <div slot="tip" class="el-upload__tip">仅支持上传png,jpg,gif,jpeg文件，且不超过500kb</div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="上传内容" prop="content" :required='true'>
                    <el-input v-model="AddFormData.content" />
                    <!-- <el-upload action="string" list-type="picture-card" :http-request="UploadContent" >
                        <i class="el-icon-plus"></i>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="是否展示" prop="is_show" :required='true'>
                    <el-switch :active-value="0" :inactive-value="getTime()" v-model="AddFormData.is_show"></el-switch>
                </el-form-item>
                 <el-form-item label="备注:">
                    <el-input v-model="AddFormData.remark" />
                </el-form-item>
                <!-- <el-form-item label="login_token:" prop="login_token" :required='true'>
                    <el-input v-model="AddFormData.login_token" />
                </el-form-item> -->
                <!-- <el-form-item label="时长:">
                    <el-input v-model="AddFormData.content_time" />
                </el-form-item> -->
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="edit_show" width="500px">
              <el-form :model="EditFormData" label-width="80px">
                 <el-form-item label="上级id:" prop="parent_uuid" :required='true'>
                    <el-input v-model="EditFormData.parent_uuid" />
                </el-form-item>
                <el-form-item label="标题:" prop="title" :required='true'>
                    <el-input v-model="EditFormData.title" />
                </el-form-item>
                <el-form-item label="类型:" prop="cont_type" :required='true'>
                    <el-radio-group v-model="EditFormData.cont_type">
                        <el-radio :label="1">视频</el-radio>
                        <el-radio :label="2">图文</el-radio>
                    </el-radio-group>
                </el-form-item> 
                <el-form-item label="支付:" prop="is_pay" :required='true'>
                    <el-radio-group v-model="EditFormData.is_pay">
                        <el-radio :label="0">免费</el-radio>
                        <el-radio :label="1">收费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传封面" prop="thumb" :required='true'>
                    <el-input v-model="EditFormData.thumb" />
                   <!-- <el-upload class="upload-demo" action="string" :http-request="ShopImgUploadUrl">
                        <el-button size="small" type="primary">点击上传</el-button> 
                        <div slot="tip" class="el-upload__tip">仅支持上传png,jpg,gif,jpeg文件，且不超过500kb</div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="上传icon">
                    <el-input v-model="EditFormData.icon" />
                    <!-- <el-upload class="upload-demo" action="string" :http-request="ShopImgUploadUrl">
                        <el-button size="small" type="primary">点击上传</el-button> 
                        <div slot="tip" class="el-upload__tip">仅支持上传png,jpg,gif,jpeg文件，且不超过500kb</div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="上传内容" prop="content" :required='true'>
                    <el-input v-model="EditFormData.content" />
                    <!-- <el-upload action="string" list-type="picture-card" :http-request="UploadContent" >
                        <i class="el-icon-plus"></i>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="是否展示" prop="is_show" :required='true'>
                    <el-switch active-value="0" :inactive-value="getTime()" v-model="EditFormData.is_show"></el-switch>
                </el-form-item>
                 <el-form-item label="备注:">
                    <el-input v-model="EditFormData.remark" />
                </el-form-item>
                <!-- <el-form-item label="login_token:" prop="login_token" :required='true'>
                    <el-input v-model="EditFormData.login_token" />
                </el-form-item> -->
                <!-- <el-form-item label="时长:">
                    <el-input v-model="EditFormData.content_time" />
                </el-form-item> -->
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
    
    if (!store.state.ShopResourceData) {
        Vue.set(store.state, 'ShopResourceData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            // 搜索
            SearchFormData:{
                title:'',

                page_no:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            search_show:false,

            // 添加
            add_show:false,
            AddFormData:{
                parent_uuid:'',
                title:'',
                cont_type: 1,
                is_pay: 1,
                thumb:'',
                icon:'',
                remark:'',
                content:'',
                is_show: 0,
                login_token:'',
                content_time:0,
            },

            // 上传图片
            UploadImgData:{
                login_token:'',
                up_type:''
            },

            // 上传文件
            UploadOssData:{
                login_token:'',
                up_type:''
            },

            // 编辑
            edit_show:false,
            EditFormData:{
                cont_type: 1,
                icon: "",
                is_pay: 1,
                min_num: 0,
                content:'',
                remark: "",
                thumb: "",
                title: "",
                uuid: "",
                parent_uuid:'',
            },

        });
    }

    export default {
        data() {
            return store.state.ShopResourceData;
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

                lime.req('ShopResourceList', {
                    login_token:lime.cookie_get('login_token'),
                    title:this.SearchFormData.title,

                    page_no:this.SearchFormData.page_no,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // console.log(this.SearchFormData.real_name)
                    console.log("学习资料")
                    console.log(res)
                    console.log("学习资料")
                    this.loading = false;
                    if(res.code=== 0){
                        console.log("成功")
                        this.rows = res.data.rows;
                        this.total = res.data.total;
                        this.SearchFormData.title = '';
                    } else
                        console.log("数据获取失败")
                });

                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },

            // 状态格式化
            stateFormat(state) {
                // 状态：0是草稿 -1作废 1审核通过，2待审核， 3审核不通过
                if (state == 0) {
                    return '草稿';
                } else if (state == 1) {
                    return '审核通过';
                } else if (state == 2) {
                    return '待审核';
                } else if (state == 3) {
                    return '审核不通过';
                } else if (state == -1) {
                    return '作废';
                } else {
                    return '';
                }
            },

            // 获取时当前间
            getTime(){
                // console.log((Date.parse(new Date()).toString()).substr(0,10))
                return (Date.parse(new Date()).toString()).substr(0,10);
            },

            // 表格数据刷新
            onRefresh() {
                this.SearchFormData.real_name ='',
                this.init();
            },

            // 搜索页面打开
            onSearch() {
                this.search_show = true;
            },

            // 搜索提交
            onSearchSubmit(){
                this.search_show = false;
                this.SearchFormData.page_no = 1;
                this.init();
            },

            // 选择单行
            onSelectRow(row){
                this.curr_row = row;
            },

            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_no = page;
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

            // 上传图片
            ShopImgUploadUrl(param) {
                const formData = new FormData()
                formData.append('file', param.file)
                this.UploadImgData.up_type= param.file.type;
                // formData.append('timestamp', (Date.parse(new Date()).toString()).substr(0,10))
                console.log(param)
                this.UploadImgData.login_token = lime.cookie_get('login_token');
                lime.req('ShopImgUpload', this.UploadImgData).then(res => {
                    console.log('上传图片成功')
                    console.log(res)
                    console.log('上传图片成功')
                }).catch(err => {
                    console.log('图片上传失败')
                    console.log(err)
                    console.log('图片上传失败')
                    // this.$message.error(err.msg);
                })
            },
            
            UploadContent(param) {
                const formData = new FormData()
                formData.append('file', param.file)
                // this.UploadImgData.up_type=param.file;
                // formData.append('timestamp', (Date.parse(new Date()).toString()).substr(0,10))
                console.log(param)
                this.UploadImgData.login_token = lime.cookie_get('login_token');
                lime.req('OssShopUpload', this.UploadOssData).then(res => {
                    console.log('上传成功')
                    console.log(res)
                    console.log('上传成功')
                }).catch(err => {
                    console.log('上传失败')
                    console.log(err)
                    console.log('上传失败')
                    // this.$message.error(err.msg);
                })
            },

            // 添加展示
            handleAdd() {
                this.add_show = true;
            },
            
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                lime.req('ShopResourceAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_no = 1;
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    console.log(err)
                    this.$message.error(err.msg);
                })
            },

            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.edit_show =true;
                this.EditFormData.parent_uuid = this.curr_row.parent_id + '';
                this.EditFormData.cont_type = this.curr_row.cont_type;
                this.EditFormData.icon = this.curr_row.icon;
                this.EditFormData.is_pay = this.curr_row.is_pay;
                this.EditFormData.min_num = this.curr_row.min_num;
                this.EditFormData.content = this.curr_row.content;
                this.EditFormData.remark = this.curr_row.remark;
                this.EditFormData.thumb = this.curr_row.thumb;
                this.EditFormData.title = this.curr_row.title;
                this.EditFormData.uuid = this.curr_row.uuid;
                
                lime.req('ShopResourceDetail',  {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                }).then(res => {
                    this.EditFormData.content        = res.data.content;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },
            
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                
                lime.req('ShopResourceEdit', this.EditFormData).then(res => {
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
                    lime.req('ShopResourceDel', {
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

            // 提审
            handleSubmitCheck(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                // console.log(this.curr_row)  
                              
                // 提审提交
                lime.req('ShopResourceSubmitAuth', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }).then(res =>{
                    this.init();
                }).catch(err => {
                    this.$message.error(err.msg)
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
        bottom: 0;
        right:0;
        overflow: hidden;
    }
</style>
