<<<<<<< HEAD
<template>
  <div>
      <el-tag
        :key="tag.uuid"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.title}}
    </el-tag>
    <el-input
    class="input-new-tag"
    v-if="inputVisible"

    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
    >
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>


  </div>
</template>
<script>
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";
export default {
  name: "tags",
  props: {
   dynamicTags: { type: Array, default: () => [] },
  },
  data() {
      return {
        // dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      };
    },

  components: {},
  computed: {
    width: () => {
      return store.state.AppData.width;
    },
    height: () => {
      return store.state.AppData.height;
    },
  },
  created() {
   
  },
  methods: {
     handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          lime.req('ShopQuesTagAdd',{
            title: inputValue,
            login_token: lime.cookie_get('login_token')
          }).then(res => {
            this.dynamicTags.push({uuid: res.data.uuid,title: inputValue})
            console.log(res)
          });
        }
        this.inputVisible = false;
        this.inputValue = '';
      }


  },
};
</script>
<style scoped>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

=======
<template>
  <div>
      <el-tag
        :key="tag.uuid"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.title}}
    </el-tag>
    <el-input
    class="input-new-tag"
    v-if="inputVisible"

    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
    >
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>


  </div>
</template>
<script>
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";
export default {
  name: "tags",
  props: {
   
  },
  data() {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      };
    },

  components: {},
  computed: {
    width: () => {
      return store.state.AppData.width;
    },
    height: () => {
      return store.state.AppData.height;
    },
  },
  created() {
   
  },
  methods: {
     handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          lime.req('ShopQuesTagAdd',{
            title: inputValue,
            login_token: lime.cookie_get('login_token')
          }).then(res => {
            this.dynamicTags.push({uuid: res.data.uuid,title: inputValue})
            console.log(res)
          });
        }
        this.inputVisible = false;
        this.inputValue = '';
      }


  },
};
</script>
<style scoped>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>