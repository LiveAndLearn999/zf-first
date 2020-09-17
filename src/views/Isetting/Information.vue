<!--
 * @Author: zs
 * @Date: 2020-09-10 11:35:01
 * @LastEditTime: 2020-09-17 19:55:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Information.vue
-->
<template>
  <div v-wechat-title="$route.meta.title">
    <!-- 菜单 -->
    <div style="height: 46px; line-height: 46px; overflow: hidden;">
      <el-row>
        <el-col :span="6">
          <div style="padding-left:16px;">
            <i class="el-icon-s-unfold"></i>
            <span style="padding-left:9px;">{{$store.state.AdminData.active_title}}</span>
          </div>
        </el-col>

        <el-col :span="18">
          <div style="text-align: right;">
            <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>

            <el-link
              class="menu"
              @click="onSubMenu(item)"
              v-for="(item,index) in $store.state.AdminData.right_menus"
              :key="index"
            >{{item.name}}</el-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 数据表格 -->
    <div style="border-top: solid 1px #f2f1f4;">
      <el-table
        :data="rows"
        :height="height - 60 - 46 - 48"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :highlight-current-row="true"
        @current-change="onSelectRow"
        style="width: 100%; height:60px;"
        size="mini"
      >
        <el-table-column prop="name" label="名称"  />
        <!-- <el-table-column prop="role_name" label="角色"> -->
            
        <el-table-column prop="role_list" label="角色">
            <template slot-scope="scope">
                <span v-for="item in scope.row.role_list" :key="item.id" style="display: inline-block;padding-right:30px">{{item.name}}</span>
             </template>
          <!--  -->
        </el-table-column>
      </el-table>

      <div class="page" :style="{width:width - 250 + 'px'}">
        <el-pagination
          :current-page.sync="SearchFormData.page_num"
          @current-change="onPageChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑 -->
    <el-dialog title="编辑" width="650px" :visible.sync="edit_show">
      <el-form :model="EditFormData" label-width="80px" class="dialog-box">
        <div>
          <el-checkbox
            style="margin-bottom:30px;"
            v-for="item in EditFormData.allCheck"
            v-bind:key="item.id"
            :label="item.name"
          ></el-checkbox>
        </div>
      </el-form>

      <span slot="footer">
        <el-button @click="edit_show = false">取消</el-button>
        <el-button type="primary" @click="onEditSubmit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import store from "@/store"
import lime from "@/lime.js"
import util from "@/util.js"
import {ShopRoleList, SetShopSave} from  "@/api/request"

if (!store.state.GetShopConfigData) {
  Vue.set(store.state, 'GetShopConfigData', {
    rows: [],
    total: 0,
    loading: false,

    curr_row: null,

    SearchFormData: {
      real_name: '',
      aa: [],
      page_num: 1,
      page_len: 10,
    },

    edit_show: false,
    edit_rows: [],
    EditFormData: {},


    role_type: 'auditor',
    
  })
}

export default {
  data () {
    return store.state.GetShopConfigData
  },

  computed: {
    width: () => {
      return store.state.AppData.width
    },
    height: () => {
      return store.state.AppData.height
    },
    upload_url: () => {
      return store.state.AppData.upload_url
    },
    img_host: () => {
      return store.state.AppData.img_host
    }
  },

  created () {
    this.init()
  },

  methods: {

    // 按钮点击 menu: 参数数据 local是否本地程序
    onSubMenu (menu, local = false) {
      util.submenu(menu, this, lime.cookie_get('login_token'), local)
    },

    // 数据初始化
    init () {
      this.loading = true

      lime.req('SetShopDetail', {
        login_token: lime.cookie_get('login_token')
      }).then(res => {
        this.loading = false
        this.rows = res.data.config
        this.total = this.rows.length
      })
      // 超时关闭遮罩层
      setTimeout(() => {
        this.loading = false
      }, 10000)
    },

    // 表格数据刷新
    onRefresh () {
      this.init()
    },

    // 选择单行
    onSelectRow (row) {
      this.curr_row = row
    },
    // 分页处理
    onPageChange (page) {
      this.SearchFormData.page_num = page
      this.init()
    },

    // 编辑展示
    handleEdit () {
      if (util.empty(this.curr_row)) {
        this.$message.error('请选择一条数据')
        return
      }
      ShopRoleList({login_token: lime.cookie_get('login_token')},res => {
         this.EditFormData.allCheck = res.data
         this.edit_show = true
      })
      // this.edit_show = true
    },
    // 保存编辑提交
    onEditSubmit () {
      this.EditFormData.login_token = lime.cookie_get('login_token')
      
    },
  }
}
</script>

<style scoped>
.menu {
  display: inline-block;
  padding: 0 16px;
  text-align: center;
}

.page {
  height: 40px;
  line-height: 40px;
  text-align: right;
  position: fixed;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.dialog-box {
  display: flex;
  padding: 10px;
  padding-left: 20px;
}
</style>