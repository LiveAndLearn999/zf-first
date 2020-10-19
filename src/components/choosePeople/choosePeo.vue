<!--
 * @Author: your name
 * @Date: 2020-09-24 10:56:40
 * @LastEditTime: 2020-09-24 13:40:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/chooseAre/chooseAre.vue
-->
<template>
    <span>
        <el-select
            v-model="people_value"
            @change="chosePeople"
            placeholder="请选择承运人">
                <el-option
                v-for="item in peopleAry"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
    </span>
</template>
<script>
import lime from "@/lime.js";
export default {
     name: "chooseAre",
     data() {
        return {
           people_value: '',
           peopleAry: [],
           people_uuid: ''
        }
     },
     mounted() {
         lime.req('EbCarrierList',{login_token : lime.cookie_get('login_token')}).then(res => {
            this.peopleAry = res.data.rows.map(v => {
                return {value: v.uuid, label: v.name, ...v}
            });
        })
     },
     methods: {
        chosePeople(dd) {
            this.people_uuid = dd
            // console.log(dd)
        },
        
     }
}
</script>
<style scoped>
    
</style>>


