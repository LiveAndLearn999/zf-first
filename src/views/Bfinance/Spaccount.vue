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

       <div :style="{height: height - 145 + 'px',background: 'white'}">
           <el-row>
               <el-col :span="2" style="background: lightgray">
                   <el-row>
                       <el-col :span="24" style="margin-top: 20px">
                            <div class="money-box1">
                                <div class="box1-word">现金</div>
                            </div>
                       </el-col>
                   </el-row>
                   <el-row style="margin-top: 20px">
                       <el-col :span="24">
                           <div class="money-box1">
                          <div class="box1-word">学币</div>
                           </div>
                       </el-col>
                   </el-row>
                   <el-row style="margin-top: 20px">
                       <el-col :span="24">
                           <div class="money-box1">
                           <div class="box1-word">积分及经验值</div>
                           </div>
                       </el-col>
                   </el-row>
               </el-col>
               <el-col :span="22">
                    <el-row style="margin-top: 20px">
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">可用金额(元)</div>
                                <div class="money-content">{{enable_money || 0}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">冻结金额(元)</div>
                                <div class="money-content">{{freeze_money || 0}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">赠送金额(元)</div>
                                <div class="money-content">{{enable_give_money || 0}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 20px">
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">可用学币</div>
                                <div class="money-content">{{enable_coins || 0}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">冻结学币</div>
                                <div class="money-content">{{freeze_coins || 0}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 20px">
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">可用积分</div>
                                <div class="money-content">{{integral || 0}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">冻结积分</div>
                                <div class="money-content">{{0}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="money-box">
                                <div class="money-title">经验值</div>
                                <div class="money-content">{{empirical_val || 0}}</div>
                            </div>
                        </el-col>
                    </el-row>
               </el-col>
           </el-row>
        </div>

        <!-- <div style="padding-left: 30px;box-sizing: border-box;width: 100%;height: 50px;line-height: 50px">
            账户总金额：<label style="color: green">{{100}}</label>元 (已使用金额：<label style="color: green">{{100}}</label>元   可用金额：<label style="color: green">{{100}}</label>元   冻结金额：<label style="color: green">{{100}}</label>元）
        </div> -->

      <!-- <TableBase :loading="loading" :rows="rows" :columns="columns" /> -->

      <!-- 充值 -->
        <el-dialog 
            title="充值"
            width="450px"
            :visible.sync="charge_show">
            <div class="charge-box" >
                <el-row style="width: 100%">
                    <el-col :span="8">
                        <div class="charge-boxs" @click="showpay(30)">30元</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="charge-boxs" @click="showpay(50)">50元</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="charge-boxs" @click="showpay(100)">100元</div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                    <el-col :span="8">
                        <div class="charge-boxs" @click="showpay(100)">200元</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="charge-boxs" @click="showpay(300)">300元</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="charge-boxs" @click="showpay(500)">500元</div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                    <el-col :span="6"> 其他金额(元)</el-col>
                    <el-col :span="14">
                        <!-- <el-input type="text" size="small" v-model="my_num"></el-input> -->
                        <el-input-number v-model="my_num" controls-position="right"  :min="30" :max="10000"></el-input-number>

                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" @click="showpay(my_num)">确定</el-button>
                    </el-col>
                </el-row>
                <!-- <img src="@/assets/imgs/money.png" alt=""> -->
            </div>

        </el-dialog>

         <el-dialog
                title="扫码充值"
                :visible.sync="pay_show"
                width="450px">
                <div style="width: 200px;height: 200px;text-align: center;margin: 0 auto">
                    <div id="qrcode" style=""></div>
                </div>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="pay_show = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span> -->
            </el-dialog>

        <!-- <div style="position: relative; width: 300px;height: 300px; border: 1px solid green">
             <div id="qrcode"></div>
        </div> -->
    
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopAccountList, ShopAccountDetail} from "@/api/request"
    import QRCode from 'qrcodejs2'
    // import TableBase from "@/components/myTables/baseTable.vue"

    if (!store.state.SpaccountData) {
        Vue.set(store.state, 'SpaccountData', {
            my_num: 0,
            pay_show: false,
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
            enable_coins: 0,
            freeze_coins: 0,
            enable_money: 0,
            freeze_money: 0,
            enable_give_money: 0,
            integral: 0,
            empirical_val: 0

        });
    }
    export default {
        components: {
            // TableBase
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
            // this.$nextTick (function () {
            //     this.qrcode();
            // })
        },
        methods:{
            showpay(val) {
                console.log(val)
                this.charge_show = false
                this.pay_show = true
                this.$nextTick (function () {
                    document.getElementById('qrcode').innerHTML = ''
                    let qrcode = new QRCode('qrcode', { // eslint-disable-line no-unused-vars
                        width: 200,
                        height: 200,        // 高度
                        text:  'https://demo-api.aimeipin.cn/api/index/qr_code.html?code=ZrC_EX9-fHU-KpB5uf7cFyDbrJBtC_hOtyoBt6HBXxmVP0KD-fJTdqnwOal&type=qr&crypt=1',   // 二维码内容
                        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                        //background: '#fff',   // 背景色
                        //foreground: '#ff0'    // 前景色
                    })
                })
            },
            qrcode(){ 
                let qrcode = new QRCode('qrcode', { // eslint-disable-line no-unused-vars
                    width: 124,
                    height: 124,        // 高度
                    text:  'https://demo-api.aimeipin.cn/api/index/qr_code.html?code=ZrC_EX9-fHU-KpB5uf7cFyDbrJBtC_hOtyoBt6HBXxmVP0KD-fJTdqnwOal&type=qr&crypt=1',   // 二维码内容
                    // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    //background: '#fff',   // 背景色
                    //foreground: '#ff0'    // 前景色
                })
        },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            // 数据初始化
            init() {
                this.loading = true;

                let pam = {
                    login_token:lime.cookie_get('login_token')
                }
                lime.req('ShopAccountDetails',pam).then( res => {
                    this.enable_coins = res.data.enable_coins
                    this.freeze_coins = res.data.freeze_coins
                    this.enable_money = res.data.enable_money
                    this.freeze_money = res.data.freeze_money
                    this.enable_give_money = res.data.enable_give_money
                    this.integral = res.data.integral
                    this.empirical_val = res.data.empirical_val
                    // console.log(res)
                })
                // ShopAccountList(pam, res => {
                //     this.loading = false;
                // }).catch(err => {
                //     this.loading = false;
                //     this.$message.error(err.msg);
                // })

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
        height: auto;
        text-align: center;
        /* background: lightgray; */
    }
    .money-box {
        width: 80%;
        height: 200px;
        border: 1px solid lightgray;
        border-radius: 4px;
        margin-left: 10%;
        text-align: center
    }
    .money-box1 {
        width: 100%;
        height: 200px;
        /* border: 1px solid lightgray; */
        /* line-height: 200px; */
        /* text-align: center; */
        /* border-radius: 4px; */
        /* margin-left: 10% */
    }

    .box1-word {
        width: 100%;
        top: 70px;
        text-align: center;
        position: relative;
    }

    .money-title {
        width: 100%;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid lightgray;
    }

    .money-content {
        width: 100%;
        height: 140px;
        line-height: 140px;
    }

    .charge-boxs {
        width: 100px;
        height: 100px;
        border: 1px solid lightgray;
        text-align: center;
        line-height: 100px;
        margin: 0 auto
    }

    .charge-boxs:hover {
        background: #409EFF;
        color: white;
        border: none;
    }
</style>