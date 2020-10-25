<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-15 16:15:20
 * @LastEditTime: 2020-09-15 17:12:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Simanage.vue
-->
<template>
    
    <div>

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
                <el-input v-if="search_value == 0" v-model="SearchFormData.sim" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>
        
        <!-- <h6>{{cpname}}</h6> -->
         <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
             <!-- element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.1)" -->
            <el-table 
                @current-change="onSelectCurrRow"
                :data="rows" 
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68"
                v-loading="loading"
                :default-expand-all="true"
                :highlight-current-row="true" 
                style="width: 100%;margin-top: 5px;" 
                size="mini"
                >
                <el-table-column type="index" width="80px" label="序号"></el-table-column>
                <el-table-column prop="sim" show-overflow-tooltip label="sim卡号"></el-table-column>
                <el-table-column align="left"  show-overflow-tooltip prop="netflow" label="总流量"></el-table-column>
                <el-table-column prop="able_flow" label="剩余流量"></el-table-column>
                <el-table-column prop="sim_purchase" label="采购金额"></el-table-column>
                <el-table-column prop="add_time" show-overflow-tooltip label="添加时间"></el-table-column>
                <el-table-column prop="last_time" show-overflow-tooltip label="结束时间"></el-table-column>
                <el-table-column prop="use_status" label="使用状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.use_status == 1" style="color: green">已使用</span>
                        <span v-else-if="scope.row.use_status == 0" style="color: gray">未使用</span>
                        <span v-else style="color: red">已报废</span>
                        <!-- {{scope.row.use_status == 1 ? '已使用' : scope.row.use_status == 2 ? '已报废' : '未使用'}} -->
                    </template>
                </el-table-column>


                <!-- <el-table-column align="center" show-overflow-tooltip prop="content" label="内容"></el-table-column>
                <el-table-column align="center" prop="state" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="is_show" label="显示"></el-table-column> -->

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

        <!-- <TableBase :loading="loading" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" /> -->

         <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="450px">
            <el-form :model="AddFormData" label-width="80px" label-position="right" :rules="rules" ref="addform"> 
                <el-form-item label="sim卡号:" prop="sim">
                    <el-input v-model="AddFormData.sim" />
                </el-form-item>
                <el-form-item label="总流量:">
                    <el-input v-model="AddFormData.netflow" />
                </el-form-item>
                <el-form-item label="采购额:">
                    <el-input v-model="AddFormData.sim_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-input v-model="AddFormData.sim_purchase_time" />
                </el-form-item>
                <el-form-item label="剩余流量:">
                    <el-input v-model="AddFormData.able_flow" />
                </el-form-item>
                <el-form-item label="使用状态:">
                    <el-input v-model="AddFormData.use_status" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑-->
        <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="450px">
            <el-form :model="EditFormData" label-width="80px" :rules="rules" ref="editform">
                <el-form-item label="sim卡号:" prop="sim">
                    <el-input v-model="EditFormData.sim" />
                </el-form-item>
                <el-form-item label="总流量:">
                    <el-input v-model="EditFormData.netflow" />
                </el-form-item>
                <el-form-item label="采购额:">
                    <el-input v-model="EditFormData.sim_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-input v-model="EditFormData.sim_purchase_time" />
                </el-form-item>
                <el-form-item label="剩余流量:">
                    <el-input v-model="EditFormData.able_flow" />
                </el-form-item>
                <el-form-item label="使用状态:">
                    <el-input v-model="EditFormData.use_status" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 充值 -->
        <el-dialog  
            title="充值"
            :visible.sync="charge_show"
            width="500px">
            <div style="width: 100%;height: 300px;background: lightgray"></div>
        </el-dialog>
    
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopSimList, ShopSimAdd, ShopSimEdit, ShopSimDel } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.SimanageData) {
        Vue.set(store.state, 'SimanageData', {
            search_options: [
                    {value: 0,label: 'sim卡号'}
                ],
            search_value: 0,
            rules: {
                sim: [
                    { required: true, message: 'SIM卡号必填', trigger: 'blur' }
                ]
            },
            total:0,
            charge_show: false,
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
                page_num:1,
                page_len:10,
                sim: ''
            },
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'able_flow', label: '剩余流量'},
                {prop: 'add_time', label: '添加时间'},
                {prop: 'last_time', label: '结束时间'},
                {prop: 'netflow', label: '总流量'},
                {prop: 'sim', label: 'sim卡号'},
                {prop: 'sim_purchase', label: '采购金额'},
                {prop: 'use_status', label: '使用状态'},
                {prop: 'netflow', label: '总流量'}
            ],
            cpname: 'Sim卡管理',

        });
    }

    export default {
        components: {
            // TableBase
        },
         computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
        },
        data() {
            return store.state.SimanageData
        },
        created() {
            this.init()
        },
        methods: {

            // 搜索提交
            onSearchSubmit(){
                // this.SearchFormData.page_num = 1;
                this.init();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

             onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },

            change(e) {
                this.$forceUpdate()
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
            //    this.loading = true;
            NProgress.start();
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_len: this.SearchFormData.page_len,
                    page_num: this.SearchFormData.page_num,
                    sim: this.SearchFormData.sim
                }
                lime.req('ShopSimList',pam).then( res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                })

                // this.list = res.data;

                // ShopSimList(pam, res => {
                //     this.loading = false;
                //     this.rows = res.data.rows;
                //     this.total = res.data.total;
                // }).catch(err => {
                //     this.loading = false;
                //     this.$message.error(err.msg);
                // })

                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done();
                    // this.loading = false;
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
            //添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                let pam = this.AddFormData
                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                         ShopSimAdd(pam, res => {
                            this.init();
                            this.add_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        })
                    }else {
                        console.log('submit err!')
                    }
                })
            },
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.EditFormData = this.curr_row
                // this.EditFormData.type_name = this.curr_row.type_name;
                // this.EditFormData.uuid = this.curr_row.uuid;
                this.edit_show = true
            },
            //删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid: this.curr_row.uuid
                    }
                    ShopSimDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            //编辑
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                let pam = this.EditFormData
                this.$refs['editform'].validate((valid) => {
                    if (valid) {
                         ShopSimEdit(pam, res => {
                        this.init();
                        this.edit_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        })
                    }else {
                        console.log('submit err!')
                    }
                })
            },
            handleStreamRecharge() {
                this.charge_show = true
            }
        }
        
    }
</script>
<style scoped>
    @import '../../assets/styles/common.css'; 
=======
<!--
 * @Author: your name
 * @Date: 2020-09-15 16:15:20
 * @LastEditTime: 2020-09-15 17:12:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Dvehicle/Simanage.vue
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
        <TableBase :loading="loading" :rows="rows" :columns="columns" @selRow="onSelectCurrRow" />

         <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="120px">
                <el-form-item label="sim卡号:" required>
                    <el-input v-model="AddFormData.sim" />
                </el-form-item>
                <el-form-item label="总流量:">
                    <el-input v-model="AddFormData.netflow" />
                </el-form-item>
                <el-form-item label="采购额:">
                    <el-input v-model="AddFormData.sim_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-input v-model="AddFormData.sim_purchase_time" />
                </el-form-item>
                <el-form-item label="剩余流量:">
                    <el-input v-model="AddFormData.able_flow" />
                </el-form-item>
                <el-form-item label="使用状态:">
                    <el-input v-model="AddFormData.use_status" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑-->
        <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="120px">
                <el-form-item label="sim卡号:" required>
                    <el-input v-model="EditFormData.sim" />
                </el-form-item>
                <el-form-item label="总流量:">
                    <el-input v-model="EditFormData.netflow" />
                </el-form-item>
                <el-form-item label="采购额:">
                    <el-input v-model="EditFormData.sim_purchase" />
                </el-form-item>
                <el-form-item label="采购时间:">
                    <el-input v-model="EditFormData.sim_purchase_time" />
                </el-form-item>
                <el-form-item label="剩余流量:">
                    <el-input v-model="EditFormData.able_flow" />
                </el-form-item>
                <el-form-item label="使用状态:">
                    <el-input v-model="EditFormData.use_status" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 充值 -->
        <el-dialog  
            title="充值"
            :visible.sync="charge_show"
            width="500px">
            <div style="width: 100%;height: 300px;background: lightgray"></div>
        </el-dialog>
    
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopSimList, ShopSimAdd, ShopSimEdit, ShopSimDel } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.SimanageData) {
        Vue.set(store.state, 'SimanageData', {
            total:0,
            charge_show: false,
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
                page_num:1,
                page_len:10
            },
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'able_flow', label: '剩余流量'},
                {prop: 'add_time', label: '添加时间'},
                {prop: 'last_time', label: '结束时间'},
                {prop: 'netflow', label: '总流量'},
                {prop: 'sim', label: 'sim卡号'},
                {prop: 'sim_purchase', label: '采购金额'},
                {prop: 'use_status', label: '使用状态'},
                {prop: 'netflow', label: '总流量'}
            ],
            cpname: 'Sim卡管理',

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.SimanageData
        },
        created() {
            this.init()
        },
        methods: {
            change(e) {
                this.$forceUpdate()
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token')
                }
                ShopSimList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    // this.list = res.data;
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
            //添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                let pam = this.AddFormData
                ShopSimAdd(pam, res => {
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.EditFormData.type_name = this.curr_row.type_name;
                this.EditFormData.uuid = this.curr_row.uuid;
                this.edit_show = true
            },
            //删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid: this.curr_row.uuid
                    }
                    ShopSimDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            //编辑
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                let pam = this.EditFormData
                ShopSimEdit(pam, res => {
                   this.init();
                   this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            handleStreamRecharge() {
                this.charge_show = true
            }
        }
        
    }
</script>
<style scoped>
    @import '../../assets/styles/common.css'; 
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>