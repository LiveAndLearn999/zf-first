<!--
 * @Author: your name
 * @Date: 2020-09-10 11:07:57
 * @LastEditTime: 2020-09-25 16:50:55
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
                :height="height - 60 - 50"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :highlight-current-row="true" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column align="center" prop="title" label="标题"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="content" label="内容"></el-table-column>
                <el-table-column align="center" prop="imgs" label="附件">
                    <template slot-scope="scope">
                        <img v-if="scope.row.imgs[0]" :src="scope.row.imgs[0]" style="width: 30px" alt="">
                        <span v-else>未上传</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="state" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="is_show" label="显示"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
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

        <!-- 添加 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="AddFormData" label-width="80px" label-position="left">
                    <el-form-item label="标题:" required>
                        <el-input v-model="AddFormData.title" />
                    </el-form-item>
                    <el-form-item label="内容:" required>
                        <el-input type="textarea" v-model="AddFormData.content"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" required>
                        <el-radio-group v-model="AddFormData.state">
                            <el-radio :label="-1">作废</el-radio>
                            <el-radio :label="0">待审</el-radio>
                            <el-radio :label="1">已审</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="图片:">
                        <file v-if="add_show" ref="upload"/>
                    </el-form-item>
                    <el-form-item label="显示:">
                        <el-date-picker
                            v-model="AddFormData.is_show"
                            type="date"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

         <!-- 编辑 -->
         <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="EditFormData" label-width="80px" label-position="left">
                    <el-form-item label="标题:">
                        <el-input v-model="EditFormData.title" />
                    </el-form-item>
                    <el-form-item label="内容:">
                        <el-input type="textarea" v-model="EditFormData.content"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <el-radio-group v-model="EditFormData.state">
                            <el-radio :label="-1">作废</el-radio>
                            <el-radio :label="0">待审</el-radio>
                            <el-radio :label="1">已审</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="原图片:" v-if="EditFormData.imgs[0]">
                        <img style="width: 50px" :src="EditFormData.imgs[0]" alt="">
                    </el-form-item>
                    <el-form-item v-if="EditFormData.imgs[0]" label="修改图片:">
                        <file ref="uploadedt"/>
                    </el-form-item>
                    <el-form-item v-else label="图片:">
                        <file ref="uploadedt"/>
                    </el-form-item> -->
                    <!-- <el-form-item label="显示:">
                        <el-date-picker
                            v-model="EditFormData.is_show"
                            type="date"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item> -->
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="edit_show = false">取消</el-button>
                    <el-button @click="onEditSubmit" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="EditFormData" label-width="80px" label-position="left">
                    <el-form-item label="标题:">{{DetailFormData.title}}</el-form-item>
                    <el-form-item v-if="DetailFormData.imgs[0]" label="图片:">
                        <img :src="DetailFormData.imgs[0]" style="width: 50px" alt="">
                    </el-form-item>
                    <el-form-item  label="状态:" prop="state">
                        <template slot-scope="scope">
                            {{scope.state  == -1 ? '作废' : (scope.state  == 0 ? '待审' : '已审')}}
                        </template>
                    </el-form-item>
                    <el-form-item label="显示:">{{DetailFormData.is_show}}</el-form-item>
                    <el-form-item label="内容:">
                        <div style="width: 100%;height: auto;word-wrap:break-word;text-align: left">
                            {{DetailFormData.content}}
                        </div>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="detail_show = false" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>


        

    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { noticeList, noticeAdd , noticeDel, noticeEdit} from "@/api/request"
    import file from "@/components/imgUpload/upload.vue"

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
            DetailFormData: {
                imgs: []
            },
            direction: 'rtl'
            
        });
    }

    export default {
        components: {
            file
        },
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 添加,
            handleAdd() {
                this.add_show = true;
                this.AddFormData = {}
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                if(!this.$refs.upload.img_url){
                     this.$confirm('确定不上传图片?', '提示').then(() => {
                        noticeAdd(this.AddFormData,res => {
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
                this.AddFormData.imgs  = [this.$refs.upload.img_url];
                this.AddFormData.is_show = this.AddFormData.is_show.getFullYear() + '-' + (this.AddFormData.is_show.getMonth() + 1) + '-' + this.AddFormData.is_show.getDate()
                noticeAdd(this.AddFormData,res => {
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
                // uploadedt

                this.EditFormData = this.curr_row
                console.log(this.EditFormData)
                // this.EditFormData.title = this.curr_row.title;
                // this.EditFormData.content = this.curr_row.content;
                // this.EditFormData.state = this.curr_row.state;
                // this.EditFormData.uuid  = this.curr_row.uuid;
                this.edit_show = true;
            },
            onEditSubmit() {
                let pam = {
                   login_token:lime.cookie_get('login_token'),
                   title:this.EditFormData.title,
                   content:this.EditFormData.content,
                   state: this.EditFormData.state,
                   uuid : this.EditFormData.uuid,
                //    imgs: [this.$refs.uploadedt.img_url],
                //    is_show: this.EditFormData.is_show.getFullYear() + '-' + (this.EditFormData.is_show.getMonth() + 1) + '-' + this.EditFormData.is_show.getDate()
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
                this.DetailFormData = this.curr_row
                this.detail_show = true;
                // this.DetailFormData.title = this.curr_row.title;
                // this.DetailFormData.content = this.curr_row.content;
                // this.DetailFormData.state = this.curr_row.state;
            },
            onDetailSubmit() {
                console.log('submit')
            }
            
        }
        
    }
</script>

<style scoped>
@import '../../assets/styles/common.css';
.img-load {
    cursor: pointer;
}
</style>