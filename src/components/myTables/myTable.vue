<<<<<<< HEAD
<!--
 * @Author: xk
 * @Date: 2020-09-14 09:26:53
 * @LastEditTime: 2020-09-25 13:55:42
 * @LastEditors: Please set LastEditors
 * @Description: the components of base-table
 * @FilePath: /shop/src/components/myTables/baseTable.vue
-->
<template>
      <div>

           <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; font-size: 14px">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                    <el-table-column type="index" label="#"></el-table-column>
                    <template v-for="(column, index) in columns">
                         <el-table-column :key="index" :prop="column.prop" :label="column.label"></el-table-column>
                    </template>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                    background
                    :current-page.sync="page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div> 

      </div>
       
     
</template>

<script>
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";

export default {
  name: "TableBase",
  props: {
    rows: { type: Array, default: () => [] },
    columns: {type: Array, default: () => []},
    onSortChange: {type: Function, default: () => () => {console.log(11111)}},
    // onSelectRow: {type: Function, default: () => () => {console.log(22222)}},
    page_nums: {type: Number, default: () => 1},
    // onPageChange: {type: Function, default: () => () => {console.log(33333)}},
    total: {type: Number, default: () => 1},
    loading: {type: Boolean, default: () => false},
    // onSubMenu: {type: Function, default: () => () => {console.log(99999)}}
    // columns: { ype: Array, default: () => [] }
  },
  data() {
      return {
          page_num: this.page_nums
      }
  },
  watch: {
     page_nums(val) {
         this.page_num = val;
     }
  },
  computed:{
        width:() => {
            return store.state.AppData.width;
        },
        height:() => {
            return store.state.AppData.height;
        }
   },
   methods: {
       onSelectRow(row) {
           this.$emit('selRow', row)
       },
       onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
      },
      onRefresh() {
          this.$emit('onref')
      },
      handleAdd() {
          this.$emit('handleAdd')
      }, 
      handleDel() {
          this.$emit('handleDel')
      },
      handleDetail() {
          this.$emit('handleDetail')
      },
      handleBindDevice() {
          this.$emit('handleBindDevice')
      },
      handleEdit() {
          this.$emit('handleEdit')
      },
      handleBindSim() {
          this.$emit('handleBindSim')
      },
      handleLookPath() {
          this.$emit('handleLookPath')
      },
      onPageChange(page) {
          this.$emit('pageChange', page)
      }
   }
  };
</script>

<style scoped>

=======
<!--
 * @Author: xk
 * @Date: 2020-09-14 09:26:53
 * @LastEditTime: 2020-09-25 13:55:42
 * @LastEditors: Please set LastEditors
 * @Description: the components of base-table
 * @FilePath: /shop/src/components/myTables/baseTable.vue
-->
<template>
      <div>

           <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right; font-size: 14px">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini">
                    <el-table-column type="index" label="#"></el-table-column>
                    <template v-for="(column, index) in columns">
                         <el-table-column :key="index" :prop="column.prop" :label="column.label"></el-table-column>
                    </template>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                <el-pagination
                    background
                    :current-page.sync="page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div> 

      </div>
       
     
</template>

<script>
import Vue from "vue";
import store from "@/store";
import lime from "@/lime.js";
import util from "@/util.js";

export default {
  name: "TableBase",
  props: {
    rows: { type: Array, default: () => [] },
    columns: {type: Array, default: () => []},
    onSortChange: {type: Function, default: () => () => {console.log(11111)}},
    // onSelectRow: {type: Function, default: () => () => {console.log(22222)}},
    page_nums: {type: Number, default: () => 1},
    // onPageChange: {type: Function, default: () => () => {console.log(33333)}},
    total: {type: Number, default: () => 1},
    loading: {type: Boolean, default: () => false},
    // onSubMenu: {type: Function, default: () => () => {console.log(99999)}}
    // columns: { ype: Array, default: () => [] }
  },
  data() {
      return {
          page_num: this.page_nums
      }
  },
  watch: {
     page_nums(val) {
         this.page_num = val;
     }
  },
  computed:{
        width:() => {
            return store.state.AppData.width;
        },
        height:() => {
            return store.state.AppData.height;
        }
   },
   methods: {
       onSelectRow(row) {
           this.$emit('selRow', row)
       },
       onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
      },
      onRefresh() {
          this.$emit('onref')
      },
      handleAdd() {
          this.$emit('handleAdd')
      }, 
      handleDel() {
          this.$emit('handleDel')
      },
      handleDetail() {
          this.$emit('handleDetail')
      },
      handleBindDevice() {
          this.$emit('handleBindDevice')
      },
      handleEdit() {
          this.$emit('handleEdit')
      },
      handleBindSim() {
          this.$emit('handleBindSim')
      },
      handleLookPath() {
          this.$emit('handleLookPath')
      },
      onPageChange(page) {
          this.$emit('pageChange', page)
      }
   }
  };
</script>

<style scoped>

>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
</style>