module.exports = {
    // 使用easyui-for-vue 必须加上
    configureWebpack: {
        // resolve: {
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js' 
        //     }
        // },
        externals: {
            Lime:'Lime',
            'AMap': 'AMap' // 高德地图配置
            // "BMap": "BMap"
        }
    }
}