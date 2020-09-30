<template>
  <div class="videoUpload">
    <div>
      <label v-if="isEncrypt == 1 || isEncrypt == 0" for="fileUpload" class="uploadFileBtn">上传视频</label>
      <el-button v-else type="primary" disabled>上传视频</el-button>
      <input type="file" style="display: none" id="fileUpload" @change="fileChange($event)" />
      <label class="status">
        上传状态:
        <span>{{statusText}}</span>
      </label>
    </div>
    <div class="upload-type">
      <el-button size="small" type="primary"
                 @click="authUpload"
                 :disabled="uploadDisabled">
        开始上传
      </el-button>
      <el-button size="small" type="primary" @click="pauseUpload" :disabled="pauseDisabled">暂停</el-button>
      <el-button size="small" type="primary" :disabled="resumeDisabled" @click="resumeUpload">恢复上传</el-button>
      <span class="progress">
        上传进度:
        <i id="auth-progress">{{authProgress}}</i> %
      </span>
    </div>

     <!-- 视频播放 -->
     <div v-if="videoPlayer1" class="prism-player" id="J_prismPlayer" style="width: 300px;height: 300px;border: 1px solid red;"></div>
     <video v-if="videoPlayer2" width="320" height="240" controls>
      <source :src="videoUrl" type="video/mp4">
      <source :src="videoUrl" type="video/ogg">
      您的浏览器不支持Video标签。
     </video>
  </div>
</template>

<script>
//import axios from "axios";
//import { Upload } from "@/service/upload";
import { mapActions } from "vuex";
import lime from '@/lime.js';

export default {
  name: "videoUpload",
  props: {
    isEncrypt: Number,
  },
  data() {
    return {
      filename: "",
      timeout: "",
      partSize: "",
      parallel: "",
      retryCount: "",
      retryDuration: "",
      region: "cn-shanghai",
      userId: "1103201021307266",
      file: null,
      authProgress: 0,
      uploadDisabled: true,
      resumeDisabled: true,
      pauseDisabled: true,
      uploader: null,
      statusText: "",
      videoId: "", // 文件上传成功后放回的 地址id
      fileSize: "", // 上传文件的大小
      fileFormat: "", // 上传文件的 文件类型

      Uploadinfo1: null,
      vid: '',
      playAuth1: '',

      //视频播放器默认不显示
      videoPlayer1: false,
      videoPlayer2: false,
      videoUrl: '',
      //uploadFileDisabled: this.isEncrypt == 1 || this.isEncrypt == 0 ? false : true,
      //isShow: this.isEncrypt == 1 || this.isEncrypt == 0 ? true : false,
    };
  },
  mounted () {
    console.log(this.saveVideoId)
    console.log(this.isEncrypt)
  },
  methods: {
    ...mapActions(["saveVideoId", "saveFileSize", "saveFileFormat"]),

    // ManagerVideoUploadAuth
    initVideo () {
      lime.req('ManagerVideoUploadAuth', {
          login_token:lime.cookie_get('login_token'),
          encrypt: this.isEncrypt
      }).then(res => {
          this.Uploadinfo1 = res.data;
          console.log(this.Uploadinfo1)
      });
    },

    fileChange(e) {
      console.log(e)
      console.log(this.isEncrypt)
      console.log("fileChange", e);

      this.file = e.target.files[0];
      console.log(this.file)
      console.log(this.file.type.substring(0,5))
      if (!this.file) {
        this.$message.error("请先选择需要上传的文件!");
        return;
      }
      if (this.file.type.substring(0,5) != 'video') {
        this.$message.error("请上传视频格式!");
      }
      this.filename = this.file.name;
      var userData = '{"Vod":{}}';
      if (this.uploader) {
        this.uploader.stopUpload();
        this.authProgress = 0;
        this.statusText = "";
      }
      this.uploader = this.createUploader();
      console.log(userData);
      this.uploader.addFile(this.file, null, null, null, userData);
      this.uploadDisabled = false;
      this.pauseDisabled = true;
      this.resumeDisabled = true;
    },
    authUpload() {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload();
        this.uploadDisabled = true;
        this.pauseDisabled = false;
      }
    },
    // 暂停上传
    pauseUpload() {
      if (this.uploader !== null) {
        this.uploader.stopUpload();
        this.resumeDisabled = false;
        this.pauseDisabled = true;
      }
    },
    // 恢复上传
    resumeUpload() {
      if (this.uploader !== null) {
        this.uploader.startUpload();
        this.resumeDisabled = true;
        this.pauseDisabled = false;
      }
    },
    // 创建 文件上传事件
    createUploader(type) {
      let self = this;
      let uploader = new AliyunUpload.Vod({
        timeout: self.timeout || 60000,
        partSize: self.partSize || 1048576,
        parallel: self.parallel || 5,
        retryCount: self.retryCount || 3,
        retryDuration: self.retryDuration || 2,
        region: self.region,
        userId: self.userId,
        // 添加文件成功
        addFileSuccess: function(uploadInfo) {
          self.uploadDisabled = false;
          self.resumeDisabled = false;
          // 分割文件类型的后缀名, 并保存到vuex中
          self.fileFormat = uploadInfo.file.name.split(".")[1];
          self.saveFileFormat(self.fileFormat);
          self.initVideo();
        },
        // 开始上传
        onUploadstarted: async function(uploadInfo) {
          if (self.Uploadinfo1 == null) {
              self.initVideo();
          } else {
            uploader.setUploadAuthAndAddress(uploadInfo, self.Uploadinfo1.uploadAuth, self.Uploadinfo1.uploadAddress,self.Uploadinfo1.videoId)
              // if (!Uploadinfo1.videoId) {
              //   // 获取上传视频的 凭证信息
              //   // let createUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateUploadVideo?Title=testvod1&FileName=aa.mp4&BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&VideoId=5bfcc7864fc14b96972842172207c9e6'
              //   //   axios.get(createUrl).then(({data}) => {
              //   //     let uploadAuth = data.UploadAuth
              //   //     let uploadAddress = data.UploadAddress
              //   //     let videoId = data.VideoId
              //   //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
              //   //   })
              //   //   self.statusText = '文件开始上传...'
              //   //   console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)

              // } else {
              //   // 如果videoId有值，根据videoId刷新上传凭证
              //   // let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
              //   //   axios.get(refreshUrl).then(({data}) => {
              //   //     let uploadAuth = data.UploadAuth
              //   //     let uploadAddress = data.UploadAddress
              //   //     let videoId = data.VideoId
              //   //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
              //   //   })
              // }
            }
          },
          
        // 文件上传成功
        onUploadSucceed: function(uploadInfo) {
          //this.videoPlayer = true;
          console.log(uploadInfo)
          console.log(uploadInfo.videoId)
          self.vid = uploadInfo.videoId;//uploadInfo.videoId;
          
          console.log(uploadInfo.checkpoint.name)
          self.statusText = "文件上传成功!";


          // lime.req('ManagerAliVideoPlayUrl', {
          //   login_token:lime.cookie_get('login_token'),
          //   videoId: self.vid
          // }).then(res => {
          //   if (res.code == 0) {
          //     self.videoPlayer = true;
          //     self.videoUrl = res.data.playUrl;
          //     self.$emit('func',self.vid)

          //     self.saveVideoId(self.videoId);
          //     //self.saveFileSize(self.fileSize);

          //self.videoPlayer = true;
          // if (self.isEncrypt == 0) {
            
          //   console.log(self.videoPlayer2)
          // } else {
            
          // }

            if (self.isEncrypt == 0) {
              // lime.req('ManagerVideoAlPlayAuth', {
              //   login_token:lime.cookie_get('login_token'),
              //   videoId: self.vid
              // }).then(res => {
              //   if (res.code == 0) {
              //     // clearInterval(dTime)
              //     // self.playAuth1 = res.data;
              //     // self.$emit('func',self.vid)
              //     // self.saveVideoId(self.videoId);
              //     // var palyer = new Aliplayer({
              //     //   id: 'J_prismPlayer',
              //     //   vid: self.playAuth1.videoPlayId,//self.vid
              //     //   width: '100%',
              //     //   height: '100%',
              //     //   autoplay: false,
              //     //   // 播放方式二：点播用户推荐
              //     //   cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
              //     //   playauth: self.playAuth1.playAuth,
              //     //   isLive: false,
              //     //   rePlay: false,
              //     //   playsinline: true,
              //     //   encryptType: 1,
              //     // })
              //   }
              // });

              self.videoPlayer2 = true;
              self.videoPlayer1 = false;
              self.$emit('isShowVideo1',self.videoPlayer1);
              self.$emit('isShowVideo2',self.videoPlayer2);

              lime.req('ManagerAliVideoPlayUrl', {
                login_token:lime.cookie_get('login_token'),
                videoId: self.vid
              }).then(res => {
                if (res.code == 0) {
                  console.log(res.data.playUrl)
                  self.videoUrl = res.data.playUrl;
                  console.log(self.videoUrl)
                  self.$emit('func',self.vid)

                  self.saveVideoId(self.videoId);
                  clearInterval(dTime)
                  //self.saveFileSize(self.fileSize);
                }
              })
            } else {
              self.videoPlayer1 = true;
              self.videoPlayer2 = false;
              self.$emit('isShowVideo1',self.videoPlayer1);
              self.$emit('isShowVideo2',self.videoPlayer2);
              var dTime = setInterval(function () {
              console.log(333)
              console.log(self.isEncrypt)
              lime.req('ManagerVideoAlPlayAuth', {
                login_token:lime.cookie_get('login_token'),
                videoId: self.vid
              }).then(res => {
                if (res.code == 0) {
                  clearInterval(dTime)
                  self.playAuth1 = res.data;
                  self.$emit('func',self.vid)
                  self.saveVideoId(self.videoId);
                  var palyer = new Aliplayer({
                    id: 'J_prismPlayer',
                    vid: self.playAuth1.videoPlayId,//self.vid
                    width: '100%',
                    height: '100%',
                    autoplay: false,
                    // 播放方式二：点播用户推荐
                    cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
                    playauth: self.playAuth1.playAuth,
                    isLive: false,
                    rePlay: false,
                    playsinline: true,
                    encryptType: 1,
                  })
                }
              });
            },3000)


            }
            

          //   }
          // })
        },
        // 文件上传失败
        onUploadFailed: function(uploadInfo, code, message) {
          console.log(
            "onUploadFailed: file:" +
              uploadInfo.file.name +
              ",code:" +
              code +
              ", message:" +
              message
          );
          self.statusText = "文件上传失败!";
        },
        // 取消文件上传
        onUploadCanceled: function(uploadInfo, code, message) {
          console.log(
            "Canceled file: " +
              uploadInfo.file.name +
              ", code: " +
              code +
              ", message:" +
              message
          );
          self.statusText = "文件已暂停上传";
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function(uploadInfo, totalSize, progress) {
          let progressPercent = Math.ceil(progress * 100);
          self.authProgress = progressPercent;
          self.statusText = "文件上传中...";
          // 保留两位小数
          totalSize = Math.floor((totalSize / 1024 / 1024) * 100) / 100;
          self.fileSize = totalSize;
        },
        // 上传凭证超时
        onUploadTokenExpired: function(uploadInfo) {
          // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
          // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
          // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth



          // let refreshUrl =
          //   "https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=" +
          //   uploadInfo.videoId;
          // axios.get(refreshUrl).then(({ data }) => {

          //   // let uploadAuth = data.UploadAuth;
          //   // uploader.resumeUploadWithAuth(uploadAuth);
          // });
          // self.statusText = "文件超时...";


        },
        // 全部文件上传结束
        onUploadEnd: function(uploadInfo) {
          let self = this;
          console.log(uploadInfo)
          console.log(self.videoId)
          if (!self.videoId) {
            return;
          }

          // 如果 videoID 不为空, 则将他存入到 vuex 中
          
          self.statusText = "文件上传完毕";
        }
      });
      return uploader;
    }
  }
};
</script>

<style lang="less">
.videoUpload {
  margin-bottom: 10px;
  .upload-type{
    margin-top: 10px;
  }
  .file-upload {
    background-color: #e67a1b;
    font-size: 16px;
    color: #efefef;
  }
  .uploadFileBtn {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
    width: 80px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    border-radius: 3px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
}
</style>
