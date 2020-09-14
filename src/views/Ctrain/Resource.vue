<!--
 * @Author: your name
 * @Date: 2020-09-10 11:32:21
 * @LastEditTime: 2020-09-14 18:18:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Resource.vue
-->
<template>
    <!-- <h1>{{cpname}}</h1> -->
    <div>
        <input type="file" id="f">
        <button @click="fff">eeee</button>
    </div>
    
</template>

<script>
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    export default {
        data() {
            return {
               cpname: '学习资料'
            }
        },
        created() {
            this.init()
        },
        methods: {
          init() {
              lime.req("ShopImgUpload", {
                login_token: lime.cookie_get('login_token'),
                up_type: 'login-log.fw.png'
              }).then(res => {
                  console.log(res)
              })
          },
          fff() {
               let f = document.getElementById("f").files; 
               console.log(f)
          }
        }
        
    }
</script>

<style scoped>
    
</style>