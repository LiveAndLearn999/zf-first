<<<<<<< HEAD
<!--
 * @Author: zs
 * @Date: 2020-09-10 11:35:01
 * @LastEditTime: 2020-09-27 14:02:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Information.vue
-->
<template>
  <div v-wechat-title="$route.meta.title">
    <!-- 菜单 -->
    <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
      <el-row>
        <el-col :span="6">
          <div style="padding-left:16px;">
            <i class="el-icon-s-unfold"></i>
            <span style="padding-left:9px;font-size: 16px">{{$store.state.AdminData.active_title}}</span>
          </div>
        </el-col>

        <el-col :span="18">
          <div style="text-align: right;font-size: 16px">
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
    <div :style="{height: height - 190  + 45 + 'px',background: 'white'}">
        <!-- v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" -->
      <el-table
        :data="rows"
       :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
        :height="height - 195 - 3"
        :highlight-current-row="true"
        @current-change="onSelectRow"
        style="width: 100%; height:60px;"
        size="mini"
      >
        <el-table-column prop="name" label="名称"  />
        <el-table-column label="角色">
            <template slot-scope="scope">
                <span v-for="(item, index) in rows[scope.$index].role_list" :key="index" style="display: inline-block;padding-right:30px">{{scope.row.role_list[index].name}}</span>
             </template>
        </el-table-column>
      </el-table>

      <!-- <div class="page" :style="{width:width - 250 + 'px'}">
        <el-pagination
          background
          :current-page.sync="SearchFormData.page_num"
          @current-change="onPageChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div> -->
    </div>

    <!-- 编辑 -->
    <el-dialog title="编辑" width="380px" :visible.sync="edit_show">
        <div>
          <!-- <el-checkbox-group v-model="checkedAry">
            <el-checkbox v-for="item in all_uuid" :label="item" :key="item"></el-checkbox>
          </el-checkbox-group> -->
          <el-form :model="EditFormData" label-width="80px" label-position="left">
              <el-form-item label="角色:">
                <el-cascader 
                      clearable 
                      :options="edit_rows"
                      :props="{multiple: true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                      placeholder="请选择"
                      v-model="EditFormData.checked_uuid" style="width:240px">
                </el-cascader>
              </el-form-item>
          </el-form>
        </div>
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
import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
// import {ShopRoleList, SetShopSave} from  "@/api/request"
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
    ready_uuid: [],
    role_type: 'auditor',
    checkedAry: [],
    all_uuid: [],
    check_uuid: [],
    allCheck: [],

    edit_rows: [],
    EditFormData: {
      
    }
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
      // this.loading = true
      NProgress.start();
      lime.req('SetShopDetail', {
        login_token: lime.cookie_get('login_token')
      }).then(res => {
        console.log(res.data)
        // this.loading = false
        NProgress.done();
        this.rows = res.data.config
        this.total = this.rows.length
      })
      // 超时关闭遮罩层
      setTimeout(() => {
        // this.loading = false
        NProgress.done();
      }, 10000)
    },

    // 表格数据刷新
    onRefresh () {
      this.init()
    },

    // 选择单行
    onSelectRow (row) {
      console.log(row)
      this.curr_row = row
      this.ready_uuid = []
      if(row) {
        row.role_list.forEach((item, index) => {
          this.ready_uuid.push(item.role_uuid)
        })
        this.role_type = row.config_key
      }
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
      lime.req('ShopRoleList',{
              login_token: lime.cookie_get('login_token')
      }).then(res => {
              this.allCheck = res.data
              this.checkedAry = []
              this.all_uuid = []


              let _rows = [];
              this.edit_rows = [];
              res.data.forEach(item => {
                    if (item.uuid != this.curr_row.uuid) {
                        _rows.push({
                            name:item.name,
                            parent_uuid:item.parent_uuid,
                            uuid:item.uuid,
                        });
                    }
                });
                this.edit_rows = util.toTree(_rows);
              // res.data.forEach((item, index) => { 
              //   if(this.ready_uuid.includes(item.uuid, 0)) {
              //     this.checkedAry.push(item.name)
              //     this.all_uuid.push(item.name)
              //   }else {
              //     this.all_uuid.push(item.name)
              //   }

              // })
              this.edit_show = true
      })
    },
    // 保存编辑提交
    onEditSubmit () {
      this.check_uuid = []
      this.allCheck.forEach((item, index) => {
        if(this.checkedAry.includes(item.name, 0)) {
            this.check_uuid.push(item.uuid)
        }
      })
      let that = this
      console.log(this.EditFormData.checked_uuid)
      lime.req('SetShopSave',{
              login_token:lime.cookie_get('login_token'),
              [that.role_type]:this.EditFormData.checked_uuid
      }).then(res => {
              this.edit_show = false
              this.init()
      })
      // lime.req('SetShopSave',{
      //         login_token:lime.cookie_get('login_token'),
      //         [that.role_type]:this.check_uuid
      // }).then(res => {
      //         this.edit_show = false
      //         this.init()
      // })

      // SetShopSave({
      //   login_token:lime.cookie_get('login_token'),
      //   [that.role_type]:this.check_uuid,
      // }, res => {
      //   this.edit_show = false
      //   this.init()
      // })

      // lime.req(
      //           {
      //               module:'SetShopSave',
      //               ver:'1.0.0',
      //               relation_module:'ShopRoleList',
      //               relation_ver:'1.0.0'
      //           },
      //           {
      //               login_token:lime.cookie_get('login_token'),
      //               [that.role_type]:this.check_uuid
      //           }
      //           ).then(res => {
      //             this.edit_show = false
      //             this.init()
      //           })
      
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
  bottom: 40px;
  right: 40px;
  overflow: hidden;
}

.dialog-box {
  display: flex;
  padding: 10px;
  padding-left: 20px;
}
=======
<!--
 * @Author: zs
 * @Date: 2020-09-10 11:35:01
 * @LastEditTime: 2020-09-27 14:02:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Information.vue
-->
<template>
  <div v-wechat-title="$route.meta.title">
    <!-- 菜单 -->
    <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
      <el-row>
        <el-col :span="6">
          <div style="padding-left:16px;">
            <i class="el-icon-s-unfold"></i>
            <span style="padding-left:9px;font-size: 16px">{{$store.state.AdminData.active_title}}</span>
          </div>
        </el-col>

        <el-col :span="18">
          <div style="text-align: right;font-size: 16px">
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
<<<<<<< HEAD
    <div :style="{height: height - 190  + 45 + 'px',background: 'white'}">
        <!-- v-loading="loading"
=======
    <div style="border-top: solid 1px #f2f1f4;">
      <el-table
        :data="rows"
        stripe
        :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
        :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
        :height="height - 60 - 46 - 48"
        v-loading="loading"
>>>>>>> 69f72654eaa89f70eed7d5a40fa258b3f773fe8e
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" -->
      <el-table
        :data="rows"
       :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '300'}" 
                :header-cell-style="{height:'48px',background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '200'}"
        :height="height - 195 - 3"
        :highlight-current-row="true"
        @current-change="onSelectRow"
        style="width: 100%; height:60px;"
        size="mini"
      >
        <el-table-column prop="name" label="名称"  />
        <el-table-column label="角色">
            <template slot-scope="scope">
                <span v-for="(item, index) in rows[scope.$index].role_list" :key="index" style="display: inline-block;padding-right:30px">{{scope.row.role_list[index].name}}</span>
             </template>
        </el-table-column>
      </el-table>

      <!-- <div class="page" :style="{width:width - 250 + 'px'}">
        <el-pagination
          background
          :current-page.sync="SearchFormData.page_num"
          @current-change="onPageChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div> -->
    </div>

    <!-- 编辑 -->
    <el-dialog title="编辑" width="380px" :visible.sync="edit_show">
        <div>
          <!-- <el-checkbox-group v-model="checkedAry">
            <el-checkbox v-for="item in all_uuid" :label="item" :key="item"></el-checkbox>
          </el-checkbox-group> -->
          <el-form :model="EditFormData" label-width="80px" label-position="left">
              <el-form-item label="角色:">
                <el-cascader 
                      clearable 
                      :options="edit_rows"
                      :props="{multiple: true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                      placeholder="请选择"
                      v-model="EditFormData.checked_uuid" style="width:240px">
                </el-cascader>
              </el-form-item>
          </el-form>
        </div>
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
import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
// import {ShopRoleList, SetShopSave} from  "@/api/request"
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
    ready_uuid: [],
    role_type: 'auditor',
    checkedAry: [],
    all_uuid: [],
    check_uuid: [],
    allCheck: [],

    edit_rows: [],
    EditFormData: {
      
    }
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
      // this.loading = true
      NProgress.start();
      lime.req('SetShopDetail', {
        login_token: lime.cookie_get('login_token')
      }).then(res => {
        console.log(res.data)
        // this.loading = false
        NProgress.done();
        this.rows = res.data.config
        this.total = this.rows.length
      })
      // 超时关闭遮罩层
      setTimeout(() => {
        // this.loading = false
        NProgress.done();
      }, 10000)
    },

    // 表格数据刷新
    onRefresh () {
      this.init()
    },

    // 选择单行
    onSelectRow (row) {
      console.log(row)
      this.curr_row = row
      this.ready_uuid = []
      if(row) {
        row.role_list.forEach((item, index) => {
          this.ready_uuid.push(item.role_uuid)
        })
        this.role_type = row.config_key
      }
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
      lime.req('ShopRoleList',{
              login_token: lime.cookie_get('login_token')
      }).then(res => {
              this.allCheck = res.data
              this.checkedAry = []
              this.all_uuid = []


              let _rows = [];
              this.edit_rows = [];
              res.data.forEach(item => {
                    if (item.uuid != this.curr_row.uuid) {
                        _rows.push({
                            name:item.name,
                            parent_uuid:item.parent_uuid,
                            uuid:item.uuid,
                        });
                    }
                });
                this.edit_rows = util.toTree(_rows);
              // res.data.forEach((item, index) => { 
              //   if(this.ready_uuid.includes(item.uuid, 0)) {
              //     this.checkedAry.push(item.name)
              //     this.all_uuid.push(item.name)
              //   }else {
              //     this.all_uuid.push(item.name)
              //   }

              // })
              this.edit_show = true
      })
    },
    // 保存编辑提交
    onEditSubmit () {
      this.check_uuid = []
      this.allCheck.forEach((item, index) => {
        if(this.checkedAry.includes(item.name, 0)) {
            this.check_uuid.push(item.uuid)
        }
      })
      let that = this
      console.log(this.EditFormData.checked_uuid)
      lime.req('SetShopSave',{
              login_token:lime.cookie_get('login_token'),
              [that.role_type]:this.EditFormData.checked_uuid
      }).then(res => {
              this.edit_show = false
              this.init()
      })
      // lime.req('SetShopSave',{
      //         login_token:lime.cookie_get('login_token'),
      //         [that.role_type]:this.check_uuid
      // }).then(res => {
      //         this.edit_show = false
      //         this.init()
      // })

      // SetShopSave({
      //   login_token:lime.cookie_get('login_token'),
      //   [that.role_type]:this.check_uuid,
      // }, res => {
      //   this.edit_show = false
      //   this.init()
      // })

      // lime.req(
      //           {
      //               module:'SetShopSave',
      //               ver:'1.0.0',
      //               relation_module:'ShopRoleList',
      //               relation_ver:'1.0.0'
      //           },
      //           {
      //               login_token:lime.cookie_get('login_token'),
      //               [that.role_type]:this.check_uuid
      //           }
      //           ).then(res => {
      //             this.edit_show = false
      //             this.init()
      //           })
      
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
  bottom: 40px;
  right: 40px;
  overflow: hidden;
}

.dialog-box {
  display: flex;
  padding: 10px;
  padding-left: 20px;
}
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
</style>