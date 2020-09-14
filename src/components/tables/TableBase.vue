<!--
 * @Author: your name
 * @Date: 2020-09-14 00:45:12
 * @LastEditTime: 2020-09-14 10:24:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/tables/TableBase.vue
-->
<template>
  <el-table :data="data" stripe style="width: 100%">
    <template v-for="(column, index) in columns">
      <el-table-column
        :prop="column.prop"
        :key="index"
        :label="column.label"
        :width="column.width"
      >
        <template slot-scope="{ row, $index }">
          <TableExtend
            v-if="column.render"
            :render="column.render"
            :row="row"
            :index="$index"
            :column="column"
          ></TableExtend>
          <template v-else>{{ row[column.prop] }}</template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import TableExtend from "./TableExtend";
export default {
  name: "TableBase",
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] }
  },
  components: {
    TableExtend
  }
};


// "eslintConfig": {
//     "root": true,
//     "env": {
//       "node": true
//     },
//     "extends": [
//       "plugin:vue/essential",
//       "eslint:recommended"
//     ],
</script>