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
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
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
                    <div style="text-align: right;font-size: 16px ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

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

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-select v-model="search_value" placeholder="请选择" style="width: 100px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                <el-input v-if="search_value == 0" v-model="SearchFormData.title" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
            <el-table 
                
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :data="rows"
                :height="height - 195 - 68"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%；margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="title" show-overflow-tooltip label="题目" align="left"></el-table-column>
                <!-- <el-table-column prop="content" label="选项" align="center">
                    <template slot-scope="scope">
                       <p v-for="(item,index) in scope.row.content" :key="index">{{item.opt}}:{{item.content}}</p>
                    </template>
                </el-table-column> -->
                <el-table-column prop="is_pay" label="是否付费" align="center">
                    <template slot-scope="scope">
                        {{scope.row.is_pay == 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="is_show" label="是否展示" align="center">
                    <template slot-scope="scope">
                        {{formatDate(scope.row.is_show * 1000)}}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="tag" label="题目" align="center"></el-table-column> -->
                <el-table-column prop="ques_type" label="题型" align="center">
                    <template slot-scope="scope">
                       {{scope.row.ques_type == 1 ? '单选' : scope.row.ques_type == 2 ? '多选' : '判断'}}
                    </template>
                </el-table-column>
                <el-table-column prop="answer" label="答案" align="center"></el-table-column>
                <!-- <el-table-column prop="optionArr" label="选项" align="center">
                    <template slot-scope="scope">
                        <el-button>{{scope.row.check_state}}</el-button>
                       {{scope.row.check_state == 1 ? '通过' : '未通过'}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="check_state" label="审核状态" align="center">
                    <template slot-scope="scope">
                       {{scope.row.check_state == 1 ? '通过' : '未通过'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="add_time" label="添加时间" align="center"></el-table-column>
                <el-table-column prop="last_time" label="最后修改时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.last_time == '' ? '还未登陆' : scope.row.last_time}}
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
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="30%">
            <el-form :model="SearchFormData" label-width="120px" label-position="left">
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
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            direction="rtl" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :model="AddFormData" label-width="120px" label-position="right">
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="题型:" :required='true'>
                            <!-- AddFormData.ques_type -->
                            <el-select v-model="add_ques" placeholder="请选择">
                                <el-option
                                    v-for="item in ques_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                            <!-- <el-input v-model="AddFormData.ques_type" /> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否需支付:"  :required='true'>
                            <!-- AddFormData.is_pay -->
                            <el-select v-model="add_pay" placeholder="请选择">
                                <el-option
                                    v-for="item in pay_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                            <!-- <el-input v-model="AddFormData.is_pay" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="最小金额:" v-if="add_pay == 1">
                            <el-input-number controls-position="right" v-model="AddFormData.min_num" @change="handleChange" :min="1" :max="10000" label="描述文字"></el-input-number>
                            <!-- <el-input type="number" maxLength="4" v-model="AddFormData.min_num" /> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否展示:" :required='true'>
                            <el-select v-model="add_show_value" placeholder="请选择">
                                <el-option
                                    v-for="item in show_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select> 
                            <!-- ddFormData.is_show -->
                            <!-- el-switch
                            v-model="AddFormData.is_show">
                            </el-switch> -->
                        </el-form-item>
                        </el-col>
                </el-row>
                <el-row v-if="add_show_value">
                    <el-col :span="12">
                        <el-form-item label="展示时间:" :required='true'>
                            <el-date-picker
                                    style="margin-left: 10px"
                                    v-if="AddFormData.is_show == 1"
                                    v-model="show_date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                         <el-form-item label="题目内容:" :required='true'>
                            <el-input :rows="8" type="textarea" v-model="AddFormData.title" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <!-- answer -->
                        <el-form-item label="答案:">
                            <el-input v-if="add_ques == 3" :rows="8" type="textarea"></el-input>
                            <div class="ques-box" v-if="add_ques == 2">
                                <div class="ques-flex">
                                    <div class="ques-flexlf">A</div>
                                    <div class="ques-flexmd">111</div>
                                    <div class="ques-flexrg">
                                         <el-checkbox></el-checkbox>
                                    </div>
                                </div>
                            </div>
                            <div class="ques-box" v-if="add_ques == 1">
                                <div class="ques-flex">
                                    <div class="ques-flexlf">A</div>
                                    <div class="ques-flexmd">111</div>
                                    <div class="ques-flexrg">
                                        <el-radio  label=""></el-radio>
                                    </div>
                                </div>
                            </div>
                            <div class="ques-box" v-if="add_ques == 0">
                                <div class="ques-flex">
                                    <div class="ques-flexlf">A</div>
                                    <div class="ques-flexmd">111</div>
                                    <div class="ques-flexrg">
                                        <el-radio  label="正确"></el-radio>
                                    </div>
                                </div>
                                <div class="ques-flex">
                                    <div class="ques-flexlf">A</div>
                                    <div class="ques-flexmd">111</div>
                                    <div class="ques-flexrg">
                                        <el-radio  label="正确"></el-radio>
                                    </div>
                                </div>
                            </div>
                            <div v-if="add_ques !== 3" class="ques-add">添加</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标签:">
                            <tags />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图片:">
                            <file ref="pciurls" />
                            <!-- <el-input v-model="AddFormData.pic_urls" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>

               <!--  <el-form-item label="分析:" v-if="AddFormData.ques_type == 4">
                    <el-input type="textarea" v-model="AddFormData.analysis" />
                </el-form-item>
                <el-form-item label="答案:" :required='true'>
                    <el-input v-model="AddFormData.answer" />
                </el-form-item> -->
            </el-form>
            </div>

            <div class="drawer-footer">
               <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </div>
            <!-- <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                 <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </div> -->
            <!-- <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span> -->
        <!-- </el-dialog> -->
        </el-drawer>

        <el-dialog
            title="标签列表"
            :visible.sync="tags_show"
            width="30%">
            <el-form :model="TagsFormData" label-width="60px">
                <!-- <el-form-item label="标签:">
                    <el-input v-model="TagsFormData.title" class="tagsinput"/>
                    <el-button type="primary" @click="handleTag">搜索</el-button>
                </el-form-item> -->
                <el-checkbox-group v-model="TagsFormData.tag_uuids">
                    <span style="width: 30%;display: inline-block" v-for="(item,index) in TagsFormData.tag_list" :key="index">
                         <el-checkbox :label="item">{{item.title}}</el-checkbox>
                    </span>
                    <!-- <el-checkbox v-for="(item,index) in TagsFormData.tag_list" :key="index" :label="item">{{item.title}}</el-checkbox> -->
                </el-checkbox-group>
            </el-form>

            <span slot="footer">
                <el-button @click="tags_show = false">取 消</el-button>
                <el-button type="primary" @click="onTagsSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑模板 -->
       <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            direction="rtl" size="500px">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
            <el-form :model="EditFormData" label-width="80px" label-position="left">
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
            </div>
            <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>
            <!-- <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span> -->
       </el-drawer>
        <!-- </el-dialog> -->

        <!-- 详细 -->
        <!-- <el-dialog title="详细" :visible.sync="detail_show" width="40%"> -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            direction="rtl" size="500px">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
            <el-form :model="DetailFormData" label-width="80px" label-position="left">
                <el-form-item class="mbstyle" label="题目:">{{DetailFormData.data.title}}</el-form-item>
                <el-form-item class="mbstyle" label="是否需支付:" label-width="90px">{{DetailFormData.data.is_pay ? '是' : '否'}}</el-form-item>
                <el-form-item class="mbstyle" label="是否展示:">{{DetailFormData.data.is_show}}</el-form-item>
                <el-form-item class="mbstyle" label="答案:">{{DetailFormData.data.answer}}</el-form-item>
                <el-form-item class="mbstyle" label="分析:">{{DetailFormData.data.analysis}}</el-form-item>
                <el-form-item class="mbstyle" label="标签:">{{DetailFormData.data.tag}}</el-form-item>
                <el-form-item class="mbstyle" label="题型:">{{DetailFormData.data.ques_type == 1 ? '判断题' : DetailFormData.data.ques_type == 2 ? '单选题' : DetailFormData.data.ques_type == 3 ? '多选题' : '简答' }}</el-form-item>
                <el-form-item class="mbstyle" label="选项:">
                    <el-form-item style="margin-top: 8px" v-for="value in DetailFormData.data.content" :key="value.uuid">
                        <p>选项：{{value.opt}}   题目内容: {{value.content}}</p>
                    </el-form-item>
                    <div></div>
                    <!-- {{DetailFormData.data.content}} -->
                </el-form-item>
                <el-form-item class="mbstyle" label="图片地址:">
                    <img v-if="DetailFormData.data.pic_urls" :src="DetailFormData.data.pic_urls" alt="" style="width:50px;height: 50px">
                    <span v-else>未上传</span>
                    <!-- {{DetailFormData.data.pic_urls || '未上传'}} -->
                </el-form-item>
                <el-form-item class="mbstyle" label="审核状态:">{{stateFormat(DetailFormData.data.check_state)}}</el-form-item>
                <el-form-item class="mbstyle" label="添加时间:">{{DetailFormData.data.add_time}}</el-form-item>
            </el-form>
            </div>
            <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                     <el-button type="primary" @click="detail_show = false">确 定</el-button>
                </div>
            <span slot="footer">
                <el-button type="primary" @click="detail_show = false">确 定</el-button>
            </span>
        </el-drawer>
        <!-- </el-dialog> -->
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import file from "@/components/imgUpload/upload.vue"
    import tags from "@/components/tags/index.vue"

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
            search_value: 0,
            search_options:[
                {value: 0,label: '标题'}
            ],
            // 添加
            add_show:false,
            show_date: '',
            add_ques: 0,
            ques_options: [
                {value: 0,label:'判断'},
                {value: 1,label:'单选'},
                {value: 2,label:'多选'},
                {value: 3,label:'简答'},
            ],
            add_pay: 0,
            pay_options: [
                {value: 0,label:'免费'},
                {value: 1,label:'付费'},
            ],
            add_show_value: 0,
            show_options: [
                {value: 0,label:'不展示'},
                {value: 1,label:'展示'},
            ],
            AddFormData:{
                login_token:'',
                title: '',
                is_pay:1,
                is_show:1,
                analysis: '',	
                // tag_uuids:[],	
                ques_type:1,
                // pic_urls:[],	
                answer:'',
                min_num:0,
                pic_urls: []
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
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''

        });
    }

    export default {
         components: {
            file,
            tags
        },
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
             handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            handleChange(value) {
                console.log(value)
            },
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
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
                console.log(this.$refs.pciurls.img_url)
                this.AddFormData.login_token = lime.cookie_get('login_token');
                // this.AddFormData.is_show = this.AddFormData.is_show ? 1 : 0
                // this.AddFormDate.pic_urls  = [this.$refs.pciurls.img_url]
                this.AddFormData.is_show = !this.AddFormData.is_show ? 0 : this.show_date.getFullYear() + '-' + (this.show_date.getMonth() + 1) + '-' + this.show_date.getDate()
                // .substr(0, 10)
                lime.req('ShopQuesQuestionAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_num = 1;
                    this.init();
                    this.add_show = false;
                    this.login_token='';
                    this.title= '';
                    this.is_pay=0;
                    this.is_show=1;
                    this.analysis= '';		
                    this.ques_type=2;	
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
                this.detail_show = true;
                lime.req('ShopQuesQuestionDetail', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }).then(res => {
                    // console.log(res.data)
                    this.DetailFormData.data = res.data
                    // this.detail_show = true;
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
    .ques-box {
        width: 100%;
        border-bottom: 1px solid #f2f2f2;

    }

    .ques-flex {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        border-right: 1px solid #f2f2f2;
        font-size: 14px;
        line-height: 40px;
        color: #64676d
    }

    .ques-flexlf {
        width: 10%;
        height: 100%;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        text-align: center
    }

    .ques-flexmd {
        width: 80%;
        height: 100%;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        text-align: left;
        padding-left:  10px;
        box-sizing: border-box
    }

    .ques-flexrg {
        width: 10%;
        height: 100%;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        text-align: center
    }

    .ques-add {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color:  #0F7BF6;
        cursor:pointer;
        margin-top:  0px;
    }

    .menu{
        display: inline-block;
        padding:0 16px;
        text-align: center;
    }

    .page {
        height: 40px; 
        /* line-height: 40px;  */
        text-align: right;
        position: fixed;
        bottom: 20px;
        right:40px;
        overflow: hidden;
        /* background: #f4f8fe; */
        /* border: 1px solid red; */
        z-index: 999;
        padding-top:  10px;
    }

    .mbstyle{
        margin-bottom: 0px;
    }

    .tagsinput{
        width: 200px;
        margin-right: 20px;
    }

    .footer {
        position: absolute;
        bottom: 10px;
        width: 96%;
        padding-right: 50px!important;
        box-sizing: border-box;
    }

     .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
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

</style>
