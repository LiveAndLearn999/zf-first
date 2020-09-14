<!--
 * @Author: your name
 * @Date: 2020-09-10 17:38:37
 * @LastEditTime: 2020-09-14 17:54:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Egoods/Goods.vue
-->
<template>
    <div>

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

        <!-- <h6>{{cpname}}</h6> -->
        <TableBase :loading="loading" :rows="rows" :columns="columns"/>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { EbGoodList } from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.EbGoodData) {
        Vue.set(store.state, 'EbGoodData', {
            rows:[],
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
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'name', label: '货物名称'},
                {prop: 'add_time', label: '添加时间'},
                {prop: 'last_time', label: '修改时间'}
            ],
            cpname: '货物管理--api 平台未找到相关接口',

        });
    }

    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.EbGoodData;
        },
        created() {
                this.init()
        },
        methods: {
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
               this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token')
                }
                EbGoodList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    // this.list = res.data;
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
        }
        
    }
</script>

<style scoped>
   @import '../../assets/styles/common.css'; 
</style>