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

                        <!-- <el-form ref="form" :model="LoginFormData">
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
                        </div> -->
                    </el-card>
                    
                </el-col>
            </el-row>
        </div>

        <div class="foot">
            洲峰电子 &copy; 皖ICP备12345678号
        </div>

       <div class="box">
            <div class="title-can">
               <div><img src="@/assets/imgs/logo.png" alt="" style="margin-top:12px"></div>
               <div style="height: 60px;line-height: 60px;padding-left: 10px;box-sizing: border-box">
                   <span class="word-bg">TMS管理系统</span>
               </div>
                <!-- <img src="logo.png" alt="" style="height: 36px">  -->
            </div>
            <div class="fiedx-logo">
                <div class="fiedx-title"><i class="el-icon-user"></i> 欢迎登录</div>
                <el-form ref="form" :model="LoginFormData">
                            <el-form-item label="账号">
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

                            <el-form-item label="密码">
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

                        <div style="text-align: center;top: 20px;position: relative">
                            <el-button
                                @click="LoginSubmit" 
                                type="danger"
                                :disabled="!enable_login_btn"
                                style="width:100%;">登录</el-button>
                        </div>
                
            </div>
            <canvas id="canvas" width="1440" height="821"></canvas>
            <div class="footer-can">洲峰电子 © 皖ICP备12345678号</div>
       </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";

    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })

    if (!store.state.LoginData) {
        Vue.set(store.state, 'LoginData', {
            LoginFormData:{
                mobile:'',
                pwd:''
            },
            loading:false,








        canvas: null,
        context: null,
        warea: {
                x: null,
                y: null,
                max: 20000
        },
        bgimg: null,
        bfimg: null,
        cicle: null,
        cicles: null,
        cicless: null,
        progresss: 0,
        progressss: 0,
        progress: 0

        });
    }
    var dots = []
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
        this.canvas = null
         this.context = null
        this.warea =  {
                x: null,
                y: null,
                max: 20000
        }
        dots = []
        this.bgimg =null
        this.bfimg = null
        this.cicle =  null
        this.cicles = null
        this.cicless = null
        this.progresss = 0
        this.progressss = 0
        this.progress = 0
        
           window.cancelAnimationFrame(this.animate)
           window.cancelAnimationFrame(this.render)
           window.cancelAnimationFrame(this.renders)
            window.cancelAnimationFrame(this.renderss) 
        },
        mounted() {
             this.initCanvas()
             window.requestAnimationFrame(this.animate)
             window.requestAnimationFrame(this.render)
             window.requestAnimationFrame(this.renders)
             window.requestAnimationFrame(this.renderss)
        },
        destroyed() {
            window.cancelAnimationFrame(this.animate)
            window.cancelAnimationFrame(this.render)
            window.cancelAnimationFrame(this.renders)
            window.cancelAnimationFrame(this.renderss)
        },
        methods:{
            render() {
                if(this.$route.meta.title !== '登录') {
                    return false
                }
                // this.context.clearRect(0, 0, canvas.width, canvas.height)
                this.progress += 1;
                if (this.progress < 76) {
                    this.context.drawImage(this.cicle,605 - this.progress,696 - this.progress * 0.55,10,10);
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 150) {
                    this.context.drawImage(this.cicle,605 - this.progress,662 + (this.progress - 76) * 0.4,10,10);
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 240) {
                this.context.drawImage(this.cicle,590 - this.progress,690 - (this.progress - 136) * 0.6,10,10);
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 245){
                window.requestAnimationFrame(this.render);
                console.log(111)
                }else if(this.progress < 300) {
                this.context.drawImage(this.cicle,155 + this.progress,620 - (this.progress - 136) * 0.6,10,10);
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 320) {
                this.context.drawImage(this.cicle,750 - this.progress,666 - this.progress * 0.5,10,10);
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 400) {
                this.context.drawImage(this.cicle,116 + this.progress,666 - this.progress * 0.52,10,10);
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 500) {
                    window.requestAnimationFrame(this.render);
                }else if(this.progress < 600) {
                this.context.drawImage(this.cicle,980 - this.progress,590 - this.progress * 0.52,10,10);
                    window.requestAnimationFrame(this.render);
                }
                else if(this.progress < 680) {
                this.context.drawImage(this.cicle,this.progress - 226, 566 - this.progress * 0.5,10,10);
                    window.requestAnimationFrame(this.render);
                }
                else {
                this.progress = 0 
                this.render()
                console.log(1111)
                }
            },
            renderss() {
                if(this.$route.meta.title !== '登录') {
                    return false
                }
                // this.context.clearRect(0, 0, canvas.width, canvas.height)
                this.progressss += 1; //修改图像的位置
                if (this.progressss < 240) { 
                this.context.drawImage(this.cicless,1330 - this.progressss,460 + this.progressss * 0.55,10,10);
                    window.requestAnimationFrame(this.renderss);
                }else if (this.progressss < 310) { 
                this.context.drawImage(this.cicless,860 + this.progressss,466 + this.progressss * 0.55,10,10);
                    window.requestAnimationFrame(this.renderss);
                }
                else {
                    this.progressss = 0 
                    this.renderss()
                    console.log(77777)
                }
            },
            renders() {
                if(this.$route.meta.title !== '登录') {
                    return false
                }
            //    this.context.clearRect(0, 0, canvas.width, canvas.height)
               this.progresss += 1; //修改图像的位置
                if (this.progresss < 280) { 
                this.context.drawImage(this.cicles,770 + this.progresss,642 - this.progresss * 0.55,10,10);
                    window.requestAnimationFrame(this.renders);
                }else {
                    this.progresss = 0 
                    this.renders()
                    console.log(9999)
                }
            },
            animate(context,canvas) {
                if(this.$route.meta.title !== '登录') {
                    return false
                }
                context = this.context
                canvas = this.canvas
                context.clearRect(0, 0, canvas.width, canvas.height)
                var ndots = [this.warea].concat(dots)
                dots.forEach(dot => {  // 粒子位移
                    dot.x += dot.xa
                    dot.y += dot.ya
                    dot.xa *= dot.x > canvas.width || dot.x < 0 ? -1 : 1
                    dot.ya *= dot.y > canvas.height || dot.y < 0 ? -1 : 1
                    // 绘制点
                    context.fillRect(dot.x - 1, dot.y - 1, 2, 2)
                    // context.fillStyle = "rgba(255,218,27,1)";
                    context.fillStyle = "#2766F0";
                    // 循环比对粒子间的距离
                    for (var i = 0; i < ndots.length; i++) {
                        var d2 = ndots[i]
                        if (dot === d2 || d2.x === null || d2.y === null) continue
                        let [xc, yc, dis, ratio] = [dot.x - d2.x, dot.y - d2.y, '' , '']
                        // 两个粒子之间的距离
                        dis = xc * xc + yc * yc
                        // 如果两个粒子之间的距离小于粒子对象的max值
                        //则在两个粒子间画线
                        if (dis < d2.max) {
                            // 如果是鼠标，则让粒子向鼠标的位置移动
                            if (d2 === this.warea && dis > d2.max / 2) {
                                dot.x -= xc * 0.03
                                dot.y -= yc * 0.03
                            }
                            // 计算距离比
                            ratio = (d2.max - dis) / d2.max
                            // 画线
                            context.beginPath()
                            context.lineWidth = ratio / 2
                            // context.strokeStyle = "rgba(255,218,27,1)"
                            context.strokeStyle = "#2766F0"
                            context.moveTo(dot.x, dot.y)
                            context.lineTo(d2.x, d2.y)
                            context.stroke()
                        }
                    }
                    ndots.splice(ndots.indexOf(dot), 1) // 从数组中删除已经计算过的粒子
                })
                window.requestAnimationFrame(this.animate)
                // context.drawImage(bgimg,273,226);
                context.drawImage(this.bgimg,150, 100);
                context.drawImage(this.bfimg, -300,document.body.clientHeight -180,document.body.clientWidth + 600,200);
            },
            initCanvas() {
                if(this.$route.meta.title !== '登录') {
                    return false
                }
                this.canvas = document.getElementById("canvas")
                this.context = this.canvas.getContext("2d")
                this.canvas.width = document.body.clientWidth
                this.canvas.height = document.body.clientHeight
                this.bgimg = new Image();
                this.bfimg = new Image();
                // var dd = new Image();
                this.bgimg.src = require('@/assets/imgs/bg.png')
                this.bfimg.src = require('@/assets/imgs/bbk.png')
                this.cicle = new Image();
                this.cicle.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
                this.cicles = new Image();
                this.cicles.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
                this.cicless = new Image();
                this.cicless.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'

                window.onmousemove = e => { //获取鼠标活动时的鼠标坐标
                    this.warea.x = e.clientX
                    this.warea.y = e.clientY
                }
                window.onmouseout = e => { //鼠标移出界面时清空
                    this.warea.x = null
                    this.warea.y = null
                }
                // var dots = [] // 所有粒子`
                for (var i = 0; i < 500; i++) {
                    dots.push({
                        x: Math.random() * this.canvas.width, // x  , y  为  粒子坐标
                        y: Math.random() * this.canvas.height,
                        xa: Math.random() * 2 - 1, // xa , ya 为  粒子 xy 轴加速度
                        ya: Math.random() * 2 - 1,
                        max: 6000 //max为  连线的最大距离
                    })
                }
            },

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


                
                // this.loading = true;
                NProgress.start();
                lime.req('ShopStaffLogin', this.LoginFormData).then(res => {
                    lime.cookie_set('login_token', res.data.login_token, 7200);
                    lime.cookie_set('uname', this.LoginFormData.mobile, 7200);
                    this.$router.push('/admin');
                    window.cancelAnimationFrame(this.animate)
                    window.cancelAnimationFrame(this.render)
                    window.cancelAnimationFrame(this.renders)
                    window.cancelAnimationFrame(this.renderss)
                    setTimeout(() => {
                        NProgress.done();
                        // this.loading = false;
                    }, 600);
                }).catch(err => {
                    this.$message.error(err.msg);
                    NProgress.done();
                    // this.loading = false;
                })

                // 超时10秒中自动关闭
                setTimeout(() =>{
                    NProgress.done();
                    // this.loading = false;
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

<style>
.el-input__count-inner {
        background: transparent!important;
    }
/* input:-webkit-autofill {
        background-color: red !important;
}
    .el-input__inner {    
        height: 40px;    
        font-size: 13px;    
        box-shadow: none;    
        border: 1px solid #e9e9e9;
        border: none;
        color: #95bceb;
        border-radius: 4px;
        background: #0e3385!important;
    } 
    .el-input__count-inner {
        background: transparent!important;
    }
    .el-input__inner:hover {   
         border-color: #e9e9e9;
    } 
    .el-input__inner:focus {    
        border-color: #42a5f5;    
        box-shadow: none;    
        transition-duration: .5s;
    } 
    .el-input__inner::-webkit-input-placeholder {    
        line-height: 20px;
    }  */


    /* .el-input__inner, .el-checkbox__inner, .el-textarea__inner, .el-button {    
        border-radius: 0;
    } */
</style>
<style scoped>
    .fiedx-title {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #0E3792;
        font-size: 24px;
        font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        line-height: 60px;

    }

    .fiedx-logo {
        position: fixed;
        right: 240px;
        top: 250px;
        width: 344px;
        height: 373px;
        background: linear-gradient(0deg,#061e52 0%, #0e3488 100%);
        border: 1px solid #2766f0;
        border-radius: 4px;
        padding: 20px;
        box-sizing: border-box;
    }

    .box {
        overflow: hidden;
       	background: linear-gradient(0deg,#03022b 0%, #07054f 100%);
        position:absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

       .footer-can {
        width: 100%;
        height: 40px;
        position: fixed;
        bottom: 0;
        left:  0;
        background: transparent;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: white;
      }

      .title-can {
      	position: fixed;
      	top: 0;
        width: 100%;
      	text-align: left;
      	width: 100%;
      	height: 60px;
      	border:  1px solid transparent;
      	color: white;
      	font-size: 16px;
          padding-left: 272px;
          box-sizing: border-box;
          line-height: 60px;
          display: flex;
          flex-direction: row;
      }

      .title-can img {
          height: 36px;
      }

      .word-bg {
          padding: 6px 12px;
          box-sizing: border-box;
          background: #1541b1;
          border-radius: 16px;
      }




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
        /* background-color: #070709; */
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
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>