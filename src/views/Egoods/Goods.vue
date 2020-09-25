<!--
 * @Author: your name
 * @Date: 2020-09-10 17:38:37
 * @LastEditTime: 2020-09-23 08:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Egoods/Goods.vue
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
        <TableBase :loading="loading" :rows="rows" :columns="columns" @selRow="onSelectCurrRow"/>

        <!-- 添加 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="120px" label-position="left">
                <el-form-item label="货物名称:" required>
                    <el-input v-model="AddFormData.name" />
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
            <el-form :model="EditFormData" label-width="120px" label-position="left">
                <el-form-item label="货物名称:">
                    <el-input v-model="EditFormData.name" @input="change($event)"/>
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
            width="500px">
            <el-form :model="DetailFormData" label-width="120px" label-position="left">
                <el-form-item label="货物名称:">{{DetailFormData.name}}</el-form-item>
                <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
                <el-form-item label="修改时间:">{{DetailFormData.last_time}}</el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { EbGoodList, EbGoodAdd, EbGoodEdit, EbGoodDel, EbGoodDetail } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.EbGoodData) {
        Vue.set(store.state, 'EbGoodData', {
            rows:[],
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
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'name', label: '货物名称'},
                {prop: 'add_time', label: '添加时间'},
                {prop: 'last_time', label: '修改时间'}
            ],
            cpname: '货物管理--api 平台未找到相关接口',

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.EbGoodData;
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
                EbGoodList(pam, res => {
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
                // console.log(111111)
                // console.log(row)
                this.curr_row = row;

            },
            // 添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    name: this.AddFormData.name
                }
                EbGoodAdd(pam, res => {
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
                    EbGoodDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            // 编辑
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
                EbGoodEdit(pam, res => {
                   this.init();
                   this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                let pam = {
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }
                EbGoodDetail(pam, res => {
                    this.DetailFormData = res.data
                    this.detail_show = true
                }).catch(err => {
                    this.$message.error(err.msg);
                })
                // this.detail_show = true
            }
        }
        
    }
</script>

<style scoped>
   @import '../../assets/styles/common.css'; 
</style>