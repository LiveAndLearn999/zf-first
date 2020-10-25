<<<<<<< HEAD
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
=======
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
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
