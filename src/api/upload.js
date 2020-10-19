import lime from "@/lime"

class Upload {
  // 获取 上传视频前， 需要的 凭证信息
  static async getVideoUploadAuth() {
    const data = await lime.req('ShopVideoUploadAuth', {
        login_token: lime.cookie_get("login_token")
    })
    return data
  }

  // 根据 vedioId 重新 获取  上传凭证信息
  static async getRefreshVideoUploadAuth(videoId) {
    const data = await lime.req('ShopRefreshVideoUploadAuth', {
      videoId
    })
    return data
  }
}

export {
  Upload
}
