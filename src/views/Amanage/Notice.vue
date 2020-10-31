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

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-select v-model="search_value" placeholder="请选择" style="width: 100px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                <!-- <el-input v-if="search_value == 0" v-model="SearchFormData.title" size="small" style="width: 240px;margin-right: 20px;height: 36px"/> -->
                <el-input v-if="search_value == 0" v-model="search_ws" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                @current-change="onSelectCurrRow"
                :data="rows" 
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.1)"
                :highlight-current-row="true" 
                style="width: 100%;margin-top: 5px;" 
                size="mini"
                >
                <el-table-column type="index" width="80px" label="序号"></el-table-column>
                <el-table-column align="left"  show-overflow-tooltip prop="title" label="标题"></el-table-column>
                <el-table-column align="left" show-overflow-tooltip prop="content" label="内容"></el-table-column>
                <el-table-column align="left" prop="state" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="is_show" label="显示"></el-table-column>
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
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form ref="addform" :model="AddFormData" label-width="80px" label-position="right" :rules="rules" style="margin-top: 10px">
                   <el-row>
                       <el-col :span="24">
                            <el-form-item label="标题:" prop="title">
                                <el-input v-model="AddFormData.title"/>
                            </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="24">
                            <el-form-item label="内容:" prop="content">
                                <el-input type="textarea" :rows="8" v-model="AddFormData.content"></el-input>
                            </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="12">
                            <el-form-item label="状态:" required>
                                <el-select v-model="state_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in state_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                       </el-col>
                       <el-col :span="12">
                            <el-form-item label="显示"  class="paystyle">
                                <el-switch v-model="add_isshow" style="float: left;margin-top: 10px;"></el-switch>
                                <el-form-item v-if="add_isshow==true?visible=true:visible=false" label="活动时间:" label-width="80px" style="padding-left:20px;">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="showTime" style="width: 265px;width: 165px;"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="24">
                            <el-form-item label="图片:">
                                <file ref="upload" />
                            </el-form-item>
                       </el-col>
                   </el-row>
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
          <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="EditFormData" label-width="80px" label-position="right" ref="editform" :rules="rules">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="title" label="标题:">
                                <el-input v-model="EditFormData.title" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="内容:" prop="content">
                                <el-input type="textarea"  :rows="8" v-model="EditFormData.content"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="状态:">
                                 <el-select v-model="states_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in state_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                       <el-col :span="12">
                            <el-form-item label="显示" :required='true' class="paystyle">
                                <el-switch v-model="edit_isshow" style="float: left;margin-top: 10px;"></el-switch>
                                <el-form-item v-if="edit_isshow" label="活动时间:" label-width="80px" style="padding-left:20px;">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="editTime" style="width: 265px;width: 165px;"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-form-item>
                       </el-col>
                   </el-row>
                   <el-row>
                       <el-col :span="24">
                            <el-form-item label="图片:">
                                <file v-if="edit_show" ref="uploads" :fileListss="EditFormData.imgs"/>
                            </el-form-item>
                       </el-col>
                   </el-row>
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
           <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="DetailFormData" label-width="80px" label-position="right">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="标题:">{{DetailFormData.title}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                             <el-form-item label="图片:">
                                 <div v-if="DetailFormData.imgs[0]">
                                      <el-image 
                                        v-for="(value, index) in  DetailFormData.imgs"
                                        :key="index"
                                            style="width: 60px; margin-left: 10px"
                                            :src="value" 
                                            :preview-src-list="[value]">
                                        </el-image>
                                 </div>
                                <!-- <el-image 
                                v-if="DetailFormData.imgs[0]"
                                    style="width: 60px; "
                                    :src="DetailFormData.imgs[0]" 
                                    :preview-src-list="DetailFormData.imgs">
                                </el-image> -->
                                <span v-else>未上传</span>
                                <!-- <img :src="DetailFormData.imgs[0]" style="width: 50px" alt=""> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="状态:" prop="state">
                                <!-- <template slot-scope="scope"> -->
                                    {{stateFormat(DetailFormData.state)}}
                                    <!-- {{scope.state  == -1 ? '作废' : (scope.state  == 0 ? '待审' : '已审')}} -->
                                <!-- </template> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><el-form-item label="显示:">{{DetailFormData.is_show ? DetailFormData.is_show : '否'}}</el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="内容:">
                                <div style="width: 100%;height: auto;word-wrap:break-word;text-align: left">
                                    {{DetailFormData.content}}
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
    // import file from "@/components/imgUpload/mutiimg.vue"
    import file from "@/components/imgUpload/mutiimg.vue"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.NoticeData) {
        Vue.set(store.state, 'NoticeData', {
             search_options: [
                    {value: 0,label: '标题'}
                ],
                search_value: 0,
             search_ws:'',


            editTime: '',
            showTime:'',
            edit_isshow: false,
            state_value: 0,
            states_value: 0,
            state_options: [
                {value: 0, label:'作废'},
                {value: 1, label:'待审'},
                {value: 2, label:'已审'}
            ],
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
                        {required: true, message: '内容必填', trigger: 'blur' }
                      ]
                  },
            SearchFormData:{
                name:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc',
                title: ''
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
           this.curr_row = null
        },
        methods: {
            onSearchSubmit() {
                this.SearchFormData.title = this.search_ws;
                this.SearchFormData.page_num = 1
                this.init()
            },
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
                // this.loading = true;
                 NProgress.start();
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort,
                    title: this.SearchFormData.title
                }
                noticeList( pam, res => {
                    // this.loading = false;
                   NProgress.done()
                   if(res.data.rows) {
                        this.rows = res.data.rows;
                        this.total = res.data.total;
                        this.list = res.data;
                   }else {
                        this.rows = [];
                        this.total = 1;
                        this.list = [];
                   }
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
                this.AddFormData.state = this.state_value - 0 - 1
                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                        // if(!this.$refs.upload.fileListss[0]){
                        //      this.$confirm('确定不上传图片?', '提示').then(() => {
                        //         noticeAdd(this.AddFormData,res => {
                        //             this.init();
                        //             this.add_show = false;
                        //         }).catch(err => {
                        //             this.$message.error(err.msg);
                        //         })
                        //         return;
                        //     }).catch( err => {
                        //         return;
                        //     })
                        // }
                        // this.AddFormData.imgs  = [this.$refs.upload.img_url];
                        this.AddFormData.imgs  = this.$refs.upload.fileListss;
                         this.AddFormData.is_show = this.add_isshow ? util.eleDate(this.showTime) : '0'
                        // this.AddFormData.is_show = this.AddFormData.is_show.getFullYear() + '-' + (this.AddFormData.is_show.getMonth() + 1) + '-' + this.AddFormData.is_show.getDate()
                        noticeAdd(this.AddFormData,res => {
                           this.init();
                           this.add_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        })
                    }else {
                        return false
                        console.log(999)
                    }
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
                }).catch( err => {
                    console.log(err)
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
                if(this.curr_row.state == 1 ) {
                    this.$message.error('不可编辑');
                    return false;
                }
                // uploadedt
                lime.req('ShopNoticeDetail',{
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                    this.EditFormData = res.data
                    this.states_value =res.data.state +  1
                    this.edit_isshow = res.data.is_show  ? true : false
                    this.editTime = this.edit_isshow ? res.data.is_show : new Date()
                    this.edit_show = true;
                })
                // this.EditFormData = this.curr_row
                // this.states_value = this.curr_row.state +  1
                // this.edit_isshow = this.curr_row.is_show  ? true : false
                // this.editTime = this.edit_isshow ? this.curr_row.is_show : new Date()



                // editTime edit_isshow
                console.log(this.EditFormData)
                // this.EditFormData.title = this.curr_row.title;
                // this.EditFormData.content = this.curr_row.content;
                // this.EditFormData.state = this.curr_row.state;
                // this.EditFormData.uuid  = this.curr_row.uuid;
                // this.edit_show = true;
            },
            onEditSubmit() {
                console.log(this.editTime)
                let pam = {
                   login_token:lime.cookie_get('login_token'),
                   title:this.EditFormData.title,
                   content:this.EditFormData.content,
                   state: this.states_value - 1,
                   uuid : this.EditFormData.uuid,
                //    is_show: this.edit_isshow ? util.eleDate(this.editTime) : '0',
                   is_show: this.edit_isshow ? (this.editTime.length < 12 ? this.editTime :  util.eleDate(this.editTime) ) : '0',
                   imgs: this.$refs.uploads.fileListss
                //    imgs: [this.$refs.uploadedt.img_url],
                //    is_show: this.EditFormData.is_show.getFullYear() + '-' + (this.EditFormData.is_show.getMonth() + 1) + '-' + this.EditFormData.is_show.getDate()
                }
                 this.$refs['editform'].validate((valid) => {
                    if (valid) {
                        noticeEdit(pam, res => {
                    this.edit_show = false;
                    this.init();
                }).catch(err => {
                    this.$message.error(err.msg);
                })
                    }else {
                        return false
                    }
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

<style>
    .el-image-viewer__mask {
        opacity: 1!important;
    }
     .el-table tbody tr:hover>td { 
        background-color: #cedbeb!important;
    }
    .el-table__body tr.current-row>td{
        background: #cedbeb!important;
    }

    /* .el-table--striped .el-table__body tr {
        background:#f4f8fe;
        border:  1px solid red;
    } */

   .el-table--striped .el-table__body tr.el-table__row--striped td {
        background:#f4f8fe;
        /* border:  1px solid red; */
    }

    .el-drawer__header {
        margin-bottom: 20px !important;
    }
</style>
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
        z-index: 999;
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
</style>