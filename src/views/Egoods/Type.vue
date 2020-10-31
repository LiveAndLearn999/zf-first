<!--
 * @Author: your name
 * @Date: 2020-09-10 17:41:47
 * @LastEditTime: 2020-09-23 08:37:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Egoods/Type.vue
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
                <el-input v-if="search_value == 0" v-model="SearchFormData.type_name" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- <h6>{{cpname}}</h6> -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}" v-if="!show_map">
             <!-- element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" -->
            <el-table 
                :data="rows"
                 :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68"
                v-loading="loading"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                 style="width: 100%;margin-top: 5px" 
                size="mini" >
                    <el-table-column width="80px" type="index" label="序号"></el-table-column>
                    <el-table-column prop="type_name" align="left" label="类型名称"></el-table-column>
                    <el-table-column prop="add_time" label="创建时间"></el-table-column>
                    <el-table-column prop="last_time" label="更新时间"></el-table-column>
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
            </div>
        </div> 

        <!-- <TableBase :loading="loading" :rows="rows" :columns="columns" @selRow="onSelectCurrRow"/> -->

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="400px">
            <el-form :model="AddFormData" label-width="90px" label-position="right">
                <el-form-item label="类型名称:" required>
                    <el-input v-model="AddFormData.type_name" />
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
            width="400px">
            <el-form :model="EditFormData" label-width="110px" label-position="right">
                <el-form-item label="包装类型名称:" required>
                    <el-input v-model="EditFormData.type_name" @input="change($event)"/>
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
    import { EbGoodsTypeList, EbGoodsTypeAdd, EbGoodsTypeDel, EbGoodsTypeEdit, EbGoodsTypeDetail } from "@/api/request"
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

    if (!store.state.EbGoodsTypeData) {
        Vue.set(store.state, 'EbGoodsTypeData', {
            search_options: [
                    {value: 0,label: '名称'}
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

            SearchFormData:{
                page_num:1,
                page_len:10,
                type_name: ''
            },
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'type_name', label: '类型名称'},
                {prop: 'add_time', label: '创建时间'},
                {prop: 'last_time', label: '更新时间'}
            ],
            cpname: '货物类型',
            show_map: false

        });
    }


    export default {
        components: {
            // TableBase
        },
        data() {
            return store.state.EbGoodsTypeData
        },
         computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
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
                this.page_num = page;
                console.log(page)
                this.init();
            },
             // 点击单选
            onSelectRow(row) {
                this.curr_row = row;
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
                    page_num: this.SearchFormData.page_num,
                    page_len: this.SearchFormData.page_len,
                    type_name: this.SearchFormData.type_name
                }
                EbGoodsTypeList(pam, res => {
                    // this.loading = false;
                    NProgress.done();
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    // this.list = res.data;
                }).catch(err => {
                    // this.loading = false;
                    NProgress.done();
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    // this.loading = false;
                    NProgress.done();
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
            // 添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    type_name: this.AddFormData.type_name
                }
                EbGoodsTypeAdd(pam, res => {
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
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
                    EbGoodsTypeDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
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
                this.EditFormData.type_name = this.curr_row.type_name;
                this.EditFormData.uuid = this.curr_row.uuid;
                this.edit_show = true
            },
            onEditSubmit() {
                let pam = {
                   login_token: lime.cookie_get('login_token'),
                   uuid: this.EditFormData.uuid,
                   type_name: this.EditFormData.type_name
               }
                EbGoodsTypeEdit(pam, res => {
                   this.init();
                   this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

        }
        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
</style>