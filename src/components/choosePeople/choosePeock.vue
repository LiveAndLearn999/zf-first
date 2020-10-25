<!--
 * @Author: your name
 * @Date: 2020-09-24 11:36:40
 * @LastEditTime: 2020-09-24 13:41:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/choosePeople/choosePeock.vue
-->
<template>
    <span>
        <el-select
            v-model="people_value"
            @change="chosePeople"
            multiple
            placeholder="请选择参与人">
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
     props: {
         peoary: {type: Array, default: () => []}
     },
     data() {
        return {
           people_value: '',
           peopleAry: [],
           people_uuid: ''
        }
     },
     mounted() {
         lime.req('EbShopListCertificate',{login_token : lime.cookie_get('login_token')}).then(res => {
             this.people_value = !this.peoary[0] ? [res.data.rows[0].uuid] : this.peoary
            this.peopleAry = res.data.rows.map(v => {
                return {value: v.uuid, label: v.name, ...v}
            });
        })
     },
     methods: {
        chosePeople(dd) {
            console.log(dd)
            this.people_uuid = dd
        },
        
     }
}
</script>
<style scoped>
    
</style>>


