<!--
 * @Author: xk
 * @Date: 2020-09-09 14:21:35
 * @LastEditTime: 2020-09-16 16:51:05
 * @LastEditors: Please set LastEditors
 * @Description: 资金账户
 * @FilePath: /shop/src/views/Admin/Spaccount.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
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
                    <div style="text-align: right; font-size: 16px">
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

        
      <TableBase :loading="loading" :rows="rows" :columns="columns" />

      <!-- 充值 -->
        <el-dialog 
            title=""
            width="450px"
            :visible.sync="charge_show">
            <div class="charge-box">

            </div>
        </el-dialog>
    
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopAccountList, ShopAccountDetail} from "@/api/request"
    import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.SpaccountData) {
        Vue.set(store.state, 'SpaccountData', {
            rows:[],
            total:0,
            loading:false,
            curr_row:null,
            charge_show: false,
            //表格数据
            rows: [],
            //表头设置
            columns: [
                {prop: 'enable_money', label: '可用金额'},
                {prop: 'freeze_money', label: '冻结金额'},
                {prop: 'last_time', label: '最近一次修改时间'},
                {prop: 'last_ip', label: '最近一次修改ip'} 
            ],
            cpname: '资金账户',

        });
    }
    export default {
        components: {
            TableBase
        },
        data() {
            return store.state.SpaccountData;
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            }
        },
        created(){
            this.init();
        },
        methods:{
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            // 数据初始化
            init() {
                this.loading = true;
                //  lime.req({
                //         module:'ShopAccountDetails',
                //         ver:'1.0.0',
                //         relation_module:'CommShopList',
                //         relation_ver:'1.0.0'
                //     }, {
                //         login_token:lime.cookie_get('login_token'),
                //         city_uuid: 1001
                     
                //     }).then( res => {
                //         console.log(res)
                //     })

                let pam = {
                    login_token:lime.cookie_get('login_token')
                }
                ShopAccountList(pam, res => {
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },
            handleRecharge() {
                this.charge_show = true
            }
            
        }
        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
    .charge-box {
        width: 100%;
        height: 400px;
        background: lightgray;
    }
</style>