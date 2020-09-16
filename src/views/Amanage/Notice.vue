<!--
 * @Author: your name
 * @Date: 2020-09-10 11:07:57
 * @LastEditTime: 2020-09-16 16:05:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Amanage/Notice.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        <div style="height: 46px; line-height: 46px;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
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
                @current-change="onSelectCurrRow"
                :data="rows" 
                :height="height - 60 - 48"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :highlight-current-row="true" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="imgs" label="附件"></el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column prop="is_show" label="显示"></el-table-column>
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

        <!-- 添加 -->
        <el-dialog 
            title="添加"
            width="450px"
            :visible.sync="add_show">
            <el-form :model="AddFormData" label-width="80px">

                <el-form-item label="标题:" required>
                    <el-input v-model="AddFormData.title" />
                </el-form-item>
                <el-form-item label="内容:" required>
                    <el-input type="textarea" v-model="AddFormData.content"></el-input>
                </el-form-item>
                <!-- <el-form-item label="图片:">
                    <input type="file" @change="getImg">
                </el-form-item> -->
                <el-form-item label="状态:" required>
                    <!-- <el-input v-model="AddFormData.state" /> -->
                    <!-- <el-switch v-model="AddFormData.state"></el-switch> -->
                    <!-- <el-radio v-model="AddFormData.state" label="-1">作废</el-radio>
                    <el-radio v-model="AddFormData.state" label="0">待审</el-radio>
                    <el-radio v-model="AddFormData.state" label="1">已审</el-radio> -->
                    <el-radio-group v-model="AddFormData.state">
                        <el-radio :label="-1">作废</el-radio>
                        <el-radio :label="0">待审</el-radio>
                        <el-radio :label="1">已审</el-radio>
                    </el-radio-group>
                </el-form-item>
                 <!-- <el-form-item label="显示:">
                    <el-switch v-model="AddFormData.is_show"></el-switch>
                </el-form-item> -->
                
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button type="primary" @click="onAddSubmit">确认</el-button>
            </span>
        </el-dialog>

         <!-- 编辑 -->
        <el-dialog 
            title="编辑"
            width="450px"
            :visible.sync="edit_show">
            <el-form :model="EditFormData" label-width="80px">

                <el-form-item label="标题:">
                    <el-input v-model="EditFormData.title" @input="change($event)"/>
                </el-form-item>
                <el-form-item label="内容:">
                    <el-input type="textarea" v-model="EditFormData.content" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <!-- <el-input v-model="EditFormData.state" @input="change($event)"/> -->
                    <!-- <el-radio v-model="EditFormData.state" label="-1">作废</el-radio>
                    <el-radio v-model="EditFormData.state" label="0">待审</el-radio>
                    <el-radio v-model="EditFormData.state" label="1">已审</el-radio> -->
                    <el-radio-group v-model="EditFormData.state">
                        <el-radio :label="-1">作废</el-radio>
                        <el-radio :label="0">待审</el-radio>
                        <el-radio :label="1">已审</el-radio>
                    </el-radio-group>
                    <!-- <el-switch v-model="EditFormData.state"></el-switch> -->
                </el-form-item>

            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button type="primary" @click="onEditSubmit">确认</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
        <el-dialog 
            title=""
            width="450px"
            :visible.sync="detail_show">
            <el-form  label-width="80px">
                <el-form-item label="标题:">{{DetailFormData.title}}</el-form-item>
                <el-form-item label="内容:">{{DetailFormData.content}}</el-form-item>
                <el-form-item label="状态:">{{DetailFormData.state == 0 ? '待审' : (DetailFormData.state == 1 ? '已审' : '作废')}}</el-form-item>
            </el-form>
        </el-dialog>


        

    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { noticeList, noticeAdd , noticeDel, noticeEdit} from "@/api/request"

    if (!store.state.NoticeData) {
        Vue.set(store.state, 'NoticeData', {
            list:[],
            rows:[],
            total:0,
            loading:false,
            curr_row:null, // 当前选中行
            SearchFormData:{
                name:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            search_show:false,
            // 添加
            add_show:false,
            AddFormData:{},
            // 编辑
            edit_show:false,
            EditFormData:{
                state: 0
            },
            //删除
            delete_show: false,
            //详细
            detail_show: false,
            DetailFormData: {}
            
        });
    }

    export default {
        data() {
            return store.state.NoticeData
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
            change(e) {
                this.$forceUpdate()
            },
            getImg(e){
                console.log(e)
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化 列表
            init() {
                this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }
                noticeList( pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.list = res.data;
                })
            },
            stateFormat(state) {
                if (state == 0) {
                    return '待审';
                } else if (state == 1) {
                    return '已审';
                } else {
                    return '作废';
                }
            },
            // 刷新
            onRefresh() {
                this.init();
            },
            // 点击单选
            onSelectCurrRow(row) {
                this.curr_row = row;
            },
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            // 添加,
            handleAdd() {
                this.add_show = true;
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                let pam = {
                    content: this.AddFormData.content,
                    title: this.AddFormData.title,
                    login_token: this.AddFormData.login_token,
                    // state: this.AddFormData.state ? 1 : 0?
                    state: this.AddFormData.state 
                }
                noticeAdd(pam,res => {
                   this.init();
                   this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            // 删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }
                    noticeDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            onDelSubmit() {
                this.init();
                this.delete_show = false;
            },
            // 编辑
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.EditFormData.title = this.curr_row.title;
                this.EditFormData.content = this.curr_row.content;
                this.EditFormData.state = this.curr_row.state;
                this.EditFormData.uuid  = this.curr_row.uuid;
                this.edit_show = true;
            },
            onEditSubmit() {
                let pam = {
                   login_token:lime.cookie_get('login_token'),
                   title:this.EditFormData.title,
                   content:this.EditFormData.content,
                   state: this.EditFormData.state,
                   uuid : this.EditFormData.uuid 
                }
                noticeEdit(pam, res => {
                    this.edit_show = false;
                    this.init();
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            //详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.detail_show = true;
                this.DetailFormData.title = this.curr_row.title;
                this.DetailFormData.content = this.curr_row.content;
                this.DetailFormData.state = this.curr_row.state;
            },
            onDetailSubmit() {
                console.log('submit')
            }
            
        }
        
    }
</script>

<style scoped>
@import '../../assets/styles/common.css';

</style>