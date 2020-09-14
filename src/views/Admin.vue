<template>
    <div v-wechat-title="$route.meta.title">
        <div class="head">
            <el-row>
                <el-col :span="8" style="text-align: left;">
                    <img src="@/assets/imgs/login-log.fw.png" style="height: 60px; display: block;">
                </el-col>
                <el-col :span="16" style="text-align: right">
                    <div style="padding-right: 20px;">
                        <el-button type="text">消息</el-button>
                        <el-button type="text">我的</el-button>
                        <el-button type="danger" @click="onLogout" plain size="mini">退出</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

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
    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";

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
        methods:{
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
</style>