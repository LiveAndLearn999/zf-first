<!--
 * @Author: your name
 * @Date: 2020-09-10 11:38:11
 * @LastEditTime: 2020-09-24 17:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Customer.vue
-->
<template>
	<div>
		<!-- <h6>{{cpname}}</h6> -->
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
                    <el-table-column type="index" width="80px" label="#"></el-table-column>
                    <el-table-column prop="name" align="left" label="承运方名称"></el-table-column>
                    <el-table-column prop="phone_number" label="联系手机号"></el-table-column>
                    <el-table-column prop="license" label="承运人许可证"></el-table-column>
                    <el-table-column prop="add_time" label="添加时间"></el-table-column>
                    <el-table-column prop="last_time" label="修改时间"></el-table-column>
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
        <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
            <el-form :model="AddFormData" label-width="120px" label-position="left">
                <el-form-item label="承运方:" required>
                    <el-input v-model="AddFormData.name" />
                </el-form-item>
                 <el-form-item label="承运方电话:" required>
                    <el-input v-model="AddFormData.phone_number" />
                </el-form-item>
                <el-form-item label="承运方许可证:" required>
                    <!-- <file ref="upload"/> -->
                    <el-input v-model="AddFormData.license" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog  
            title="编辑"
            :visible.sync=" edit_show"
            width="500px">
            <el-form :model="EditFormData" label-width="120px" label-position="left">
                <el-form-item label="承运方:">
                    <el-input v-model="EditFormData.name" />
                </el-form-item>
                 <el-form-item label="承运方电话:">
                    <el-input v-model="EditFormData.phone_number" />
                </el-form-item>
                <el-form-item label="承运方许可证:">
                    <!-- <file ref="upload"/> -->
                    <el-input v-model="EditFormData.license" />
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="45%">
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="DetailFormData" label-width="120px" label-position="left">
                    <el-form-item label="承运方:" required>
                        {{DetailFormData.name}}
                    </el-form-item>
                    <el-form-item label="承运方电话:" required>
                        {{DetailFormData.phone_number}}
                    </el-form-item>
                    <el-form-item label="承运方许可证:" required>
                        {{DetailFormData.license}}
                    </el-form-item>
                      <el-form-item label="创建时间:">
                        {{EditFormData.add_time }}
                    </el-form-item>
                    <el-form-item label="更新时间:">
                        {{EditFormData.last_time}}
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
// "extends": [
//       "plugin:vue/essential",
//       "eslint:recommended"
//     ],
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";
// import TableBase from "@/components/myTables/baseTable.vue"
import { EbCarrierList, EbCarrierEdit } from "@/api/request"
// import file from "@/components/imgUpload/upload.vue"

if (!store.state.EbCarrierData) {
        Vue.set(store.state, 'EbCarrierData', {
            total:0,
            loading:false,
            curr_row:null,
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
            // 搜索
            SearchFormData:{
                page_num:1,
                page_len:10
            },
            //表格数据
            rows: [],
            //表头设置
            cpname: '企业客户',
             direction: 'rtl'

        });
    }

export default {
	// components: {
    //     file
	// },
    data() {
       return store.state.EbCarrierData
    },
    created() {
            this.init()
    },
    computed:{
        width:() => {
            return store.state.AppData.width;
        },
        height:() => {
            return store.state.AppData.height;
        }
   },
    methods: {
        // 按钮点击 menu:参数数据 local是否本地程序
        onSubMenu(menu, local = false) {
            util.submenu(menu,this,lime.cookie_get('login_token'), local);
        },
        init() {
            this.loading = true;
            let pam = {
                login_token:lime.cookie_get('login_token'),
                page_num:this.SearchFormData.page_num,
                page_len:this.SearchFormData.page_len
            }
            EbCarrierList(pam, res => {
                this.loading = false;
                this.rows = res.data.rows;
                this.total = res.data.total;
            }).catch(err => {
                this.loading = false;
                this.$message.error(err.msg);
            })
            // 超时关闭遮罩层
            setTimeout(() => {
                this.loading = false;
            }, 10000);
        },
        // 刷新
        onRefresh() {
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
        // 添加
        handleAdd() {
            this.add_show = true
        },
        onAddSubmit() {
            this.AddFormData.login_token = lime.cookie_get('login_token');
            // this.AddFormData.license   = this.$refs.upload.img_url;
            lime.req('EbCarrierAdd', this.AddFormData).then(res => {
                this.SearchFormData.page_num = 1;
                this.init();
                this.add_show = false;
            }).catch(err => {
                this.$message.error(err.msg);
            })
            this.add_show = false
        },
        // 编辑
        handleEdit() {
            if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
            this.EditFormData = this.curr_row
            this.edit_show = true
        },
        onEditSubmit() {
            this.EditFormData.login_token = lime.cookie_get('login_token')
            EbCarrierEdit(this.EditFormData, res => {
                this.init();
            }).catch( err => {
                this.$message.error(err)
            })
            this.edit_show = false
        },
        handleDel() {
            if (util.empty(this.curr_row)) {
                this.$message.error('请选择一条数据');
                return;
            }
            this.$confirm('确认删除?', '提示').then(() => {
                lime.req('EbCarrierDel', {
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
        handleDetail() {
            if (util.empty(this.curr_row)) {
                this.$message.error('请选择一条数据');
                return false;
            }
            this.DetailFormData = this.curr_row
            this.detail_show = true
        }
    }

}
</script>
<style scoped>
 @import '../../assets/styles/common.css'; 
</style>