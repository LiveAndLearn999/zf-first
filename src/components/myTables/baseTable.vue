<!--
 * @Author: xk
 * @Date: 2020-09-14 09:26:53
 * @LastEditTime: 2020-09-16 16:18:13
 * @LastEditors: Please set LastEditors
 * @Description: the components of base-table
 * @FilePath: /shop/src/components/myTables/baseTable.vue
-->
<template>
    
       <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
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
                    :current-page.sync="page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
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
  computed:{
        width:() => {
            return store.state.AppData.width;
        },
        height:() => {
            return store.state.AppData.height;
        }
   },
   watch: {
     page_nums(val) {
         this.page_num = val;
     }
  },
   methods: {
       onSelectRow(row) {
           this.$emit('selRow', row)
       },
       onPageChange(page) {
          this.$emit('pageChange', page)
      }
   }
  };
</script>

<style scoped>

</style>