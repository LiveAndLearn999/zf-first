<<<<<<< HEAD
<!--
 * @Author: your name
 * @Date: 2020-09-24 10:56:40
 * @LastEditTime: 2020-09-24 14:22:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/chooseAre/chooseAre.vue
-->
<template>
    <div>
        <div>
            <el-select
            v-model="provice_value"
            @change="choseProvince"
            placeholder="请选择省">
                <el-option
                    v-for="item in proviceAry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </div>

        <div>
            <el-select
            v-if="showCity"
            style="margin-top: 10px"
            v-model="city_value"
            @change="choseCity"
            placeholder="请选择市">
                <el-option
                    v-for="item in cityAry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </div>

        <div>
            <el-select
            v-if="showArea"
            style="margin-top: 10px"
            v-model="area_value"
            @change="choseArea"
            placeholder="请选择区">
                <el-option
                    v-for="item in areaAry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </div>

    </div>
</template>
<script>
import lime from "@/lime.js";
export default {
     name: "chooseAre",
     data() {
        return {
            provice_uuid:'',
            provice_value: '',
            proviceAry: [],
            
            showCity: false,
            city_uuid: '',
            city_value: '',
            cityAry: [],
            
            showArea: false,
            area_uuid: '',
            area_value: '',
            areaAry: []
        }
     },
     mounted() {
         lime.req('GetArea',{}).then(res => {
            this.proviceAry = res.data.map(v => {
                return {value: v.uuid, label: v.name, ...v}
            });
        })
     },
     methods: {
        choseProvince(data) {
            if(data){
              this.provice_uuid = data
              lime.req('GetArea',{parent_uuid: data}).then(res => {
                    this.cityAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
              })
              this.city_value = ''
              this.area_value = ''
              this.city_uuid = ''
              this.area_uuid = ''
              this.showCity = true  
            }
            console.log(data)
        },
        choseCity(data) {
            if(data){
              this.city_uuid = data
              lime.req('GetArea',{parent_uuid: data}).then(res => {
                    this.areaAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
              })
              this.area_value = ''
              this.area_uuid = ''
              this.showArea = true  
            }
            console.log(data)
        },
        choseArea(data) {
            this.area_uuid = data
        }
     }
}
</script>
<style scoped>
    
</style>>


=======
<!--
 * @Author: your name
 * @Date: 2020-09-24 10:56:40
 * @LastEditTime: 2020-09-24 14:22:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/components/chooseAre/chooseAre.vue
-->
<template>
    <div>
        <div>
            <el-select
            v-model="provice_value"
            @change="choseProvince"
            placeholder="请选择省">
                <el-option
                    v-for="item in proviceAry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </div>

        <div>
            <el-select
            v-if="showCity"
            style="margin-top: 10px"
            v-model="city_value"
            @change="choseCity"
            placeholder="请选择市">
                <el-option
                    v-for="item in cityAry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </div>

        <div>
            <el-select
            v-if="showArea"
            style="margin-top: 10px"
            v-model="area_value"
            @change="choseArea"
            placeholder="请选择区">
                <el-option
                    v-for="item in areaAry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
        </el-select>
        </div>

    </div>
</template>
<script>
import lime from "@/lime.js";
export default {
     name: "chooseAre",
     data() {
        return {
            provice_uuid:'',
            provice_value: '',
            proviceAry: [],
            
            showCity: false,
            city_uuid: '',
            city_value: '',
            cityAry: [],
            
            showArea: false,
            area_uuid: '',
            area_value: '',
            areaAry: []
        }
     },
     mounted() {
         lime.req('GetArea',{}).then(res => {
            this.proviceAry = res.data.map(v => {
                return {value: v.uuid, label: v.name, ...v}
            });
        })
     },
     methods: {
        choseProvince(data) {
            if(data){
              this.provice_uuid = data
              lime.req('GetArea',{parent_uuid: data}).then(res => {
                    this.cityAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
              })
              this.city_value = ''
              this.area_value = ''
              this.city_uuid = ''
              this.area_uuid = ''
              this.showCity = true  
            }
            console.log(data)
        },
        choseCity(data) {
            if(data){
              this.city_uuid = data
              lime.req('GetArea',{parent_uuid: data}).then(res => {
                    this.areaAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
              })
              this.area_value = ''
              this.area_uuid = ''
              this.showArea = true  
            }
            console.log(data)
        },
        choseArea(data) {
            this.area_uuid = data
        }
     }
}
</script>
<style scoped>
    
</style>>


>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
