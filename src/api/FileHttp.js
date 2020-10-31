/**
 * @description 文件上传
 * @author hxq
 * @version 1.0.0
 * @date 2020.9.8
 * */
import lime from "@/lime.js";
export default class FileHttp {
    /*单文件 表单形式上传*/
    static uploadFile(_module,params,header={}){
        // console.log(_module,params,header)

        return new Promise((resolve, reject) => {
            Object.assign(header,{'Content-Type':'multipart/form-data'})
            lime.req(_module, params, header)
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                    reject(err)
                })
        })

    }
}