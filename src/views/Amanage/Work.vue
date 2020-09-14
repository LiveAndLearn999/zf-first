<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
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
                        <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link>
                        <el-link 
                            class="menu" 
                            @click="onSubMenu(item)" 
                            v-for="(item,index) in $store.state.AdminData.right_menus"
                            :key="index">{{item.name}}</el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 数据表格 -->
        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :stripe="true"
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
                <el-table-column prop="work_staff_name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="add_time" label="添加日期" align="center" :sortable="true"></el-table-column>
                <el-table-column prop="content" label="工作内容" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="imgs" align="center" label="参考图片">
                    <template slot-scope="scope">
                        {{scope.row.imgs.length > 0 ? '有' : '无'}}
                    </template>
                </el-table-column>
                <el-table-column prop="enable_check" align="center" label="是否可审核">
                    <template slot-scope="scope">
                        {{scope.row.enable_check == 0 ? '不可' : '可'}}
                    </template>
                </el-table-column>
                <el-table-column prop="check_staff_name" align="center" label="审核人"></el-table-column>
                <el-table-column prop="check_time" label="审核时间" align="center" :sortable="true"></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination 
                    :current-page.sync="SearchFormData.page_num" 
                    @current-change="onPageChange" 
                    layout="prev, pager, next"
                    :total="total"></el-pagination>
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog title="搜索页面" :visible.sync="search_show" width="450px">
            <el-form :model="SearchFormData" label-width="120px">
                <div class="block" style="text-align:center;">
                    <span class="demonstration"></span>
                    <el-date-picker 
                        :clearable="true"
                        align="center"
                        v-model="SearchFormData.start_end" 
                        type="daterange" 
                        value-format="yyyy-MM-dd" 
                        range-separator="至" start-placeholder="开始日期" 
                        end-placeholder="结束日期"></el-date-picker>
                </div>
            </el-form>
            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加模板 -->
        <el-drawer
            :visible.sync="add_show"
            size="40%"
            title="添加">

            <el-form :model="AddFormData" label-width="80px" style="padding:20px;">
                <el-form-item label="工作内容:" style="text-align:center;">
                    <el-input 
                        :rows="8" 
                        type="textarea" 
                        placeholder="请输入工作内容" 
                        v-model="AddFormData.content" />
                </el-form-item>

                <el-form-item label="图片上传:">
                    <el-upload
                      :action="upload_url"
                      list-type="picture-card"
                      :on-success="handleAddUploadSuccess"
                      :on-remove="handleAddRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="允许审核:">
                    <el-radio v-model="AddFormData.enable_check" :label="1">可审核</el-radio>
                    <el-radio v-model="AddFormData.enable_check" :label="0">不可审</el-radio>
                </el-form-item>
            </el-form>

            <el-divider></el-divider>
            <el-footer>
                <div style="text-align:center;">
                    <el-button @click="add_show = false">取 消</el-button>
                    <el-button type="primary" @click="onAddSubmit">确 定</el-button>
                </div>
            </el-footer>
        </el-drawer>

        <!-- 编辑模板 -->
        <el-drawer
            :visible.sync="edit_show"
            
            size="40%"
            :with-header="false">
            <el-container>
                <el-divider></el-divider>
                <el-header style="text-align:center;">编辑窗口</el-header>
                <el-divider></el-divider>
                <el-main>
                    <el-form  :model="EditFormData" label-width="80px">
                        <el-form-item label="工作内容:" style="text-align:center;">
                            <el-input 
                                :rows="8" 
                                type="textarea" 
                                placeholder="请输入工作内容" 
                                v-model="EditFormData.content" />
                        </el-form-item>
                        
                        <el-form-item label="图片上传:">
                            <el-upload
                              :action="upload_url"
                              list-type="picture-card"
                              :file-list="EditFormData.file_imgs"
                              :on-success="handleEditUploadSuccess"
                              :on-remove="handleEditRemove">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        
                        <el-form-item>

                            <el-radio v-model="EditFormData.enable_check" :label="1">可审核</el-radio>
                            <el-radio v-model="EditFormData.enable_check" :label="0">不可审</el-radio>
                            
                        </el-form-item>
                    </el-form>
                </el-main>
                <el-divider></el-divider>
                <el-footer>
                    <el-divider></el-divider>
                    <div style="text-align:center;">
                        <el-button @click="edit_show = false">取 消</el-button>
                        <el-button type="primary" @click="onEditSubmit">确 定</el-button>
                    </div>
                </el-footer>
            </el-container>
        </el-drawer>

        <!-- 审核模板 -->
        <el-drawer
            :visible.sync="check_show"
            :modle="CheckFormData"
            size="50%"
            :with-header="false">
            <el-card class="box-card1">
                <div slot="header" class="clearfix">
                    <span>工作内容</span>
                </div>
                <div>
                    <span>添加时间：  {{CheckFormData.add_time}}</span>
                    <el-divider></el-divider>
                    <span>添加人：  {{CheckFormData.work_staff_name}}</span>
                    <el-divider></el-divider>
                    <span>日清内容：  {{CheckFormData.content}}</span>
                    <el-divider></el-divider>
                    <span>可否审核：  {{CheckFormData.enable_check == 0 ? '不可' : '可'}}</span>
                    <el-divider></el-divider>
                    <span>点击图片查看大图 :</span>
                        <div class="demo-image__preview">
                            <el-image 
                                style="width: 30px; height: 30px"
                                :src="CheckFormData.imgs[0]" 
                                :preview-src-list="CheckFormData.imgs">
                            </el-image>
                        </div>
                </div>
            </el-card>
            <el-card class="box-card1">
                <div slot="header" class="clearfix">
                    <span>审核内容</span>
                </div>
                <el-form :model="CheckFormData" label-width="120px">
                <el-form-item label="审核评价:">
                    <el-input 
                        :rows="5" 
                        type="textarea" 
                        placeholder="请输入工作内容" 
                        v-model="CheckFormData.check_content" />
                </el-form-item>
                <el-form-item label="评分:">
                    <el-input v-model="CheckFormData.check_grade" />
                </el-form-item>
            </el-form>

            <div style="text-align:center;">
                <el-button @click="check_show = false">取 消</el-button>
                <el-button type="primary" @click="onCheckSubmit">确 定</el-button>
            </div>
            </el-card>
        </el-drawer>

        <!-- 评论 -->
        <el-dialog title="运营员工评论工作日清" :visible.sync="comment_show" width="30%">
            <el-form :model="CommentFormData" label-width="120px">
                <el-form-item label="评论内容:">
                    <el-input 
                        :rows="2"
                        type="textarea"
                        placeholder="请输入评论内容"
                        v-model="CommentFormData.content" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="comment_show = false">取 消</el-button>
                <el-button type="primary" @click="onCommentSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 日清详细 -->
        
        <el-drawer
            :visible.sync="detail_show"
            :modle="DetailFormData"
            size="50%"
            :with-header="false">
            <el-card class="box-card1">
                <div slot="header" class="clearfix">
                    <span>工作内容</span>
                </div>
                <div>
                    <span>添加时间：  {{DetailFormData.add_time}}</span>
                    <el-divider></el-divider>
                    <span>添加人：  {{DetailFormData.work_staff_name}}</span>
                    <el-divider></el-divider>
                    <span>日清内容：  {{DetailFormData.content}}</span>
                    <el-divider></el-divider>
                    <span>可否审核：  {{DetailFormData.enable_check == 0 ? '不可' : '可'}}</span>
                    <el-divider></el-divider>
                    <span>点击图片查看大图 :</span>
                        <div class="demo-image__preview">
                            <el-image 
                            style="width: 30px; height: 30px"
                            :src="DetailFormData.imgs[0]" 
                            :preview-src-list="DetailFormData.imgs">
                            </el-image>
                        </div>
                </div>
            </el-card>
            <el-card class="box-card2">
                <div slot="header" class="clearfix">
                    <span>审核结果</span>
                </div>
                <span>审核时间：  {{DetailFormData.check_time}}</span>
                    <el-divider></el-divider>
                <span>审核人：  {{DetailFormData.check_staff_name}}</span>
                    <el-divider></el-divider>
                <span>审核评价：  {{DetailFormData.check_content}}</span>
                    <el-divider></el-divider>
                <span>审核分数：  {{DetailFormData.check_grade}}</span>
            </el-card>
        </el-drawer>
    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";

    if (!store.state.WorkData) {
        Vue.set(store.state, "WorkData", {
            rows: [],
            total: 0,
            loading: false,

            curr_row: null,

            //搜索
            search_show: false,
            SearchFormData: {
                start_end: ['', ''], 
                order_field: "add_time",
                order_sort: "asc",
                page_num: 1,
                page_len: 10
            },
            
            //添加
            add_show: false,
            AddFormData: {
                content: "",
                imgs: [],
                enable_check: 1
            },
            
            // 编辑
            edit_show: false,
            EditFormData: {
                content: "",
                imgs:[],
                enable_check: ""
            },
            

            //审核
            check_show: false,
            CheckFormData: {
                uuid: "",
                imgs:[],
                check_content: "",
                check_grade: ""
            },
            

            // 评论
            comment_show: false,
            CommentFormData: {
                uuid: "",
                content: ""
            },

            // 日清详细
            detail_show: false,
            DetailFormData:{
                uuid:"",
                imgs:[]
            }
            

        });
    }

    export default {
        data() {
            return store.state.WorkData;
        },
        computed: {
            img_host: () => {
                return store.state.AppData.img_host;
            },
            width: () => {
                return store.state.AppData.width;
            },
            height: () => {
                return store.state.AppData.height;
            },
            upload_url: () => {
                return store.state.AppData.upload_url;
            },
        },
        created() {
            this.init();
        },
        methods: {
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu, this, lime.cookie_get("login_token"), local);
            },

            
            // 数据初始化
            init() {
                this.loading = true;

                let start_date = '';
                if (this.SearchFormData.start_end[0] != '') {
                    start_date = util.dateString(this.SearchFormData.start_end[0]);
                }
                let end_date = '';
                if (this.SearchFormData.start_end[1] != '') {
                    end_date = util.dateString(this.SearchFormData.start_end[1]);
                }

                lime.req("ShopWorkDayList", {
                    login_token: lime.cookie_get("login_token"),

                    start_date: start_date,
                    end_date: end_date,

                    order_field: this.SearchFormData.order_field,
                    order_sort: this.SearchFormData.order_sort,
                    page_num: this.SearchFormData.page_num,
                    page_len: this.SearchFormData.page_len
                }).then(res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.curr_row = null;
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },

            // 排序处理
            onSortChange(sort) {
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == "ascending") {
                    this.SearchFormData.order_sort = "asc";
                } else {
                    this.SearchFormData.order_sort = "desc";
                }

                this.init();
            },
            // 选择单行
            onSelectRow(row) {
                this.curr_row = row;
            },
            //分页处理
            onPageChange(page) {
                this.SearchFormData.page_num = page;
                this.init();
            },

            // 刷新
            onRefresh() {
                this.init();
            },

            // 查询
            onSearch() {
                this.search_show = true;
            },
            onSearchSubmit() {
                this.init();
                this.search_show = false;
            },

            // 添加
            handleAdd() {
                this.add_show = true;
            },

                // 添加上传成功处理
            handleAddUploadSuccess(res, file, fileList) {
                if (res.code == 0) {
                    file.url = store.state.AppData.img_host + res.data.url;
                    
                    this.AddFormData.imgs = [];
                    fileList.forEach(item => {
                        this.AddFormData.imgs.push(item.url)
                    })
                } else {
                    this.$message.error(res.msg);
                }
            },

                // 添加删除处理
            handleAddRemove(file, fileList) {
                this.AddFormData.imgs = [];
                fileList.forEach(item => {
                    this.AddFormData.imgs.push(item.url)
                })
                console.log(this.AddFormData.imgs)
            },

            onAddSubmit() {
                
                lime.req("ShopWorkDayAdd", {
                    login_token: lime.cookie_get("login_token"),
                    content: this.AddFormData.content,
                    imgs: this.AddFormData.imgs,
                    enable_check: this.AddFormData.enable_check
                }).then(res => {
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },


            // 编辑
            handleEdit() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }

                let file_imgs = [];
                if (this.curr_row.imgs.length > 0) {
                    this.curr_row.imgs.forEach(item => {
                        file_imgs.push({
                            name:item,
                            url:item
                        })
                    })
                }

                this.EditFormData = {
                    uuid:this.curr_row.uuid,
                    content:this.curr_row.content,
                    imgs:this.curr_row.imgs,
                    file_imgs:file_imgs,
                    enable_check:this.curr_row.enable_check
                }
                this.edit_show = true;
            },

            onEditSubmit(){
                lime.req("ShopWorkDayEdit", {
                    login_token: lime.cookie_get("login_token"),
                    uuid: this.EditFormData.uuid,
                    content: this.EditFormData.content,
                    imgs: this.EditFormData.imgs,
                    enable_check: this.EditFormData.enable_check
                }).then(res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

                // 编辑上传成功处理
            handleEditUploadSuccess(res, file, fileList) {
                if (res.code == 0) {
                    file.url = store.state.AppData.img_host + res.data.url;
                    
                    this.EditFormData.imgs = [];
                    fileList.forEach(item => {
                        this.EditFormData.imgs.push(item.url)
                    })
                } else {
                    this.$message.error(res.msg);
                }
            },

                // 编辑删除处理
            handleEditRemove(file, fileList) {
                this.EditFormData.imgs = [];
                fileList.forEach(item => {
                    this.EditFormData.imgs.push(item.url)
                })
            },

            //审核
            handleCheck() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.CheckFormData = this.curr_row;
                this.check_show = true;
            },
            onCheckSubmit() {
                lime.req("ShopWorkDayCheck", {
                    login_token: lime.cookie_get("login_token"),
                    check_content: this.CheckFormData.check_content,
                    uuid: this.curr_row.uuid,
                    check_grade: this.CheckFormData.check_grade
                }).then(res => {
                    this.init();
                    this.check_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

            // 评论
            handleComment() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.comment_show = true;
            },
            onCommentSubmit() {
                lime.req("ShopWorkDayComment", {
                    login_token: lime.cookie_get("login_token"),
                    content: this.CommentFormData.content,
                    shop_work_day_uuid: this.curr_row.uuid
                }).then(res => {
                    this.comment_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

            // 删除
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.$confirm("确认删除?", "提示").then(() => {
                    lime.req("ShopWorkDayDel", {
                        login_token: lime.cookie_get("login_token"),
                        uuid: this.curr_row.uuid,
                    }).then(res => {
                        this.init();
                        this.$message.success("操作成功");
                    }).catch(err => {
                        this.$message.error(err.msg);
                    });
                });
            },

            //详细

            handleDetail() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.detail_show = true;
                this.DetailFormData = this.curr_row
                this.onDetailSubmit()
            },
            onDetailSubmit() {
                lime.req("ShopWorkDayDetail", {
                    login_token: lime.cookie_get("login_token"),
                    uuid: this.curr_row.uuid
                }).then(res => {
                    this.comment_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },
        }
    };
</script>

<style scoped>
    .menu {
        display: inline-block;
        padding: 0 16px;
        text-align: center;
    }

    .page {
        height: 46px;
        line-height: 46px;
        text-align: right;
        position: fixed;
        bottom: 0;
        border-top: solid 1px red;
        right: 0;
    }
</style>
