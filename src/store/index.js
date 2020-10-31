<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        InitData: {
            _ver_:'1.0.7'
        },
        videoId: '', // 上传视频或者文件成功后返回的 地址编号
        fileSize: '', // 上传文件的大小
        fileFormat: '', // 上传文件的格式
    },
    mutations: {
        saveVideoId(state, videoId) {
            state.videoId = videoId
        },
    
        saveFileSize(state, fileSize) {
            state.fileSize = fileSize
        },
    
        saveFileFormat(state, fileFormat) {
            state.fileFormat = fileFormat
        },
    
        savePosterImgUrl(state, imgUrl) {
            state.posterImgUrl = imgUrl
        },
    
        saveCourseId(state, courseId) {
            state.courseId = courseId
        }
    },
    actions: {
         // 保存 上传文件的 地址编号
         saveVideoId(content, videoId) {
            //alert(5345767)
            content.commit("saveVideoId", videoId)
        },

        // 保存 上传文件的 大小
        saveFileSize(content, fileSize) {
            content.commit("saveFileSize", fileSize)
        },

        // 保存 上传文件的 文件类型
        saveFileFormat(content, fileFormat) {
            content.commit("saveFileFormat", fileFormat)
        },

        // 保存上传的 课件封面图片的 url地址
        savePosterImgUrl(content, imgUrl) {
            content.commit("savePosterImgUrl", imgUrl)
        },

        // 保存 课件id
        saveCourseId(content, courseId) {
            content.commit('saveCourseId', courseId)
        }
    },
    modules: {}
})
=======
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        InitData: {
            _ver_:'1.0.7'
        }
    },
    mutations: {
        
    },
    actions: {},
    modules: {}
})
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
