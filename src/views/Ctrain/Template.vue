<!--
 * @Author: your name
 * @Date: 2020-09-10 17:29:01
 * @LastEditTime: 2020-09-10 17:29:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Template.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
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
                    <div style="text-align: right; font-size: 16px">
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
        	<el-table 
                :data="rows"
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="name"  label="标题"></el-table-column>
                <el-table-column  prop="add_time"  label="添加时间"></el-table-column>
                <el-table-column prop="last_time"  label="修改时间"></el-table-column>
             </el-table>
        </div>

        <div class="page" :style="{width:width - 280 + 'px'}">
                <!-- <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
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
            </div>

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="400px">
            <el-form :model="AddFormData" label-width="90px" label-position="right">
                <el-form-item label="名称:" required>
                    <el-input v-model="AddFormData.name" />
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
            :visible.sync="edit_show"
            width="400px">
            <el-form :model="EditFormData" label-width="90px" label-position="right">
                <el-form-item label="名称:" required>
                    <el-input v-model="EditFormData.name" @change="change" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

         <!-- 详细 -->
        <el-dialog  
            title="详细"
            :visible.sync="detail_show"
            width="400px">
            <el-form :model="DetailFormData" label-width="90px" label-position="right">
                <el-form-item label="名称:" required>{{DetailFormData.name}}</el-form-item>
                <el-form-item label="添加时间:" required>{{DetailFormData.add_time}}</el-form-item>
                <el-form-item label="修改时间:" required>{{DetailFormData.last_time}}</el-form-item>
            </el-form>

            <span slot="footer">
                <!-- <el-button @click="detail_show = false">取消</el-button> -->
                <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </span>
        </el-dialog>



     </div>
</template>
<script>
	import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
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
               cpname: '计划模板管理',
               rows: [],
               SearchFormData:{
	               	page_num: 1,
	               	page_len: 10,
	               	name: ''
	            },
	            total:0,
	            loading: false,
	            search_value: 0,
		        search_options: [
		          	{value: 0, label: '名称'}
                ],
                add_show: false,
                AddFormData: {
                    name: '模板名称'
                },
                edit_show: false,
                EditFormData: {
                    name: ''
                },
                detail_show: false,
                DetailFormData: {}

	          }
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
        methods: {
           handleDetail() {
               lime.req('ShopPlanTmpDetail',{
                   login_token: lime.cookie_get('login_token'),
                   uuid: this.curr_row.uuid
               }).then( res=> {
                   this.detail_show = true
                   this.DetailFormData = res.data
               })
           },
           change(e) {
                this.$forceUpdate()
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
                    lime.req('ShopPlanTmpDel',pam).then( res => {
                        this.init()
                    })
                }).catch( err => {
                    console.log(err)
                })
            },
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.EditFormData.name = this.curr_row.name;
                this.EditFormData.uuid = this.curr_row.uuid;
                this.edit_show = true
            },
            onEditSubmit() {
                let pam = {
                   login_token: lime.cookie_get('login_token'),
                   uuid: this.EditFormData.uuid,
                   name: this.EditFormData.name
               }
               lime.req('ShopPlanTmpEdit', pam).then( res => {
                   this.edit_show = false
                   this.init()
               })
            },
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                 let pam = {
                    login_token:lime.cookie_get('login_token'),
                    name: this.AddFormData.name
                }
                lime.req('ShopPlanTmpAdd',pam).then( res => {
                    this.add_show = false
                    this.init()
                })
                // EbGoodsTypeAdd(pam, res => {
                //     this.init();
                //     this.add_show = false;
                // }).catch(err => {
                //     this.$message.error(err.msg);
                // })
            },
        	onSearchSubmit() {
        		console.log(111)
        	},
        	onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化
            init() {
                NProgress.start();
                // setTimeout(() => {
                //     NProgress.done();
                // }, 1000);
                lime.req('ShopPlanTmpList', {
                    login_token:lime.cookie_get('login_token'),
                    name: '',
                }).then(res => {
                     NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                });
                setTimeout(() => {
                     NProgress.done();
                    // this.loading = false;
                }, 10000);
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
           
        }
        
    }
</script>

<style scoped>
@import '../../assets/styles/common.css';
    
</style>