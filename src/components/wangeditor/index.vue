<template>
    <!--

    http://www.wangeditor.com/index.html 文档地址
    -->
    <div id="editor"></div>


</template>

<script>
    import E from 'wangeditor'
    import lime from "@/lime";

    import FileHttp from "@/api/FileHttp";
    export default {
        name: "wangeditor",
        components:{ },
    //     props: {
    //     newHtml: { type: String, default: () => '<h1>11111111</h1>' }
    //  },
        data() {
            return {
                content : this.newHtml
            }

        },
        props:{
        newHtml: { type: String, default: () => '' },
          value:{
              default:''
          }
        },
        methods: {

            /*上传文件*/
            upload( file){

                let formData = new FormData(); //创建form对象
                let timestamp = lime.get_timestamp();
                let up_type = 'file';
                let login_token = lime.cookie_get('login_token')

                formData.append('file', file);//通过append向form对象添加数据
                formData.append('up_type', 'file');//通过append向form对象添加数据
                formData.append('timestamp', timestamp);//通过append向form对象添加数据
                formData.append('login_token', login_token);//通过append向form对象添加数据
                formData.append('sign', lime.md5_str(lime.set_sign({timestamp, up_type, login_token})));//通过append向form对象添加数据


                return new Promise((resolve, reject) => {
                    FileHttp.uploadFile('OssShopUpload', formData)
                        .then(res => {

                            let url = res.data.url;

                            resolve(url)

                        })

                })

            },
            createEditor(ele){
                const editor = new E(ele)

// 设置编辑区域高度为 500px
                editor.config.height = 200
                editor.config.uploadImgMaxLength = 1 // 一次最多上传 5 个图片
                editor.config.customUploadImg =   (resultFiles, insertImgFn)=> {
                    // resultFiles 是 input 中选中的文件列表
                    // insertImgFn 是获取图片 url 后，插入到编辑器的方法

                    // 上传图片，返回结果，将图片插入到编辑器中

                    this.upload(resultFiles[0])
                    .then(url=>{
                        insertImgFn(url)
                    })

                    // insertImgFn(imgUrl)/
                }
                // 配置 onchange 回调函数
                editor.config.onchange =   (newHtm)=> {
                //    this.$emit('editorChange',newHtml )
                this.content = newHtm
                 console.log(this.newHtml)
                }
// 配置触发 onchange 的时间频率，默认为 200ms
                editor.config.onchangeTimeout = 500 // 修改为 500ms

                editor.config.menus = [
                    // 菜单配置
                    'head', // 标题
                    'bold', // 粗体
                    'fontSize', // 字号
                    'fontName', // 字体
                    'italic', // 斜体
                    'underline', // 下划线
                    'strikeThrough', // 删除线
                    'foreColor', // 文字颜色
                    'backColor', // 背景颜色
                    'link', // 插入链接
                    'list', // 列表
                    'justify', // 对齐方式
                    'quote', // 引用
                    'emoticon', // 表情
                    'image', // 插入图片
                    'table', // 表格
                    'code', // 插入代码
                    'undo', // 撤销
                    'redo' // 重复
                ];
                editor.create();
                if(this.content){
                    editor.txt.html(`<p>${this.content}</p>`)
                }
                editor.txt.append(this.value)
            }
        },

        mounted() {
            this.createEditor('#editor')

        }
    }
</script>

<style scoped lang="less">

</style>