<<<<<<< HEAD
<template>
    <div v-wechat-title="$route.meta.title">
        <div class="head">
            <el-row class="w1200" >
                <el-col :span="8" style="text-align: left;">
                    <img src="@/assets/imgs/login-log.fw.png" style="display: block; height: 60px;">
                </el-col>
                <el-col :span="16" style="text-align: right;">
                    
                </el-col>
            </el-row>
        </div>

        <div class="content">
            <el-row class="w1200" :style="{height:height - 106 + 'px'}">
                <el-col :span="18">
                    <div style="text-align: left; padding-top: 10%;">
                        <img src="@/assets/imgs/zhutu.fw.png" style="width:50%;" />
                    </div>

                </el-col>
                <el-col :span="6" style="text-align: right;padding-top: 15%;">
                    <el-card>
                        <div slot="header">
                            <h3 style="text-align:left; color:#ec3722;">
                                <!-- 运营管理后台 -->
                            </h3>
                        </div>

                        <el-form ref="form" :model="LoginFormData">
                            <el-form-item>
                                <el-input
                                    ref="mobile"
                                    :autofocus="true"
                                    prefix-icon="el-icon-mobile-phone"
                                    :maxlength="11"
                                    show-word-limit
                                    @keyup.enter.native="onPwdFocus"
                                    placeholder="请输入11位手机号码"
                                    v-model="LoginFormData.mobile"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-input 
                                    ref="pwd"
                                    prefix-icon="el-icon-key"
                                    show-password 
                                    :maxlength="20"
                                    :minlength="6"
                                    @keyup.enter.native="LoginSubmit"
                                    v-loading.fullscreen.lock="loading"
                                    placeholder="请输入6-20位密码"
                                    v-model="LoginFormData.pwd"></el-input>
                            </el-form-item>
                        </el-form>

                        <div style="text-align: center;">
                            <el-button
                                @click="LoginSubmit" 
                                type="danger"
                                :disabled="!enable_login_btn"
                                style="width:180px;">登录</el-button>
                        </div>
                    </el-card>
                    
                </el-col>
            </el-row>
        </div>

        <div class="foot">
            洲峰电子 &copy; 皖ICP备12345678号
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";

    if (!store.state.LoginData) {
        Vue.set(store.state, 'LoginData', {
            LoginFormData:{
                mobile:'',
                pwd:''
            },
            loading:false,
        });
    }

    export default {
        data() {
            return store.state.LoginData
        },
        computed:{
            height:() => {
                return store.state.AppData.height;
            },
            width:() => {
                return store.state.AppData.width
            },

            // 提交按钮是否可用
            enable_login_btn() {
                if (!util.reg_mobile(this.LoginFormData.mobile)) {
                    return false;
                }

                if (!util.reg_pwd(this.LoginFormData.pwd)){
                    return false;
                }

                return true;
            }
        },
        created() {

        },
        methods:{
            // 登录处理
            LoginSubmit() {
                if (!util.reg_mobile(this.LoginFormData.mobile)) {
                    this.$message.error('手机账号错误');
                    return false;
                }

                if (!util.reg_pwd(this.LoginFormData.pwd)){
                    this.$message.error('登录密码错误');
                    return false;
                }


                
                this.loading = true;
                lime.req('ShopStaffLogin', this.LoginFormData).then(res => {
                    lime.cookie_set('login_token', res.data.login_token, 7200);
                    lime.cookie_set('uname', this.LoginFormData.mobile, 7200);
                    this.$router.push('/admin');
                    setTimeout(() => {
                        this.loading = false;
                    }, 600);
                }).catch(err => {
                    this.$message.error(err.msg);
                    this.loading = false;
                })

                // 超时10秒中自动关闭
                setTimeout(() =>{
                    this.loading = false;
                }, 10000);
            },
            onPwdFocus() {
                if (this.LoginFormData.mobile == '') {
                    this.$message.error('手机账号不能为空');
                    return false;
                }

                if (!util.reg_mobile(this.LoginFormData.mobile)) {
                    this.$message.error('手机账号格式错误');
                    return false;
                }

                

                this.$refs['pwd'].$el.children[0].focus();
            }
        }
    }
</script>

<style scoped>
    .logo-img{
        display: inline-block;
    }

    .logo-title{
        display: inline-block;
        vertical-align: top;
        font-size: 18px;
        color: #303133;
        font-weight: bold;
    }
    

    .head{
        line-height: 60px;
        height: 60px; 
        overflow: hidden;
    }

    .w1200{
        width:1200px;
        margin:0 auto;
    }

    .content{
        background-color: #070709;
    }

    .foot{
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #999;
    }
=======
<template>
    <div v-wechat-title="$route.meta.title">
        <div class="head">
            <el-row class="w1200" >
                <el-col :span="8" style="text-align: left;">
                    <img src="@/assets/imgs/login-log.fw.png" style="display: block; height: 60px;">
                </el-col>
                <el-col :span="16" style="text-align: right;">
                    
                </el-col>
            </el-row>
        </div>

        <div class="content">
            <el-row class="w1200" :style="{height:height - 106 + 'px'}">
                <el-col :span="18">
                    <div style="text-align: left; padding-top: 10%;">
                        <img src="@/assets/imgs/zhutu.fw.png" style="width:50%;" />
                    </div>

                </el-col>
                <el-col :span="6" style="text-align: right;padding-top: 15%;">
                    <el-card>
                        <div slot="header">
                            <h3 style="text-align:left; color:#ec3722;">
                                <!-- 运营管理后台 -->
                            </h3>
                        </div>

                        <el-form ref="form" :model="LoginFormData">
                            <el-form-item>
                                <el-input
                                    ref="mobile"
                                    :autofocus="true"
                                    prefix-icon="el-icon-mobile-phone"
                                    :maxlength="11"
                                    show-word-limit
                                    @keyup.enter.native="onPwdFocus"
                                    placeholder="请输入11位手机号码"
                                    v-model="LoginFormData.mobile"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-input 
                                    ref="pwd"
                                    prefix-icon="el-icon-key"
                                    show-password 
                                    :maxlength="20"
                                    :minlength="6"
                                    @keyup.enter.native="LoginSubmit"
                                    v-loading.fullscreen.lock="loading"
                                    placeholder="请输入6-20位密码"
                                    v-model="LoginFormData.pwd"></el-input>
                            </el-form-item>
                        </el-form>

                        <div style="text-align: center;">
                            <el-button
                                @click="LoginSubmit" 
                                type="danger"
                                :disabled="!enable_login_btn"
                                style="width:180px;">登录</el-button>
                        </div>
                    </el-card>
                    
                </el-col>
            </el-row>
        </div>

        <div class="foot">
            洲峰电子 &copy; 皖ICP备12345678号
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";

    if (!store.state.LoginData) {
        Vue.set(store.state, 'LoginData', {
            LoginFormData:{
                mobile:'',
                pwd:''
            },
            loading:false,
        });
    }

    export default {
        data() {
            return store.state.LoginData
        },
        computed:{
            height:() => {
                return store.state.AppData.height;
            },
            width:() => {
                return store.state.AppData.width
            },

            // 提交按钮是否可用
            enable_login_btn() {
                if (!util.reg_mobile(this.LoginFormData.mobile)) {
                    return false;
                }

                if (!util.reg_pwd(this.LoginFormData.pwd)){
                    return false;
                }

                return true;
            }
        },
        created() {

        },
        methods:{
            // 登录处理
            LoginSubmit() {
                if (!util.reg_mobile(this.LoginFormData.mobile)) {
                    this.$message.error('手机账号错误');
                    return false;
                }

                if (!util.reg_pwd(this.LoginFormData.pwd)){
                    this.$message.error('登录密码错误');
                    return false;
                }


                
                this.loading = true;
                lime.req('ShopStaffLogin', this.LoginFormData).then(res => {
                    lime.cookie_set('login_token', res.data.login_token, 7200);
                    lime.cookie_set('uname', this.LoginFormData.mobile, 7200);
                    this.$router.push('/admin');
                    setTimeout(() => {
                        this.loading = false;
                    }, 600);
                }).catch(err => {
                    this.$message.error(err.msg);
                    this.loading = false;
                })

                // 超时10秒中自动关闭
                setTimeout(() =>{
                    this.loading = false;
                }, 10000);
            },
            onPwdFocus() {
                if (this.LoginFormData.mobile == '') {
                    this.$message.error('手机账号不能为空');
                    return false;
                }

                if (!util.reg_mobile(this.LoginFormData.mobile)) {
                    this.$message.error('手机账号格式错误');
                    return false;
                }

                

                this.$refs['pwd'].$el.children[0].focus();
            }
        }
    }
</script>

<style scoped>
    .logo-img{
        display: inline-block;
    }

    .logo-title{
        display: inline-block;
        vertical-align: top;
        font-size: 18px;
        color: #303133;
        font-weight: bold;
    }
    

    .head{
        line-height: 60px;
        height: 60px; 
        overflow: hidden;
    }

    .w1200{
        width:1200px;
        margin:0 auto;
    }

    .content{
        background-color: #070709;
    }

    .foot{
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #999;
    }
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
</style>