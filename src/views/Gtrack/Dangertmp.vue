<!--
 * @Author: your name
 * @Date: 2020-09-10 18:00:00
 * @LastEditTime: 2020-09-27 13:46:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Gtrack/Dangertmp.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
        <div v-wechat-title="$route.meta.title">
            <!-- 菜单 -->
            <div style="height: 46px; line-height: 46px; overflow: hidden;">
                    <el-row>
                        <el-col :span="6">
                        <div style="padding-left:16px;">
                            <i class="el-icon-s-unfold"></i>
                            <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
                        </div>
                        </el-col>

                        <el-col :span="18">
                        <div style="text-align: right;">
                            <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>

                            <el-link
                            class="menu"
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus"
                            :key="index"
                            >{{item.name}}</el-link>
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
                    element-loading-text="加载中..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    @sort-change="onSortChange"
                    :highlight-current-row="true"
                    @current-change="onSelectRow"
                    style="width: 100%; height:60px;"
                    size="mini"
                >
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="name" label="名称"  />
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                        {{scope.row.status == '0' ? '待审核' : scope.row.status == '1' ? ' 通过' : '驳回'}}
                    </template>
                    </el-table-column>
                    <el-table-column prop="reject_remark" label="驳回原因"  />
                    <el-table-column prop="add_time" label="添加时间"  />
                    <el-table-column prop="last_time" label="更新时间"  />
                    <el-table-column prop="check_list" label="排查检查项信息信息"  />
                </el-table>

                <div class="page" :style="{width:width - 250 + 'px'}">
                    <el-pagination
                    :current-page.sync="SearchFormData.page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total"
                    ></el-pagination>
                </div>
            </div>

            <!-- 添加 -->
            <el-dialog title="添加" width="450px" :visible.sync="add_show">
                <div>
                        <el-form :model="AddFormData" label-width="120px" label-position="left">
                            <el-form-item label="模版名称:" required>
                                <el-input v-model="AddFormData.name"/>
                            </el-form-item>
                            <el-form-item label="排序:" required>
                                <el-select
                                    v-model="check_value"
                                    @change="choseCheck"
                                    placeholder="排查项">
                                        <el-option
                                        v-for="item in checkAry"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- <el-input v-model="AddFormData.check_list_json"/> -->
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button @click="add_show = false">取消</el-button>
                        <el-button type="primary" @click="onAddSubmit">保存</el-button>
                    </span>
            </el-dialog>

            <!-- 编辑 -->
            <el-dialog title="编辑" width="450px" :visible.sync="edit_show">
                
                        <el-form :model="EditFormData" label-width="120px" label-position="left">
                            <el-form-item label="模版名称:">
                                <el-input v-model="EditFormData.name"/>
                            </el-form-item>
                            <el-form-item label="排序:">
                                <el-select
                                    v-model="check_value"
                                    @change="choseCheck"
                                    placeholder="排查项">
                                        <el-option
                                        v-for="item in checkAry"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- <el-input v-model="AddFormData.check_list_json"/> -->
                            </el-form-item>
                        </el-form>
                    <span slot="footer">
                        <el-button @click="edit_show = false">取消</el-button>
                        <el-button type="primary" @click="onEditSubmit">保存</el-button>
                    </span>
            </el-dialog>

            <!-- 详细 -->
            <el-dialog title="详细" width="450px" :visible.sync="detail_show">
                <div>
                        <el-form :model="CheckFormData" label-width="120px" label-position="left">
                            <el-form-item label="排查项标题:">{{DetailFormData.name}}</el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button type="primary" @click="detail_show = false">确定</el-button>
                    </span>
            </el-dialog>

            <!-- 审核-->
            <el-dialog title="审核" width="450px" :visible.sync="check_show">
                <div>
                        <el-form :model="CheckFormData" label-width="120px" label-position="left">
                            <el-form-item label="排查项标题:" required>
                                <el-radio-group v-model="CheckFormData.status">
                                    <el-radio :label="1">通过</el-radio>
                                    <el-radio :label="2">驳回</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="CheckFormData.status == 2" label="驳回理由:" required >
                                <el-input type="textarea" v-model="CheckFormData.reject_remark"></el-input>
                            </el-form-item>
                        </el-form>
                        </div>
                    <span slot="footer">
                        <el-button @click="check_show = false">取消</el-button>
                        <el-button type="primary" @click="onCheckSubmit">确定</el-button>
                    </span>
            </el-dialog>

        </div>
</template>
<script>
    import Vue from "vue"
    import store from "@/store"
    import lime from "@/lime.js"
    import util from "@/util.js"

    export default {
        data() {
            return {
                cpname: '隐患排查模板',
                rows: [],
                total: 0,
                loading: false,
                curr_row: null,
                SearchFormData: {
                    real_name: '',
                    aa: [],
                    page_num: 1,
                    page_len: 10,
                },
                add_show: false,
                AddFormData: {},
                edit_show: false,
                EditFormData: {},
                detail_show: false,
                DetailFormData: {},
                check_value: '',
                checkAry: [],
                check_show: false,
                CheckFormData: {
                    status: 1
                }

            }
        },
        computed: {
            width: () => {
            return store.state.AppData.width
            },
            height: () => {
            return store.state.AppData.height
            },
            upload_url: () => {
            return store.state.AppData.upload_url
            },
            img_host: () => {
            return store.state.AppData.img_host
            }
        },
        created () {
            this.init()
            lime.req('VcShopProjectList',{login_token: lime.cookie_get('login_token')}).then( res => {
                this.checkAry = res.data.rows.map(v => {
                    return {value: v.uuid, label: v.title , ...v}
                });
            })

        },
        methods: {
            choseCheck(uuid) {
               let pits = this.checkAry.filter(item => item.uuid===uuid )
               let pit = []
               pit = pits.map(v => {
                 return {uuid: v.value, title: v.label , ...v}
               });
            },
            // 按钮点击 menu: 参数数据 local是否本地程序
            onSubMenu (menu, local = false) {
                util.submenu(menu, this, lime.cookie_get('login_token'), local)
            },
            // 数据初始化
            init () {
                this.loading = true
                lime.req('VcShopTemplateActionList', {
                    login_token: lime.cookie_get('login_token')
                }).then(res => {
                    console.log(res.data)
                    this.loading = false
                    this.rows = res.data.rows
                    this.total = res.data.total
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false
                }, 10000)
            },
            // 表格数据刷新
            onRefresh () {
            this.init()
            },
            // 选择单行
            onSelectRow (row) {
                this.curr_row = row
            },
            // 分页处理
            onPageChange (page) {
                this.SearchFormData.page_num = page
                this.init()
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
            // 添加
            handleAdd() {
              this.add_show = true
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                lime.req('VcShopProjectAdd',this.AddFormData).then(res => {
                    this.add_show = false
                    this.init()
                }).catch( err =>{
                    this.$message.error(err)
                } )
            },
            // 编辑
            handleEdit() {
                if (this.curr_row == null) {
                    this.$message.error("请选择一条数据");
                    return false;
                }
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                this.EditFormData.sort = this.EditFormData.sort + ''
                lime.req('VcShopProjectEdit', this.EditFormData).then( res => {
                    this.edit_show = false
                    this.init
                }).catch( err => {
                    this.$message.error( err)
                })
            },
            // 删除
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.$confirm("确认删除?", "提示").then(() => {
                    lime.req("VcShopTemplateDel", {
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
            // 详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.DetailFormData = this.curr_row
                this.detail_show = true
            },
            //审核
            handleCheck() {
                if (util.empty(this.curr_row)) {
                    this.$message.error("请选择一条数据");
                    return;
                }
                this.check_show =  true
            },
            onCheckSubmit() {
                this.CheckFormData.login_token = lime.cookie_get('login_token')
                this.CheckFormData.uuid = this.curr_row.uuid
                lime.req('',this.CheckFormData).then(res => {
                    this.check_show = false
                    this.init()
                }).catch(err => {
                    this.$message.error(err)
                })
            }

        }
        
    }
</script>

<style scoped>
    .menu {
        display: inline-block;
        padding: 0 16px;
        text-align: center;
    }

    .page {
        height: 40px;
        line-height: 40px;
        text-align: right;
        position: fixed;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }

    .dialog-box {
        display: flex;
        padding: 10px;
        padding-left: 20px;
    }
</style>