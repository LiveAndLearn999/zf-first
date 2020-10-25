/*
 * @Author: your name
 * @Date: 2020-09-09 11:55:31
 * @LastEditTime: 2020-09-09 16:45:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import myCharts from './charts.js'
Vue.use(myCharts)

// 更新html.title
Vue.use(require('vue-wechat-title'))



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
