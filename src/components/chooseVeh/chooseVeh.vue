<!--
 * @Author: your name
 * @Date: 2020-09-24 10:56:40
 * @LastEditTime: 2020-09-24 13:42:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/chooseAre/chooseAre.vue
-->
<template>
    <span>
        <el-select
            v-model="veh_value"
            @change="choseVeh"
            placeholder="请选择企业归属车辆">
                <el-option
                v-for="item in vehAry"
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
     name: "chooseVeh",
     data() {
        return {
           veh_value: '',
           vehAry: [],
           veh_uuid: ''
        }
     },
     mounted() {
         lime.req('EbShopVehicleList',{login_token : lime.cookie_get('login_token')}).then(res => {
            this.vehAry = res.data.rows.map(v => {
                return {value: v.uuid, label: v.plate_number, ...v}
            });
        })
     },
     methods: {
        choseVeh(dd) {
            this.veh_uuid = dd
            // console.log(dd)
        },
        
     }
}
</script>
<style scoped>
    
</style>>


