<!--
 * @Author: your name
 * @Date: 2020-09-10 17:05:37
 * @LastEditTime: 2020-09-24 18:31:00
 * @LastEditors: Please set LastEditors
 * @Description: 工单管理
 * @FilePath: /shop/src/views/Amanage/Order.vue
-->
<template>
    <div>

        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
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
        <!-- 表格 -->
        <div :style="{height: height - 150 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                @current-change="onSelectCurrRow"
                :data="rows" 
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200',height:'48px'}"
                :height="height - 195 - 8"
                v-loading="loading"
                :default-expand-all="true"
                element-loading-text="拼命加载中"
                element-loading-background="rgba(0, 0, 0, 0.1)"
                :highlight-current-row="true" 
                 style="width: 100%;margin-top: 5px;"
                size="mini">
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column align="left" show-overflow-tooltip prop="title" label="主题"></el-table-column>
                <el-table-column align="left" show-overflow-tooltip prop="add_time" label="添加时间"></el-table-column>
                <el-table-column align="left" show-overflow-tooltip prop="content" label="内容"></el-table-column>
                <el-table-column align="left" show-overflow-tooltip prop="feedback" label="内容反馈"></el-table-column>
                <el-table-column align="left" show-overflow-tooltip prop="last_time" label="结束时间"></el-table-column>
                <el-table-column align="left" prop="status" label="状态">
                    <template slot-scope="scope">
                        {{stateFormat(scope.row.status)}}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作" width="230px" align="center">
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
                </el-table-column> -->
                <!-- <el-table-column align="center" prop="to_department" label="接收部门"></el-table-column>
                <el-table-column align="center" prop="to_person" label="接收人"></el-table-column> -->
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



        <!-- 添加 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <!-- <el-divider></el-divider> -->
                <el-form ref="addForm" :model="AddFormData" label-width="80px" style="margin-top: 10px" label-position="right" :rules="rules">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item prop="title" label="主题:">
                                <el-input v-model="AddFormData.title"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item prop="content" label="内容:">
                                <el-input :rows="8"  type="textarea" v-model="AddFormData.content"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!-- <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="add_show = false">取消</el-button>
                    <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div> -->
            </div>
            <div class="drawer-footer" >
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
                <!-- <el-form :model="EditFormData" label-width="80px" label-position="right" style="margin-top: 10px"> -->
                   
                   <el-form ref="editForm" :model="EditFormData" label-width="80px" style="margin-top: 10px" label-position="right" :rules="rules">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item prop="title" label="主题:">
                                <el-input v-model="EditFormData.title"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item prop="content" label="内容:">
                                <el-input :rows="8"  type="textarea" v-model="EditFormData.content"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                    <!-- <el-form-item label="主题:">
                        <el-input v-model="EditFormData.title" style="width: 360px"/>
                    </el-form-item>
                    <el-form-item label="内容:">
                        <el-input type="textarea" :rows="8" v-model="EditFormData.content" style="width: 360px"></el-input>
                    </el-form-item>
                </el-form> -->
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
                <el-form :model="DetailFormData" label-width="70px" label-position="right">
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">工单内容</div>
                    </div>
                    <el-form-item label="主题:" style="margin-top: 30px">{{DetailFormData.title || '----'}}</el-form-item>
                    <el-form-item label="内容:">
                        <div style="width: 100%;height: auto;word-wrap:break-word;">
                            {{DetailFormData.content}}
                        </div>
                    </el-form-item>
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">处理过程</div>
                    </div>
                    <!-- <el-form-item label="聊天详情" style="margin-top: 30px"> -->
                       <div style="width: 100%;height: auto;overflow: auto;background: #F2F2F2;padding-bottom:60px; box-sizing: border-box;min-height: 200px">
                            <div v-for="value in msgList" :key="value.id">
                                <div class="get_msg" v-if="value.from_type != 2">
                                    <div class="get_msglf"><div class="msg_cicle">某某</div></div>
                                    <div class="get_msgrg">
                                        <div class="get_time">{{value.add_time}}</div>
                                        <div class="get_content get_contentl">{{value.content}}</div>
                                    </div>
                                </div>
                                <div class="to_msg" v-else>
                                    <div class="to_msglf">
                                        <div class="get_time">{{value.add_time}}</div>
                                        <div class="get_content get_contentr">{{value.content}}</div>
                                    </div>
                                    <div class="to_msgrg"><div class="msg_cicle">我</div></div>
                                </div>
                            </div>
                        </div>
                    <!-- </el-form-item> -->
                </el-form>
               <!-- <div class="send-footer">
                    <el-row>
                        <el-col :span="22">
                            <el-input size="small" type="text" v-model="chart_content"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align: right">
                            <el-button size="small" type="primary" @click="sendchar">发送</el-button>
                        </el-col>
                    </el-row>
               </div> -->
                
            </div>

            <div class="drawer-footers" style="text-align: center;">
                 <!-- <el-input size="small" type="text" v-model="chart_content"></el-input> -->

                <el-row >
                        <el-col :span="20">
                            <el-input  type="text" v-model="chart_content"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button size="small" type="primary" @click="sendchar">发送</el-button>
                        </el-col>
                    </el-row>
                <!-- <el-button @click="detail_show = false" type="primary">关闭</el-button> -->
            </div>
        </el-drawer>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { workOrderList, workOrderAdd, workOrderEdit, workOrderDel } from "@/api/request"
    // import TableBase from "@/components/myTables/baseTable.vue"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.OrderData) {
        Vue.set(store.state, 'OrderData', {
            chart_content: '', 
            total:0,
            // page_num:1,
            // page_len:10,
            loading:false,
            curr_row:null,
            rules: {
                      content: [
                        { required: true, message: '内容必填', trigger: 'blur' }
                      ],
                      to_person: [
                        {type: 'number', required: true, message: '接受人必填', trigger: 'blur' }
                      ],
                      to_department: [
                        {  required: true, message: '接收部门必填', trigger: 'blur' }
                      ],
                      title: [
                        {  required: true, message: '主题必填', trigger: 'blur' }
                      ],
            },
             // title to_person to_department
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
                // name:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            //表格数据
            rows: [],
            cpname: '工单管理--api 平台未找到相关接口',
            direction: 'rtl',
            msgList: [
                {id: 1, type: 1, content: '11111',time: '20:04:16'},
                {id: 2, type: 1, content: '22222',time: '20:04:16'},
                {id: 3, type: 2, content: '33333',time: '20:04:16'},
                {id: 4, type: 1, content: '4444',time: '20:04:16'},
                {id: 5, type: 2, content: '5555',time: '20:04:16'},
                {id: 6, type: 2, content: '66666',time: '20:04:16'},
                {id: 7, type: 2, content: '11177711',time: '20:04:16'},
                {id: 8, type: 1, content: '999',time: '20:04:16'},
                {id: 9, type: 1, content: '0000',time: '20:04:16'},
                {id: 10, type: 1, content: '10110',time: '20:04:16'}
            ],
            subMsg: ''

        });
    }
    export default {
        // components: {
        //     TableBase
        // },
        data() {
            return store.state.OrderData;
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
            sendchar() {
                if(this.chart_content ){
                    lime.req('ShopChatRecordAdd', {
                        login_token: lime.cookie_get('login_token'),
                        uuid: this.curr_row.uuid,
                        content: this.chart_content 
                    }).then(res => {
                        lime.req('ShopWorkOrderDetail',{
                        login_token: lime.cookie_get('login_token'),
                        uuid: this.curr_row.uuid
                        }).then( res => {
                            this.chart_content = '',
                            this.DetailFormData = res.data
                            this.msgList = res.data.chat_list
                            console.log(res)
                        })
                    })
                }else {
                    this.$message.error('请输入发送内容！')
                }
            },
            onMsgSubmit() {
               let ds = this.msgList
               let len = ds.length
               ds.push({id: len + 1, type: 2,content: this.subMsg})
               this.msgList = ds
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
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }
                workOrderList(pam, res => {
                    // this.loading = false;
                    NProgress.done()
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.list = res.data;
                }).catch(err => {
                    // this.loading = false;
                    NProgress.done()
                    this.$message.error(err.msg);
                    // this.$router.push('/login');
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done()
                    // this.$router.push('/login');
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
            // 分页处理
            onPageChange(page){
                this.SearchFormDatapage_num = page;
                this.init();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //添加
            handleAdd() {
                this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                let pam = {
                    login_token: this.AddFormData.login_token,
                    to_department: this.AddFormData.to_department,
                    to_person: this.AddFormData.to_person,
                    title: this.AddFormData.title,
                    content: this.AddFormData.content,
                }
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                         workOrderAdd(pam, res => {
                            this.init();
                            this.add_show = false;
                        }).catch(err => {
                                this.$message.error(err.msg);
                            })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                console.log(this.curr_row)
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid: this.curr_row.uuid
                    }
                    workOrderDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            //编辑
            handleEdit() {
                // this.EditFormData.to_department = this.curr_row.to_department || '';
                // this.EditFormData.to_person = this.curr_row.to_person || '';
                // this.EditFormData.title = this.curr_row.title || '';
                // this.EditFormData.content  = this.curr_row.content || ''; 
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                lime.req('ShopWorkOrderDetail', {
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                     this.EditFormData = res.data
                     this.edit_show = true
                })
                // this.EditFormData = this.curr_row
                // this.edit_show = true
            },
            onEditSubmit() {
               this.EditFormData.login_token = lime.cookie_get('login_token'),
               this.EditFormData.uuid = this.curr_row.uuid

               this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                         workOrderEdit(this.EditFormData, res => {
                            this.init();
                            this.edit_show = false;
                            }).catch(err => {
                                this.$message.error(err.msg);
                            })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            fordt(date) {
                var date = new Date(date*1000);
                var YY = date.getFullYear() + '-';
                var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return YY + MM + DD +" "+hh + mm + ss;

                // return new Date(date*1000)
            },
            //详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                lime.req('ShopWorkOrderDetail',{
                    login_token: lime.cookie_get('login_token'),
                    uuid: this.curr_row.uuid
                }).then( res => {
                    this.DetailFormData = res.data
                    this.msgList = res.data.chat_list
                    this.detail_show = true
                    console.log(res)
                })
                // this.DetailFormData = this.curr_row
            },
            stateFormat(state) {
                if (state == 0) {
                    return '未开始';
                } else if (state == 1) {
                    return '处理中';
                } else if (state == 2){
                    return '已处理';
                }else{
                    return '已接收';
                }
            },
        }

        
    }
</script>
<style >
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
    .get_msg {
        display: flex;
        flex-direction: row;
        width: 60%;
        margin-left: 2%;
        height: 60px;
        margin-top:  20px;
        line-height: 30px;
        text-align: left
    }

    .get_msglf {
        width: 15%;
        height: 100%
    }

     .get_msgrg {
        width: 85%;
        height: 100%
    }

    .msg_cicle {
        width: 40px;
        height: 40px;
        background: #0F7BF6;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        /* line-break: 40px; */
        line-height: 40px;
        color: white;
        font-size: 14px;
        margin-top: 20px
    }

    .to_msg {
        display: flex;
        flex-direction: row;
        width: 60%;
        margin-left: 38%;
        height: 60px;
        margin-top:  20px;
        line-height: 30px;
         text-align: right
    }

    .to_msglf {
        width:  85%;
        height: 100%
    }
     

    .to_msgrg {
        width:  15%;
        height: 100%
    }

    .drawer-footers {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding: 0 0 0 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
        /* border: 1px solid red */
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
    /* "get_time get_content */
    .get_time {
        color: #A6AAB8;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
    }

    .get_content {
        /* width: 100%; */
        width: auto;
        display: inline-block;
        height: 30px;
        background: white;
        text-align: left;
        padding: 0 10px;
        box-sizing: border-box;
        color: #3F434C;
        position: relative;
        border-radius: 4px;

    }
    .get_contentr::after{
			content: '';
			border: 8px solid #ffffff00;
			border-left: 8px solid #fff;
			position: absolute;
			top: 2px;
			right: -16px;
		}

    .get_contentl::after{
			content: '';
			border: 8px solid #ffffff00;
			border-right: 8px solid #fff;
			position: absolute;
			top: 2px;
			left: -16px;
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

    .send-footer {
        position: fixed;
        width: 50%;
       
        bottom: 50px;
        background: white;
        right: 0;
        z-index: 99999;
        height: 60px;
        padding: 20px 70px;
        box-sizing: border-box;
        /* border: 1px solid red */
    }

    .line {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #F2F2F2;
    }

    .linelf {
        width: 2%;
        height: 100%;
    }

    .linerg {
        width: 98%;
        height: 100%;
        line-height: 30px;
        font-size: 14px;
        color: #2a2f3b;
    }

    .line-line {
        width: 2px;
        height: 16px;
        margin-top: 7px;
        background: #0F7BF6;
    }
</style>