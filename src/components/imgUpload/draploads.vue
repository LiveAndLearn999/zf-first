<template>
    <span >
         <el-upload
            action=""
            :multiple="false"
            list-type="picture-card"
            :on-remove="uploadRemove"
            :file-list="fileList"
            :on-change="handleChange"
            :http-request="uploadFile">
            <!-- :on-preview="handlePictureCardPreview" -->
            
            <img v-if="iconUrl" src="@/assets/imgs/font.png" alt="" style="width: 210px">
            <img v-else src="@/assets/imgs/back.png" alt="" style="width: 210px">

            <!-- <div class="img-flex">点击上传</div> -->
            <!-- <i class="el-icon-plus"></i> -->
        </el-upload>
        <!-- <el-image 
            v-if="dialogVisible"
            style="width: 30px; height: 30px"
            :src="dialogImageUrl" 
            :preview-src-list="[dialogImageUrl]">
        </el-image> -->
    </span>
</template>

<script>
import lime from "@/lime.js";
export default {
     name: "file",
     props: {
        imgUrl: { type: String, default: () => '' },
        iconUrl: {type: Boolean, default: () => false}
     },
     data() {
        return {
            img_url: '',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: []

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
     		let [formdata, file, timestamp,up_type,login_token] = [new FormData(), event.file, lime.get_timestamp(), 'file', lime.cookie_get('login_token')]
            formdata.append('sign',lime.md5_str(lime.set_sign({timestamp,up_type,login_token})))
            formdata.append('file', file)
            formdata.append('timestamp', timestamp)
            formdata.append('login_token', login_token)
            formdata.append('up_type', up_type)
            // this.fullscreenLoading = true;
            lime.req('OssShopUpload',formdata,{'Content-Type': 'multipart/form-data'}).then(res => {
                this.img_url = res.data.url
                this.dialogVisible = true;
                this.dialogImageUrl = res.data.url;
                // this.imgUrl = res.data.url
                //this.show_img = true
                this.fullscreenLoading = false
            }).catch(err => {
                this.fullscreenLoading = false
                this.$message.error(err)
            })
     	},
         handlePictureCardPreview(file) {
            console.log(99999)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
         handleChange(file, fileList) {
             console.log(file)
             if(fileList.length > 1) {
                fileList = fileList.shift()
             }
            //  fileList = [fileList[fileList.length - 1]]
                //  if (fileList.length > 0) {
                //      this.form.fileList = [fileList[fileList.length - 1]] 
                //  }
             },

     }
 }
</script>
<style >
    .el-upload {
        /* width: 210px; */
        border: none;
        background: none;
    }

    .img-flex {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        border: 1px solid red;
        margin-bottom: 30px;
    }
</style>