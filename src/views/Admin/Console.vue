<!--
 * @Author: your name
 * @Date: 2020-09-09 11:55:31
 * @LastEditTime: 2020-09-09 16:55:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Console.vue
-->
<template>
    <div v-wechat-title="$route.meta.title">
        控制台 
    </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";

    if (!store.state.ConsoleData) {
        Vue.set(store.state, 'ConsoleData', {
            title:'控制台',
        })
    }

    export default {
        data() {
            return store.state.ConsoleData
        },
        
    }
</script>

<style scoped>
    
</style>