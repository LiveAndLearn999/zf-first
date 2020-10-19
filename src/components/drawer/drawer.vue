<template>
  <el-drawer
    title="添加"
    direction="rtl"
    :visible.sync="is_show"
    :with-header="true"
    size="50%"
  >
    <div class="content" :style="{ height: height - 65 + 'px',paddingLeft: '30px'}">
      <el-form
        style="margin-top: 22px"
        size="small"
        ref="form"
        :inline="false"
        :label-position="'left'"
        :model="getForm(form_des)"
        :rules="getRules(form_des)"
        label-width="80px"
      >
        <el-form-item
          v-for="(item, index) in form_des"
          :key="index"
          :prop="item.field"
          :label="item.label"
          style="width: 480px"
          :required="item.showstar"
        >
          <!--文本输入框-->
          <el-input
            v-if="item.type === 'text'"
            v-model="item.value"
            :placeholder="item.placeholder"
          ></el-input>
          <el-input
            v-if="item.type === 'textarea'"
            type="textarea"
            v-model="item.value"
            :rows="8"
            :placeholder="item.placeholder"
          ></el-input>
          <!--密码框-->
          <el-input v-if="item.type==='password'" type="password" show-password v-model="item.value" :placeholder="item.placeholder"></el-input>
          <template v-if="item.type==='radio'">
                    <el-radio v-model="item.value"
                    :label="it.value"
                    :key="ind"
                    v-for="(it,ind) in item.options">{{it.name}}</el-radio>
            </template>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import Vue from "vue";
import store from "@/store";
export default {
  name: "drawer",
  props: {
    form_des: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      is_show: false,
    };
  },
  computed: {
    width: () => {
      return store.state.AppData.width;
    },
    lab_width: () => {
      return ((store.state.AppData.width - 250)/2 - 200) + 'px'
    },
    height: () => {
      return store.state.AppData.height;
    },
  },
  methods: {
    getForm(data) {
      let re = {};
      data.forEach((v) => {
        let field_arr = v.field_arr;
        let field_type = v.field_type;
        if (field_arr && field_type === "composite") {
          //多个字段一组

          field_arr.forEach((v1, k1) => {
            re[v1.field] = v1.value;
          });
        } else {
          re[v.field] = v.value;
        }
      });
      // console.log('getForm',re)
      return re;
    },
    /*将表单描叙字段转 获取规则*/
    getRules(data) {
      let re = {};
      data.forEach((v) => {
        let field_type = v.field_type;
        if (v.field_arr && field_type === "composite") {
          //多个字段的校验
          re[v.field] = v.field_arr[0].rules;
        } else {
          if (v.rules) {
            re[v.field] = v.rules;
          }
        }
      });
      return re;
    },
  },
};
</script>
<style>
.el-drawer__header {
  margin-bottom: 20px !important;
}
</style>
<style scoped>
.content {
  width: 100%;
  border-bottom: 1px solid red;
  border-top: 1px solid #f2f2f2;
}
</style>>

