<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:57:13
 * @LastEditTime: 2020-09-27 11:14:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Gtrack/Danger.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
        <div v-wechat-title="$route.meta.title">
            <!-- 菜单 -->
            <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
                    <el-row>
                        <el-col :span="6">
                        <div style="padding-left:16px;">
                            <i class="el-icon-s-unfold"></i>
                            <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
                        </div>
                        </el-col>

                        <el-col :span="18">
                        <div style="text-align: right;">
                            <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>

                            <el-link
                            class="menu"
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus"
                            :key="index"
                            >{{item.name}}</el-link>
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
                 <!-- v-loading="loading"
                    element-loading-text="加载中..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)" -->
                <el-table
                    :data="rows"
                     :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                    :height="height - 195 - 68"
                   
                    @sort-change="onSortChange"
                    :highlight-current-row="true"
                    @current-change="onSelectRow"
                    style="width: 100%; margin-top: 5px;"
                    size="mini"
                >
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="title" label="排查项标题"  />
                    <el-table-column prop="sort" label="排序" />
                    <el-table-column prop="add_time" label="添加时间"  />
                    <el-table-column prop="last_time" label="更改时间"  />
                    <!-- <el-table-column label="角色">
                        <template slot-scope="scope">
                            <span v-for="(item, index) in rows[scope.$index].role_list" :key="index" style="display: inline-block;padding-right:30px">{{scope.row.role_list[index].name}}</span>
                        </template>
                    </el-table-column> -->
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
                    :total="total"
                    ></el-pagination> -->
                </div>
            </div>

            <!-- 添加 -->
            <el-dialog title="添加" width="450px" :visible.sync="add_show">
                <div>
                        <el-form :model="AddFormData" label-width="100px" label-position="right">
                            <el-form-item label="排查项标题:" required>
                                <el-input v-model="AddFormData.title"/>
                            </el-form-item>
                            <el-form-item label="排序:">
                                <el-input v-model="AddFormData.sort"/>
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button @click="add_show = false">取消</el-button>
                        <el-button type="primary" @click="onAddSubmit">保存</el-button>
                    </span>
            </el-dialog>

            <!-- 编辑 -->
            <el-dialog title="编辑" width="450px" :visible.sync="edit_show">
                <div>
                        <el-form :model="EditFormData" label-width="100px" label-position="right">
                            <el-form-item label="排查项标题:">
                                <el-input v-model="EditFormData.title"/>
                            </el-form-item>
                            <el-form-item label="排序:">
                                <el-input v-model="EditFormData.sort"/>
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button @click="edit_show = false">取消</el-button>
                        <el-button type="primary" @click="onEditSubmit">保存</el-button>
                    </span>
            </el-dialog>

            <!-- 详细 -->
            <el-dialog title="详细" width="450px" :visible.sync="detail_show">
                <div>
                        <el-form :model="DetailFormData" label-width="100px" label-position="right">
                            <el-form-item label="排查项标题:">{{DetailFormData.title || '---'}}</el-form-item>
                            <el-form-item label="排序:">{{DetailFormData.sort || '---'}}</el-form-item>
                            <el-form-item label="添加时间:">{{DetailFormData.add_time || '---'}}</el-form-item>
                            <el-form-item label="更改时间:">{{DetailFormData.last_time || '---'}}</el-form-item>
                            <el-form-item label="检查项:">
                                <p v-for="value in DetailFormData.items" :key="value.uuid">
                                    {{value.item_title || '---'}}
                                </p>
                                <!-- {{DetailFormData.items}} -->
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button type="primary" @click="detail_show = false">关闭</el-button>
                    </span>
            </el-dialog>

        </div>
</template>
<script>
    import Vue from "vue"
    import store from "@/store"
    import lime from "@/lime.js"
    import util from "@/util.js"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    export default {
        data() {
            return {
                search_options: [
                {value: 0,label: '标题'}
            ],
            search_value: 0,
                cpname: '隐患排查',
                rows: [],
                total: 0,
                loading: false,
                curr_row: null,
                SearchFormData: {
                    real_name: '',
                    aa: [],
                    page_num: 1,
                    page_len: 10,
                    title: ''
                },
                add_show: false,
                AddFormData: {},
                edit_show: false,
                EditFormData: {},
                detail_show: false,
                DetailFormData: {}
            }
        },
        computed: {
            width: () => {
            return store.state.AppData.width
            },
            height: () => {
            return store.state.AppData.height
            },
            upload_url: () => {
            return store.state.AppData.upload_url
            },
            img_host: () => {
            return store.state.AppData.img_host
            }
        },
        created () {
            this.init()
        },
        methods: {
              // 搜索提交
            onSearchSubmit(){
                // this.SearchFormData.page_num = 1;
                this.init();
            },

            // 按钮点击 menu: 参数数据 local是否本地程序
            onSubMenu (menu, local = false) {
                util.submenu(menu, this, lime.cookie_get('login_token'), local)
            },
            handleSizeChange(val) {console.log(`每页 ${val} 条`);},
            // 数据初始化
            init () {
                // this.loading = true
                NProgress.start();
                lime.req('VcShopProjectList', {
                    login_token: lime.cookie_get('login_token'),
                     page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    title: this.SearchFormData.title
                }).then(res => {
                    console.log(res.data)
                    // this.loading = false
                    NProgress.done();
                    this.rows = res.data.rows
                    this.total = res.data.total
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false
                    NProgress.done();
                }, 10000)
            },
            // 表格数据刷新
            onRefresh () {
            this.init()
            },
            // 选择单行
            onSelectRow (row) {
                this.curr_row = row
            },
            // 分页处理
            onPageChange (page) {
                this.SearchFormData.page_num = page
                this.init()
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
            handleAdd() {
              this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                lime.req('VcShopProjectAdd',this.AddFormData).then(res => {
                    this.add_show = false
                    this.init()
                }).catch( err =>{
                    this.$message.error(err)
                } )
            },
            // 编辑
            handleEdit() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                this.EditFormData.sort = this.EditFormData.sort + ''
                lime.req('VcShopProjectEdit', this.EditFormData).then( res => {
                    this.edit_show = false
                    this.init
                }).catch( err => {
                    this.$message.error( err)
                })
            },
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.$confirm("确认删除?", "提示").then(() => {
                    lime.req("VcShopProjectDel", {
                        login_token: lime.cookie_get("login_token"),
                        uuid: this.curr_row.uuid,
                    }).then(res => {
                        this.init();
                        this.$message.success("操作成功");
                    }).catch(err => {
                        this.$message.error(err.msg);
                    });
                });
            },
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.DetailFormData = this.curr_row
                this.detail_show = true
            }

        }
        
    }
</script>

<style scoped>
    .menu {
        display: inline-block;
        padding: 0 16px;
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

    .dialog-box {
        display: flex;
        padding: 10px;
        padding-left: 20px;
    }
=======
<!--
 * @Author: your name
 * @Date: 2020-09-10 17:57:13
 * @LastEditTime: 2020-09-27 11:14:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Gtrack/Danger.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
        <div v-wechat-title="$route.meta.title">
            <!-- 菜单 -->
            <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
                    <el-row>
                        <el-col :span="6">
                        <div style="padding-left:16px;">
                            <i class="el-icon-s-unfold"></i>
                            <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
                        </div>
                        </el-col>

                        <el-col :span="18">
                        <div style="text-align: right;">
                            <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>

                            <el-link
                            class="menu"
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus"
                            :key="index"
                            >{{item.name}}</el-link>
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
<<<<<<< HEAD
            <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
                 <!-- v-loading="loading"
=======
            <div style="border-top: solid 1px #f2f1f4;">
                <el-table
                    :data="rows"
                    stripe
                    :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                    :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
                    :height="height - 60 - 46 - 48"
                    v-loading="loading"
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                    element-loading-text="加载中..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)" -->
                <el-table
                    :data="rows"
                     :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                    :height="height - 195 - 68"
                   
                    @sort-change="onSortChange"
                    :highlight-current-row="true"
                    @current-change="onSelectRow"
                    style="width: 100%; margin-top: 5px;"
                    size="mini"
                >
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="title" label="排查项标题"  />
                    <el-table-column prop="sort" label="排序" />
                    <el-table-column prop="add_time" label="添加时间"  />
                    <el-table-column prop="last_time" label="更改时间"  />
                    <!-- <el-table-column label="角色">
                        <template slot-scope="scope">
                            <span v-for="(item, index) in rows[scope.$index].role_list" :key="index" style="display: inline-block;padding-right:30px">{{scope.row.role_list[index].name}}</span>
                        </template>
                    </el-table-column> -->
                </el-table>

                <div class="page" :style="{width:width - 280 + 'px'}">
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="SearchFormData.page_num"
                    :page-size="SearchFormData.page_len"
<<<<<<< HEAD
                   :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"
=======
                    layout="prev, pager, next, jumper"
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                    :total="total">
                    </el-pagination>
                    <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total"
                    ></el-pagination> -->
                </div>
            </div>

            <!-- 添加 -->
            <el-dialog title="添加" width="450px" :visible.sync="add_show">
                <div>
                        <el-form :model="AddFormData" label-width="100px" label-position="right">
                            <el-form-item label="排查项标题:" required>
                                <el-input v-model="AddFormData.title"/>
                            </el-form-item>
                            <el-form-item label="排序:">
                                <el-input v-model="AddFormData.sort"/>
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button @click="add_show = false">取消</el-button>
                        <el-button type="primary" @click="onAddSubmit">保存</el-button>
                    </span>
            </el-dialog>

            <!-- 编辑 -->
            <el-dialog title="编辑" width="450px" :visible.sync="edit_show">
                <div>
                        <el-form :model="EditFormData" label-width="100px" label-position="right">
                            <el-form-item label="排查项标题:">
                                <el-input v-model="EditFormData.title"/>
                            </el-form-item>
                            <el-form-item label="排序:">
                                <el-input v-model="EditFormData.sort"/>
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button @click="edit_show = false">取消</el-button>
                        <el-button type="primary" @click="onEditSubmit">保存</el-button>
                    </span>
            </el-dialog>

            <!-- 详细 -->
            <el-dialog title="详细" width="450px" :visible.sync="detail_show">
                <div>
<<<<<<< HEAD
                        <el-form :model="DetailFormData" label-width="100px" label-position="right">
                            <el-form-item label="排查项标题:">{{DetailFormData.title || '---'}}</el-form-item>
                            <el-form-item label="排序:">{{DetailFormData.sort || '---'}}</el-form-item>
                            <el-form-item label="添加时间:">{{DetailFormData.add_time || '---'}}</el-form-item>
                            <el-form-item label="更改时间:">{{DetailFormData.last_time || '---'}}</el-form-item>
                            <el-form-item label="检查项:">
                                <p v-for="value in DetailFormData.items" :key="value.uuid">
                                    {{value.item_title || '---'}}
=======
                        <el-form :model="DetailFormData" label-width="120px" label-position="left">
                            <el-form-item label="排查项标题:">{{DetailFormData.title}}</el-form-item>
                            <el-form-item label="排序:">{{DetailFormData.sort}}</el-form-item>
                            <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
                            <el-form-item label="更改时间:">{{DetailFormData.last_time}}</el-form-item>
                            <el-form-item label="检查项:">
                                <p v-for="value in DetailFormData.items" :key="value.uuid">
                                    {{value.item_title}}
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                                </p>
                                <!-- {{DetailFormData.items}} -->
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button type="primary" @click="detail_show = false">关闭</el-button>
                    </span>
            </el-dialog>

        </div>
</template>
<script>
    import Vue from "vue"
    import store from "@/store"
    import lime from "@/lime.js"
    import util from "@/util.js"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    export default {
        data() {
            return {
                search_options: [
                {value: 0,label: '标题'}
            ],
            search_value: 0,
                cpname: '隐患排查',
                rows: [],
                total: 0,
                loading: false,
                curr_row: null,
                SearchFormData: {
                    real_name: '',
                    aa: [],
                    page_num: 1,
                    page_len: 10,
                    title: ''
                },
                add_show: false,
                AddFormData: {},
                edit_show: false,
                EditFormData: {},
                detail_show: false,
                DetailFormData: {}
            }
        },
        computed: {
            width: () => {
            return store.state.AppData.width
            },
            height: () => {
            return store.state.AppData.height
            },
            upload_url: () => {
            return store.state.AppData.upload_url
            },
            img_host: () => {
            return store.state.AppData.img_host
            }
        },
        created () {
            this.init()
        },
        methods: {
              // 搜索提交
            onSearchSubmit(){
                // this.SearchFormData.page_num = 1;
                this.init();
            },

            // 按钮点击 menu: 参数数据 local是否本地程序
            onSubMenu (menu, local = false) {
                util.submenu(menu, this, lime.cookie_get('login_token'), local)
            },
            handleSizeChange(val) {console.log(`每页 ${val} 条`);},
            // 数据初始化
            init () {
                // this.loading = true
                NProgress.start();
                lime.req('VcShopProjectList', {
                    login_token: lime.cookie_get('login_token'),
                     page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
<<<<<<< HEAD
                    title: this.SearchFormData.title
=======
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                }).then(res => {
                    console.log(res.data)
                    // this.loading = false
                    NProgress.done();
                    this.rows = res.data.rows
                    this.total = res.data.total
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false
                    NProgress.done();
                }, 10000)
            },
            // 表格数据刷新
            onRefresh () {
            this.init()
            },
            // 选择单行
            onSelectRow (row) {
                this.curr_row = row
            },
            // 分页处理
            onPageChange (page) {
                this.SearchFormData.page_num = page
                this.init()
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
            handleAdd() {
              this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                lime.req('VcShopProjectAdd',this.AddFormData).then(res => {
                    this.add_show = false
                    this.init()
                }).catch( err =>{
                    this.$message.error(err)
                } )
            },
            // 编辑
            handleEdit() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                this.EditFormData.sort = this.EditFormData.sort + ''
                lime.req('VcShopProjectEdit', this.EditFormData).then( res => {
                    this.edit_show = false
                    this.init
                }).catch( err => {
                    this.$message.error( err)
                })
            },
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.$confirm("确认删除?", "提示").then(() => {
                    lime.req("VcShopProjectDel", {
                        login_token: lime.cookie_get("login_token"),
                        uuid: this.curr_row.uuid,
                    }).then(res => {
                        this.init();
                        this.$message.success("操作成功");
                    }).catch(err => {
                        this.$message.error(err.msg);
                    });
                });
            },
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.DetailFormData = this.curr_row
                this.detail_show = true
            }

        }
        
    }
</script>

<style scoped>
    .menu {
        display: inline-block;
        padding: 0 16px;
        text-align: center;
    }

    .page {
        height: 40px; 
        /* line-height: 40px;  */
        text-align: right;
        position: fixed;
<<<<<<< HEAD
        bottom: 20px;
        right:40px;
=======
        bottom: 40px;
        right: 40px;
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
        overflow: hidden;
        /* background: #f4f8fe; */
        /* border: 1px solid red; */
        z-index: 999;
        padding-top:  10px;
    }

    .dialog-box {
        display: flex;
        padding: 10px;
        padding-left: 20px;
    }
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>