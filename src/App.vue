<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
    import Vue from "vue";
    import lime from "@/lime.js";
    import store from "@/store";
    import util from "@/util.js";


    if (typeof store.state.AppData == 'undefined') {
      Vue.set(store.state, 'AppData', {
          height: '100vh',
          width: '100vw',
          img_host: process.env.NODE_ENV == 'product' ? 'https://api.aimeipin.cn' : 'http://test-api.aimeipin.cn'
      });
    }

    export default {
        data() {
            return store.state.AppData;
        },
        created() {
          
        },
        mounted() {
            this.height = document.documentElement.clientHeight || document.body.clientHeight;
            this.width = document.documentElement.clientWidth || document.body.clientWidth;

            window.onresize = () => {
                this.height = document.documentElement.clientHeight || document.body.clientHeight;
                this.width = document.documentElement.clientWidth || document.body.clientWidth;
            }
        },
        methods: {
           
        }
    }
</script>

<style lang="less">
*{
  padding:0;
  margin:0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
