<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-10 11:38:11
 * @LastEditTime: 2020-09-24 17:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Customer.vue
-->
<template>
	<div>
		<!-- <h6>{{cpname}}</h6> -->
         <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; font-size: 14px">
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
                <el-input v-if="search_value == 0" v-model="SearchFormData.name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>
        
       <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
           <!-- element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" -->

            <el-table 
                :data="rows"
               
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height: '48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68"
                v-loading="loading"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px" 
                size="mini">
                    <el-table-column type="index" width="80px" label="序号"></el-table-column>
                    <el-table-column prop="name" align="left" label="承运方名称"></el-table-column>
                    <el-table-column prop="phone_number" label="联系手机号"></el-table-column>
                    <el-table-column prop="license" label="承运人许可证"></el-table-column>
                    <el-table-column prop="add_time" label="添加时间"></el-table-column>
                    <el-table-column prop="last_time" label="修改时间"></el-table-column>
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

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="400px">
            <el-form :model="AddFormData" label-width="110px" label-position="right">
                <el-form-item label="承运方:" required>
                    <el-input v-model="AddFormData.name" />
                </el-form-item>
                 <el-form-item label="承运方电话:" required>
                    <el-input v-model="AddFormData.phone_number" />
                </el-form-item>
                <el-form-item label="承运方许可证:" required>
                    <!-- <file ref="upload"/> -->
                    <el-input v-model="AddFormData.license" />
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
            :visible.sync=" edit_show"
            width="400px">
            <el-form :model="EditFormData" label-width="110px" label-position="right">
                <el-form-item label="承运方:">
                    <el-input v-model="EditFormData.name" />
                </el-form-item>
                 <el-form-item label="承运方电话:">
                    <el-input v-model="EditFormData.phone_number" />
                </el-form-item>
                <el-form-item label="承运方许可证:">
                    <!-- <file ref="upload"/> -->
                    <el-input v-model="EditFormData.license" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="DetailFormData" label-width="110px" label-position="right">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="承运方:">
                                {{DetailFormData.name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建时间:">
                                {{EditFormData.add_time }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="承运方许可证:">
                                {{DetailFormData.license}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="更新时间:">
                                {{EditFormData.last_time}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="承运方电话:">
                                {{DetailFormData.phone_number}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
                </div>
            </div>
        </el-drawer>
        
	</div>
</template>
<script>
// "extends": [
//       "plugin:vue/essential",
//       "eslint:recommended"
//     ],
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";
// import TableBase from "@/components/myTables/baseTable.vue"
import { EbCarrierList, EbCarrierEdit } from "@/api/request"
// import file from "@/components/imgUpload/upload.vue"
 import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

if (!store.state.EbCarrierData) {
        Vue.set(store.state, 'EbCarrierData', {
             search_options: [
                    {value: 0,label: '承运方'}
                ],
            search_value: 0,
            total:0,
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
            // 搜索
            SearchFormData:{
                page_num:1,
                page_len:10,
                name: ''
            },
            //表格数据
            rows: [],
            //表头设置
            cpname: '企业客户',
             direction: 'rtl'

        });
    }

export default {
	// components: {
    //     file
	// },
    data() {
       return store.state.EbCarrierData
    },
    created() {
            this.init()
    },
    computed:{
        width:() => {
            return store.state.AppData.width;
        },
        height:() => {
            return store.state.AppData.height;
        }
   },
    methods: {
        // 搜索提交
            onSearchSubmit(){
                // this.SearchFormData.page_num = 1;
                this.init();
            },
        // 按钮点击 menu:参数数据 local是否本地程序
        onSubMenu(menu, local = false) {
            util.submenu(menu,this,lime.cookie_get('login_token'), local);
        },
        init() {
            // this.loading = true;
             NProgress.start();
            let pam = {
                login_token:lime.cookie_get('login_token'),
                page_num:this.SearchFormData.page_num,
                page_len:this.SearchFormData.page_len,
                name: this.SearchFormData.name
            }
            EbCarrierList(pam, res => {
                // this.loading = false;
                 NProgress.done();
                this.rows = res.data.rows;
                this.total = res.data.total;
            }).catch(err => {
                 NProgress.done();
                // this.loading = false;
                this.$message.error(err.msg);
                 this.$router.push('/login');
            })
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
        // 添加
        handleAdd() {
            this.add_show = true
        },
        onAddSubmit() {
            this.AddFormData.login_token = lime.cookie_get('login_token');
            // this.AddFormData.license   = this.$refs.upload.img_url;
            lime.req('EbCarrierAdd', this.AddFormData).then(res => {
                this.SearchFormData.page_num = 1;
                this.init();
                this.add_show = false;
            }).catch(err => {
                this.$message.error(err.msg);
            })
            this.add_show = false
        },
        // 编辑
        handleEdit() {
            if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
            this.EditFormData = this.curr_row
            this.edit_show = true
        },
        onEditSubmit() {
            this.EditFormData.login_token = lime.cookie_get('login_token')
            EbCarrierEdit(this.EditFormData, res => {
                this.init();
            }).catch( err => {
                this.$message.error(err)
            })
            this.edit_show = false
        },
        handleDel() {
            if (util.empty(this.curr_row)) {
                this.$message.error('请选择一条数据');
                return;
            }
            this.$confirm('确认删除?', '提示').then(() => {
                lime.req('EbCarrierDel', {
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
  .drawer-footer {
         position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
    }

 .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
        display: block;

    } 
=======
<!--
 * @Author: your name
 * @Date: 2020-09-10 11:38:11
 * @LastEditTime: 2020-09-24 17:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Customer.vue
-->
<template>
	<div>
		<!-- <h6>{{cpname}}</h6> -->
         <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; font-size: 14px">
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
                <el-input v-if="search_value == 0" v-model="SearchFormData.name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>
        
       <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
           <!-- element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" -->

            <el-table 
                :data="rows"
<<<<<<< HEAD
               
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height: '48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68"
=======
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
                :height="height - 60 - 46 - 48"
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
                v-loading="loading"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px" 
                size="mini">
                    <el-table-column type="index" width="80px" label="序号"></el-table-column>
                    <el-table-column prop="name" align="left" label="承运方名称"></el-table-column>
                    <el-table-column prop="phone_number" label="联系手机号"></el-table-column>
                    <el-table-column prop="license" label="承运人许可证"></el-table-column>
                    <el-table-column prop="add_time" label="添加时间"></el-table-column>
                    <el-table-column prop="last_time" label="修改时间"></el-table-column>
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
                    :total="total">
                </el-pagination> -->
            </div>
       </div>

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="400px">
            <el-form :model="AddFormData" label-width="110px" label-position="right">
                <el-form-item label="承运方:" required>
                    <el-input v-model="AddFormData.name" />
                </el-form-item>
                 <el-form-item label="承运方电话:" required>
                    <el-input v-model="AddFormData.phone_number" />
                </el-form-item>
                <el-form-item label="承运方许可证:" required>
                    <!-- <file ref="upload"/> -->
                    <el-input v-model="AddFormData.license" />
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
            :visible.sync=" edit_show"
            width="400px">
            <el-form :model="EditFormData" label-width="110px" label-position="right">
                <el-form-item label="承运方:">
                    <el-input v-model="EditFormData.name" />
                </el-form-item>
                 <el-form-item label="承运方电话:">
                    <el-input v-model="EditFormData.phone_number" />
                </el-form-item>
                <el-form-item label="承运方许可证:">
                    <!-- <file ref="upload"/> -->
                    <el-input v-model="EditFormData.license" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="DetailFormData" label-width="110px" label-position="right">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="承运方:">
                                {{DetailFormData.name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建时间:">
                                {{EditFormData.add_time }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="承运方许可证:">
                                {{DetailFormData.license}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="更新时间:">
                                {{EditFormData.last_time}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="承运方电话:">
                                {{DetailFormData.phone_number}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
                </div>
            </div>
        </el-drawer>
        
	</div>
</template>
<script>
// "extends": [
//       "plugin:vue/essential",
//       "eslint:recommended"
//     ],
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";
// import TableBase from "@/components/myTables/baseTable.vue"
import { EbCarrierList, EbCarrierEdit } from "@/api/request"
// import file from "@/components/imgUpload/upload.vue"
 import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

if (!store.state.EbCarrierData) {
        Vue.set(store.state, 'EbCarrierData', {
             search_options: [
                    {value: 0,label: '承运方'}
                ],
            search_value: 0,
            total:0,
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
            // 搜索
            SearchFormData:{
                page_num:1,
                page_len:10,
                name: ''
            },
            //表格数据
            rows: [],
            //表头设置
            cpname: '企业客户',
             direction: 'rtl'

        });
    }

export default {
	// components: {
    //     file
	// },
    data() {
       return store.state.EbCarrierData
    },
    created() {
            this.init()
    },
    computed:{
        width:() => {
            return store.state.AppData.width;
        },
        height:() => {
            return store.state.AppData.height;
        }
   },
    methods: {
        // 搜索提交
            onSearchSubmit(){
                // this.SearchFormData.page_num = 1;
                this.init();
            },
        // 按钮点击 menu:参数数据 local是否本地程序
        onSubMenu(menu, local = false) {
            util.submenu(menu,this,lime.cookie_get('login_token'), local);
        },
        init() {
            // this.loading = true;
             NProgress.start();
            let pam = {
                login_token:lime.cookie_get('login_token'),
                page_num:this.SearchFormData.page_num,
<<<<<<< HEAD
                page_len:this.SearchFormData.page_len,
                name: this.SearchFormData.name
=======
                page_len:this.SearchFormData.page_len
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
            }
            EbCarrierList(pam, res => {
                // this.loading = false;
                 NProgress.done();
                this.rows = res.data.rows;
                this.total = res.data.total;
            }).catch(err => {
                 NProgress.done();
                // this.loading = false;
                this.$message.error(err.msg);
                //  this.$router.push('/login');
            })
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
        // 添加
        handleAdd() {
            this.add_show = true
        },
        onAddSubmit() {
            this.AddFormData.login_token = lime.cookie_get('login_token');
            // this.AddFormData.license   = this.$refs.upload.img_url;
            lime.req('EbCarrierAdd', this.AddFormData).then(res => {
                this.SearchFormData.page_num = 1;
                this.init();
                this.add_show = false;
            }).catch(err => {
                this.$message.error(err.msg);
            })
            this.add_show = false
        },
        // 编辑
        handleEdit() {
            if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
            this.EditFormData = this.curr_row
            this.edit_show = true
        },
        onEditSubmit() {
            this.EditFormData.login_token = lime.cookie_get('login_token')
            EbCarrierEdit(this.EditFormData, res => {
                this.init();
            }).catch( err => {
                this.$message.error(err)
            })
            this.edit_show = false
        },
        handleDel() {
            if (util.empty(this.curr_row)) {
                this.$message.error('请选择一条数据');
                return;
            }
            this.$confirm('确认删除?', '提示').then(() => {
                lime.req('EbCarrierDel', {
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
<<<<<<< HEAD
 @import '../../assets/styles/common.css';
  .drawer-footer {
         position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
    }

 .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
        display: block;

    } 
=======
 @import '../../assets/styles/common.css'; 
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
</style>