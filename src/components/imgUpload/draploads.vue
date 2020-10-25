<template>
    <span class="cc">
        <!-- :file-list="fileList" -->
         <el-upload
            action=""
            :multiple="false"
            drag
            :on-remove="uploadRemove"
            :file-list="fileList"
            :show-file-list="false"
            :on-change="handleChange"
            :http-request="uploadFile">
            <!-- list-type="picture-card" -->
            <div class="img-content" style="">
                <img v-if="imgUrl" :src="imgUrl" alt="" style="height: 135px">
                <img v-else-if="img_url" :src="img_url" alt="" style="height: 133px;margin-top: 1px">
                <img v-else-if="iconUrl" src="@/assets/imgs/back.png" alt="" style="height: 133px;margin-top: 1px">
                <img v-else src="@/assets/imgs/font.png" alt="" style="height: 133px;margin-top: 1px">
                <div id="img-word" style="">{{msg}}</div>
            </div>
            <div></div>




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
            fileList: [],
            msg: '点击/拖拽上传'

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
                 this.msg = '点击/拖拽上传'
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
                 this.msg = '点击/拖拽重新上传'
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
    .cc .el-upload-dragger {
        width: auto;
        height: auto;
        border: none;
        padding: 10px;
        box-sizing: border-box;
    }
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
    .img-content {
        position: relative;
        width: 240px; 
        height: 135px;
        overflow: hidden;
        padding: 0;
        border: 1px solid lightgray;
    }

    /* .img-content:hover .img-word{
        color: red;
    } */

    .img-content:hover {
        /* dotted */
        border: 1px solid #409EFF;
    }

     .img-content:hover #img-word{
       color: #409EFF;
    }

    #img-word {
        position: absolute;
        width: 240px;
        /* height: 135px; */
        top: 30%;
        /* line-height: 135px; */
        text-align: center;
        color: lightgray;
    }

  

   
</style>