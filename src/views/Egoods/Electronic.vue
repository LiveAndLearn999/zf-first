<!--
 * @Author: your name
 * @Date: 2020-09-10 17:35:35
 * @LastEditTime: 2020-09-25 10:58:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Egoods/Electronic.vue
-->
<template>
    <div>

         <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;">
            <el-row>
                <el-col :span="6">
                    <div style="padding-left:16px;">
                        <i class="el-icon-s-unfold"></i>
                        <span style="padding-left:9px;font-size: 16px">
                            {{$store.state.AdminData.active_title}}
                        </span>
                    </div>
                </el-col>

                <el-col :span="18">
                    <div style="text-align: right;font-size: 14px ">
                        <el-link @click="onSubMenu('onRefresh',true)" class="menu">刷新</el-link>
                        <!-- <el-link @click="onSubMenu('onSearch',true)" class="menu">搜索</el-link> -->

                        <el-link
                            class="menu" 
                            @click="onSubMenu(item)"
                            v-for="(item,index) in $store.state.AdminData.right_menus" 
                            :key="index">
                            {{item.name}}
                        </el-link>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div style="border-top: solid 1px #f2f1f4;">
            <el-table 
                :data="rows"
<<<<<<< HEAD
                stripe
                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px'}"
=======
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                :height="height - 60 - 46 - 48"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%" 
                size="mini" >
<<<<<<< HEAD
                    <el-table-column width="80px" type="index" label="序号"></el-table-column>
=======
                    <el-table-column width="80px" type="index" label="#"></el-table-column>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    <el-table-column prop="code" align="left" label="运单单号"></el-table-column>
                    <el-table-column prop="plate_number" label="车牌号"></el-table-column>
                    <el-table-column prop="dispatch_time" label="调度日期"></el-table-column>
                    <el-table-column prop="s_address" label="起送地"></el-table-column>
                    <el-table-column prop="e_address" label="目的地"></el-table-column>
                    <el-table-column prop="status" label="运单状态 "></el-table-column>
                    <el-table-column prop="type" label="来源">
                        <template slot-scope="scope">
                            {{scope.row.type == 1 ? '企业派送 ' : '员工提交'}}
                        </template>
                    </el-table-column>
            </el-table>

            <div class="page" :style="{width:width - 250 + 'px'}">
                 <el-pagination
<<<<<<< HEAD
                    background
=======
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    @size-change="handleSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="SearchFormData.page_num"
                    :page-size="SearchFormData.page_len"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div> 
        <!-- <TableBase :loading="loading" :rows="rows" :columns="columns" @selRow="onSelectCurrRow"/> -->

        <!-- 添加 -->
        <el-drawer
            :visible.sync="add_show"
            :direction="direction" size="45%">
             <div slot="title">添加</div>
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                    <el-form :model="AddFormData" label-width="160px" label-position="left">
                        <el-form-item label="托运人名称:" required>
                            <el-input v-model="AddFormData.consignor" />
                        </el-form-item>
                        <el-form-item label="托运人联系电话:" required>
                            <el-input v-model="AddFormData.consignor_phone" />
                        </el-form-item>
                        <el-form-item label="装货人名称:" required>
                            <el-input v-model="AddFormData.loader" />
                        </el-form-item>
                        <el-form-item label="装货人联系:" required>
                            <!-- <el-input type="textarea" v-model="AddFormData.loader_phone"></el-input> -->
                            <el-input v-model="AddFormData.loader_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人名称:" required>
                            <el-input v-model="AddFormData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人联系电话:" required>
                            <el-input v-model="AddFormData.consignee_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="起运日期:" required>
                            <el-date-picker
                                v-model="AddFormData.s_time"
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>
                            <!-- <el-input v-model="AddFormData.s_time"></el-input> -->
                        </el-form-item>
                        <el-form-item label="地址:" required>
                            <ChooseAre ref="starAdress"/> 
                            <!-- <el-input v-model="AddFormData.s_area_uuid"></el-input> -->
                        </el-form-item>
                        <el-form-item label="具体地址:" required>
                            <el-input v-model="AddFormData.s_address"></el-input>
                        </el-form-item>
                        <el-form-item label="目地地:" required>
                            <ChooseAre ref="goAdress"/>
                            <!-- <el-input v-model="AddFormData.e_area_uuid"></el-input> -->
                        </el-form-item>
                        <el-form-item label="目的地具体地址:" required>
                            <el-input v-model="AddFormData.e_address"></el-input>
                        </el-form-item>
                        <el-form-item label="调度人:">
                            <el-input v-model="AddFormData.dispatcher"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input type="textarea" v-model="AddFormData.remark"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="登录信息:" required>
                            <el-input v-model="AddFormData.login_token"></el-input>
                        </el-form-item> -->
                        <el-form-item label="调度时间:">
                            <el-date-picker
                                v-model="AddFormData.dispatch_time"
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>
                            <!-- <el-input v-model="AddFormData.dispatch_time"></el-input> -->
                        </el-form-item>
                        <el-form-item label="承运人:" required>
                            <ChoosePeo ref="getPeople"/>
                            <!-- <el-input v-model="AddFormData.carrier_uuid"></el-input> -->
                        </el-form-item>
                        <el-form-item label="参与人(参与派送):" required>
                            <ChoosePeock ref="doPeople"/>
                            <!-- <el-input v-model="AddFormData.participation_staff_uuids"></el-input> -->
                        </el-form-item>
                        <el-form-item label="主要参与人:" required>
                            <ChoosePeock ref="mdoPeople"/>
                            <!-- <el-input v-model="AddFormData.main_staff_uuid"></el-input> -->
                        </el-form-item>
                        <el-form-item label="企业归属车辆:">
                            <ChooseVeh ref="ofVeh"/>
                            <!-- <el-input v-model="AddFormData.shop_vehicle_uuid"></el-input> -->
                        </el-form-item>
<<<<<<< HEAD
                        <el-form-item label="货品信息:" v-for="value in infoList" :key="value.id">
                            <el-form-item label="货物类型:" style="margin-top: 10px">
                                <el-select
                                    style="width: 100%"
                                    v-model="value.good_value"
                                     @change="choseGood"
                                     placeholder="请选择货品">
                                    <el-option
                                        v-for="item in goodAry"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标码:" style="margin-top: 10px">
                                <el-input type="text" v-model="value.un_number"></el-input>
                            </el-form-item>
                             <el-form-item label="货物总重量:" style="margin-top: 10px">
                                <el-input type="number" v-model="value.cargo_total"></el-input>
                            </el-form-item>

                            <el-form-item label="包装规格:" style="margin-top: 10px">
                                <el-input type="text" v-model="value.packing_spec"></el-input>
                            </el-form-item>
                            <el-form-item label="数量:" style="margin-top: 10px">
                                <el-input type="number" v-model="value.number_of_cargos"></el-input>
                            </el-form-item>
                            <el-form-item label="单位:" style="margin-top: 10px">
                                <el-input type="text" v-model="value.unit"></el-input>
                            </el-form-item>
                        </el-form-item>
                        <!-- <el-form-item label="货品信息:">
=======
                        <el-form-item label="货品信息:">
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                            <el-form-item label="货物类型:" style="margin-top: 10px">
                                <el-select
                                    style="width: 100%"
                                    v-model="good_value"
                                     @change="choseGood"
                                     placeholder="请选择货品">
                                    <el-option
                                        v-for="item in goodAry"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标码:" style="margin-top: 10px">
                                <el-input type="text" v-model="un_number"></el-input>
                            </el-form-item>
                            <el-form-item label="货物总重量:" style="margin-top: 10px">
                                <el-input type="number" v-model="cargo_total"></el-input>
                            </el-form-item>

                            <el-form-item label="包装规格:" style="margin-top: 10px">
                                <el-input type="text" v-model="packing_spec"></el-input>
                            </el-form-item>
                            <el-form-item label="数量:" style="margin-top: 10px">
                                <el-input type="number" v-model="number_of_cargos"></el-input>
                            </el-form-item>
                            <el-form-item label="单位:" style="margin-top: 10px">
                                <el-input type="text" v-model="unit"></el-input>
                            </el-form-item>
<<<<<<< HEAD
                        </el-form-item> -->
                        <div style="text-align: center">
                            <i  @click="addinfo" class="el-icon-circle-plus-outline" style="font-size: 30px;margin-right: 6px;"></i>
                            <!-- <span @click="addinfo">添加</span> -->
                        </div>
=======
                        </el-form-item>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                    
                    </el-form>
                </div>

            <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </div>
        </el-drawer>
        
        <!-- <el-dialog  
            title="添加"
            :visible.sync="add_show"
            width="500px">
                <div class="from-box">
                    <el-form :model="AddFormData" label-width="160px">
                        <el-form-item label="托运人名称:" required>
                            <el-input v-model="AddFormData.consignor" />
                        </el-form-item>
                        <el-form-item label="托运人联系电话:" required>
                            <el-input v-model="AddFormData.consignor_phone" />
                        </el-form-item>
                        <el-form-item label="装货人名称:" required>
                            <el-input v-model="AddFormData.loader" />
                        </el-form-item>
                        <el-form-item label="装货人联系:" required>
                            <el-input type="textarea" v-model="AddFormData.loader_phone"></el-input>
                            <el-input v-model="AddFormData.loader_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人名称:" required>
                            <el-input v-model="AddFormData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人联系电话:" required>
                            <el-input v-model="AddFormData.consignee_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="起运日期:" required>
                            <el-input v-model="AddFormData.s_time"></el-input>
                        </el-form-item>
                        <el-form-item label="具体地址:" required>
                            <el-input v-model="AddFormData.s_address"></el-input>
                        </el-form-item>
                        <el-form-item label="地址区域uuid:" required>
                            <el-cascader 
                                clearable 
                                :options="add_rows"
                                :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                                placeholder="不选择则为顶级"
                                v-model="AddFormData.s_area_uuid">
                            </el-cascader>
                            <el-input v-model="AddFormData.s_area_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="目的地具体地址:" required>
                            <el-input v-model="AddFormData.e_address"></el-input>
                        </el-form-item>
                        <el-form-item label="目地地地址区域uuid:" required>
                            <el-cascader 
                                clearable 
                                :options="add_rowss"
                                :props="{checkStrictly:true,expandTrigger: 'hover',value:'uuid', label:'name',emitPath:false}"
                                placeholder="不选择则为顶级"
                                v-model="AddFormData.e_area_uuid">
                            </el-cascader>
                            <el-input v-model="AddFormData.e_area_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="调度人:">
                            <el-input v-model="AddFormData.dispatcher"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="AddFormData.remark"></el-input>
                        </el-form-item>
                        <el-form-item label="登录信息:" required>
                            <el-input v-model="AddFormData.login_token"></el-input>
                        </el-form-item>
                        <el-form-item label="调度时间:">
                            <el-input v-model="AddFormData.dispatch_time"></el-input>
                        </el-form-item>
                        <el-form-item label="承运人uuid:" required>
                            <el-input v-model="AddFormData.carrier_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="参与人(参与派送):" required>
                            <el-input v-model="AddFormData.participation_staff_uuids"></el-input>
                        </el-form-item>
                        <el-form-item label="主要参与人:" required>
                            <el-input v-model="AddFormData.main_staff_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="审核人:" required>
                            <el-input v-model="AddFormData.examine_staff_ids"></el-input>
                        </el-form-item>
                        <el-form-item label="企业归属车辆uuid:">
                            <el-input v-model="AddFormData.shop_vehicle_uuid"></el-input>
                        </el-form-item>
                        <el-form-item label="签名证书图片URL:">
                            <el-input v-model="AddFormData.sign_url"></el-input>
                        </el-form-item>
                        <el-form-item label="货品集合信息:">
                            <el-input v-model="AddFormData.goods_json"></el-input>
                        </el-form-item>
                        <el-form-item label="起至地址是否同城:">
                            <el-input v-model="AddFormData.is_city_wide"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

            <span slot="footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog> -->

        <!-- 编辑 -->
        <el-drawer
            :visible.sync="edit_show"
            :direction="direction" size="45%">
             <div slot="title">编辑</div>
            <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                    <el-form :model="EditFormData" label-width="160px" label-position="left">
<<<<<<< HEAD
                        <el-form-item label="托运人名称:">
                            <el-input v-model="EditFormData.consignor" />
                        </el-form-item>
                        <el-form-item label="托运人联系电话:">
                            <el-input v-model="EditFormData.consignor_phone" />
                        </el-form-item>
                        <el-form-item label="装货人名称:">
                            <el-input v-model="EditFormData.loader" />
                        </el-form-item>
                        <el-form-item label="装货人联系:">
                            <el-input v-model="EditFormData.loader_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人名称:">
                            <el-input v-model="EditFormData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人联系电话:">
                            <el-input v-model="EditFormData.consignee_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="起运日期:">
=======
                        <el-form-item label="托运人名称:" required>
                            <el-input v-model="EditFormData.consignor" />
                        </el-form-item>
                        <el-form-item label="托运人联系电话:" required>
                            <el-input v-model="EditFormData.consignor_phone" />
                        </el-form-item>
                        <el-form-item label="装货人名称:" required>
                            <el-input v-model="EditFormData.loader" />
                        </el-form-item>
                        <el-form-item label="装货人联系:" required>
                            <el-input v-model="EditFormData.loader_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人名称:" required>
                            <el-input v-model="EditFormData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人联系电话:" required>
                            <el-input v-model="EditFormData.consignee_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="起运日期:" required>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                            <el-date-picker
                                v-model="EditFormData.s_time"
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
<<<<<<< HEAD
                        <el-form-item label="地址:">
                            <ChooseAre ref="starAdress"/> 
                        </el-form-item>
                        <el-form-item label="具体地址:">
                            <el-input v-model="EditFormData.s_address"></el-input>
                        </el-form-item>
                        <el-form-item label="目地地:">
                            <ChooseAre ref="goAdress"/>
                        </el-form-item>
                        <el-form-item label="目的地具体地址:">
=======
                        <el-form-item label="地址:" required>
                            <ChooseAre ref="starAdress"/> 
                        </el-form-item>
                        <el-form-item label="具体地址:" required>
                            <el-input v-model="EditFormData.s_address"></el-input>
                        </el-form-item>
                        <el-form-item label="目地地:" required>
                            <ChooseAre ref="goAdress"/>
                        </el-form-item>
                        <el-form-item label="目的地具体地址:" required>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                            <el-input v-model="EditFormData.e_address"></el-input>
                        </el-form-item>
                        <el-form-item label="调度人:">
                            <el-input v-model="EditFormData.dispatcher"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input type="textarea" v-model="EditFormData.remark"></el-input>
                        </el-form-item>
                        <el-form-item label="调度时间:">
                            <el-date-picker
                                v-model="EditFormData.dispatch_time"
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
<<<<<<< HEAD
                        <el-form-item label="承运人:">
                            <ChoosePeo ref="getPeople"/>
                        </el-form-item>
                        <el-form-item label="参与人(参与派送):">
                            <ChoosePeock ref="doPeople"/>
                        </el-form-item>
                        <el-form-item label="主要参与人:">
=======
                        <el-form-item label="承运人:" required>
                            <ChoosePeo ref="getPeople"/>
                        </el-form-item>
                        <el-form-item label="参与人(参与派送):" required>
                            <ChoosePeock ref="doPeople"/>
                        </el-form-item>
                        <el-form-item label="主要参与人:" required>
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                            <ChoosePeock ref="mdoPeople"/>
                        </el-form-item>
                        <el-form-item label="企业归属车辆:">
                            <ChooseVeh ref="ofVeh"/>
                        </el-form-item>
                        <el-form-item label="货品信息:">
                            <el-form-item label="货物类型:" style="margin-top: 10px">
                                <el-select
                                    style="width: 100%"
                                    v-model="good_value"
                                     @change="choseGood"
                                     placeholder="请选择货品">
                                    <el-option
                                        v-for="item in goodAry"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标码:" style="margin-top: 10px">
                                <el-input type="text" v-model="un_number"></el-input>
                            </el-form-item>
                            <el-form-item label="货物总重量:" style="margin-top: 10px">
                                <el-input type="number" v-model="cargo_total"></el-input>
                            </el-form-item>

                            <el-form-item label="包装规格:" style="margin-top: 10px">
                                <el-input type="text" v-model="packing_spec"></el-input>
                            </el-form-item>
                            <el-form-item label="数量:" style="margin-top: 10px">
                                <el-input type="number" v-model="number_of_cargos"></el-input>
                            </el-form-item>
                            <el-form-item label="单位:" style="margin-top: 10px">
                                <el-input type="text" v-model="unit"></el-input>
                            </el-form-item>
                        </el-form-item>
                    
                    </el-form>
                </div>

            <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>
        </el-drawer>



        <!-- 详细 -->
        <el-drawer
            :visible.sync="detail_show"
            :direction="direction" size="45%">
             <div slot="title">详细</div>
             <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                    <el-form label-width="200px" label-position="left">
                        <el-form-item label="托运人名称:">
                            {{DetailFormData.consignor}}
                        </el-form-item>
                        <el-form-item label="托运人联系电话:">
                            {{DetailFormData.consignor_phone}}
                        </el-form-item>
                        <el-form-item label="装货人名称:">
                            {{DetailFormData.loader}}
                        </el-form-item>
                        <el-form-item label="装货人联系:">
                            {{DetailFormData.loader_phone}}
                        </el-form-item>
                        <el-form-item label="收货人名称:">
                            {{DetailFormData.consignee}}
                        </el-form-item>
                        <el-form-item label="收货人联系电话:">
                            {{DetailFormData.consignee_phone}}
                        </el-form-item>
                        <el-form-item label="起运日期:">
                            {{DetailFormData.s_time}}
                        </el-form-item>
                        <el-form-item label="具体地址:">
                            {{DetailFormData.s_address}}
                        </el-form-item>
                        <!-- <el-form-item label="地址区域uuid:">
                            {{DetailFormData.s_area_uuid}}
                        </el-form-item> -->
                        <el-form-item label="目的地具体地址:">
                            {{DetailFormData.e_address}}
                        </el-form-item>
                        <!-- <el-form-item label="目地地地址区域uuid:">
                            {{DetailFormData.e_area_uuid}}
                        </el-form-item> -->
                        <el-form-item label="调度人:">
                            {{DetailFormData.dispatcher}}
                        </el-form-item>
                        <el-form-item label="备注:">
                            {{DetailFormData.remark}}
                        </el-form-item>
                        <el-form-item label="登录信息:">
                            {{DetailFormData.login_token}}
                        </el-form-item>
                        <el-form-item label="调度时间:">
                            {{DetailFormData.dispatch_time}}
                        </el-form-item>
                        <!-- <el-form-item label="承运人uuid:">
                            {{DetailFormData.carrier_uuid}}
                        </el-form-item> -->
                        <el-form-item label="参与人(参与派送):">
                            {{DetailFormData.participation_staff_uuids}}
                        </el-form-item>
                        <el-form-item label="主要参与人:">
                            {{DetailFormData.main_staff_uuid}}
                        </el-form-item>
                        <el-form-item label="审核人:">
                            {{DetailFormData.examine_staff_ids}}
                        </el-form-item>
                        <!-- <el-form-item label="企业归属车辆uuid:">
                            {{DetailFormData.shop_vehicle_uuid}}
                        </el-form-item> -->
                        <el-form-item label="签名证书图片URL:">
                            {{DetailFormData.sign_url}}
                        </el-form-item>
                        <el-form-item label="货品集合信息:">
                            {{DetailFormData.goods_json}}
                        </el-form-item>
                        <el-form-item label="起至地址是否同城:" prop="DetailFormData.is_city_wide">
                            <!-- <template slot-scope="scope">
                                {{scope.row.is_city_wide == 1 ? '是' : '否'}}
                            </template> -->
                            {{DetailFormData.is_city_wide == 1 ? '是' : '否'}}
                        </el-form-item>
                    </el-form>
                    <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                        <el-button @click="detail_show = false" type="primary">确定</el-button>
                    </div>
                </div>
                
        </el-drawer>

        <!-- 审核 -->
        <el-dialog  
            title="审核"
            :visible.sync="check_show"
            width="400px">
                <div class="from-box">
                    <el-form :model="AddFormData" label-width="100px" label-position="left">
                        <el-form-item label="审核:" required>
                             <el-radio-group v-model="CheckFormData.status">
                                <el-radio :label="0">通过审核</el-radio>
                                <el-radio :label="5">驳回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="驳回原因:" v-if="CheckFormData.status">
                            <el-input type="textarea" v-model="CheckFormData.reject_reason" />
                        </el-form-item>
                    </el-form>
                </div>

                 <span slot="footer">
                <el-button @click="check_show = false">取消</el-button>
                <el-button @click="onCheckSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>

        <!-- 数据统计 -->
         <el-drawer
            :visible.sync="data_show"
            :direction="direction" size="45%">
             <div slot="title">数据统计</div>
             <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                 <Bar :dtlist="dtlist"/>
             </div>

             <div class="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                <!-- <el-button @click="data_show = false">取消</el-button> -->
                <!-- <el-button @click="onDataSubmit" type="primary">确定</el-button> -->
                <el-button @click="data_show = false" type="primary">确定</el-button>
            </div>
         </el-drawer>
        
        <!-- 接单 -->
         <el-dialog  
            title="接单"
            :visible.sync="receive_show"
            width="400px">
                <div class="from-box">
                    <el-form :model="ReceiveFormData" label-width="100px" label-position="left">
                        <el-form-item label="处理:" required>
                             <el-radio-group v-model="ReceiveFormData.status">
                                <el-radio :label="0">接单</el-radio>
                                <el-radio :label="5">拒接</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="拒绝原因:" v-if="ReceiveFormData.status">
                            <el-input type="textarea" v-model="ReceiveFormData.reject_reason" />
                        </el-form-item>
                    </el-form>
                </div>

                 <span slot="footer">
                <el-button @click="receive_show = false">取消</el-button>
                <el-button @click="onReceiveSubmit" type="primary">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import {EbShopConfirm, EbShopStaffReceiveBillAudit, EbShopAudit, EbShopCancel, EbShopList, EbShopAdd , EbDetail, GetCityUuid, EbGoodsTypeList, EbStaffList, EbCarrierList, EbPackTypeList, EbGoodList, EbShopVehicleList, EbShopListCertificate} from "@/api/request"
    // import TableBase from "@/components/myTables/baseTable.vue"
    import ChooseAre from "@/components/chooseAre/chooseAre.vue"
    import ChoosePeo from "@/components/choosePeople/choosePeo.vue"
    import ChoosePeock from "@/components/choosePeople/choosePeock.vue"
    import ChooseVeh from "@/components/chooseVeh/chooseVeh.vue"
    import Bar from "@/components/myEcharts/bar.vue"

    if (!store.state.EbShopData) {
        Vue.set(store.state, 'EbShopData', {
            list: [],
            add_rows: [],
            add_rowss: [],
            total:0,
            loading:false,
            curr_row:null,
             SearchFormData:{
                page_num:1,
                page_len:10,
            },
             // 添加
            add_show:false,
            AddFormData:{},
            //详细
            detail_show: false,
            DetailFormData:{},
            //删除
            del_show: false,
            //编辑
            edit_show:false,
            EditFormData:{},
            //表格数据
            rows: [],
            cpname: '电子运单--api 平台未找到相关接口',
            direction: 'rtl',
            check_show: false,
            CheckFormData: {},
            data_show: false,
            receive_show: false,
            ReceiveFormData: {},
            // dtlist: [10, 52, 200, 334, 390, 330],
            dtlist: [],
            good_value: '',
            goodAry: [],
            good_uuid: '',
            un_number: '',
            cargo_total: '',
            packing_spec: '',
            number_of_cargos:'',
<<<<<<< HEAD
            unit: '',
            // good_value un_number cargo_total packing_spec number_of_cargos unit
            infoList: [
                {id: 1,good_uuid: '',good_value: '', un_number: '',cargo_total: '',packing_spec: '',number_of_cargos: '',unit: ''}
            ]
=======
            unit: ''
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28

        });
    }

    export default {
        components: {
            // TableBase,
            ChooseAre,
            ChoosePeo,
            ChoosePeock,
            ChooseVeh,
            Bar
        },
        data() {return store.state.EbShopData;},
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
        },
        created() {
            this.init()
            lime.req('EbMainStatistics',
               {
                login_token: lime.cookie_get('login_token')
               }).then(res => {
                   this.dtlist = [res.data.transit_num, res.data.transport_num, res.data.check_pass_num, res.data.reject_num, res.data.distribute_num, res.data.complete_num]
                console.log(res)
               })
                lime.req('EbGoodList',{login_token : lime.cookie_get('login_token')}).then(res => {
            this.goodAry = res.data.rows.map(v => {
                return {value: v.uuid, label: v.name, ...v}
            });
        })
        },
        methods: {
<<<<<<< HEAD
            addinfo() {
                let len = this.infoList.length - 0;
                let lt = this.infoList
                console.log(this.infoList)
                lt.push(
                    {id: len+1,good_uuid: '',good_value: '', un_number: '',cargo_total: '',packing_spec: '',number_of_cargos: '',unit: ''}
                )
                this.infoList = lt
                console.log(this.infoList)
            },
            choseGood(uuid) {
                // this.good_uuid = uuid
                let len = this.infoList.length - 1
                this.infoList[len].good_uuid = uuid
                // console.log(uuid)
=======
            choseGood(uuid) {
                this.good_uuid = uuid
                console.log(uuid)
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {
                util.submenu(menu,this,lime.cookie_get('login_token'), local);
            },
            init() {
                this.loading = true;
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    page_num:this.SearchFormData.page_num,
                    page_len:this.SearchFormData.page_len
                }
                EbShopList(pam, res => {
                    this.loading = false;
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.list = res.data;
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            }, 
            // 刷新
            onRefresh() {this.init();},
            // 点击单选
            onSelectRow(row) {
                this.curr_row = row;
            },
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 排序处理
            onSortChange(sort) {
                console.log(sort);
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                
                this.init();
            },
            //添加
            
            handleAdd() {
              this.add_show = true  
              this.infoList = [
                    {id: 1,good_uuid: '',good_value: '', un_number: '',cargo_total: '',packing_spec: '',number_of_cargos: '',unit: ''}
              ]
            },
            onAddSubmit() {               
<<<<<<< HEAD
                // this.AddFormData.s_time = this.AddFormData.s_time.getFullYear() + '-' + (this.AddFormData.s_time.getMonth() + 1) + '-' + this.AddFormData.s_time.getDate()
                // this.AddFormData.dispatch_time = this.AddFormData.dispatch_time.getFullYear() + '-' + (this.AddFormData.dispatch_time.getMonth() + 1) + '-' + this.AddFormData.dispatch_time.getDate()
                // this.AddFormData.s_area_uuid =  this.$refs.starAdress.area_uuid
                // this.AddFormData.e_area_uuid =  this.$refs.goAdress.area_uuid
                // this.AddFormData.carrier_uuid =  this.$refs.getPeople.people_uuid
                // this.AddFormData.participation_staff_uuids =  this.$refs.doPeople.people_uuid
                // this.AddFormData.main_staff_uuid =  this.$refs.mdoPeople.people_uuid[0]
                // this.AddFormData.shop_vehicle_uuid =  this.$refs.ofVeh.veh_uuid
                // this.AddFormData.login_token  =  lime.cookie_get('login_token')
                // this.AddFormData.goods_json = '"' + this.infoList + '"'

                // this.AddFormData.goods_json = [
                //     {
                //         "good_uuid": this.good_uuid,
                //         "un_number": this.un_number,
                //         "cargo_total": this.cargo_total,
                //         "packing_spec": this.packing_spec,
                //         "number_of_cargos": this.number_of_cargos,
                //         "unit": this.unit
                //     }
                // ]
=======
                this.AddFormData.s_time = this.AddFormData.s_time.getFullYear() + '-' + (this.AddFormData.s_time.getMonth() + 1) + '-' + this.AddFormData.s_time.getDate()
                this.AddFormData.dispatch_time = this.AddFormData.dispatch_time.getFullYear() + '-' + (this.AddFormData.dispatch_time.getMonth() + 1) + '-' + this.AddFormData.dispatch_time.getDate()
                this.AddFormData.s_area_uuid =  this.$refs.starAdress.area_uuid
                this.AddFormData.e_area_uuid =  this.$refs.goAdress.area_uuid
                this.AddFormData.carrier_uuid =  this.$refs.getPeople.people_uuid
                this.AddFormData.participation_staff_uuids =  this.$refs.doPeople.people_uuid
                this.AddFormData.main_staff_uuid =  this.$refs.mdoPeople.people_uuid[0]
                this.AddFormData.shop_vehicle_uuid =  this.$refs.ofVeh.veh_uuid
                this.AddFormData.login_token  =  lime.cookie_get('login_token')
                this.AddFormData.goods_json = [
                    {
                        "good_uuid": this.good_uuid,
                        "un_number": this.un_number,
                        "cargo_total": this.cargo_total,
                        "packing_spec": this.packing_spec,
                        "number_of_cargos": this.number_of_cargos,
                        "unit": this.unit
                    }
                ]
>>>>>>> fceaec7b585ec88b202a7b047d77e93b535d6b28
                EbShopAdd(this.AddFormData, res => {
                    console.log(res)
                })
            },
            //作废
            handleDel() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.$confirm('确认作废?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }
                    EbShopCancel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },
            //编辑
            handleEdit(){
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
                this.edit_show = false
            },

            //详细
            handleDetail() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.detail_show = true
                EbDetail({
                     login_token: lime.cookie_get('login_token'),
                     uuid: this.curr_row.uuid
                }, res => {
                    this.DetailFormData = res.data
                    console.log(res)
                }).catch(err => {
                    this.$message.error(err.msg)
                })
            },
            //审核/作废
            handleCheck() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.CheckFormData = {}
                this.check_show = true
            },
            onCheckSubmit() {
                this.CheckFormData.login_token = lime.cookie_get('login_token')
                this.CheckFormData.uuid = this.curr_row.uuid
                this.CheckFormData.status = this.CheckFormData.status - 0
                EbShopAudit(this.CheckFormData, res => {
                    this.init();
                    this.$message.success('操作成功');
                }).catch(err => {
                    this.$message.error(err.msg)
                })
                this.check_show = false
            },
            //数据统计
            handleData() {
               this.data_show = true
               
            },
            onDataSubmit() {
                this.data_show = false
            },
            // 接单
            handleReceive() {//
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.ReceiveFormData = {}
                this.receive_show = true
            },
            onReceiveSubmit() {
                this.ReceiveFormData.login_token = lime.cookie_get('login_token')
                this.ReceiveFormData.uuid = this.curr_row.uuid
                this.ReceiveFormData.status = this.ReceiveFormData.status - 0
                EbShopStaffReceiveBillAudit(this.ReceiveFormData, res => {
                    this.init();
                    this.$message.success('操作成功');
                }).catch(err => {
                    this.$message.error(err.msg)
                })
                this.receive_show = false
            },
            // 完成
            handleComplete(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return false;
                }
                this.$confirm('确认完成?', '提示').then(() => {
                    let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }
                    EbShopConfirm(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            }
        },
        

        
    }
</script>

<style scoped>
    @import '../../assets/styles/common.css';
    /* .from-box {
        width: 100%;
        height: 400px;;
        overflow: auto;
    } */
</style>