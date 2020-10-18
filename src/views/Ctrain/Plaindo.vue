<!--
 * @Author: your name
 * @Date: 2020-09-10 17:23:13
 * @LastEditTime: 2020-09-28 14:16:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /shop/src/views/Ctrain/Plaindo.vue
-->
<!-- 计划管理 -->
<template>
    <div v-wechat-title="$route.meta.title">
        <!-- 菜单 -->
        <div style="height: 46px; line-height: 46px; overflow: hidden;border-bottom: 1px solid #F2F2F2;">
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

        <div style="width: 100%;height: 45px;margin-top: 15px;font-size: 14px;padding-left: 20px;box-sizing: border-box">               
                <el-select v-model="search_value" placeholder="请选择" style="width: 100px;margin-right: 10px"  size="small">
                            <el-option
                            v-for="item in search_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> 
                <el-input v-if="search_value == 0" v-model="SearchFormData.title" size="small" style="width: 240px;margin-right: 20px;height: 36px"/>
                <el-button type="primary" @click="onSearchSubmit" size="small">搜索</el-button>
        </div>

        <!-- 数据表格 -->
        <div :style="{height: height - 190 - 20 + 'px',background: 'white'}">
             <!-- element-loading-spinner="el-icon-loading" -->
              <!-- stripe -->
            <el-table 
                :data="rows"

                :row-style="{height:'48px',fontSize: '14px',color: '#3F434C',background: 'white',fontWeight: '400',fontFamily: 'SimSun Regular'}" 
                :header-cell-style="{background:'#f4f8fe',color:'#2a2f3b',fontSize: '16px',fontWeight: '400'}"
                :height="height - 195 - 68"
                v-loading="loading"
                element-loading-text="拼命加载中"
               
                element-loading-background="rgba(0, 0, 0, 0.1)"
                @sort-change="onSortChange"
                :highlight-current-row="true"
                @current-change="onSelectRow"
                style="width: 100%;margin-top: 5px" 
                size="mini">
                <el-table-column type="index" label="#" width="80px"></el-table-column>
                <el-table-column prop="title" label="计划名称" align="left"></el-table-column>
                <el-table-column prop="start_time" label="开始时间" align="center" :sortable=true></el-table-column>
                <el-table-column prop="end_time" label="结束时间" align="center" :sortable=true></el-table-column>
            </el-table>
            <div class="page" :style="{width:width - 280 + 'px'}">
                 <el-pagination
                 background
                @size-change="handleSizeChange"
                @current-change="onPageChange"
                :current-page.sync="SearchFormData.page_num"
                :page-size="SearchFormData.page_len"
               :page-sizes="[10]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 搜索 -->
        <el-dialog
            title="搜索"
            :visible.sync="search_show"
            width="40%">
            <el-form :model="SearchFormData" label-width="120px" label-position="left"> 
                <el-form-item label="计划名称:"><el-input v-model="SearchFormData.title" /></el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="search_show = false">取 消</el-button>
                <el-button type="primary" @click="onSearchSubmit">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 添加模板 -->
        <el-drawer
            title="添加"
            :visible.sync="add_show"
            :direction="direction" size="50%">
             <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="AddFormData" label-width="140px" label-position="right">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="计划组名称:" required><el-input v-model="AddFormData.title"/></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计划组:" required>
                                <el-select
                                    v-model="plaing_value"
                                    @change="chosePlaing"
                                    placeholder="计划组">
                                    <el-option
                                    v-for="item in plaingAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="AddFormData.plan_group_uuid"/> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                            <el-form-item label="学员组成类型:" required>
                                <el-select v-model="add_study_type" placeholder="请选择" >
                                    <el-option
                                        class="width_240"
                                        v-for="item in study_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- AddFormData.study_user_type -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="支付类型:" required>
                                <el-select v-model="add_pay_type" placeholder="请选择" >
                                    <el-option
                                        class="width_240"
                                        v-for="item in pay_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- ddFormData.pay_type -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="开始学习时间:">
                                <el-date-picker
                                    class="width_240"
                                    v-model="add_start_time"
                                    type="date"
                                     :picker-options="pickerOptions0"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="结束学习时间:">
                                <el-date-picker
                                class="width_240"
                                    v-model="add_end_time"
                                     :picker-options="pickerOptions1"
                                    type="date"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-form-item label="学习时间范围:" required>
                        <el-date-picker 
                            size="small"
                            style="width: 360px;margin-right: 20px;height: 36px"
                            :clearable="true"
                            unlink-panels
                            align="center"
                            v-model="AddFormData.start_end" 
                            type="daterange" 
                            value-format="yyyy-MM-dd" 
                            range-separator="至" start-placeholder="开始日期" 
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item label="资源:" required>
                        <div v-if="re_ary" style="width: 99%; border-bottom: 1px solid #f2f2f2;">
                            <div class="re-flex" v-for="item in re_ary" :key="item.uuid">
                            <div class="re-flexlf">{{item.title}}</div>
                            <div class="re-flexmd">{{item.add_time}}</div>
                            <div class="re-flexrg">
                                <i class="el-icon-close"></i>
                            </div>
                        </div>
                        </div>
                        <div @click="resuce_show = true" class="re-add"><i class="el-icon-plus"></i></div>
                        <!-- AddFormData.plan_group_uuid -->
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="时长:" required>
                             <el-input-number controls-position="right" v-model="AddFormData.duration"  :min="10" :max="200" label="描述文字"></el-input-number>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学习开始是否拍照:" required>
                                <!-- AddFormData.study_start_photo -->
                                <el-select v-model="add_start_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="过程拍照次数:" required>
                                <el-input-number v-model="AddFormData.study_process_photo" controls-position="right"  :min="1" :max="20" label="描述文字"></el-input-number>
                                <!-- <el-input v-model="AddFormData.study_process_photo"/> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学习结束是否拍照:" required>
                                <!-- AddFormData.study_end_photo -->
                                <el-select v-model="add_end_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否考试:" required>
                                <el-select v-model="is_study" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in isstudy_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="学习过程学习:" required>
                                <el-input-number controls-position="right" v-model="AddFormData.exam_process_photo"  :min="1" :max="20" label="描述文字"></el-input-number>
                                <!-- <el-input v-model="AddFormData.exam_process_photo"/></el-form-item> -->
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row v-if="is_study == 0">
                        <el-col :span="12">
                            <el-form-item label="考试结束是否拍照:" required>
                                <el-select v-model="add_exam_end_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            <!-- AddFormData.exam_end_photo -->
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="考试开始是否拍照:" required>
                                <el-select v-model="add_exam_start_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- AddFormData.exam_start_photo -->
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!-- <el-form-item >
                        <div style="width: 100%;height: 1px;background: #F2F2F2"></div>
                    </el-form-item> -->
                    <el-form-item v-if="is_study == 0" label="试题选择:" label-width="120px">
                        <div style="width: 99%; border-bottom: 1px solid #f2f2f2;">
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">类型</div>
                                <div class="re-flexmd re-flexlfs">数量</div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    分值
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">单选</div>
                                <div class="re-flexmd re-flexlfs">
                                   <el-input placeholder="请输入" type="text" style="height: 30px" v-model="s_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="s_score" @change="change"></el-input>
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">多选</div>
                                <div class="re-flexmd re-flexlfs">
                                    <el-input placeholder="请输入" type="text" v-model="m_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="m_score" @change="change"></el-input>
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">判断</div>
                                <div class="re-flexmd re-flexlfs">
                                    <el-input placeholder="请输入" type="text" v-model="c_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="c_score" @change="change"></el-input>
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">简答</div>
                                <div class="re-flexmd re-flexlfs">
                                    <el-input placeholder="请输入" type="text" v-model="t_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="t_score" @change="change"></el-input>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="单选:" label-width="60px">
                         <el-form-item></el-form-item>
                         <el-form-item label-width="80px" label="题目数:"><el-input type="text" v-model="s_num" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="每题分数:" style="margin-top: 8px"><el-input type="text" v-model="s_score" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="付费:" style="margin-top: 8px">
                             <el-radio v-model="s_radio" label="0">免费</el-radio>
                             <el-radio v-model="s_radio" label="1">收费</el-radio>
                         </el-form-item>
                    </el-form-item> -->
                    <!-- <el-form-item label="多选:" label-width="60px">
                        <el-form-item></el-form-item>
                        <el-form-item label-width="80px" label="题目数:"><el-input type="text" v-model="m_num" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="每题分数:" style="margin-top: 8px"><el-input type="text" v-model="m_score" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="付费:" style="margin-top: 8px">
                             <el-radio v-model="m_radio" label="0">免费</el-radio>
                             <el-radio v-model="m_radio" label="1">收费</el-radio>
                         </el-form-item>
                    </el-form-item> -->
                    <!-- <el-form-item label="判断:" label-width="60px">
                        <el-form-item></el-form-item>
                        <el-form-item label-width="80px" label="题目数:"><el-input type="text" v-model="c_num" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="每题分数:" style="margin-top: 8px"><el-input type="text" v-model="c_score" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="付费:" style="margin-top: 8px">
                             <el-radio v-model="c_radio" label="0">免费</el-radio>
                             <el-radio v-model="c_radio" label="1">收费</el-radio>
                         </el-form-item>
                    </el-form-item>
                    <el-form-item label="简答:" label-width="60px">
                        <el-form-item></el-form-item>
                        <el-form-item label-width="80px" label="题目数:"><el-input type="text" v-model="t_num" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="每题分数:" style="margin-top: 8px"><el-input type="text" v-model="t_score" @change="change"></el-input></el-form-item>
                         <el-form-item label-width="80px" label="付费:" style="margin-top: 8px">
                             <el-radio v-model="t_radio" label="0">免费</el-radio>
                             <el-radio v-model="t_radio" label="1">收费</el-radio>
                         </el-form-item>
                    </el-form-item> -->
                    <el-form-item label="试题标签:" required>
                        <tags />
                    </el-form-item>
                    <!-- <el-form-item label="倒计时:" required>
                        <el-input type="text" v-model="AddFormData.spending_duration"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="考试时间:" required>
                        <el-input type="text" v-model="AddFormData.exam_time"></el-input>
                    </el-form-item> -->
                    <el-form-item label="试题来源:" required>
                        <el-select
                            v-model="from_value"
                            @change="choseFrom"
                            placeholder="来源">
                            <el-option
                            v-for="item in fromAry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-input type="text" v-modal="AddFormData.limit-from_type"></el-input> -->
                    </el-form-item>
                     
                </el-form>
            </div>
            <div class="drawer-footer">
                <el-button @click="add_show = false">取消</el-button>
                <el-button @click="onAddSubmit" type="primary">确定</el-button>
            </div>

             <!-- 选择资源 -->
        <el-drawer
            title="资源选择"
            :visible.sync="resuce_show"
            :append-to-body="true"
            :direction="direction" size="45%">
             <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'hidden',margin:'0 auto',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                 <resource ref="re_ary"/>
                 
             </div>
             <div class="drawer-footer" style="width: 45%;display: flex;flex-direction: row;border: 1px solid red">
                <div style="width: 50%;height: 100%;font-size: 14px;color:#A6AAB8;text-align: left; padding-left: 20px;box-sizing: border-box;border: 1px solid green">
                    付费: <span style="color: #0F7BF6; font-size: 16px">{{all_money}}</span> 学币
                </div>
                <div style="width: 50%;height: 100%">
                    <el-button @click="resuce_show = false">取消</el-button>
                    <el-button @click="getAry" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>

        </el-drawer>

        <!-- 编辑模板 -->
        <el-drawer
            title="编辑"
            :visible.sync="edit_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="EditFormData" label-width="140px" label-position="right">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="计划组名称:" required><el-input v-model="EditFormData.title"/></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计划组:" required>
                                <el-select
                                    v-model="plaing_value"
                                    @change="chosePlaing"
                                    placeholder="计划组">
                                    <el-option
                                    v-for="item in plaingAry"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- <el-input v-model="AddFormData.plan_group_uuid"/> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="12">
                            <el-form-item label="学员组成类型:" required>
                                <el-select v-model="add_study_type" placeholder="请选择" >
                                    <el-option
                                        class="width_240"
                                        v-for="item in study_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- AddFormData.study_user_type -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="支付类型:" required>
                                <el-select v-model="add_pay_type" placeholder="请选择" >
                                    <el-option
                                        class="width_240"
                                        v-for="item in pay_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- ddFormData.pay_type -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <el-form-item label="开始学习时间:">
                                <el-date-picker
                                    class="width_240"
                                    v-model="add_start_time"
                                    type="date"
                                     :picker-options="pickerOptions0"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" >
                            <el-form-item label="结束学习时间:">
                                <el-date-picker
                                class="width_240"
                                    v-model="add_end_time"
                                     :picker-options="pickerOptions1"
                                    type="date"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="资源:" required>
                        <div v-if="re_ary" style="width: 99%; border-bottom: 1px solid #f2f2f2;">
                            <div class="re-flex" v-for="item in re_ary" :key="item.uuid">
                            <div class="re-flexlf">{{item.title}}</div>
                            <div class="re-flexmd">{{item.add_time}}</div>
                            <div class="re-flexrg">
                                <i class="el-icon-close"></i>
                            </div>
                        </div>
                        </div>
                        <div @click="resuce_show = true" class="re-add"><i class="el-icon-plus"></i></div>
                        <!-- EditFormData.plan_group_uuid -->
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="时长:" required>
                             <el-input-number controls-position="right" v-model="EditFormData.duration"  :min="10" :max="200" label="描述文字"></el-input-number>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学习开始是否拍照:" required>
                                <!-- EditFormData.study_start_photo -->
                                <el-select v-model="add_start_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="过程拍照次数:" required>
                                <el-input-number v-model="EditFormData.study_process_photo" controls-position="right"  :min="1" :max="20" label="描述文字"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学习结束是否拍照:" required>
                                <!-- EditFormData.study_end_photo -->
                                <el-select v-model="add_end_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否考试:" required>
                                <el-select v-model="is_study" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in isstudy_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="学习过程学习:" required>
                                <el-input-number controls-position="right" v-model="EditFormData.exam_process_photo"  :min="1" :max="20" label="描述文字"></el-input-number>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row v-if="is_study == 0">
                        <el-col :span="12">
                            <el-form-item label="考试结束是否拍照:" required>
                                <el-select v-model="add_exam_end_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            <!-- EditFormData.exam_end_photo -->
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="考试开始是否拍照:" required>
                                <el-select v-model="add_exam_start_photo" placeholder="请选择" >
                                        <el-option
                                            class="width_240"
                                            v-for="item in photo_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                </el-select>
                                <!-- EditFormData.exam_start_photo -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item v-if="is_study == 0" label="试题选择:" label-width="120px">
                        <div style="width: 99%; border-bottom: 1px solid #f2f2f2;">
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">类型</div>
                                <div class="re-flexmd re-flexlfs">数量</div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    分值
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">单选</div>
                                <div class="re-flexmd re-flexlfs">
                                   <el-input placeholder="请输入" type="text" style="height: 30px" v-model="s_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="s_score" @change="change"></el-input>
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">多选</div>
                                <div class="re-flexmd re-flexlfs">
                                    <el-input placeholder="请输入" type="text" v-model="m_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="m_score" @change="change"></el-input>
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">判断</div>
                                <div class="re-flexmd re-flexlfs">
                                    <el-input placeholder="请输入" type="text" v-model="c_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="c_score" @change="change"></el-input>
                                </div>
                            </div>
                            <div class="re-flex" style="text-align: center">
                                <div class="re-flexlf re-flexlfs">简答</div>
                                <div class="re-flexmd re-flexlfs">
                                    <el-input placeholder="请输入" type="text" v-model="t_num" @change="change"></el-input>
                                </div>
                                <div class="re-flexrg re-flexrgs" style="text-align: center">
                                    <el-input placeholder="请输入" type="text" v-model="t_score" @change="change"></el-input>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="试题标签:" required>
                        <tags />
                    </el-form-item>
                    <el-form-item label="试题来源:" required>
                        <el-select
                            v-model="from_value"
                            @change="choseFrom"
                            placeholder="来源">
                            <el-option
                            v-for="item in fromAry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-input type="text" v-modal="EditFormData.limit-from_type"></el-input> -->
                    </el-form-item>
                     
                </el-form>
            </div>
            <div class="drawer-footer">
                <el-button @click="edit_show = false">取消</el-button>
                <el-button @click="onEditSubmit" type="primary">确定</el-button>
            </div>

             <!-- 选择资源 -->
        <el-drawer
            title="资源选择"
            :visible.sync="resuce_show"
            :append-to-body="true"
            :direction="direction" size="45%">
             <div class="draw-content" :style="{width:'100%', height:height - 80 +'px',overflow: 'hidden',margin:'0 auto',paddingTop: '20px',paddingBottom: '10px',boxSizing: 'border-box',borderTop: '1px solid #F2F2F2'}">
                 <resource ref="re_ary"/>
                 
             </div>
             <div class="drawer-footer" style="width: 45%;display: flex;flex-direction: row;border: 1px solid red">
                <div style="width: 50%;height: 100%;font-size: 14px;color:#A6AAB8;text-align: left; padding-left: 20px;box-sizing: border-box;border: 1px solid green">
                    付费: <span style="color: #0F7BF6; font-size: 16px">{{all_money}}</span> 学币
                </div>
                <div style="width: 50%;height: 100%">
                    <el-button @click="resuce_show = false">取消</el-button>
                    <el-button @click="getAry" type="primary">确定</el-button>
                </div>
            </div>
        </el-drawer>
            <!-- <div :style="{width:'100%', height:height - 80 +'px',overflow: 'auto',padding: '30px',boxSizing: 'border-box'}">
                <el-form :model="EditFormData" label-width="140px" label-position="left">
                    <el-form-item label="计划组名称:"><el-input v-model="EditFormData.title"/></el-form-item>
                    <el-form-item label="计划组:">
                        <el-select
                            v-model="plaing_value"
                            @change="chosePlaing"
                            placeholder="计划组">
                            <el-option
                            v-for="item in plaingAry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间:">
                        <el-date-picker 
                        v-model="EditFormData.start_time"  
                        type="date" 
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间:">
                        <el-date-picker 
                        v-model="EditFormData.end_time"  
                        type="date" 
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                     <el-form-item label="资源:" required>
                        <el-select
                            v-model="resource_value"
                            @change="choseResource"
                            placeholder="资源">
                            <el-option
                            v-for="item in resourceAry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学员组成类型:">
                        <el-radio v-model="EditFormData.study_user_type" label="1">员工</el-radio>
                        <el-radio v-model="EditFormData.study_user_type" label="2">学员</el-radio>
                        <el-radio v-model="EditFormData.study_user_type" label="3">混合</el-radio>
                    </el-form-item>
                    <el-form-item label="时长:"><el-input v-model="EditFormData.duration"/></el-form-item>
                    <el-form-item label="支付类型:">
                        <el-radio v-model="EditFormData.pay_type" label="1">企业付费</el-radio>
                        <el-radio v-model="EditFormData.pay_type" label="2">其它</el-radio>
                    </el-form-item>
                    <el-form-item label="学习开始是否拍照:">
                        <el-radio v-model="EditFormData.study_start_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.study_start_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="学习过程拍照:"><el-input v-model="EditFormData.study_process_photo"/></el-form-item>
                    <el-form-item label="学习结束是否拍照:">
                        <el-radio v-model="EditFormData.study_end_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.study_end_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="学习过程学习:"><el-input v-model="EditFormData.exam_process_photo"/></el-form-item>
                    <el-form-item label="考试结束是否拍照:">
                        <el-radio v-model="EditFormData.exam_end_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.exam_end_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                    <el-form-item label="考试开始是否拍照:">
                        <el-radio v-model="EditFormData.exam_start_photo" label="0">不拍照</el-radio>
                        <el-radio v-model="EditFormData.exam_start_photo" label="1">拍照 </el-radio>
                    </el-form-item>
                </el-form>
                <div slot="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="edit_show = false">取消</el-button>
                    <el-button @click="onEditSubmit" type="primary">确定</el-button>
                </div>
            </div> -->
        </el-drawer>

        <!-- 详细 -->
        <el-drawer
            title="详细"
            :visible.sync="detail_show"
            :direction="direction" size="50%">
            <div class="draw-content" :style="{height:height - 80 +'px'}">
                <el-form :model="DetailFormData" label-width="140px" label-position="right">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="计划组名称:">{{DetailFormData.title}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计划组:">{{DetailFormData.plan_group_uuid}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开始时间:">{{DetailFormData.start_time}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学员组成类型:">{{DetailFormData.study_user_type}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="时长:">{{DetailFormData.duration}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="支付类型:">{{DetailFormData.pay_type}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                             <el-form-item label="学习开始是否拍照:">{{DetailFormData.study_start_photo}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学习过程拍照:">{{DetailFormData.study_process_photo}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学习结束是否拍照:">{{DetailFormData.study_end_photo}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学习过程学习:">{{DetailFormData.exam_process_photo}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="考试结束是否拍照:">{{DetailFormData.exam_end_photo}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="考试开始是否拍照:">{{DetailFormData.exam_start_photo}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
               <!--  <div slot="footer" style="text-align: right;padding-right: 30px;box-sizing: border-box">
                    <el-button @click="detail_show = false" type="primary">确定</el-button>
                </div> -->
            </div>
            <div class="drawer-footer">
                <el-button @click="detail_show = false" type="primary">关闭</el-button>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css' 
    NProgress.configure({     
        easing: 'ease',  // 动画方式    
        speed: 500,  // 递增进度条的速度    
        showSpinner: false, // 是否显示加载ico    
        trickleSpeed: 200, // 自动递增间隔    
        minimum: 0.3 // 初始化时的最小百分比
    })
    import Vue from "vue";
    import store from "@/store";
    import lime from "@/lime.js";
    import util from "@/util.js";
    import { ShopPlanList, ShopPlanAdd, ShopPlanDel, ShopPlanEdit, ShopPlanDetail } from '@/api/request'
    import resource from "@/components/resource/index.vue"
    import tags from "@/components/tags/index.vue"
    // if (!store.state.ShopPlanData) {
    //     Vue.set(store.state, 'ShopPlanData', {
            
    //     });
    // }

    export default {
        components: {
            resource,
            tags
        },
        // data() {return store.state.ShopPlanData;},
        data() {
            let that = this
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                }, 
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < new Date(that.add_start_time).getTime() ;//+ 8.64e7如果没有后面的-8.64e7就是不可以选择今天的
                    }
            }, 
            add_start_time: new Date(),
            add_end_time: new Date(),
            rows:[],
            re_ary: [],
            total:0,
            loading:false,
            direction: 'rtl',
            curr_row:null,
            // 搜索
            search_show:false,
             search_options: [
                    {value: 0,label: '计划名称'}
                ],
            search_value: 0,
            SearchFormData:{
                title:'',
                page_num:1,
                page_len:10,
                order_field:'add_time',
                order_sort:'desc'
            },
            all_money: 0,
            // 添加
            add_show:false,
            AddFormData:{
                start_time: '',
                login_token:'',
                parent_uuid: '',
                name:'',
                img:'',
            },
            is_study: 0,
            isstudy_options: [
                {value: 0, label:'考试'},
                {value: 1, label:'不考试'},
            ],
            resuce_show: false,
            study_options:[
                {value: 0, label:'员工'},
                {value: 1, label:'学员'},
                {value: 2, label:'混合'}
            ],
            add_pay_type: 0,
            pay_options:[
                {value: 0, label:'企业付费'},
                {value: 1, label:'其他'},
            ],
            add_start_photo: 0,
            photo_options:[
                {value: 0, label:'不拍照'},
                {value: 1, label:'拍照'},
            ],
            add_end_photo: 0,
            add_study_type: 0,
            add_exam_end_photo: 0,
            add_exam_start_photo: 0,
            // 编辑
            edit_show:false,
            EditFormData:{
                login_token:'',
                parent_uuid: '',
                name:'',
                img:'',
                study_start_photo:'0',
                study_end_photo: '0'
            },
            // 详细
            detail_show:false,
            DetailFormData:[],
            plaing_value: '', 
            plaingAry: [],
            plain_uuid: '',

            s_radio: '0',
            m_radio: '0',
            c_radio: '0',
            t_radio: '0',
            from_value: 0,
            fromAry: [
                {value: '0', label:'运营'},
                {value: '10', label:'运输企业客户'},
                {value: '20', label:'监管部门'},
                {value: '30', label:'代理商'},
                {value: '40', label:'培训机构'},
                {value: '50', label:'个体工商户'},
                {value: '60', label:'会员'}
            ],
            m_num: 0,
            m_score: 0,
            s_num: 0,
            s_score: 0,
            c_num: 0,
            c_score: 0,
            t_num: 0,
            t_score: 0,
            resource_value: '',
            resourceAry: []
            }
        },
        computed:{
            width:() => {
                return store.state.AppData.width;
            },
            height:() => {
                return store.state.AppData.height;
            },
            upload_url:() => {
                return store.state.AppData.upload_url;
            },
            img_host:() => {
                return store.state.AppData.img_host;
            }
        },
        created(){
            this.init();
            lime.req('ShopPlanGroupList',{login_token: lime.cookie_get('login_token')}).then( res => {
                this.plaingAry = res.data.rows.map(v => {
                    return {value: v.uuid, label: v.name , ...v}
                });
            })
            lime.req('ShopResourceList',{login_token: lime.cookie_get('login_token'),page_no: 1,page_len:20}).then( res => {
                console.log(res)
                this.rece_rows = res.data.rows
                // this.resourceAry = res.data.rows.map(v => {
                //     return {value: v.uuid, label: v.title , ...v}
                // });
            })
        },
        methods:{
           getAry() {
               this.resuce_show = false
               this.re_ary = this.$refs.re_ary.sel_ary
               console.log(this.$refs.re_ary.sel_ary)
           },

             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            change(e) {
                this.$forceUpdate()
            },
            chosePlaing(uuid) {
                this.plain_uuid = uuid
                console.log(uuid)
            }, 
            choseFrom(uuid) {
                console.log(uuid)
            },
            choseResource(uuid) {
                // this.plain_uuid = uuid
                console.log(uuid)
            },
            // 按钮点击 menu:参数数据 local是否本地程序
            onSubMenu(menu, local = false) {util.submenu(menu,this,lime.cookie_get('login_token'), local);},
            // 数据初始化
            init() {
                // this.loading = true;
                NProgress.start();
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    title:this.SearchFormData.title,
                    page_num:this.SearchFormData.page_num + '',
                    page_len:this.SearchFormData.page_len + '',
                    order_field:this.SearchFormData.order_field,
                    order_sort:this.SearchFormData.order_sort
                }
                ShopPlanList(pam, res => {
                    // this.loading = false;
                    NProgress.done()
                    this.rows = res.data.rows;
                    this.total = res.data.total;
                    this.SearchFormData.title = ''
                }).catch(err => {
                    // this.loading = false;
                    NProgress.done()
                    this.$message.error(err.msg);
                })
                // 超时关闭遮罩层
                setTimeout(() => {
                    this.loading = false;
                }, 10000);
            },
            // 学员类型格式化
            studyUserTypeFormat(state) {
                // 1员工 2学员 3混合
                if (state == 1) {
                    return '员工';
                } else if (state == 2) {
                    return '学员';
                } else if (state == 3) {
                    return '混合';
                } else {
                    return '';
                }
            },
            // 表格数据刷新
            onRefresh() {
                this.init();
            },
            // 搜索页面打开
            onSearch() {this.search_show = true;},
            // 搜索提交
            onSearchSubmit(){
                this.search_show = false,
                this.SearchFormData.page_num = 1;
                this.init();
            },
            // 选择单行
            onSelectRow(row){this.curr_row = row;},
            // 分页处理
            onPageChange(page){
                this.SearchFormData.page_num = page;
                this.init();
            },
            // 排序处理
            onSortChange(sort) {
                this.SearchFormData.order_field = sort.prop;
                if (sort.order == 'ascending') {
                    this.SearchFormData.order_sort  = 'asc';
                } else {
                    this.SearchFormData.order_sort  = 'desc';
                }
                this.init();
            },

            // 添加
            handleAdd(r) {
                this.add_show = true;
            },
            onAddSubmit() {
                this.AddFormData.login_token = lime.cookie_get('login_token')
                this.AddFormData.plan_group_uuid = this.plain_uuid
                this.AddFormData.start_time = this.AddFormData.start_time.getFullYear() + '-' + (this.AddFormData.start_time.getMonth() + 1) + '-' + this.AddFormData.start_time.getDate()
                this.AddFormData.end_time = this.AddFormData.end_time.getFullYear() + '-' + (this.AddFormData.end_time.getMonth() + 1) + '-' + this.AddFormData.end_time.getDate()
                this.AddFormData.end_time = '2020-09-27'
                let questionRule = {
                    "select":[ 
                        {"type":"s","num":this.s_num,"score":this.s_score,"is_pay":this.s_radio - 0},
                        {"type":"m","num":this.m_num,"score":this.m_score,"is_pay":this.m_radio - 0},
                        {"type":"c","num":this.c_num,"score":this.c_score,"is_pay":this.c_radio - 0},
                        {"type":"t","num":this.t_num,"score":this.t_score,"is_pay":this.t_radio - 0}, 
                    ], 
                    "limit":{ 
                        "tags":[], 
                        "spending_duration":6000, 
                        "exam_time":6000, 
                        "from_type":[] 
                    } 
                }
                
                
                this.AddFormData.question_rule = JSON.stringify(questionRule)
                ShopPlanAdd(this.AddFormData, res => {
                    this.init()
                    this.add_show = false
                }).catch(err => {
                    this.add_show = false
                    this.$message.error(err.msg)
                })
            },

             // 删除
            handleDel(menu) {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.$confirm('确认删除?', '提示').then(() => {
                   let pam = {
                        login_token:lime.cookie_get('login_token'),
                        uuid:this.curr_row.uuid
                    }
                    ShopPlanDel(pam, res => {
                        this.init();
                        this.$message.success('操作成功');
                    }).catch(err => {
                        this.$message.error(err.msg);
                    })
                })
            },

            // 编辑
            handleEdit() {
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                this.EditFormData = this.curr_row
                this.edit_show = true
            },
            onEditSubmit() {
                this.EditFormData.login_token = lime.cookie_get('login_token')
                this.EditFormData.uuid        = this.curr_row.uuid
                ShopPlanEdit(this.EditFormData, res => {
                    this.init();
                    this.edit_show = false;
                }).catch(err => {
                    this.$message.error(err.msg);
                });
            },

            // 详细
            handleDetail(){
                if (util.empty(this.curr_row)) {
                    this.$message.error('请选择一条数据');
                    return;
                }
                let pam = {
                    login_token:lime.cookie_get('login_token'),
                    uuid:this.curr_row.uuid
                }
                ShopPlanDetail(pam, res => {
                    this.DetailFormData = res.data
                    this.detail_show = true;
                }).catch( err => {
                    this.$message.error(err.msg)
                })
            },

        }
    }
</script>
<style >
.re-flex input.el-input__inner {
    border: none;
    background: transparent
}

.el-input-number .el-input__inner {
       text-align: left;
   }

</style>
<style scoped>
    @import '../../assets/styles/common.css';
    .re-add {
        width: 80px;
        height: 36px;
        border: 1px solid #f2f2f2;
        border-radius: 4px;
        text-align: center; 
        line-height: 36px; 
        font-size: 20px;
        margin-top: 10px;
    }

    .re-flex {
        width: 99%;
        height: 40px;
        /* border: 1px solid #f2f2f2; */
        display: flex;
        flex-direction: row;
        /* border-bottom: 1px solid #f2f2f2; */
        border-right: 1px solid #f2f2f2;
        line-height: 40px;
        font-size: 12px;
        text-align: left;
    }
    
    .re-flexlf {
        width: 80%;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
    }
    .re-flexmd {
        width: 12%;
        height: 100%;
        border-left: 1px solid #f2f2f2;
        border-top: 1px solid #f2f2f2;
        padding-left: 10px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .re-flexrg {
        width: 8%;
        height: 100%;
        border-left: 1px solid #f2f2f2;
        border-top: 1px solid #f2f2f2;
        text-align: center;
    }
    .re-flexrg:hover {
        background: #2080F7;
        color: white;
    }

    .re-flexrgs {
        width: 20%;
        text-align: center;
    }

     .re-flexrgs:hover {
         background: none;
        color: black;
     }

     .re-flexlfs {
        width: 40%;
    }
    .mbstyle{
        margin-bottom: 0px;
    }
    .drawer-footer {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 50px;
        background: white;
        /* border: 1px solid red; */
        padding-right: 20px;
        text-align: right;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
        line-height: 50px;
        z-index: 999;
    }

    .draw-content {
        width: 100%;
        overflow: auto;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        border-top: 1px solid #F2F2F2;
    }

    .draw-content:after {
         content: "";
        height: 30px;
        display: block;

    }



    
</style>
