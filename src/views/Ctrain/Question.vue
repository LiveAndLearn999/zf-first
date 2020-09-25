<!--
 * @Author: your name
 * @Date: 2020-09-10 17:26:53
 * @LastEditTime: 2020-09-10 17:27:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Question.vue
-->
<!-- 试题管理 -->
<template>
    <div v-wechat-title="$route.meta.title">
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
                        <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link>

                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>

                        <!-- <el-link @click="onSubMenu('onAddOption',true)" class="menu">添加选项</el-link> -->
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 数据表格 -->
        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="title" label="题目" align="center"></el-table-column>
                <el-table-column prop="content" label="选项" align="center">
                    <template slot-scope="scope">
                       <p v-for="(item,index) in scope.row.content" :key="index">{{item.opt}}:{{item.content}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="is_pay" label="是否付费" align="center"></el-table-column>
                <el-table-column prop="is_show" label="是否展示" align="center">
                    <template slot-scope="scope">
                        {{formatDate(scope.row.is_show * 1000)}}
                    </template>
                </el-table-column>
                <el-table-column prop="tag" label="题目" align="center"></el-table-column>
                <el-table-column prop="ques_type" label="题型" align="center"></el-table-column>
                <el-table-column prop="answer" label="答案" align="center"></el-table-column>
                <el-table-column prop="check_state" label="审核状态" align="center"></el-table-column>
                <el-table-column prop="add_time" label="添加时间" align="center"></el-table-column>
                <el-table-column prop="last_time" label="最后修改时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.last_time == '' ? '还未登陆' : scope.row.last_time}}
                    </template>
                </el-table-column>
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

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="30%">
            <el-form :model="SearchFormData" label-width="120px">
                <el-form-item label="题目:">
                    <el-input v-model="SearchFormData.title" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加模板 -->
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="85px">
                <el-form-item label="标签:" :required='true'>
                    <el-input v-model="AddFormData.title" />
                </el-form-item>
                <el-form-item label="是否需支付" label-width="110px" :required='true'>
                    <el-input v-model="AddFormData.is_pay" />
                </el-form-item>
                <el-form-item label="是否展示:" :required='true'>
                    <el-input v-model="AddFormData.is_show" />
                </el-form-item>
                <el-form-item label="分析:">
                    <el-input v-model="AddFormData.analysis" />
                </el-form-item>
                <el-form-item label="标签:">
                    <!-- <el-button @click="tags_show = true">添加标签</el-button> -->
                    <el-button @click="handleTag" type="primary" style="margin-right: 20px;">添加标签</el-button>
                    <span v-for="(item,index) in AddFormData.tag_list" :key="index">{{item.title}}  </span>
                    <!-- <el-input v-model="AddFormData.tag_uuids" /> -->
                </el-form-item>
                <el-form-item label="题型:" :required='true'>
                    <el-input v-model="AddFormData.ques_type" />
                </el-form-item>
                <!-- <el-form-item label="图片地址:">
                    <el-input v-model="AddFormData.pic_urls" />
                </el-form-item> -->
                <el-form-item label="答案:" :required='true'>
                    <el-input v-model="AddFormData.answer" />
                </el-form-item>
                <el-form-item label="最小金额:">
                    <el-input v-model="AddFormData.min_num" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="标签列表"
            :visible.sync="tags_show"
            width="30%">
            <el-form :model="TagsFormData" label-width="60px">
                <el-form-item label="标签:">
                    <el-input v-model="TagsFormData.title" class="tagsinput"/>
                    <el-button type="primary" @click="handleTag">搜索</el-button>
                </el-form-item>
                <el-checkbox-group v-model="TagsFormData.tag_uuids">
                    <el-checkbox v-for="(item,index) in TagsFormData.tag_list" :key="index" :label="item">{{item.title}}</el-checkbox>
                </el-checkbox-group>
            </el-form>

            <span slot="footer">
                <el-button @click="tags_show = false">取 消</el-button>
                <el-button type="primary" @click="onTagsSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑模板 -->
        <el-dialog  
            title="编辑"
            :visible.sync="edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="80px">
                 <el-form-item label="题目:" :required='true'>
                    <el-input v-model="EditFormData.title" />
                </el-form-item>
                <el-form-item label="是否需支付" label-width="110px" :required='true'>
                    <el-input v-model="EditFormData.is_pay" />
                </el-form-item>
                <el-form-item label="是否展示" :required='true'>
                    <el-input v-model="EditFormData.is_show" />
                </el-form-item>
                <el-form-item label="分析:">
                    <el-input v-model="EditFormData.analysis" />
                </el-form-item>
                <!-- <el-form-item label="标签:">
                    <el-input v-model="EditFormData.tag_uuids" />
                </el-form-item> -->
                <el-form-item label="题型:" :required='true'>
                    <el-input v-model="EditFormData.ques_type" />
                </el-form-item>
                <!-- <el-form-item label="图片地址:">
                    <el-input v-model="EditFormData.pic_urls" />
                </el-form-item> -->
                <el-form-item label="答案:" :required='true'>
                    <el-input v-model="EditFormData.answer" />
                </el-form-item>
                <el-form-item label="最小金额:">
                    <el-input v-model="EditFormData.min_num" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
        <el-dialog title="详细" :visible.sync="detail_show" width="40%">
            <el-form :model="DetailFormData" label-width="80px">
                <el-form-item class="mbstyle" label="题目:">{{DetailFormData.data.title}}</el-form-item>
                <el-form-item class="mbstyle" label="是否需支付:" label-width="90px">{{DetailFormData.data.is_pay}}</el-form-item>
                <el-form-item class="mbstyle" label="是否展示:">{{DetailFormData.data.is_show}}</el-form-item>
                <el-form-item class="mbstyle" label="答案:">{{DetailFormData.data.answer}}</el-form-item>
                <el-form-item class="mbstyle" label="分析:">{{DetailFormData.data.analysis}}</el-form-item>
                <el-form-item class="mbstyle" label="标签:">{{DetailFormData.data.tag}}</el-form-item>
                <el-form-item class="mbstyle" label="题型:">{{DetailFormData.data.ques_type}}</el-form-item>
                <el-form-item class="mbstyle" label="选项:">{{DetailFormData.data.content}}</el-form-item>
                <el-form-item class="mbstyle" label="图片地址:">{{DetailFormData.data.pic_urls}}</el-form-item>
                <el-form-item class="mbstyle" label="审核状态:">{{DetailFormData.data.check_state}}</el-form-item>
                <el-form-item class="mbstyle" label="添加时间:">{{DetailFormData.data.add_time}}</el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="detail_show = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.ShopQuesQuestionData) {
        Vue.set(store.state, 'ShopQuesQuestionData', {
            rows:[],
            total:0,
            loading:false,

            curr_row:null,

            // 搜索
            search_show:false,
            SearchFormData:{
                title:'',
                
                // is_pay:0,
                // is_show:0,
                // ques_type:0,
                page_num:1,
                page_len:10,
                // add_time:'2020-08-02',

                // 没有下面的字段
                // order_field:'add_time',
                // order_sort:'desc'
            },

            // 添加
            add_show:false,
            AddFormData:{
                login_token:'',
                title: '',
                is_pay:0,
                is_show:1,
                analysis: '',	
                // tag_uuids:[],	
                ques_type:2,
                // pic_urls:[],	
                answer:'',
                min_num:0,
            },

            // 标签列表
            tags_show:false,
            TagsFormData:{
                title:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc',

                tag_list:[],
                tag_uuids:[],	
            },

            // 编辑
            edit_show:false,
            EditFormData:{
                uuid:'',
                login_token:'',
                title: '',
                is_pay:0,
                is_show:1,
                analysis: '',	
                tag_uuids:[],	
                ques_type:2,
                // pic_urls:[],	
                answer:'',
                min_num:0,
            },

            // 详细
            detail_show:false,
            DetailFormData:{
                data:[]
            },

            // 添加选项
            addoption_show:false,
            AddOptionFormData:{
                question_uuid:'',
                login_token:'',
                content:'',
                is_answer:0,//1代表正确答案；0代表错误
            },
        });
    }

    export default {
        data() {
            return store.state.ShopQuesQuestionData;
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
        methods:{
            // 时间格式化
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            },

            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },

            // 数据初始化
            init() {
                this.loading = true;

                lime.req('ShopQuesQuestionList', {
                    login_token:lime.cookie_get('login_token'),

                    title:this.SearchFormData.title,
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len,
                    // order_field:this.SearchFormData.order_field,
                    // order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.SearchFormData.title='';
                    console.log('试题管理')
                    console.log(this.rows)
                    console.log('试题管理')
                });


                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },
            // 状态格式化
            stateFormat(state) {
                if (state == 0) {
                    return '待审';
                } else if (state == 1) {
                    return '已审';
                } else {
                    return '作废';
                }
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch() {
                this.search_show = true;
            },
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false;
                this.SearchFormData.page_num = 1;
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

            // 添加展示
            handleAdd() {
                this.add_show = true;
                
            },
            // 添加向后台提交
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token');
                lime.req('ShopQuesQuestionAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
                    this.init();
                    this.add_show = false;
                    this.login_token='';
                    this.title= '';
                    this.is_pay=0;
                    this.is_show=1;
                    this.analysis= '';	
                    // this.tag_uuids=[];	
                    this.ques_type=2;
                    // this.pic_urls=[];	
                    this.answer ='';
                    this.min_num =0;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

            // 搜索、添加标签展示
            handleTag() {
                this.tags_show = true;

                lime.req('ShopQuesTagList', {
                    login_token:lime.cookie_get('login_token'),
                    
                    title:this.TagsFormData.title,
                    page_num:this.TagsFormData.page_num,
                    page_len:this.TagsFormData.page_len,
                    order_field:this.TagsFormData.order_field,
                    order_sort:this.TagsFormData.order_sort
                }).then(res => {
                    this.TagsFormData.tag_list = res.data.rows;
                    this.TagsFormData.title='';
                    this.TagsFormData.tag_uuids=[];

                    console.log('标签')
                    console.log(this.TagsFormData.tag_list)
                    console.log('标签')
                });
                
            },
            // 添加标签 向 添加列表 提交
            onTagsSubmit() {
                this.AddFormData.tag_list = this.TagsFormData.tag_uuids;

                this.tags_show = false;
                console.log('标签提交')
                console.log(this.TagsFormData.tag_uuids)
                console.log(this.AddFormData.tag_list)
                console.log('标签提交') 
                // this.TagsFormData.tag_uuids=[]
            },


            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.EditFormData.uuid = this.curr_row.uuid;
                this.EditFormData.title = this.curr_row.title;
                this.EditFormData.is_pay = this.curr_row.is_pay;
                this.EditFormData.is_show = this.curr_row.is_show;
                this.EditFormData.analysis = this.curr_row.analysis;
                // this.EditFormData.tag_uuids = this.curr_row.tag_uuids;
                this.EditFormData.ques_type = this.curr_row.ques_type;
                // this.EditFormData.pic_urls = this.curr_row.pic_urls;
                this.EditFormData.answer = this.curr_row.answer.toString();
                this.EditFormData.min_num = this.curr_row.min_num;
                this.edit_show = true;
            },
            // 编辑后台提交
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');

                lime.req('ShopQuesQuestionEdit', this.EditFormData).then(res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

            // 删除确认提交
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.$confirm('确认删除?', '提示').then(() => {
                    lime.req('ShopQuesQuestionDel', {
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

            // 审核 
            handleCheck(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                this.$confirm('提交审核?', '提示').then(() => {
                    lime.req('ShopQuesQuestionUpCheck', {
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

            // 详细
            handleDetail(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }

                lime.req('ShopQuesQuestionDetail', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }).then(res => {
                    // console.log(res.data)
                    this.DetailFormData.data = res.data
                    this.detail_show = true;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },

             // 添加选项
            // onAddOption() {
            //     console.log(this.curr_row)
            //     if (util.empty(this.curr_row)) {
            //         this.$message.error('请选择一条数据');
            //         return;
            //     }
            // },
            // 添加选项
            // onAddOptionSubmit(){
            //     this.search_show = false;
            //     this.SearchFormData.page_num = 1;
            //     this.init();
            // },

        }
    }
</script>

<style scoped>
    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }

    .page {
        height: 40px; 
        line-height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 0;
        right:0;
        overflow: hidden;
    }

    .mbstyle{
        margin-bottom: 0px;
    }

    .tagsinput{
        width: 200px;
        margin-right: 20px;
    }
</style>
