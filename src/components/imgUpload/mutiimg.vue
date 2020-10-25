<template>
    <div>
        <el-row  class="show-img">
            <el-col :span="3" v-for="(value,index) in fileListss" :key="index" >
                <div style="position: relative;">
                    <el-image 
                        style="width: 60px; height: 60px;"
                        :src="value" 
                        :preview-src-list="[value]">
                    </el-image>
                    <i class="el-icon-circle-close" style="position: absolute;color: red;color: red;font-size: 16px;left: -6px;top: -6px" @click="delimg(index)"></i>
                </div>
                <!-- <img :src="value" alt="" style="height:50px" title="点击删除" @click="delimg(index)"> -->
            </el-col>


            <el-col :span="3">
                <el-upload  :multiple="true"  
                :show-file-list="false"
            :http-request="uploadFile" 
            action="" 
            :on-remove="uploadRemove">
            <div style="width: 40px;height: 40px;border: 1px solid lightgray; text-align: center; line-height: 40px;font-size: 24px;margin-top: 10px;margin-left:10px">
                <i class="el-icon-plus"></i></div>                
        </el-upload>
            </el-col>

        </el-row>
        <!-- <el-row>
            <el-col :span="24">
                <el-upload  :multiple="true"  
                :show-file-list="false"
            :http-request="uploadFile" 
            action="" 
            :on-remove="uploadRemove">
            <div style="width: 50px;height: 50px;border: 1px solid lightgray; text-align: center; line-height: 50px;font-size: 24px">
                <i class="el-icon-plus"></i></div>                
        </el-upload>
            </el-col>
        </el-row>
 -->


         <!-- <div class="show-img" v-for="(value,index) in fileListss" :key="index">
            <div class="show-imgitm" >
                <img :src="value" alt="" style="height: 100px" title="点击删除">
            </div>
        </div> -->
      
    </div>

</template>

<script>
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
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
export default {
     name: "file",
     props: {
        imgUrl: { type: String, default: () => '' },
        fileListss: {type: Array, default: () => []}
     },
     data() {
        return {
            img_url: '',
            // fileListss: [],
            files: []
        }
     },
     created() {
         this.img_url = ''
     },
     methods: {
         delimg(val) {
             this.fileListss.splice(val,1)
            console.log(val)
         },
     	uploadRemove(file,fileList) {
     		console.log(1111)
     		console.log(file)
     		if(!fileList.length) {
     			this.img_url = ''
     		}
     		console.log(fileList)
         },
     	uploadFile(event) { 
     		console.log(event)
            NProgress.start(); 
     		let [formdata, file, timestamp,up_type,login_token] = [new FormData(), event.file, lime.get_timestamp(), 'file', lime.cookie_get('login_token')]
            formdata.append('sign',lime.md5_str(lime.set_sign({timestamp,up_type,login_token})))
            formdata.append('file', file)
            formdata.append('timestamp', timestamp)
            formdata.append('login_token', login_token)
            formdata.append('up_type', up_type)
            // this.fullscreenLoading = true;
            lime.req('OssShopUpload',formdata,{'Content-Type': 'multipart/form-data'}).then(res => {
                this.img_url = res.data.url;
                console.log(88888)
                let fs = this.fileListss;
                fs.push(res.data.url)
                this.fileListss = fs
                NProgress.done(); 

                // console.log(this.fileList)
                // console.log(99999)
                // let fss = this.files
                // fss.push(event.file)
                // this.files = fss
                // this.fullscreenLoading = false
            }).catch(err => {
                console.log(99999)
                // this.fullscreenLoading = false
                // this.$message.error(err)
            })
     	}
     }
 }
</script>
<style  scoped>
  .show-img {
      width: 100%;
      height: 100px;
      /* display: flex; */
      /* flex-direction: row; */
  }

  .show-imgitm {
      width: 100%;
      height: 100px;
      /* border: 1px solid red; */
    text-align: center;
    margin-top: 10px;
    border: 1px solid lightgray
  }  
</style>