<template>
  <div class="container">
    <div class="upload">
      <div>
        <a href="javascript:;" class="file">
              选择视频<input type="file" id="fileUpload" @change="fileChange($event)" />
        </a>
        <div class="status">
            上传状态: <span>{{ statusText }}</span>
        </div>
      </div>
      <div class="upload-type">
        <el-button type="primary" @click="authUpload" :disabled="uploadDisabled">开始上传</el-button>
        <el-button type="primary" @click="pauseUpload" :disabled="pauseDisabled">暂停</el-button>
        <el-button type="primary" :disabled="resumeDisabled" @click="resumeUpload">
          恢复上传
        </el-button>
        <span class="progress"
          >上传进度: <i id="auth-progress">{{ authProgress }}</i> %</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import lime from "@/lime.js";
import { Upload } from "@/api/upload";
export default {
  data() {
    return {
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
    };
  },
  methods: {
    fileChange(e) {
      this.file = e.target.files[0];
      if (!this.file) {
        alert("请先选择需要上传的文件!");
        return;
      }
      var Title = this.file.name;
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
        addFileSuccess: function (uploadInfo) {
          self.uploadDisabled = false;
          self.resumeDisabled = false;
          self.statusText = "添加文件成功, 等待上传...";
          console.log("addFileSuccess: " + uploadInfo.file.name);
        },
        // 开始上传
        onUploadstarted: async function (uploadInfo) {
          if (!uploadInfo.videoId) {
            const res = await Upload.getVideoUploadAuth(
              this.title,
              this.filename
            );
            let { uploadAuth, uploadAddress, videoId } = res.data;
            self.videoId = videoId;
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress,
              videoId
            );
            self.statusText = "文件开始上传...";
          } else {
            const res = await Upload.getRefreshVideoUploadAuth(
              uploadInfo.videoId
            );
            let { uploadAuth, uploadAddress, videoId } = res.data;
            self.videoId = videoId;
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress,
              videoId
            );
          }
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          self.statusText = "文件上传成功!";
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          self.statusText = "文件上传失败!";
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo, code, message) {
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
        onUploadProgress: function (uploadInfo, totalSize, progress) {
          console.log(
            "onUploadProgress:file:" +
              uploadInfo.file.name +
              ", fileSize:" +
              totalSize +
              ", percent:" +
              Math.ceil(progress * 100) +
              "%"
          );
          let progressPercent = Math.ceil(progress * 100);
          self.authProgress = progressPercent;
          self.statusText = "文件上传中...";
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
          // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
          // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
          // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
          let refreshUrl =
            "https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=" +
            uploadInfo.videoId;
          axios.get(refreshUrl).then(({ data }) => {
            let uploadAuth = data.UploadAuth;
            uploader.resumeUploadWithAuth(uploadAuth);
          });
          self.statusText = "文件超时...";
        },
        onUploadEnd: function (uploadInfo) {
          console.log("onUploadEnd: uploaded all the files");
          self.statusText = "文件上传完毕";
        },
      });
      return uploader;
    },
  },
};
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
</style>