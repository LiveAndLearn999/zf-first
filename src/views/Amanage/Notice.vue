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
                        <span style="padding-left:9px;font-size: 16px">{{$store.state.AdminData.active_title}}</span>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div style="text-align: right; font-size: 14px">
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
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                @current-change="onSelectCurrRow"
                :data="rows" 
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 156"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.1)"
                :highlight-current-row="true" 
                size="mini">
                <el-table-column type="index" width="80px" label="序号"></el-table-column>
                <el-table-column align="left" prop="title" label="标题"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="content" label="内容"></el-table-column>
                <el-table-column align="center" prop="state" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="is_show" label="显示"></el-table-column>
                <el-table-column label="操作" width="230px" align="center">
                    <template slot-scope="scope">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click="handleEdit(scope.$index, scope.row)">
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                size="mini"
                                type="text"
                                @click="handleDel(scope.$index, scope.row)">删除</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
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

        <!-- 添加 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',margin:'0 auto',paddingLeft: '60px',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form :model="AddFormData" label-width="80px" label-position="left" :rules="rules" style="margin-top: 10px">
                    <el-form-item label="标题:" prop="title" required>
                        <el-input v-model="AddFormData.title" style="width: 360px"/>
                    </el-form-item>
                    <el-form-item label="内容:" prop="content" required>
                        <el-input type="textarea" :rows="8" style="width: 360px" v-model="AddFormData.content"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" required>
                        <el-radio-group v-model="add_state">
                            <el-radio :label="-1">作废</el-radio>
                            <el-radio :label="0">待审</el-radio>
                            <el-radio :label="1">已审</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="图片:">
                        <file ref="upload" />
                    </el-form-item>
                     <el-form-item label="显示" :required='true' class="paystyle">
                        <el-switch v-model="add_isshow" style="float: left;margin-top: 10px;"></el-switch>
                        <el-form-item v-if="add_isshow==true?visible=true:visible=false" label="活动时间:" label-width="80px" style="padding-left:20px;">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="showTime" style="width: 265px;width: 165px;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-form-item>
                    <!-- <el-form-item label="显示:">
                        <el-date-picker
                            v-model="AddFormData.is_show"
                            type="date"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item> -->
                </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
        </el-drawer>

         <!-- 编辑 -->
         <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="50%">
          <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',margin:'0 auto',paddingLeft: '60px',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form :model="EditFormData" label-width="80px" label-position="left">
                    <el-form-item label="标题:">
                        <el-input v-model="EditFormData.title" style="width: 360px"/>
                    </el-form-item>
                    <el-form-item label="内容:">
                        <el-input type="textarea" style="width: 360px" :rows="8" v-model="EditFormData.content"></el-input>
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
            </div>
            <div class="drawer-footer">
                    <el-button @click="edit_show = false">取消</el-button>
                    <el-button @click="onEditSubmit" type="primary">确定</el-button>
                </div>
        </el-drawer>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="50%">
           <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',margin:'0 auto',paddingLeft: '60px',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                <el-form :model="EditFormData" label-width="80px" label-position="right">
                    <el-form-item label="标题:">{{DetailFormData.title}}</el-form-item>
                    <el-form-item v-if="DetailFormData.imgs[0]" label="图片:">
                        <el-image 
                            style="width: 30px; height: 30px"
                            :src="DetailFormData.imgs[0]" 
                            :preview-src-list="DetailFormData.imgs">
                        </el-image>
                        <!-- <img :src="DetailFormData.imgs[0]" style="width: 50px" alt=""> -->
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
            </div>
             <div class="drawer-footer">
                    <el-button @click="detail_show = false" type="primary">关闭</el-button>
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
    // import file from "@/components/imgUpload/upload.vue"
     import file from "@/components/imgUpload/drapload.vue"

    if (!store.state.NoticeData) {
        Vue.set(store.state, 'NoticeData', {
            list:[],
            rows:[],
            total:0,
            loading:false,
            curr_row:null, // 当前选中行
            rules: {
                      title: [
                        { required: true, message: '标题必填', trigger: 'blur' }
                      ],
                      content: [
                        {type: 'number', required: true, message: '内容必填', trigger: 'blur' }
                      ]
                  },
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
            AddFormData:{
                is_show: new Date()
            },
            showTime: new Date(),
            add_state: -1,
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
            direction: 'rtl',
            add_isshow: false
            
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
                this.AddFormData.state = this.add_state
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
                 this.AddFormData.is_show = this.add_isshow ? util.eleDate(showTime) : 0
                // this.AddFormData.is_show = this.AddFormData.is_show.getFullYear() + '-' + (this.AddFormData.is_show.getMonth() + 1) + '-' + this.AddFormData.is_show.getDate()
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
        z-index: 999999;
    }
</style>