<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px;border-bottom: 1px solid #F2F2F2;">
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
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->
                        <el-link 
                            class="menu" 
                            @click="onSubMenu(item)" 
                            v-for="(item,index) in $store.state.AdminData.right_menus"
                            :key="index">{{item.name}}</el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-date-picker 
                 size="small"
                        style="width: 240px;margin-right: 20px;height: 36px"
                        :clearable="true"
                        unlink-panels
                        align="center"
                        v-model="SearchFormData.start_end" 
                        :picker-options="pickerOptions"
                        type="daterange" 
                        value-format="yyyy-MM-dd" 
                        range-separator="至" start-placeholder="开始日期" 
                        end-placeholder="结束日期"></el-date-picker>
                <el-button type="primary"  size="small" @click="onSearchSubmit">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
            <!-- style="border-top: solid 1px #f2f1f4;" -->
             <!-- element-loading-spinner="el-icon-loading"  fontFamily: 'FZCYJ',:stripe="true"-->
            <el-table 
                :data="rows" 
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
                :height="height - 195 - 68" 
                v-loading="loading" 
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)" 
                @sort-change="onSortChange"
                :highlight-current-row="true" 
                @current-change="onSelectRow" 
                style="width: 100%;margin-top: 5px" 
                size="mini">
                 <el-table-column prop="content" label="工作内容" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="work_staff_name" label="员工姓名" align="left"></el-table-column>
                <el-table-column prop="add_time" label="添加日期" align="left" :sortable="true"></el-table-column>
                <el-table-column prop="enable_check" align="left" label="是否可审核">
                    <template slot-scope="scope">
                        {{scope.row.enable_check == 0 ? '不可' : '可'}}
                    </template>
                </el-table-column>
                 <el-table-column prop="check_staff_name" align="left" label="审核人"></el-table-column>
                <!-- <el-table-column prop="imgs" align="center" label="参考图片">
                    <template slot-scope="scope">
                        {{scope.row.imgs.length > 0 ? '有' : '无'}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="check_time" label="审核时间" align="left" :sortable="true"></el-table-column>
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
                    background
                    :current-page.sync="SearchFormData.page_num" 
                    @current-change="onPageChange" 
                    layout="prev, pager, next"
                    :total="total"></el-pagination> -->
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
             title="添加"
            :visible.sync="add_show"
            direction="rtl" size="50%" >
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form ref="addform" :rules="rules" :model="AddFormData" label-width="100px" label-position="right" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="24">
                                <el-form-item prop="content" label="工作内容:">
                                    <el-input 
                                        :rows="8" 
                                        type="textarea" 
                                        placeholder="请输入工作内容" 
                                        v-model="AddFormData.content" />
                                </el-form-item>
                            </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                             <el-form-item label="图片上传:">
                                <file ref="upload"/>
                                <!-- <el-upload
                                :action="upload_url"
                                list-type="picture-card"
                                :on-success="handleAddUploadSuccess"
                                :on-remove="handleAddRemove">
                                <i class="el-icon-plus"></i>
                                </el-upload> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                             <el-col :span="12">
                                 <el-form-item label="是否允许审核:">
                                    <el-select v-model="enable_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in enable_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                 </el-form-item> 
                                <!-- AddFormData.enable_check -->
                                <!-- <el-form-item label="是否允许审核:">
                                    <el-radio v-model="AddFormData.enable_check" :label="1">可审核</el-radio>
                                    <el-radio v-model="AddFormData.enable_check" :label="0">不可审</el-radio>
                                </el-form-item> -->
                            </el-col>
                    </el-row>
                </el-form>
            </div>

            <div class="drawer-footer">
                <el-button @click="add_show = false">取 消</el-button>
                <el-button type="primary" @click="onAddSubmit">确 定</el-button>
            </div>
        </el-drawer>

        <!-- 编辑模板 -->
        <el-drawer
            :visible.sync="edit_show"
            title="编辑"
             direction="rtl" 
             size="50%" >
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                    <el-form :rules="rules" ref="editform" :model="EditFormData" label-width="100px" label-position="right" style="margin-top: 10px">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item prop="content" label="工作内容:">
                                    <el-input 
                                        :rows="8" 
                                        type="textarea" 
                                        placeholder="请输入工作内容" 
                                        v-model="EditFormData.content" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="图片上传:">
                                    <!-- <img v-if="EditFormData.imgs[0]" :src="EditFormData.imgs[0]" style="width: 50px;height: 50px" alt=""> -->
                                    <file ref="uploads" :fileListss="EditFormData.imgs"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                  <el-form-item label="是否允许审核:">
                                      <el-select v-model="enables_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in enable_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                        <!-- <el-radio v-model="EditFormData.enable_check" :label="1">可审核</el-radio>
                                        <el-radio v-model="EditFormData.enable_check" :label="0">不可审</el-radio>                            -->
                                    </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                 <div class="drawer-footer">
                        <el-button @click="edit_show = false">取 消</el-button>
                        <el-button type="primary" @click="onEditSubmit">确 定</el-button>
                    </div>
        </el-drawer>

        <!-- 审核模板 -->
        <el-drawer
            :visible.sync="check_show"
            :modle="CheckFormData"
            title="工作审核"
           direction="rtl" 
             size="50%" >
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="CheckFormData" label-width="120px" label-position="right">
                     <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">工作内容</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="添加时间:">{{CheckFormData.add_time}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="添加人:">{{CheckFormData.work_staff_name}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="日清内容:">{{CheckFormData.content}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="可否审核:">{{CheckFormData.enable_check == 0 ? '不可' : '可'}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="图片:">
                                <div v-if="CheckFormData.imgs[0]" class="demo-image__preview">
                                    <el-image 
                                        style="width: 30px; height: 30px"
                                        :src="CheckFormData.imgs[0]" 
                                        :preview-src-list="CheckFormData.imgs">
                                    </el-image>
                                </div>
                                <div v-else>未上传图片</div>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">审核内容</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="24">
                            <el-form-item label="审核评价:">
                                <el-input 
                                    :rows="5" 
                                    type="textarea" 
                                    placeholder="请输入工作内容" 
                                    v-model="CheckFormData.check_content" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="评分:">
                                <el-input-number controls-position="right" v-model="CheckFormData.check_grade" :precision="1" :step="0.1" :min="0" :max="100"></el-input-number>
                                <!-- <el-input v-model="CheckFormData.check_grade" /> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="check_show = false">取 消</el-button>
                    <el-button type="primary" @click="onCheckSubmit">确 定</el-button>
                </div>
                <el-card class="box-card1" style="width: 100%">
                    <!-- <div slot="header" class="clearfix">
                        <span>工作内容</span>
                    </div> -->
                    <div>
                        <!-- <span>添加时间：  {{CheckFormData.add_time}}</span>


                        <el-divider></el-divider>
                        <span>添加人：  {{CheckFormData.work_staff_name}}</span> -->
                        <!-- <el-divider></el-divider>
                        <span>日清内容：  {{CheckFormData.content}}</span>
                        <el-divider></el-divider> -->
                        <!-- <span>可否审核：  {{CheckFormData.enable_check == 0 ? '不可' : '可'}}</span> -->
                        <!-- <el-divider></el-divider>
                        <div v-if="CheckFormData.imgs[0]">
                            <span >点击图片查看大图 :</span>
                            <div class="demo-image__preview">
                                <el-image 
                                    style="width: 30px; height: 30px"
                                    :src="CheckFormData.imgs[0]" 
                                    :preview-src-list="CheckFormData.imgs">
                                </el-image>
                            </div>
                        </div>
                        <div v-else>图片：未上传图片</div>-->
                    </div> 
                </el-card>
                <el-card class="box-card1">
                    <!-- <div slot="header" class="clearfix">
                        <span>审核内容</span>
                    </div> -->
                    <el-form :model="CheckFormData" label-width="120px">
                        <el-form-item label="评分:">
                            <el-input-number v-model="CheckFormData.check_grade" :precision="1" :step="0.1" :min="0" :max="100"></el-input-number>
                            <!-- <el-input v-model="CheckFormData.check_grade" /> -->
                        </el-form-item>
                    </el-form>
                    
                <!-- <div style="text-align:right;">
                    <el-button @click="check_show = false">取 消</el-button>
                    <el-button type="primary" @click="onCheckSubmit">确 定</el-button>
                </div> -->
                </el-card>
                <!-- <div class="drawer-footer">
                    <el-button @click="check_show = false">取 消</el-button>
                    <el-button type="primary" @click="onCheckSubmit">确 定</el-button>
                </div> -->
            <!-- </div> -->
        </el-drawer>

        <!-- 评论 -->
        <el-dialog title="商户评论工作日清" :visible.sync="comment_show" width="30%">
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
            title="详细"
           direction="rtl" >
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="CheckFormData" label-width="120px" label-position="right">
                     <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">工作内容</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="添加时间:">{{DetailFormData.add_time}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="添加人:">{{DetailFormData.work_staff_name}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="日清内容:">{{DetailFormData.content}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="可否审核:">{{DetailFormData.enable_check == 0 ? '不可' : '可'}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="图片:">
                                <div v-if="DetailFormData.imgs[1]" class="demo-image__preview">
                                    <el-image 
                                        style="width: 30px; height: 30px"
                                        :src="DetailFormData.imgs[1]" 
                                        :preview-src-list="DetailFormData.imgs">
                                    </el-image>
                                </div>
                                <div v-else>未上传图片</div>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <div class="line">
                        <div class="linelf"><div class="line-line"></div></div>
                        <div class="linerg">审核结果</div>
                    </div>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="审核时间:">
                               {{DetailFormData.check_time}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="审核人:">
                               {{DetailFormData.check_staff_name}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="12">
                            <el-form-item label="审核评价:">
                               {{DetailFormData.check_content}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="审核分数:">
                               {{DetailFormData.check_grade}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button type="primary" @click="detail_show = false">关闭</el-button>
                </div>
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
                    <div v-if="DetailFormData.imgs[0]">
                            <span >点击图片查看大图 :</span>
                            <div class="demo-image__preview">
                                <el-image 
                                    style="width: 30px; height: 30px"
                                    :src="DetailFormData.imgs[0]" 
                                    :preview-src-list="DetailFormData.imgs">
                                </el-image>
                            </div>
                        </div>
                    <div v-else>图片：未上传图片</div>
                    <!-- <span>点击图片查看大图 :</span>
                        <div class="demo-image__preview">
                            <el-image 
                            style="width: 30px; height: 30px"
                            :src="DetailFormData.imgs[0]" 
                            :preview-src-list="DetailFormData.imgs">
                            </el-image>
                        </div> -->
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
    // import file from "@/components/imgUpload/upload.vue"
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
            },
            pickerOptions:{ 
                disabledDate:(time) => { 
                    return this.dealDisabledDate(time) 
                } 
            } 

        });
    }

    export default {
        components: {
            file
        },
        data() {
            // return store.state.WorkData;
            return {
                rules: {
                      content: [
                        { required: true, message: '内容必填', trigger: 'blur' },
                        ]
                },
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
             enable_value: 0,
              enables_value: 0,
            enable_options: [
                {value: 0, label: '可审核'},
                {value: 1, label: '不可审核'}
            ],
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
            },
            pickerOptions:{ 
                disabledDate:(time) => { 
                    return this.dealDisabledDate(time) 
                } 
            } 
            }
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
            dealDisabledDate (time) {
            // 一天的毫秒数 = 8.64e7  判断时在return处可进行加减
            let curDate = (new Date()).getTime();
            let day = 30 * 24 * 3600 * 1000;
            let dateRegion = curDate - day;
            return time.getTime() > Date.now() || time.getTime() < dateRegion;
          },

            handleSizeChange(val) {console.log(`每页 ${val} 条`);},
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu, this, lime.cookie_get("login_token"), local);
            },

            
            // 数据初始化
            init() {
                // this.loading = true;
                 NProgress.start();
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
                    // this.loading = false;
                     NProgress.done()
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.curr_row = null;
                }).catch(err => {
                    this.$message.error(err)
                    // this.$router.push('/login');
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                      NProgress.done()
                    //   this.$router.push('/login');
                    // this.loading = false;
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
                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                         NProgress.start();
                        lime.req("ShopWorkDayAdd", {
                            login_token: lime.cookie_get("login_token"),
                            content: this.AddFormData.content,
                            imgs: this.$refs.upload.fileListss,
                            // imgs:[this.$refs.upload.img_url],
                            // enable_check: this.AddFormData.enable_check
                            enable_check: this.enable_value
                        }).then(res => {
                            this.init();
                            this.add_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        });
                        NProgress.done()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(this.$refs.upload.fileListss)
            },


            // 编辑
            handleEdit() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.enables_value = this.curr_row.enable_check

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
                this.$refs['editform'].validate((valid) => {
                     NProgress.start();
                    if (valid) {
                        lime.req("ShopWorkDayEdit", {
                            login_token: lime.cookie_get("login_token"),
                            uuid: this.EditFormData.uuid,
                            content: this.EditFormData.content,
                            imgs: [this.$refs.uploads.img_url,...this.EditFormData.imgs],
                            enable_check: this.EditFormData.enable_check
                        }).then(res => {
                            this.init();
                            this.edit_show = false;
                        }).catch(err => {
                            this.$message.error(err.msg);
                        });
                         NProgress.done()
                    }else {
                        NProgress.done()
                        console.log(999)
                    }
                })
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
<style>
    .el-image-viewer__mask {
        opacity: 1!important;
    }
</style>
<style scoped>
 @import '../../assets/font/font.css';
    .menu {
        display: inline-block;
        padding: 0 16px;
        text-align: center;
    }

    .page {
         height: 40px; 
        text-align: right;
        position: fixed;
        bottom: 20px;
        right:40px;
        overflow: hidden;
        z-index: 999;
        padding-top:  10px;
    }

     .footer {
        position: absolute;
        bottom: 10px;
        width: 100%;
        padding-right: 10px!important;
        box-sizing: border-box;
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
