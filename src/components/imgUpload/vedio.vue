<!--
 * @Author: your name
 * @Date: 2020-09-22 18:11:17
 * @LastEditTime: 2020-09-27 15:09:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/imgUpload/upload.vue
-->
<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
        <div>
            <a href="javascript:;" class="file">
                选择视频<input type="file" name="file" @change="upimg($event)">
            </a>
        </div>
        <img v-if="show_img" :src="img_url" alt="" style="width: 60px;">
    </div>
</template>
<script>
import lime from "@/lime.js";
export default {
     name: "file",
     data() {
        return {
            show_img: false,
            img_url: '',
            fullscreenLoading: false
        }
     },
     created() {
         this.img_url = ''
         this.show_img = false
     },
     methods: {
        upimg(el) {
            // this.$forceUpdate()
            let [formdata, file, timestamp,up_type,login_token] = [new FormData(), el.target.files[0], lime.get_timestamp(), 'file', lime.cookie_get('login_token')]
            formdata.append('sign',lime.md5_str(lime.set_sign({timestamp,up_type,login_token})))
            formdata.append('file', file)
            formdata.append('timestamp', timestamp)
            formdata.append('login_token', login_token)
            formdata.append('up_type', up_type)
            this.fullscreenLoading = true;
            lime.req('OssShopUpload',formdata,{'Content-Type': 'multipart/form-data'}).then(res => {
                this.img_url = res.data.url
                this.show_img = true
                this.fullscreenLoading = false
            }).catch(err => {
                this.fullscreenLoading = false
                this.$message.error(err)
            })
                
        },
     }
}
</script>
<style scoped>
    .file {
        position: relative;
        display: inline-block;
        background:#419eff;
        /* border: 1px solid #99D3F5; */
        border-radius: 4px;
        padding: 8px 12px;
        overflow: hidden;
        color: white;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #419eff;
        /* border-color: #78C3F3; */
        /* color: #004974; */
        text-decoration: none;
    }
</style>>


