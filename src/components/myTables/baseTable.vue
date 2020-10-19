<<<<<<< HEAD
<!--
 * @Author: xk
 * @Date: 2020-09-14 09:26:53
 * @LastEditTime: 2020-09-24 18:26:57
 * @LastEditors: Please set LastEditors
 * @Description: the components of base-table
 * @FilePath: /shop/src/components/myTables/baseTable.vue
-->
<template>
    
       <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
                stripe
               :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400',height: '48px'}"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini" >
                    <el-table-column type="index" width="80px" label="序号"></el-table-column>
                    <template v-for="(column, index) in columns">
                         <el-table-column  show-overflow-tooltip  align="center" :key="index" :prop="column.prop" :label="column.label">
                             <span v-if="column.showSt">
                                 <!-- slot-scope="scope" -->
                                 <!-- stateFormat(scope.row.state) -->
                                 <template>
                                    {{column.status}}
                                    <!-- {{scope.row.status + '111111'}} -->
                                </template>
                             </span>
                         </el-table-column>
                    </template>
            </el-table>

            <div class="page" :style="{width:width - 290 + 'px'}">
                 <el-pagination
                 background
                @current-change="onPageChange"
                :current-page.sync="page_num"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                 <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination> -->
                <!-- <el-pagination
                    :current-page.sync="page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
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
      },
      stateFormat(state) {
          if (state == 0) {
                    return '未开始';
                } else if (state == 1) {
                    return '处理中';
                } else if (state == 2){
                    return '已处理';
                }else{
                    return '已接收';
                }
      }
   }
  };
</script>

<style scoped>

=======
<!--
 * @Author: xk
 * @Date: 2020-09-14 09:26:53
 * @LastEditTime: 2020-09-24 18:26:57
 * @LastEditors: Please set LastEditors
 * @Description: the components of base-table
 * @FilePath: /shop/src/components/myTables/baseTable.vue
-->
<template>
    
       <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
                stripe
               :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400',height: '48px'}"
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                
                element-loading-background="rgba(0, 0, 0, 0.1)"

                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini" >
                    <el-table-column type="index" width="80px" label="序号"></el-table-column>
                    <template v-for="(column, index) in columns">
                         <el-table-column  show-overflow-tooltip  align="center" :key="index" :prop="column.prop" :label="column.label">
                             <span v-if="column.showSt">
                                 <!-- slot-scope="scope" -->
                                 <!-- stateFormat(scope.row.state) -->
                                 <template>
                                    {{column.status}}
                                    <!-- {{scope.row.status + '111111'}} -->
                                </template>
                             </span>
                         </el-table-column>
                    </template>
            </el-table>

            <div class="page" :style="{width:width - 290 + 'px'}">
                 <el-pagination
                 background
                @current-change="onPageChange"
                :current-page.sync="page_num"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                 <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination> -->
                <!-- <el-pagination
                    :current-page.sync="page_num"
                    @current-change="onPageChange"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
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
      },
      stateFormat(state) {
          if (state == 0) {
                    return '未开始';
                } else if (state == 1) {
                    return '处理中';
                } else if (state == 2){
                    return '已处理';
                }else{
                    return '已接收';
                }
      }
   }
  };
</script>

<style scoped>

>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
</style>