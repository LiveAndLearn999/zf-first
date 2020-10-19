<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-21 08:48:39
 * @LastEditTime: 2020-09-21 08:48:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/handMage.vue
-->
<!-- 标签管理 -->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
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

                        <!-- <el-link @click="onSubMenu('onAddOption',true)" class="menu">添加选项</el-link> -->
                    </div>
                </el-col>
            </el-row>
        </div>

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-select v-model="search_value" placeholder="请选择" style="width: 100px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                <el-input v-if="search_value == 0" v-model="SearchFormData.title" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
              <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                :data="rows"
              
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{height: '48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68"
                element-loading-text="拼命加载中"         
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column prop="title" label="标签" align="left"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
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
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="30%">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="标签:">
                    <el-input v-model="SearchFormData.title" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加模板 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :rules="rules" ref="addform" :model="AddFormData" label-width="85px">
                <el-form-item label="标签:" prop="title">
                    <el-input v-model="AddFormData.title" />
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" :rows="5" v-model="AddFormData.remark" />
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
            <el-form ref="editform" :rules="rules" :model="EditFormData" label-width="80px">
                 <el-form-item label="标签:" prop="title">
                    <el-input v-model="EditFormData.title" />
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" :rows="5" v-model="EditFormData.remark" />
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

    if (!store.state.ShopQuesTagData) {
        Vue.set(store.state, 'ShopQuesTagData', {
             rules: {
                      title: [
                        { required: true, message: '标签必填', trigger: 'blur' },
                       ]
             },
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            // 搜索
            search_value: 0,
            search_options: [
                {value: 0,label: '标签'}
            ],
            search_show:false,
            SearchFormData:{
                title:'',
                
                page_num:1,
                page_len:10,
                // add_time:'2020-08-02',

                // 没有下面的字段
                // order_field:'add_time',
                // order_sort:'desc'
            },

            // 添加
            add_show:false,
            AddFormData:{
                login_token:'',
                title: '',
                remark: '',
            },

            // 编辑
            edit_show:false,
            EditFormData:{
                uuid:'',
                login_token:'',
                title: '',
                remark: '',
            },

        });
    }

    export default {
        data() {
            return store.state.ShopQuesTagData;
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

                lime.req('ShopQuesTagList', {
                    login_token:lime.cookie_get('login_token'),

                    title:this.SearchFormData.title,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    // order_field:this.SearchFormData.order_field,
                    // order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.SearchFormData.title='';
                    console.log('标签管理')
                    console.log(this.rows)
                    console.log('标签管理')
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

            // 添加展示
            handleAdd() {
                this.add_show = true;
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                 this.$refs['addform'].validate((valid) => {
                    if (valid) {
                        lime.req('ShopQuesTagAdd', this.AddFormData).then(res => {
                                this.SearchFormData.page_num = 1;
                                this.init();
                                this.AddFormData.login_token='';
                                this.AddFormData.title= '';
                                this.AddFormData.remark= '';
                                this.add_show = false;  
                            }).catch(err => {
                                this.$message.error(err.msg);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.EditFormData.uuid = this.curr_row.uuid;
                this.EditFormData.title = this.curr_row.title;
                this.EditFormData.remark = this.curr_row.remark;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                 this.$refs['editform'].validate((valid) => {
                    if (valid) {
                        this.EditFormData.login_token = lime.cookie_get('login_token');

                        lime.req('ShopQuesTagEdit', this.EditFormData).then(res => {
                            this.init();
                            this.edit_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        });
                    }else {
                        return false
                    }
                })
            },

            // 删除确认提交
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.$confirm('确认删除?', '提示').then(() => {
                    lime.req('ShopQuesTagDel', {
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
        /* line-height: 40px;  */
        text-align: right;
        position: fixed;
        bottom: 20px;
        right:40px;
        overflow: hidden;
        /* background: #f4f8fe; */
        /* border: 1px solid red; */
        z-index: 999;
        padding-top:  10px;
    }

    .mbstyle{
        margin-bottom: 0px;
    }
</style>
=======
<!--
 * @Author: your name
 * @Date: 2020-09-21 08:48:39
 * @LastEditTime: 2020-09-21 08:48:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/handMage.vue
-->
<!-- 标签管理 -->
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

                        <!-- <el-link @click="onSubMenu('onAddOption',true)" class="menu">添加选项</el-link> -->
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
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column prop="title" label="标签" align="left"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="30%">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="标签:">
                    <el-input v-model="SearchFormData.title" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加模板 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="85px">
                <el-form-item label="标签:" :required='true'>
                    <el-input v-model="AddFormData.title" />
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="AddFormData.remark" />
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
                 <el-form-item label="标签:" :required='true'>
                    <el-input v-model="EditFormData.title" />
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="EditFormData.remark" />
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

    if (!store.state.ShopQuesTagData) {
        Vue.set(store.state, 'ShopQuesTagData', {
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
                // add_time:'2020-08-02',

                // 没有下面的字段
                // order_field:'add_time',
                // order_sort:'desc'
            },

            // 添加
            add_show:false,
            AddFormData:{
                login_token:'',
                title: '',
                remark: '',
            },

            // 编辑
            edit_show:false,
            EditFormData:{
                uuid:'',
                login_token:'',
                title: '',
                remark: '',
            },

        });
    }

    export default {
        data() {
            return store.state.ShopQuesTagData;
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

                lime.req('ShopQuesTagList', {
                    login_token:lime.cookie_get('login_token'),

                    title:this.SearchFormData.title,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    // order_field:this.SearchFormData.order_field,
                    // order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.SearchFormData.title='';
                    console.log('标签管理')
                    console.log(this.rows)
                    console.log('标签管理')
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

            // 添加展示
            handleAdd() {
                this.add_show = true;
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                lime.req('ShopQuesTagAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
                    this.init();
                    this.AddFormData.login_token='';
                    this.AddFormData.title= '';
                    this.AddFormData.remark= '';
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

                this.EditFormData.uuid = this.curr_row.uuid;
                this.EditFormData.title = this.curr_row.title;
                this.EditFormData.remark = this.curr_row.remark;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');

                lime.req('ShopQuesTagEdit', this.EditFormData).then(res => {
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
                    lime.req('ShopQuesTagDel', {
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

    .mbstyle{
        margin-bottom: 0px;
    }
</style>
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
