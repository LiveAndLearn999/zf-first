<template>
    <span style="display: inline-block;width: 240px">
                <el-upload drag :multiple="false"  :http-request="uploadFile" action="" :on-remove="uploadRemove">
                	<!-- :auto-upload="false" -->
                     <img v-if="img_url" :src="img_url" alt="" style="width: 240px">
                    <img v-else-if="imgUrl" :src="imgUrl" alt="" style="width: 240px">
                    <div v-else>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </div>
                    <!-- <div class="el-upload__text">只能上传xls/xlsx文件</div> -->
                </el-upload>
            
        <!-- <el-row style="width: 240px">
            <el-col :span="16">
                <el-upload drag :multiple="false"  :http-request="uploadFile" action="" :on-remove="uploadRemove">
                	:auto-upload="false"
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__text">只能上传xls/xlsx文件</div>
                </el-upload>
            </el-col>
         </el-row> -->
    </span>
</template>

<script>
import lime from "@/lime.js";
export default {
     name: "file",
     props: {
        imgUrl: { type: String, default: () => '' }
     },
     data() {
        return {
            img_url: '',
        }
     },
     created() {
         this.img_url = ''
     },
     methods: {
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
     		let [formdata, file, timestamp,up_type,login_token] = [new FormData(), event.file, lime.get_timestamp(), 'file', lime.cookie_get('login_token')]
            formdata.append('sign',lime.md5_str(lime.set_sign({timestamp,up_type,login_token})))
            formdata.append('file', file)
            formdata.append('timestamp', timestamp)
            formdata.append('login_token', login_token)
            formdata.append('up_type', up_type)
            // this.fullscreenLoading = true;
            lime.req('OssShopUpload',formdata,{'Content-Type': 'multipart/form-data'}).then(res => {
                this.img_url = res.data.url
                // this.imgUrl = res.data.url
                //this.show_img = true
                this.fullscreenLoading = false
            }).catch(err => {
                this.fullscreenLoading = false
                this.$message.error(err)
            })
     	}
     }
 }
</script>