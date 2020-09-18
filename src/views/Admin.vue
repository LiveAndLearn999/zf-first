<template>
    <div v-wechat-title="$route.meta.title">
        <div class="head">
            <el-row>
                <el-col :span="8" style="text-align: left;">
                    <img src="@/assets/imgs/login-log.fw.png" style="height: 60px; display: block;">
                </el-col>
                <el-col :span="16" style="text-align: right">
                    <div style="padding-right: 20px;">
                        <span class="msg_icon"></span>
                        <el-button type="text" @click="handleMsg">消息</el-button>
                        <el-button type="text">我的</el-button>
                        <el-button type="danger" @click="onLogout" plain size="mini">退出</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <audio controls="controls" hidden  src="../assets/msg.mp3" ref="audio"></audio>


        <div class="content" :style="{width:width + 'px', height:height - 62 +'px'}">
            <div class="left">
                <div :style="{width:'100%', height:height - 62 +'px', overflow:'auto'}" class="topnav_box">
                    <el-menu
                        @select="onClickMenu"
                        :style="{height:height - 62 +'px',textAlign:'left'}"
                        :default-active="active_uuid">
                        <el-menu-item index="console">控制台</el-menu-item>
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
                    <router-view />
                </div>
            </div>
                
        </div>

        <el-drawer
            title="消息列表"
            size="40%"
            :visible.sync="msg_show"
            :direction="direction">
            <!-- border -->
            <!-- 数据表格 -->
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
                    size="mini" ref="configurationTable">
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="content_type" label="内容类型"></el-table-column>
                    <el-table-column prop="content" label="消息内容"></el-table-column>
                    <el-table-column prop="send_time" label="发送时间" :sortable=true></el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">详细</el-button>
                            <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="page" style="width: 100%;text-align: right">
                    <el-pagination
                        :current-page.sync="SearchFormData.page_num"
                        @current-change="onPageChange"
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-drawer>

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
            countDownNum:120,
            timer:null,
            rows:[],
            total:0,
            loading:false,
            curr_row:null,
             SearchFormData:{
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
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
            this.initMenuList();
        },
        mounted() {
            this.countDown()
        },
        destroyed() {
            clearInterval(this.timer);
        },
        methods:{
            countDown(){
                let that = this
                this.timer=setInterval(() => {
                    this.countDownNum--;
                    console.log(1111)
                    if(this.countDownNum % 5 === 0) {
                        that.playAudio()
                        that.$message.success({message: '您有一条新消息',
          center: true});
                    }
                    if(this.countDownNum<=0){
                        clearInterval(this.timer);
                    }
                },1000);
            },
            playAudio() {
                this.$refs.audio.currentTime = 0; //从头开始播放提示音
                this.$refs.audio.play(); //播放

            },
            handleMsg() {
                this.msg_show = true;
                this.initTable()
            },
            initTable() {
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                }
                this.loading = true;
                ShopMsgList(pam, res => {
                    this.$refs.configurationTable.doLayout()
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            handleClick(row) {
                console.log(row);
            },
            handleDel(row) {
                console.log(row)
                this.$confirm('确认删除?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:row.uuid
                    }
                    ShopMsgDel(pam, res => {
                        this.initTable();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                }).catch(err => {
                    console.log(111)
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

<style scoped>
    .msg_icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: red;
      border-radius: 50%;
      position: relative;
      left: 2px;
      top: -8px;
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
        border-top:solid 1px #e6e6e6;
    }

    .left{
        width:250px;
        display: inline-block;
        overflow: hidden;
    }

    .right{
        display: inline-block;
        overflow: hidden;
        text-align: left;
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

    /* .el-table th.gutter{
        display: table-cell!important;
    } */
</style>