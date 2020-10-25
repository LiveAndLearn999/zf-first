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
           <el-row>
               <el-col :span="8">
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
               </el-col>
               <el-col :span="8">
                    <el-select 
                        v-if="showCity"
                        style=""
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
               </el-col>
               <el-col :span="8">
                   <el-select
                    v-if="showArea"
                    style=""
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
               </el-col>
           </el-row>
        </div>

        <div>
            <!-- <el-select
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
        </el-select> -->
        </div>

        <div>
            <!-- <el-select
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
        </el-select> -->
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
            
            showCity: true,
            city_uuid: '',
            city_value: '',
            cityAry: [],
            
            showArea: true,
            area_uuid: '',
            area_value: '',
            areaAry: []
        }
     },
     mounted() {
         lime.req('GetArea',{}).then(res => {
             this.provice_value = res.data[0].uuid
            this.proviceAry = res.data.map(v => {
                return {value: v.uuid, label: v.name, ...v}
            });
              lime.req('GetArea',{parent_uuid: this.proviceAry[0].value}).then(res => {
                  this.city_value = res.data[0].uuid
                    this.cityAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
                    lime.req('GetArea',{parent_uuid: this.cityAry[0].value}).then(res => {
                   this.area_value = res.data[0].uuid
                    this.area_uuid = res.data[0].uuid
                    this.areaAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
              })

              })
        })
     },
     methods: {
        choseProvince(data) {
            if(data){
              this.provice_uuid = data
              lime.req('GetArea',{parent_uuid: data}).then(res => {
                  this.city_value = res.data[0].uuid
                    this.cityAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
                    lime.req('GetArea',{parent_uuid: this.cityAry[0].value}).then(res => {
                   this.area_value = res.data[0].uuid
                    this.area_uuid = res.data[0].uuid
                    this.areaAry = res.data.map(v => {
                        return {value: v.uuid, label: v.name, ...v}
                    });
                    })
                    
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
                   this.area_value = res.data[0].uuid
                    this.area_uuid = res.data[0].uuid
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


