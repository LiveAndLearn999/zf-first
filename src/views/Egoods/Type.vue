<!--
 * @Author: your name
 * @Date: 2020-09-10 17:41:47
 * @LastEditTime: 2020-09-14 10:47:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Egoods/Type.vue
-->
<template>
    <div>
        <h6>{{cpname}}</h6>
        <TableBase :loading="loading" :tableObj="tableObj" :columns="columns"/>
    </div>
</template>
<script>
    import TableBase from "@/components/myTables/baseTable.vue"
    export default {
        components: {
            TableBase
        },
        data() {
            return {
               cpname: '货物类型---未找到相关接口',
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