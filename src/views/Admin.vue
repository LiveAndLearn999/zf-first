<template>
    <div v-wechat-title="$route.meta.title">
        <div class="head">
            <el-row>
                <el-col :span="8" style="text-align: left;">
                    <!-- <img src="@/assets/imgs/login-log.fw.png" style="height: 60px; display: block;"> -->
                    <div class="head-flex">
                        <div class="head-flexlf">
                            <img src="@/assets/imgs/logo.png" style="height: 36px;margin-top:12px">
                        </div>
                        <div class="head-flexrg">
                            TMS管理系统
                        </div>
                    </div>
                </el-col>
                <el-col :span="16" style="text-align: right">
                    <div style="padding-right: 20px;">
                        <span class="msg_icon" v-if="showCircle"></span>
                        <i v-if="autoPlay" class="el-icon-bell" @click="autoPlay = !autoPlay" style="cursor: pointer;font-size: 22px;margin-right: 36px;color: #B3B3B3"></i>
                        <i v-else class="el-icon-close-notification" @click="autoPlay = !autoPlay" style="cursor: pointer;font-size: 22px;margin-right: 36px;color: #B3B3B3"></i>
                        <span style="display: inline-block;width:1px; height: 32px;background: #B3B3B3;position: relative;top: 8px;right: 18px"></span>
                        <span  style="cursor: pointer;display: inline-block; width: 36px;height: 36px;border-radius: 50%;background: #f2f2f2;position:relative;text-align: center;line-height: 36px;">
                            <!-- <i @click="showCard" class="el-icon-user show-ul" style="font-size: 22px;color: #B3B3B3"></i> -->
                            <el-dropdown>
                            <span class="el-dropdown-link">
                                <i class="el-icon-user" style="font-size: 22px;color: #B3B3B3"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <span @click="handleMsg" style="display: inline-block;width: 60px;height: 30px">消息</span>
                                </el-dropdown-item>
                                <el-dropdown-item >
                                    <span @click="my_show = true" style="display: inline-block;width: 60px;height: 30px">我的</span>
                                </el-dropdown-item>
                                <el-dropdown-item >
                                    <span @click="onLogout" style="display: inline-block;width: 60px;height: 30px">退出</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                        <!-- <span class="msg_icon" v-if="showCircle"></span>
                        <el-button type="text" @click="handleMsg">消息</el-button>
                        <el-button type="text" @click="my_show = true">我的</el-button>
                        <el-button type="danger" @click="onLogout" plain size="mini">退出</el-button> -->

                        <!-- <i class="el-icon-arrow-down" style="font-size: 20px;margin-right: 6px;position: relative; top: 6px;"></i> -->
                        <!-- <i class="el-icon-switch-button" style="font-size: 20px;margin-left: 6px;" @click="onLogout"></i> -->
                        <!-- <el-button type="text" @click="close">关闭ws</el-button> -->
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- el-icon-close-notification -->
        <audio controls="controls" hidden  src="../assets/msg.mp3" ref="audio"></audio>

        <div class="content" :style="{width:width + 'px', height:height - 62 +'px'}">
            <div class="left">
                <div :style="{width:'100%', height:height - 62 +'px', overflow:'auto'}" class="topnav_box">
                    <el-menu
                        @select="onClickMenu"
                        :style="{height:height - 62 +'px',textAlign:'left'}"
                        :default-active="active_uuid">
                        <el-menu-item index="console" style="border: none!important">控制台</el-menu-item>
                        <el-submenu 
                            v-for="item in left_menus"
                            :key="item.uuid"
                            :index="item.uuid" 
                            >
                            <template slot="title">{{item.name}}</template>
                            
                            <el-menu-item 
                                v-for="citem in item.children"
                                :key="citem.uuid"
                                :index="citem.uuid">{{citem.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>
            <div class="right" :style="{width:width - 250 + 'px', height:height - 62 +'px'}">  
                <div :style="{width:width - 250 + 'px', height:height - 62 +'px',overflow:'auto'}">
                    <router-view :style="{width: width - 290 + 'px',background: 'white', borderRadius: '6px'}"/>
                </div>
            </div>
                
        </div>

        <!-- 消息 -->
        <el-drawer align="left"
            title="消息"
            size="50%"
            :visible.sync="msg_show"
            :direction="direction"
             :before-close="handleClose">
            <!-- border -->
            <!-- 数据表格 -->
            <!-- <div style="width: 100%;height: 30px;text-align: left;padding-left: 24px;box-sizing: border-box;font-size: 13px;color: #909399">
                    声音:  <el-switch  v-model="autoPlay"></el-switch>
                </div> -->
            <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',margin:'0 auto',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
            <el-table 
                            :data="rows"
                            stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                            width="40%"
                            :height="height - 140"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            @sort-change="onSortChange"
                            @current-change="onSelectRow"
                            style="width: 100%" 
                            size="mini" ref="configurationTable">
                            <el-table-column type="index" label="#" width="80px"></el-table-column>
                            <el-table-column prop="content_type" label="内容类型"></el-table-column>
                            <el-table-column prop="content" label="消息内容"></el-table-column>
                            <el-table-column prop="send_time" label="发送时间" :sortable=true></el-table-column>
                            <el-table-column
                            label="操作" width="230px" align="center">
                                <template slot-scope="scope">
                                    <!-- <div  @click="handleDel(scope.row)" type="text" size="small">删除</div> -->
                                    <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
            </div>
           
        </el-drawer>

        <!-- 我的 -->
        <el-dialog
            class="dd"
            :show-close="false"
            :visible.sync="my_show"
            width="400px" align="left">
            <el-tabs v-model="activeName" @tab-click="handleClicksss">
                <el-tab-pane style="width: 50%" label="登录名管理" name="first">
                    <el-form ref="form" :model="myFormDate" label-width="80px" label-position="left">
                        <el-form-item label="用户名">
                            <el-input prefix-icon="el-icon-user" v-model="set_uname" style="width: 240px"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane style="width: 50%" label="密码管理" name="second">
                    <el-form ref="form" :model="myFormDate" label-width="80px" label-position="left">
                        <el-form-item label="原密码"><el-input style="width: 240px" v-model="myFormDate.old_pwd"></el-input></el-form-item>
                        <el-form-item label="新密码">
                            <el-input prefix-icon="el-icon-key" style="width: 240px" show-password v-model="myFormDate.pwd" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
             <div slot="footer" style="width: 360px;text-align: right">
                <el-button @click="my_show = false">取 消</el-button>
                <el-button type="primary" @click="changeName">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";
    import { ShopMsgList, ShopMsgDel } from "@/api/request"

    if (!store.state.AdminData) {
        Vue.set(store.state, 'AdminData', {
            menus: [],
            left_menus: [],
            right_menus: [],
            active_uuid:'console',
            active_menu: {},
            active_title: '',
            manage_name: '个人中心',
            manage_mobile: '',
            ManageResetForm: {
                name: '',
                old_pwd: '',
                new_pwd: '',
            },
            msg_show: false,
            direction: 'rtl',
            countDownNum:12,
            timer:null,
             SearchFormData:{
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            autoPlay: true,
            showCircle: false,
            my_show: false,
            myFormDate: {
                username: '',
                pwd: ''
            },
            set_uname: lime.cookie_get('uname'),
            rows:[],
            total:0,
            loading:false,
            curr_row:null,
            
            path:"ws://47.110.162.90:8383",
            socket:"",
            get_message: true,
            activeName: 'first',

            SendFormData: {},
            msg_type: 0,  
            get_type: 10,
            content_type: 0,
            is_system: 0,
            activeNames: ['1'],
            show_card: false

        })
    }


    export default {

        data() {
            return store.state.AdminData
        },
        computed:{

            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            }
        },
        created() {
            this.set_uname = lime.cookie_get('uname'),
            this.initMenuList();
        },
        mounted() {
            this.init()
        },
        destroyed() {
            clearInterval(this.timer);
            this.socket.onclose = this.close

        },
        methods:{
            changeName() {
                if(this.activeName == 'first') {
                     lime.req('ShopStaffLoginEdit',{
                        login_token: lime.cookie_get('login_token'),
                        name: this.set_uname
                    }).then( res => {
                        this.my_show = false
                    }).catch(err => {
                        this.$message.error(err)
                    })
                }else {
                    lime.req('ShopStaffLoginPwd',{
                        login_token: lime.cookie_get('login_token'),
                        old_pwd: this.myFormDate.old_pwd,
                        pws: this.myFormDate.pwd
                    }).then( res => {
                        this.my_show = false
                    }).catch(err => {
                        this.$message.error(err)
                    })
                    }
                // myFormDate.username
            },
             changePass() {
                // myFormDate.username
                lime.req('ShopStaffLoginPwd',{
                    login_token: lime.cookie_get('login_token'),
                    old_pwd: this.myFormDate.old_pwd,
                    pws: this.myFormDate.pwd
                }).then( res => {
                    this.my_show = false
                }).catch(err => {
                    this.$message.error(err)
                })
            },
           handleClicksss(tab, event) {
                console.log(tab, event);
            },

            showCard() {
                this.show_card = !this.show_card
            },
            handleClicks(tab, event) {
                 setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs.configurationTable.doLayout()
                        this.$refs.configurationTables.doLayout()
                    })
                }, 50)
            },
            onSendSubmit() {
                this.SendFormData.msg_type = this.msg_type
                this.SendFormData.get_type = this.get_type
                this.SendFormData.content_type = this.content_type
                this.SendFormData.is_system = this.is_system
                this.SendFormData.login_token = lime.cookie_get('login_token')
                lime.req('ShopMsgSend',this.SendFormData).then(res => {
                    this.SendFormData.content = ''
                    lime.req('ShopMsgList', {login_token: lime.cookie_get('login_token')}).then(data => {
                        console.log(data)
                    })
                }).catch(err => {
                    this.$message.error(err)
                })
                console.log(99999)
            },

            init: function () {
                if(typeof(WebSocket) === "undefined"){
                    // alert("您的浏览器不支持socket")
                    this.$message.error('您的浏览器不支持socket')
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path)
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage
                    this.socket.onclose = this.close
                }
            },
            open: function (data) {
                this.$message.success('连接成功')
            },
            error: function () {
                this.$message.error('连接错误')
            },
            getMessage: function (msg) {
                let obj = msg.data.indexOf("{") != -1  ? JSON.parse(msg.data) : {}
                let that = this
                let wrow = this.rows
                if(obj.data) {
                     that.playAudio()
                    that.$message.success({message: '您有一条新消息',center: true});
                    wrow.push({
                        uuid: obj.data.recv_time,
                        content_type: obj.data.No,
                        content: obj.data.status,
                        msg_type: obj.data.extStatus,
                        send_type: obj.data.send_num,
                        send_time: obj.data.recv_time,
                        send_ip: obj.data.recv_time,
                        add_time: obj.data.recv_time
                    })
                    this.total = this.total - 0 + 1
                }
                this.rows = wrow
                if(this.total - 0 > 0) {
                        this.showCircle = true
                }else {
                    this.showCircle = false
                }
            },
            send: function () {
                this.socket.send(params)
            },
            close: function () {
                this.socket.close()
                console.log("socket已经关闭")
            },


            playAudio() {
                if(this.autoPlay) {
                 // this.$refs.audio.currentTime = 0; 
                 if(this.$refs.audio){
                     this.$refs.audio.play()
                 }
              }else {
                 if( this.$refs.audio) {
                      this.$refs.audio.pause()
                 }
              }

            },
            handleMsg() {
                this.msg_show = true;
                this.show_card = false;
                setTimeout(() => {
                    this.$nextTick(() => {
                        if(this.$refs.configurationTable) {
                            this.$refs.configurationTable.doLayout()
                        }
                        if(this.$refs.configurationTables) {
                            this.$refs.configurationTables.doLayout()
                        }
                    })
                }, 50)
            },
            handleClose(done) {
               setTimeout(() => {
                    this.$nextTick(() => {
                        if(this.$refs.configurationTable) {
                            this.$refs.configurationTable.doLayout()
                        }
                        if(this.$refs.configurationTables) {
                            this.$refs.configurationTables.doLayout()
                        }
                    })
                }, 50)
                done()
            },
            handleClick(row) {
                console.log(row);
            },
            handleDel(row) {
                this.$confirm('确认删除?', '提示').then(() => {
                    this.rows.splice(this.rows.findIndex(v => v.uuid === row.uuid), 1)
                    if(this.rows.length < 1) {
                        this.showCircle = false
                        this.total = 0
                    }
                })
            },




            // 排序处理
            onSortChange(sort) {
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                this.initTable();
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



             /**
             * 获取菜单列表
             */
            initMenuList() {
                lime.req('ShopMenuList', {
                    login_token:lime.cookie_get('login_token')
                }).then(res => {
                    this.menus = res.data;

                    // 左边的菜单处理
                    let _left_menu = [];
                    res.data.forEach(item => {
                        if (item.menu_type < 2){
                            _left_menu.push(item);
                        }
                    })

                    this.left_menus = util.toTree(_left_menu);

                    // 初始化右边菜单列表
                    this.initRightMenu(this.$route.params.menu_uuid);
                })
            },

            // 获取右边菜单  初始化右边菜单
            initRightMenu(uuid) {
                this.right_menus = [];

                if (uuid != '' && uuid != 'console') {
                    this.menus.forEach(item => {

                        // 处理左边菜单的当前点击或者刷新处理
                        if (item.uuid == uuid) {
                            this.active_menu = item;
                            this.active_title = item.name;
                            this.active_uuid = item.uuid;
                        }

                        
                        if (item.parent_uuid == uuid) {
                            this.right_menus.push(item);
                        }
                    });
                } else {
                    this.active_menu = {},
                    this.active_title = '控制台';
                    this.active_uuid  = 'console';
                }
            },

            onClickMenu(index,indexPath) {
                this.initRightMenu(index);

                console.log(this.active_menu);

                // 内部跳转链接
                if(this.active_menu.font_type == 0){
                    this.$router.push(this.active_menu.font_url + '/' + index);
                } else if (this.active_menu.font_type == 1) {
                    this[this.active_menu.font_url]();
                } else if (this.active_menu.font_type == 2) {
                    window.open(this.active_menu.font_url);
                } else {
                    this.$router.push('/admin/');
                }
            },
            onLogout() {
                this.show_card = false
                if (lime.cookie_get('login_token') == null) {
                    this.$router.push('/login');
                } else {
                    this.$confirm('确认退出系统?', '提示').then(() => {
                        lime.cookie_set('login_token', null, 0);
                        this.$router.push('/login');
                    })
                }
            }
        }
    }
</script>

<style>
 :focus{
        outline:0;
    }
  .el-menu-item.is-active{
    border-right: 4px solid  #0F7BF6!important;
    color: #0F7BF6!important;
    background:  #e7f2fe!important;
  }
  .el-submenu__title {
    font-size: 15px!important;
    font-weight: 400!important
  }
  .el-menu-item {
    font-size: 13px!important;
    font-weight: 200!important
  }
  .dd .el-dialog__header {
    padding: 0px!important;
    /* display: none; */
}
 </style>

<style scoped>
    .msg_icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: red;
      border-radius: 50%;
      position: relative;
      left: 8px;
      top: -10px;
      -webkit-animation-name: cirlceAnimate;
      -webkit-animation-duration: 0.5s;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-direction: alternate;
      -webkit-animation-timing-function: ease;
      -webkit-animation-play-state: running;
    }

    .head{
        height: 60px;
        line-height: 60px;
        width:100%;
        overflow: hidden;
    }

    .content {
        width:100%;
        overflow: hidden;
        /* border-top:solid 1px #e6e6e6; */
        /* padding: 20px;
        box-sizing: border-box; */
    }

    .left{
        width:250px;
        display: inline-block;
        overflow: hidden;
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        color: #2a2f3b;
    }

    .right{
        display: inline-block;
        overflow: hidden;
        text-align: left;
        background: #F6F7F9;
        padding: 20px 20px 0 20px; 
        box-sizing: border-box;
    }

    .topnav_box::-webkit-scrollbar {
        width: 7px;
        height: 10px;
        background-color: #b5b1b1;
    }

    .topnav_box::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: black;
    }

    .topnav_box::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #b5b1b1;
    }

    @-webkit-keyframes cirlceAnimate{
        0% {opacity: 1;}
        50% {opacity: 0.5;}
        100% {opacity: 0;}
    }

    .el-table--border th.gutter:last-of-type {
        display: table-cell !important;
    }

    .footer {
        position: absolute;
        bottom: 10px;
        width: 96%;
        padding-right: 20px!important;
        box-sizing: border-box;
    }

    .text {
        font-size: 14px;
        text-align: left;
    }

    .item {
        text-align: left;
    }

    .box-card {
        position: fixed;
        top: 50px;
        right: 10px;
        width: 120px;
        z-index: 9999999999;   
    }
   

    .head-flex {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .head-flexlf {
        width: 250px;
        height: 100%;
        background: #0F7BF6;
        text-align: center
    }

    .head-flexrg {
        height: 100%;
        font-size:16px;
        font-family: 'Microsoft YaHei Regular';
        text-align: left;
        padding-left: 20px;
        box-sizing: border-box;
        line-height: 60px;
    }



    /* .el-table th.gutter{
        display: table-cell!important;
    } */

</style>