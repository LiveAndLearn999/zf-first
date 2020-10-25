<!--
 * @Author: your name
 * @Date: 2020-09-10 11:32:21
 * @LastEditTime: 2020-09-27 16:20:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Resource.vue
-->
<!-- 学习资料 -->
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

                <!-- 前端自定义功能 -->
                <el-col :span="18">
                    <div style="text-align: right; font-size:14px ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

                        <el-link class="menu" @click="onSubMenu(item)" 
                            v-for="(item,index) in $store.state.AdminData.right_menus" :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box"> 
                <el-select v-model="search_value" placeholder="请选择" style="width: 80px;margin-right: 10px"  size="small">
                    <el-option
                         v-for="item in search_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>    
                <el-input v-model="SearchFormData.title" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
       <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
            <!-- lement-loading-spinner="el-icon-loading  stripe" -->
            <!-- v-loading="loading" element-loading-text="拼命加载中" 
            
                element-loading-background="rgba(0, 0, 0, 0.1)"  -->
            <el-table 
                :data="rows" 
                
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68" 
                @sort-change="onSortChange" :highlight-current-row="true" 
                @current-change="onSelectRow" 
                style="width: 100%;margin-top: 5px;" 
                size="mini">
                <el-table-column type="index" width="80px" label="#"></el-table-column>
                <el-table-column prop="title" label="标题" align="left"></el-table-column>
                <el-table-column prop="cont_type" label="文件类型" align="center" >
                     <template slot-scope="scope">
                        {{scope.row.cont_type == 1 ? '视频' : '图文'}}
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="状态" align="center">
                     <template slot-scope="scope">
                        {{stateFormat(scope.row.state)}}
                    </template>
                </el-table-column>
                <el-table-column prop="is_pay" label="是否收费" align="center" >
                    <template slot-scope="scope">
                        {{payFormat(scope.row.is_pay,scope.row.min_num)}}
                    </template>
                </el-table-column>
                <el-table-column prop="look_num" label="查看次数" align="center"></el-table-column>
                <el-table-column prop="add_time" label="添加时间" align="center" :sortable=true></el-table-column>
                <el-table-column prop="last_time" label="最后更新时间" align="center" :sortable=true></el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 280 + 'px'}">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_no"
                :page-size="SearchFormData.page_len"
                 :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <!-- <el-pagination :current-page.sync="SearchFormData.page_no"
                    @current-change="onPageChange" layout="prev, pager, next" :total="total">
                </el-pagination> -->
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog title="搜索" :visible.sync="search_show" width="30%">
            <el-form :model="SearchFormData" label-width="120px" label-position="left">
                <el-form-item label="资料标题:">
                    <el-input v-model="SearchFormData.title" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加 -->
        <!-- <el-dialog title="添加" :visible.sync="add_show" width="500px" height="100px"> -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            direction="rtl" size="50%">
            <div  class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :model="AddFormData" label-width="100px" label-position="right" :rules="rules" style="margin-top: 10px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标题:" prop="title">
                            <el-input  v-model="AddFormData.title" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="类型:" prop="cont_type">
                             <el-select v-model="add_type_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_type_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                          <el-form-item label="上传封面:" prop="thumb">
                            <file ref="thumb_img"/>
                            <!-- <el-input v-model="AddFormData.thumb" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                          <el-form-item label="上传附件:" prop="content" >
                              <div style="width: 100%;border: 1px solid lightgray;padding: 20px;box-sizing: border-box;border-radius: 5px">
                                  <wangeditor v-if="add_show && add_type_value == 1" ref="content_img" :newHtml="AddFormData.content"/>
                                    <UploadAuth v-else-if="add_show && add_type_value != 1" ref="ref_vedio"/>
                              </div>
                            <!-- <file v-if="AddFormData.cont_type == 2" ref="content_img"/> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="支付:" prop="is_pay">
                            <el-select v-model="add_pay_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_pay_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                          <el-form-item label="时长(分钟):"  v-if="AddFormData.cont_type === 1">
                            <el-input-number v-model="AddFormData.content_time" controls-position="right" :min="1" :max="200" label="描述文字"></el-input-number>
                            <!-- <el-input style="width: 360px" type="number" v-model="AddFormData.content_time" /> -->
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="是否展示:" class="paystyle">
                             <el-select v-model="add_show_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_show_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="add_type_value == 0" label="是否加密：" prop="encrypt">
                                <el-select v-model="add_encrypt_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_encrypt_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="add_show_value == 1" label="活动时间:" label-width="80px" style="padding-left:20px;">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="add_showtime" ></el-date-picker>
                            </el-form-item>
                    </el-col>
                </el-row>
                 <el-row>
                     <el-col :span="24">
                         <el-form-item label="备注:">
                            <el-input  :rows="5" type="textarea" v-model="AddFormData.remark" />
                        </el-form-item>
                     </el-col>
                 </el-row>
            </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
                </div>
            <!-- <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span> -->
        </el-drawer>
        <!-- </el-dialog> -->

        <!-- 编辑 -->
        <!-- <el-dialog title="编辑" :visible.sync="edit_show" width="500px"> -->
        
        <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            direction="rtl" size="50%">
            <div  class="draw-content" :style="{height:height - 80 +'px'}">
            <el-form :model="EditFormData" label-width="100px" label-position="right" :rules="rules" style="margin-top: 10px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="标题:" prop="title">
                            <el-input  v-model="EditFormData.title" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="类型:" prop="cont_type">
                             <el-select v-model="edit_type_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_type_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                          <el-form-item label="上传封面:" prop="thumb">
                            <file ref="thumb_imgs" :imgUrl="EditFormData.thumb"/>
                            <!-- <el-input v-model="AddFormData.thumb" /> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                          <el-form-item label="上传附件:" prop="content" >
                              <div style="width: 100%;border: 1px solid lightgray;padding: 20px;box-sizing: border-box;border-radius: 5px">
                                  <wangeditor v-if="edit_show && edit_type_value == 1" ref="content_imgs" :newHtml="edit_content"/>
                                    <UploadAuth v-else-if="edit_show && edit_type_value != 1" ref="ref_vedios"/>
                              </div>
                            <!-- <file v-if="AddFormData.cont_type == 2" ref="content_img"/> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="支付:" prop="is_pay">
                            <el-select v-model="edit_pay_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_pay_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                          <el-form-item label="时长(分钟):"  v-if="edit_type_value == 0">
                            <el-input-number v-model="EditFormData.content_time" controls-position="right" :min="1" :max="200" label="描述文字"></el-input-number>
                            <!-- <el-input style="width: 360px" type="number" v-model="AddFormData.content_time" /> -->
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="是否展示:" class="paystyle">
                             <el-select v-model="edit_show_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_show_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="edit_type_value == 0" label="是否加密：" prop="encrypt">
                                <el-select v-model="add_encrypt_value" placeholder="请选择">
                                        <el-option
                                        v-for="item in add_encrypt_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="edit_show_value == 1" label="活动时间:" label-width="80px" style="padding-left:20px;">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="edit_showtime" ></el-date-picker>
                            </el-form-item>
                    </el-col>
                </el-row>
                 <el-row>
                     <el-col :span="24">
                         <el-form-item label="备注:">
                            <el-input  :rows="5" type="textarea" v-model="AddFormData.remark" />
                        </el-form-item>
                     </el-col>
                 </el-row>
            </el-form>
            </div>
            <div class="drawer-footer">
                    <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
                </div>
            <!-- <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span> -->
        </el-drawer>

    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import file from "@/components/imgUpload/drapload.vue"
    // import vediofile from "@/components/imgUpload/vedio.vue"
    import UploadAuth from '@/components/video/videoUpload.vue'
    import wangeditor from "@/components/wangeditor/index.vue"
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
    
    if (!store.state.ShopResourceData) {
        Vue.set(store.state, 'ShopResourceData', {
            edit_content: '',
            add_type_value: 0,
            edit_type_value: 0,
            edit_pay_value: 0,
            edit_show_value: 0,
            edit_showtime: '',
            add_type_options: [
                {value: 0 , label: '视频'},
                {value: 1, label: '图文'}
            ],
            add_encrypt_value: 0,
            add_encrypt_options: [
                {value: 0 , label: '不加密'},
                {value: 1, label: '加密'}
            ],
             add_pay_value: 0,
            add_pay_options: [
                {value: 0 , label: '免费'},
                {value: 1, label: '收费'}
            ],
            add_show_value: 0,
            add_show_options: [
                {value: 0 , label: '否'},
                {value: 1, label: '是'}
            ],

             rules: {
                title: [
                    { required: true, message: '标题必填', trigger: 'blur' }
                ],
             },
            rows:[],
            total:0,
            loading:false,
            curr_row:null,
            // 搜索
            SearchFormData:{
                title:'',
                page_no:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            search_show:false,
            search_options: [
                    {value: 0,label: '标题'},
                ],
            search_value: 0,
            // 添加
            add_show:false,
            add_isshow:false,//是否展示选择项
            add_showtime: new Date(),//已选的格式时间
            AddFormData:{
                title:'',
                cont_type: 1,
                is_pay: 1,
                min_num:0,
                thumb:'',
                remark:'',
                content:'',
                is_show: 0,
                login_token:'',
                content_time:0,
            },
            add_encrypt: 0,
            // 编辑
            edit_show:false,
            edit_isshow:false,//是否展示选择项
            edit_showtime: new Date(),//已选的格式时间
            EditFormData:{
                title:'',
                cont_type: 1,
                is_pay: 1,
                min_num:0,
                thumb:'',
                remark:'',
                content:'',
                is_show: 0,
                login_token:'',
                content_time:0,
            },


        });
    }

    export default {
        components: {
            file,
            // vediofile,
            UploadAuth,
            wangeditor
        },
        data() {return store.state.ShopResourceData;},
        computed:{
            width:() => {return store.state.AppData.width;},
            height:() => {return store.state.AppData.height;},
            upload_url:() => {return store.state.AppData.upload_url;},
            img_host:() => {return store.state.AppData.img_host;}
        },
        created(){this.init();},
        methods:{
            onAddSubmit() {
                 // console.log(this.$refs.ref_vedio.uploader._uploadList[0].videoId)
                 console.log( this.add_type_options)
                this.AddFormData.login_token = lime.cookie_get('login_token');
                 this.AddFormData.cont_type = this.add_type_value - 0 + 1
                this.AddFormData.is_show = this.add_show_value == 0 ? 0 : new Date(this.add_showtime).getTime()/1000;
                this.AddFormData.thumb = this.$refs.thumb_img.img_url
                this.AddFormData.content = this.add_type_value == 0 ? this.$refs.ref_vedio.uploader._uploadList[0].videoId : this.$refs.content_img.newHtml
                this.AddFormData.encrypt = this.add_encrypt_value + ''
                lime.req('ShopResourceAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_no = 1;
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    console.log(err)
                    this.$message.error(err.msg);
                })
            },
            handleChange(value) {
                console.log(value)
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {util.submenu(menu,this,lime.cookie_get('login_token'), local);},
            // 数据初始化
            init() {
                // this.loading = true;
                NProgress.start();
                lime.req('ShopResourceList', {
                    login_token:lime.cookie_get('login_token'),
                    title:this.SearchFormData.title,
                    page_no:this.SearchFormData.page_no,
                    page_len:this.SearchFormData.page_len,
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }).then(res => {
                    // this.loading = false;
                    NProgress.done();
                    if(res.code=== 0){
                        this.rows = res.data.rows;
                        this.total = res.data.total;
                        // this.SearchFormData.title = '';
                    }
                });
                // 超时关闭遮罩层
                setTimeout(() => {
                    NProgress.done();
                    // this.loading = false;
                }, 10000);
            },
            // 状态格式化
            stateFormat(state) {
                if (state == 0) {
                    return '草稿';
                } else if (state == 1) {
                    return '审核通过';
                } else if (state == 2) {
                    return '待审核';
                } else if (state == 3) {
                    return '审核不通过';
                } else if (state == -1) {
                    return '作废';
                } else {
                    return '';
                }
            },
            // 状态格式化
            payFormat(is_pay,min_num) {
                if (is_pay == 0) {
                    return '免费';
                } else if (is_pay == 1) {
                    return '收费('+min_num+'学币)';
                } else {
                    return '';
                }
            },
            // 获取时间戳（10位）
            timeFormat: function (mDate) {
                var tmp = Date.parse(mDate).toString();
                tmp = tmp.substr(0,10);
                return tmp;
                },
            // 时间格式化
            dateFormat: function (value) {
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
            // 获取时当前间
            getTime(){return (Date.parse(new Date()).toString()).substr(0,10);},
             // 表格数据刷新
            onRefresh() {
                this.SearchFormData.real_name ='',
                this.init();
            },
            // 搜索页面打开
            onSearch() {this.search_show = true;},
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false;
                this.SearchFormData.page_no = 1;
                // if(this.search_value == 0) {
                //     this.SearchFormData.mobile = ''
                // }else {
                //     this.SearchFormData.real_name = ''
                // }
                this.init();
            },
            // 选择单行
            onSelectRow(row){this.curr_row = row;},
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_no = page;
                this.init();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 排序处理
            onSortChange(sort) {
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                this.init();
            },
            // 添加展示
            handleAdd() {this.add_show = true;},
            onAddSubmits() {
                // console.log(this.$refs.ref_vedio.uploader._uploadList[0].videoId)
                this.AddFormData.login_token = lime.cookie_get('login_token');
                this.AddFormData.is_show = this.AddFormData.is_show == 0 ? 0 : new Date(this.AddFormData.is_show).getTime();
                this.AddFormData.thumb = this.$refs.thumb_img.img_url
                this.AddFormData.content = this.AddFormData.cont_type == 0 ? this.$refs.ref_vedio.uploader._uploadList[0].videoId : this.$refs.content_img.img_url
                this.AddFormData.encrypt = this.add_encrypt + ''
                lime.req('ShopResourceAdd', this.AddFormData).then(res => {
                    this.SearchFormData.page_no = 1;
                    this.init();
                    this.add_show = false;
                }).catch(err => {
                    console.log(err)
                    this.$message.error(err.msg);
                })
            },
            // 编辑展示
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                // lime.req('ShopResourceDetail',{
                //     login_token: lime.cookie_get('login_token'),
                //     uuid: this.curr_row.uuid
                // }).then( res => {
                //     this.edit_show =true;

                // })
                // this.edit_isshow = this.curr_row.is_show == 0 ? false : true
                lime.req('ShopResourceDetail', {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }).then(res => {
                    if(res.code=== 0){
                        console.log(res.data.content)
                        this.edit_show =true;
                        this.edit_content = res.data.content
                        this.EditFormData.thumb = res.data.thumb
                        this.EditFormData.title = res.data.title
                        this.EditFormData.content_time = res.data.content_time;
                        this.edit_type_value = res.data.cont_type - 0 - 1
                        this.edit_pay_value = res.data.is_pay
                        this.edit_showtime = res.data.is_show == 0 ? '' : res.data.is_show
                    }
                }).catch(err => {
                    this.$message.error(err.msg);
                });
                // this.EditFormData.title = this.curr_row.title;
                // this.EditFormData.cont_type = this.curr_row.cont_type;
                // this.EditFormData.is_pay = this.curr_row.is_pay;
                // this.EditFormData.min_num = this.curr_row.min_num;
                // this.EditFormData.thumb = this.curr_row.thumb;
                // this.EditFormData.remark = this.curr_row.remark;

                // lime.req('ShopResourceDetail',  {
                //     login_token:lime.cookie_get('login_token'),
                //     uuid:this.curr_row.uuid
                // }).then(res => {
                //     this.EditFormData.content = res.data.content;
                // }).catch(err => {
                //     this.$message.error(err.msg);
                // });
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token');
                this.EditFormData.thumb = this.$refs.edit_thumb_img.img_url ? this.$refs.edit_thumb_img.img_url : this.EditFormData.thumb 
                this.EditFormData.content = this.$refs.edit_content_img.img_url ? this.$refs.edit_content_img.img_url : this.EditFormData.content       
                lime.req('ShopResourceEdit', this.EditFormData).then(res => {
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
                    lime.req('ShopResourceDel', {
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
            // 提审
            handleSubmitCheck(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                // 提审提交
                this.$confirm('确认提审?', '提示').then(() => {
                    lime.req('ShopResourceSubmitAuth', {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }).then(res =>{
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg)
                    }) 
                })

            },
        }
    }
</script>

<style>
    @import '../../assets/styles/common.css'; 
    .el-table tbody tr:hover>td { 
        background-color: #cedbeb!important;
    }
    .el-table__body tr.current-row>td{
        background: #cedbeb!important;
    }
</style>
<style lang="less" scoped>
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

    .coinstyle{
        width: 165px;
    }

    .paystyle{
       .el-form-item{
            display: inline-block;
        } 
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
