<!--
 * @Author: your name
 * @Date: 2020-09-10 11:38:11
 * @LastEditTime: 2020-09-14 10:46:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Admin/Customer.vue
-->
<template>
	<div>
		<h6>{{cpname}}</h6>
        <TableBase :loading="loading" :tableObj="tableObj" :columns="columns"/>
	</div>
</template>
<script>
// "extends": [
//       "plugin:vue/essential",
//       "eslint:recommended"
//     ],
import TableBase from "@/components/myTables/baseTable.vue"
export default {
	components: {
	    TableBase
	},
    data() {
        return {
            cpname: '企业客户---未找到相关接口',
            tableObj: {
                rows: []
            },
            columns: [
                {prop: 'name', label: '姓名'},
                {prop: 'mobile', label: '登录手机'},
                {prop: 'add_time', label: '添加时间'},
                {prop: 'role_name', label: '姓名'},
                {prop: 'name', label: '角色'}    
            ],
            loading: false
        }
            
        
    },

}
</script>
<style scoped>
</style>